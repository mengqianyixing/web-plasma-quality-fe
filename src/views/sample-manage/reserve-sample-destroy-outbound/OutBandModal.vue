<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="扫描出库"
    width="880px"
    :min-height="600"
    :showOkBtn="false"
    @cancel="handelCancel"
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
          <span>未出库袋数：</span>
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
            <span>已出库袋数：</span>
            <span>{{ acceptList?.length }}</span>
          </div>
          <div>
            <a-button type="primary" @click="handleTrayOutBand"> 托盘出库 </a-button>
          </div>
        </div>
      </template>
    </vxe-grid>

    <TrayModal @register="registerTrayModal" />
  </BasicModal>
</template>

<script setup lang="tsx">
  import { computed, reactive, ref, watch } from 'vue';

  import Description from '@/components/Description/src/Description.vue';
  import { DescItem, useDescription } from '@/components/Description';
  import { BasicModal, useModal, useModalInner } from '@/components/Modal';

  import TrayModal from './TrayModal.vue';
  import dayjs from 'dayjs';
  import { VxeGridProps } from 'vxe-table';
  import { useScanHelper } from '@/hooks/common/useScanHelper';
  import { debounce } from 'lodash-es';
  import { keepPackOutBandList, keepPackScan } from '@/api/sample-manage/reserve-sample-destory';
  import { GetApiCoreBankDeliverSampleScanResponse } from '@/api/type/sampleManage';
  import { useMessage } from '@/hooks/web/useMessage';
  import ScanInput from '@/components/Form/src/components/ScanInput.vue';

  const { createErrorModal } = useMessage();

  const { barCode, enterFlag, startEvent } = useScanHelper();

  const tableLoading = ref(false);
  const sampleBagNo = ref('');
  const sampleBagNoRef = ref();

  const schema: DescItem[] = [
    {
      field: 'bagNo',
      label: '样本袋号',
      contentMinWidth: 100,
      render() {
        return (
          <div class="flex items-center justify-center gap-2 " ref="bagRef">
            <ScanInput
              placeholder="扫描袋号条码"
              value={sampleBagNo.value}
              onScanChange={(code) => (sampleBagNo.value = code)}
              onkeyup={handleKeyupEnter}
              onEnter={_handleReceiveByScan}
              ref={sampleBagNoRef}
            />
          </div>
        );
      },
    },
    {
      field: 'dlvNo',
      label: '申请单号',
    },
    {
      field: 'remark',
      label: '备注',
    },
    {
      field: 'batchNum',
      label: '批次数量',
    },
    {
      field: 'sampleBagNum',
      label: '样本袋数',
    },
    {
      field: 'sampleNum',
      label: '样本数量',
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
  const originTableData = ref<GetApiCoreBankDeliverSampleScanResponse>({
    batchNum: '',
    dlvNo: '',
    outedList: [],
    outedNum: '',
    remark: '',
    sampleBagNum: '',
    sampleNum: '',
    waitList: [],
    waitOutNum: '',
  });
  let _removeEvent = () => {};
  const [registerModal, { setModalProps }] = useModalInner(async (data) => {
    sampleBagNo.value = '';
    const { removeEvent } = startEvent();
    _removeEvent = removeEvent;
    setModalProps({
      maskClosable: false,
    });

    dlvNo.value = data.dlvNo;
    await initTableData();
  });

  async function initTableData() {
    originTableData.value = await keepPackOutBandList({
      dlvNo: dlvNo.value,
    });
  }

  const [registerTrayModal, { openModal: openTrayModal }] = useModal();

  const unAcceptList = computed(
    () => (originTableData.value as GetApiCoreBankDeliverSampleScanResponse)?.waitList ?? [],
  );
  const acceptList = computed(
    () => (originTableData.value as GetApiCoreBankDeliverSampleScanResponse)?.outedList ?? [],
  );
  const gridOptionsUnaccept = reactive<VxeGridProps<any>>({
    border: true,
    height: '520px',
    showOverflow: true,
    rowConfig: {
      isHover: true,
    },
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
        field: 'sampleBagNo',
        title: '样本袋号',
        minWidth: 200,
      },
      {
        field: 'sampleNum',
        title: '样本数量',
        minWidth: 100,
      },
    ],
    showFooter: false,
  });

  const gridOptionsAccept = reactive<VxeGridProps<any>>({
    border: true,
    height: '520px',
    showOverflow: true,
    rowConfig: {
      isHover: true,
    },
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
        field: 'sampleBagNo',
        title: '样本袋号',
        minWidth: 200,
      },
      {
        field: 'sampleNum',
        title: '样本数量',
        minWidth: 100,
      },
      {
        title: '出库人',
        field: 'scanBy',
        minWidth: 100,
      },
      {
        title: '出库日期',
        field: 'outDate',
        minWidth: 110,
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
        sampleBagNo.value = barCode.value;
        _handleReceiveByScan();
      }
    },
  );

  const _handleReceiveByScan = debounce(handleReceiveByScan, 300);
  function handleKeyupEnter(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      _handleReceiveByScan();
    }
  }
  async function handleReceiveByScan() {
    try {
      tableLoading.value = true;
      const res = await keepPackScan({
        dlvNo: dlvNo.value,
        sampleBagNo: sampleBagNo.value!,
      });
      if (res.data.code === '0') {
        sampleBagNo.value = '';
        await initTableData();
      } else if (res.status === 200 && res.data.msg) {
        _removeEvent();
        return createErrorModal({
          title: '提示',
          content: res.data.msg,
          onOk: () => {
            const { removeEvent } = startEvent();
            _removeEvent = removeEvent;
            setTimeout(() => {
              sampleBagNoRef.value.$el.focus();
              sampleBagNoRef.value.$el.select();
            }, 300);
          },
          keyboard: false,
        });
      }
    } finally {
      barCode.value = '';
      enterFlag.value = false;
      tableLoading.value = false;
    }
  }
  function handelCancel() {
    _removeEvent();
  }
  function handleTrayOutBand() {
    openTrayModal(true, {
      dlvNo: dlvNo.value,
    });
  }
</script>
