<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="扫描出库"
    width="80%"
    :min-height="650"
    :showOkBtn="false"
    @cancel="remove"
  >
    <Description @register="register" :data="originTableData" />

    <vxe-grid
      v-bind="gridOptionsUnaccept"
      :data="unAcceptList"
      class="inline-block w-2/5 pr-2"
      :loading="tableLoading"
    >
      <template #toolbar>
        <div class="p-3 font-medium text-[16px] bg-[#ffffff] rounded">
          <span>未出库数量：</span>
          <span>{{ unAcceptList?.length }}</span>
        </div>
      </template>
    </vxe-grid>
    <vxe-grid
      v-bind="gridOptionsAccept"
      :data="acceptList"
      :loading="tableLoading"
      class="inline-block w-3/5"
    >
      <template #toolbar>
        <div class="flex items-center justify-between bg-[#ffffff]">
          <div class="p-3 font-medium text-[16px] bg-[#ffffff] rounded">
            <span>已出库数量：</span>
            <span>{{ acceptList?.length }}</span>
          </div>
          <div>
            <a-button type="primary" @click="handleTrayOutBand"> 托盘出库 </a-button>
          </div>
        </div>
      </template>
    </vxe-grid>

    <TraySingleModal @register="registerTraySingleModal" />
  </BasicModal>
</template>

<script setup lang="tsx">
  import { computed, reactive, ref, watch } from 'vue';

  import Description from '@/components/Description/src/Description.vue';
  import { DescItem, useDescription } from '@/components/Description';
  import { BasicModal, useModal, useModalInner } from '@/components/Modal';

  import TraySingleModal from './TraySingleModal.vue';
  import dayjs from 'dayjs';
  import { VxeGridProps } from 'vxe-table';
  import { GetApiSearchBankStockRequest } from '@/api/type/plasmaStoreManage';
  import { useScanHelper } from '@/hooks/common/useScanHelper';
  import { debounce } from 'lodash-es';
  import { GetApiCoreBankDeliverSampleScanSingleResponse } from '@/api/type/sampleManage';
  import {
    keepPackOutBandSingleList,
    keepPackSingleScan,
  } from '@/api/sample-manage/reserve-sample-destory-single';
  import { useMessage } from '@/hooks/web/useMessage';

  const { createErrorModal } = useMessage();

  const { barCode, enterFlag, startEvent } = useScanHelper();

  const tableLoading = ref(false);
  const sampleNo = ref('');

  const schema: DescItem[] = [
    {
      field: 'bagNo',
      label: '样本编号',
      contentMinWidth: 100,
      labelStyle: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
      },
      render() {
        return (
          <div class="flex items-center justify-center gap-2 w-[300px]" ref="bagRef">
            <a-input
              placeholder="扫描样本条码"
              enter-button="接收"
              value={sampleNo}
              onChange={(e) => (sampleNo.value = e.target.value)}
              onkeyup={handleKeyupEnter}
            />
          </div>
        );
      },
    },
  ];
  const [register] = useDescription({
    bordered: false,
    column: 3,
    contentStyle: {
      width: '80px',
    },
    schema: schema,
  });

  const dlvNo = ref('');
  let remove = () => {};
  const originTableData = ref<GetApiCoreBankDeliverSampleScanSingleResponse>({
    outedList: [],
    outedNum: '',
    waitList: [],
    waitOutNum: '',
  });
  const [registerModal, { setModalProps }] = useModalInner(async (data) => {
    sampleNo.value = '';
    const { removeEvent } = startEvent();
    remove = removeEvent;
    setModalProps({
      maskClosable: false,
    });

    dlvNo.value = data.dlvNo;
    await initTableData();
  });

  async function initTableData() {
    originTableData.value = await keepPackOutBandSingleList({
      dlvNo: dlvNo.value,
    });
  }

  const [registerTraySingleModal, { openModal: openTraySingleModal }] = useModal();

  const unAcceptList = computed(
    () => (originTableData.value as GetApiCoreBankDeliverSampleScanSingleResponse)?.waitList ?? [],
  );
  const acceptList = computed(
    () => (originTableData.value as GetApiCoreBankDeliverSampleScanSingleResponse)?.outedList ?? [],
  );
  const gridOptionsUnaccept = reactive<VxeGridProps<GetApiSearchBankStockRequest>>({
    border: true,
    height: '600px',
    showOverflow: true,
    exportConfig: {},
    columnConfig: {
      resizable: true,
    },
    scrollY: {
      enabled: true,
      gt: 0,
    },
    pagerConfig: {
      enabled: false,
    },
    formConfig: {
      enabled: false,
    },
    toolbarConfig: {
      refresh: false,
      loading: false,
      export: false,
      custom: false,
    },
    columns: [
      {
        field: 'sampleNo',
        title: '样本编号',
      },
      {
        field: 'source',
        title: '类别',
      },
      {
        field: 'donorNo',
        title: '浆员编号',
      },
    ],
    showFooter: false,
  });

  const gridOptionsAccept = reactive<VxeGridProps<GetApiSearchBankStockRequest>>({
    border: true,
    height: '600px',
    showOverflow: true,
    columnConfig: {
      resizable: true,
    },
    scrollY: {
      enabled: true,
      gt: 0,
    },
    pagerConfig: {
      enabled: false,
    },
    formConfig: {
      enabled: false,
    },
    toolbarConfig: {
      refresh: false,
      loading: false,
      export: false,
      custom: false,
    },
    columns: [
      {
        field: 'sampleNo',
        title: '样本编号',
        width: 200,
      },
      {
        field: 'source',
        title: '类别',
      },
      {
        field: 'donorNo',
        title: '浆员编号',
      },
      {
        title: '出库人',
        field: 'scanBy',
      },
      {
        title: '出库日期',
        field: 'outDate',
        width: 200,
        formatter(params) {
          return params.cellValue ? dayjs(params.cellValue).format('YYYY-MM-DD') : '-';
        },
      },
    ],
    showFooter: false,
  });

  watch(
    () => [barCode.value, enterFlag.value],
    (val) => {
      if (val[0] && val[1]) {
        sampleNo.value = barCode.value;
        _handleReceiveByScan();
      }
    },
  );

  function handleKeyupEnter(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      _handleReceiveByScan();
    }
  }
  const _handleReceiveByScan = debounce(handleReceiveByScan, 300);

  async function handleReceiveByScan() {
    if (!sampleNo.value) return;
    try {
      tableLoading.value = true;
      const res = await keepPackSingleScan({
        dlvNo: dlvNo.value,
        sampleNo: sampleNo.value!,
      });
      if (res.data.code === '0') {
        sampleNo.value = '';
        await initTableData();
      } else if (res.status === 200 && res.data.msg) {
        remove();
        const focusedElement = document.activeElement as HTMLElement;
        focusedElement?.blur();
        createErrorModal({
          title: '提示',
          content: res.data.msg,
          onOk: () => {
            const { removeEvent } = startEvent();
            remove = removeEvent;
          },
          keyboard: false,
          wrapClassName: 'osm9527',
        });
        const dom: HTMLElement | null = document.querySelector('.osm9527 button');
        setTimeout(() => {
          dom?.blur();
        });
      }
    } finally {
      barCode.value = '';
      enterFlag.value = false;
      tableLoading.value = false;
    }
  }

  function handleTrayOutBand() {
    openTraySingleModal(true, {
      dlvNo: dlvNo.value,
    });
  }
</script>
