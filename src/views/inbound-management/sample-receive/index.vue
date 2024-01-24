<template>
  <PageWrapper>
    <Description @register="register" :data="sampleBatchData" />
    <SelectSampleBatchModal
      @register="registerSelectModal"
      @success="handleSelectSampleBatchSuccess"
    />

    <vxe-grid
      v-bind="gridOptionsUnaccept"
      :data="unAcceptList"
      class="inline-block w-2/5 pr-2"
      :loading="tableLoading"
    >
      <template #toolbar>
        <div class="p-3 font-medium text-[16px] bg-[#ffffff] rounded">
          <span>未接收数：</span>
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
            <span>已接收数：</span>
            <span>{{ acceptList?.length }}</span>
          </div>
          <div>
            <a-button type="primary" @click="handleAcceptSample">接收</a-button>
          </div>
        </div>
      </template>
    </vxe-grid>
  </PageWrapper>
</template>

<script setup lang="tsx">
  import { computed, reactive, ref, onMounted } from 'vue';

  import PageWrapper from '@/components/Page/src/PageWrapper.vue';
  import Description from '@/components/Description/src/Description.vue';
  import { DescItem, useDescription } from '@/components/Description';
  import { useModal } from '@/components/Modal';

  import SelectSampleBatchModal from './SelectSampleBatchModal.vue';
  import {
    receiveSample,
    getSampleReceiveDetail,
    getSampleDictionary,
  } from '@/api/inbound-management/sample-receive';
  import { GetApiCoreBatchSampleAcceptBatchSampleNoResponse } from '@/api/type/batchManage';
  import { useMessage } from '@/hooks/web/useMessage';
  import dayjs from 'dayjs';
  import { sampleDictionary } from '@/enums/sampleEnum';
  import { VxeGridProps } from 'vxe-table';
  import { GetApiCoreBankStockRequest } from '@/api/type/plasmaStoreManage';

  const sampleBatchData = ref<GetApiCoreBatchSampleAcceptBatchSampleNoResponse>({});
  const inputValue = ref('');
  const sampleTypeDictionary = ref<Recordable[] | undefined>([]);
  const tableLoading = ref(false);

  onMounted(async () => {
    const dictionaryArr = await getSampleDictionary([sampleDictionary.SampleType]);
    if (!dictionaryArr) return;

    sampleTypeDictionary.value = dictionaryArr.find(
      (it) => it.dictNo === sampleDictionary.SampleType,
    )?.dictImtes;
  });

  const { createConfirm } = useMessage();

  const schema: DescItem[] = [
    {
      field: 'batchSampleNo',
      label: '样本批号',
      contentMinWidth: 100,
      render() {
        return (
          <div class="flex items-center justify-center gap-2 w-[300px] -mt-1">
            <a-input-search
              placeholder="请选择批号或输入批号回车"
              enter-button="选择"
              value={inputValue}
              onChange={(e) => (inputValue.value = e.target.value)}
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
      render(text) {
        const label = sampleTypeDictionary.value!.find((it) => it.value === text)?.label;
        return <span>{label}</span>;
      },
    },
    {
      field: 'bagCount',
      label: '样本袋数',
    },
    {
      field: 'totalCount',
      label: '样本数量',
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

  function handleSelectSampleBatch(value: string, event: MouseEvent) {
    if (value && event.type !== 'click') {
      handlePressEnter();
    } else {
      openSelectSampleBatchModal(true, {
        reload: true,
        record: {
          sampleType: sampleTypeDictionary.value,
        },
      });
    }
  }

  const unAcceptList = computed(() => sampleBatchData.value?.unAcceptList ?? []);
  const acceptList = computed(() => sampleBatchData.value?.acceptedList ?? []);
  const gridOptionsUnaccept = reactive<VxeGridProps<GetApiCoreBankStockRequest>>({
    border: true,
    height: '760px',
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
        field: 'sampleCount',
        title: '样本数量',
      },
    ],
    showFooter: false,
  });

  const gridOptionsAccept = reactive<VxeGridProps<GetApiCoreBankStockRequest>>({
    border: true,
    height: '760px',
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
    ],
    showFooter: false,
  });

  async function handleSelectSampleBatchSuccess(record: Recordable) {
    sampleBatchData.value = await getSampleReceiveDetail(record.batchSampleNo);
    inputValue.value = record.batchSampleNo;
  }

  async function handlePressEnter() {
    sampleBatchData.value = await getSampleReceiveDetail(inputValue.value);
  }

  async function handleAcceptSample() {
    createConfirm({
      title: '确认',
      content: '确认接收样本',
      iconType: 'warning',
      onOk: async () => {
        await receiveSample({
          batchSampleNo: inputValue.value,
        });
        sampleBatchData.value = await getSampleReceiveDetail(inputValue.value);
      },
    });
  }
</script>
