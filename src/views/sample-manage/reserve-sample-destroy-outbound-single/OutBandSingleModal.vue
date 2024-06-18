<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="扫描出库"
    width="80%"
    :min-height="650"
    :showOkBtn="false"
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

  const { barCode, enterFlag, startEvent } = useScanHelper();

  const tableLoading = ref(false);
  const sampleNo = ref('');

  const schema: DescItem[] = [
    {
      field: 'bagNo',
      label: '样本袋号',
      contentMinWidth: 100,
      render() {
        return (
          <div class="flex items-center justify-center gap-2 w-[300px]" ref="bagRef">
            <a-input
              placeholder="扫描袋号条码"
              enter-button="接收"
              value={sampleNo}
              onChange={(e) => (sampleNo.value = e.target.value)}
              onPressEnter={_handleReceiveByScan}
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
  const originTableData = ref<GetApiCoreBankDeliverSampleScanSingleResponse>({
    outedList: [],
    outedNum: '',
    waitList: [],
    waitOutNum: '',
  });
  const [registerModal, { setModalProps }] = useModalInner(async (data) => {
    startEvent();
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
        field: 'sampleBagNo',
        title: '样本袋号',
      },
      {
        field: 'source',
        title: '类别',
      },
      {
        field: 'sampleNum',
        title: '样本数量',
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
        field: 'sampleBagNo',
        title: '样本袋号',
        width: 200,
      },
      {
        field: 'source',
        title: '类别',
      },
      {
        field: 'sampleNum',
        title: '样本数量',
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

  const _handleReceiveByScan = debounce(handleReceiveByScan, 300);

  async function handleReceiveByScan() {
    try {
      tableLoading.value = true;
      await keepPackSingleScan({
        dlvNo: dlvNo.value,
        sampleNo: sampleNo.value!,
      });
      await initTableData();
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
