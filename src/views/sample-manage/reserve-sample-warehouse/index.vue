<template>
  <PageWrapper>
    <Description @register="register" :data="originKeepPackData" />
    <vxe-grid
      v-bind="gridOptionsUnaccept"
      :data="unAcceptList"
      class="inline-block w-2/5 pr-2"
      :loading="tableLoading"
    >
      <template #toolbar>
        <div class="p-3 font-medium text-[16px] bg-[#ffffff] rounded">
          <span>未接收袋数：</span>
          <span>{{ unAcceptList?.length }}</span>
        </div>
      </template>
      <template #sampleBagNo="{ row }">
        <span class="text-blue-500 cursor-pointer" @click="handleOpenDetail(row)">
          {{ row?.sampleBagNo }}
        </span>
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
            <span>已接收袋数：</span>
            <span>{{ acceptList?.length }}</span>
          </div>
          <div class="flex gap-2">
            <a-button type="primary" @click="handleTrayInBand"> 入库 </a-button>
            <a-button :disabled="cancelDisabled" type="primary" @click="handleAcceptComplete">
              接收完成
            </a-button>
          </div>
        </div>
      </template>
      <template #sampleBagNo="{ row }">
        <span class="text-blue-500 cursor-pointer" @click="handleOpenDetail(row)">
          {{ row?.sampleBagNo }}
        </span>
      </template>
      <template #action="{ row }">
        <a-button type="link" :disabled="cancelDisabled" @click="handleCancel(row)">
          撤销
        </a-button>
      </template>
    </vxe-grid>

    <SelectSampleBatchModal
      @register="registerSelectModal"
      @success="handleSelectSampleBatchSuccess"
    />
    <TrayInModal @register="registerTrayInModal" />
    <DetailModal @register="registerDetailModal" />
  </PageWrapper>
</template>

<script setup lang="tsx">
  import { computed, reactive, ref, unref } from 'vue';

  import PageWrapper from '@/components/Page/src/PageWrapper.vue';
  import Description from '@/components/Description/src/Description.vue';
  import { DescItem, useDescription } from '@/components/Description';
  import { useModal } from '@/components/Modal';

  import SelectSampleBatchModal from './SelectSampleBatchModal.vue';
  import TrayInModal from '@/views/sample-manage/reserve-sample-warehouse/TrayInModal.vue';
  import DetailModal from './DetailModal.vue';

  import { useMessage } from '@/hooks/web/useMessage';
  import dayjs from 'dayjs';
  import { VxeGridProps } from 'vxe-table';
  import { GetApiCoreBankStockRequest } from '@/api/type/plasmaStoreManage';
  import { sampleReceiveStatusValueEnum } from '@/enums/sampleEnum';
  import { debounce, cloneDeep } from 'lodash-es';
  import {
    acceptSeal,
    getKeepPackDetail,
    keepPackAccept,
    revokeKeepPack,
    acceptComplete,
  } from '@/api/sample-manage/reserve-sample-destory';
  import { PostApiCoreBatchSampleAcceptKeepPackResponse } from '@/api/type/sampleManage';

  const { createMessage, createConfirm } = useMessage();

  defineOptions({ name: 'ReserveSampleWarehouse' });

  const originKeepPackData = ref<PostApiCoreBatchSampleAcceptKeepPackResponse>({});
  const tableLoading = ref(false);

  const trayRef = ref(null);
  const trayValue = ref('');
  const boxNoValue = ref('');
  const batchValue = ref('');

  const packNo = ref('');

  const packCount = computed(() => `袋数(${originKeepPackData.value?.packCount ?? 0})`);

  const schema: DescItem[] = [
    {
      field: 'trayNo',
      label: '托盘编号',
      contentMinWidth: 100,
      render() {
        return (
          <div class="flex items-center justify-center gap-2 w-[300px] -mt-1" ref="bagRef">
            <a-input
              ref={(el) => (trayRef.value = el)}
              placeholder="扫描托盘编号"
              value={trayValue}
              onChange={(e) => (trayValue.value = e.target.value)}
            />
          </div>
        );
      },
    },
    {
      field: 'boxNo',
      label: '箱号',
      contentMinWidth: 100,
      render() {
        return (
          <div class="flex items-center justify-between gap-2 -mt-1" ref="bagRef">
            <a-input
              placeholder="扫描箱号"
              value={boxNoValue}
              onChange={(e) => (boxNoValue.value = e.target.value)}
            />
            <div class="flex items-center justify-center w-[80px]">{packCount.value}</div>
            <a-button type="primary" onClick={handleSeal}>
              封箱
            </a-button>
          </div>
        );
      },
    },
    {
      field: 'packNo',
      label: '样本袋号',
      contentMinWidth: 100,
      render() {
        return (
          <div class="flex items-center justify-center gap-2 w-[300px] -mt-1" ref="bagRef">
            <a-input
              placeholder="扫描样本袋号或输入袋号回车"
              value={packNo}
              onChange={(e) => (packNo.value = e.target.value)}
              onPressEnter={_handleAcceptSample}
            />
          </div>
        );
      },
    },
    {
      field: 'batchSampleNo',
      label: '样本批号',
      contentMinWidth: 100,
      render() {
        return (
          <div class="flex items-center justify-center gap-2 w-[300px] -mt-1">
            <a-input-search
              readonly
              placeholder="请点击选择"
              enter-button="选择"
              value={batchValue}
              onChange={(e) => (batchValue.value = e.target.value)}
              onSearch={handleSelectSampleBatch}
            />
          </div>
        );
      },
    },
    {
      field: 'stationName',
      label: '采浆公司',
    },
    {
      field: 'outWarehouseDate',
      label: '出库日期',
    },
    {
      field: 'sampleType',
      label: '样本类型',
    },
    {
      field: 'totalCount',
      label: '样本数量',
      render(text) {
        return (
          <span onClick={handleSampleCountClick} class="underline text-#2d5cf6 cursor-pointer">
            {text}
          </span>
        );
      },
    },
    {
      field: 'bagCount',
      label: '样本袋数',
    },
  ];
  const [register] = useDescription({
    bordered: false,
    column: 3,
    contentStyle: {
      width: '80px',
    },
    title: '样本批次信息',
    schema: schema,
  });

  const [registerSelectModal, { openModal: openSelectSampleBatchModal }] = useModal();
  const [registerTrayInModal, { openModal: openTrayInModal }] = useModal();
  const [registerDetailModal, { openModal: openDetailModal }] = useModal();

  function handleSelectSampleBatch() {
    openSelectSampleBatchModal(true, {
      reload: true,
    });
  }

  const unAcceptList = computed(
    () =>
      (originKeepPackData.value as PostApiCoreBatchSampleAcceptKeepPackResponse)?.unAcceptList ??
      [],
  );
  const acceptList = computed(
    () =>
      (originKeepPackData.value as PostApiCoreBatchSampleAcceptKeepPackResponse)?.acceptedList ??
      [],
  );
  const gridOptionsUnaccept = reactive<VxeGridProps<GetApiCoreBankStockRequest>>({
    border: true,
    height: '750px',
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
        slots: {
          default: 'sampleBagNo',
        },
      },
      {
        field: 'sampleCount',
        title: '样本数量',
      },
    ],
    showFooter: false,
  });

  const gridOptionsAccept = reactive<VxeGridProps<GetApiCoreBankStockRequest>>({
    border: true,
    height: '750px',
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
        field: 'trayNo',
        title: '托盘编号',
        formatter(params) {
          return params.cellValue ? params.cellValue : '-';
        },
      },
      {
        field: 'boxNo',
        title: '样本箱号',
        width: 150,
      },
      {
        field: 'sampleBagNo',
        title: '样本袋号',
        width: 150,
        slots: {
          default: 'sampleBagNo',
        },
      },
      {
        field: 'sampleCount',
        title: '样本数量',
      },
      {
        title: '接收人',
        field: 'acceptor',
      },
      {
        title: '接收日期',
        field: 'acceptAt',
        width: 200,
        formatter(params) {
          return params.cellValue ? dayjs(params.cellValue).format('YYYY-MM-DD HH:mm:ss') : '-';
        },
      },
      {
        title: '操作',
        field: 'action',
        slots: {
          default: 'action',
        },
      },
    ],
    showFooter: false,
  });

  async function handleSelectSampleBatchSuccess(record: Recordable) {
    batchValue.value = record.batchNo;

    await initTableData();
  }

  async function initTableData() {
    tableLoading.value = true;
    originKeepPackData.value = await getKeepPackDetail(batchValue.value);
    trayValue.value = originKeepPackData.value.trayNo || '';
    boxNoValue.value = originKeepPackData.value.boxNo || '';

    cancelDisabled.value = originKeepPackData.value.acceptState === sampleReceiveStatusValueEnum.S;
    tableLoading.value = false;
  }

  const _handleAcceptSample = debounce(handleAcceptSample, 300);

  async function handleAcceptSample() {
    let originRes: PostApiCoreBatchSampleAcceptKeepPackResponse;
    try {
      const params = {
        batchNo: batchValue.value,
        packNo: packNo.value,
        boxNo: boxNoValue.value,
        trayNo: trayValue.value,
      };

      const _params = cloneDeep(params);
      Object.keys(_params).forEach((key) => {
        if (!_params[key]) {
          delete _params[key];
        }
      });

      originRes = await keepPackAccept(_params);
    } finally {
      packNo.value = '';
    }

    originKeepPackData.value = originRes;
    boxNoValue.value = originRes.boxNo!;
    trayValue.value = originRes.trayNo!;
    batchValue.value = originRes.batchSampleNo!;

    if (originRes.acceptState === sampleReceiveStatusValueEnum.S) {
      createMessage.success('该批次接收完成');

      if (!trayValue.value) {
        createMessage.warn('请扫描托盘编号,进行封箱');
      } else {
        await handleSeal();
      }
    }
  }

  async function handleSeal() {
    try {
      const resBoxNo = await acceptSeal({
        batchNo: batchValue.value,
        boxNo: boxNoValue.value,
        trayNo: trayValue.value,
      });

      if (!resBoxNo) {
        boxNoValue.value = '';
      } else {
        boxNoValue.value = resBoxNo;
      }

      createMessage.success('封箱成功，正在打印标签');
    } finally {
      createMessage.warn('操作失败，请重试');
    }
  }

  function handleTrayInBand() {
    if (!batchValue.value) {
      createMessage.warn('请先选择样本批号');
      return;
    }

    openTrayInModal(true, {
      batchNo: batchValue.value,
    });
  }

  function handleOpenDetail(row) {
    openDetailModal(true, {
      ...row,
      ...unref(originKeepPackData),
    });
  }

  function handleCancel(row) {
    createConfirm({
      title: '确认',
      content: '是否撤销？',
      iconType: 'warning',
      onOk: async () => {
        await revokeKeepPack({
          packNo: row.sampleBagNo,
        });

        await initTableData();
        createMessage.success('撤销成功');
      },
    });
  }

  function handleSampleCountClick() {
    openDetailModal(true, {
      ...unref(originKeepPackData),
    });
  }

  const cancelDisabled = ref(false);
  async function handleAcceptComplete() {
    createConfirm({
      title: '确认',
      content: '是否确认接收完成？',
      iconType: 'warning',
      onOk: async () => {
        await acceptComplete({
          batchNo: batchValue.value,
        });

        cancelDisabled.value = true;

        createMessage.success('接收完成');
      },
    });
  }
</script>
