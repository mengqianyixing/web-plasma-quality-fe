<template>
  <PageWrapper contentFullHeight fixedHeight>
    <Description @register="register" :data="sampleBatchData">
      <template #action>
        <a-button type="error" @click="handleNonconformityRegister" class="mr-2">
          不合格登记
        </a-button>
        <a-button type="primary" @click="handleCompleteVerify">完成验收</a-button>
      </template>
    </Description>
    <SampleVerifyBatchDrawer
      @register="registerSampleVerifyBatchDrawer"
      @success="handleSelectSampleBatchSuccess"
    />

    <vxe-grid
      v-bind="gridOptionsUnaccept"
      :data="unAcceptList"
      class="w-1/5 mt-1 inline-block pr-2"
    >
      <template #toolbar>
        <div class="p-3 font-medium text-[16px] bg-[#ffffff] rounded">
          <span>未验收数：</span>
          <span>{{ unAcceptList?.length }}</span>
        </div>
      </template>
    </vxe-grid>
    <vxe-grid
      v-bind="gridOptionsAccept"
      :data="acceptList"
      ref="vxe"
      class="w-4/5 mt-1 inline-block"
    >
      <template #toolbar>
        <div class="p-3 font-medium text-[16px] bg-[#ffffff] rounded">
          <span>已验收数：</span>
          <span>{{ acceptList?.length }}</span>
        </div>
      </template>
      <template #action="{ row }">
        <TableAction outside :actions="createActions(row)" />
      </template>
    </vxe-grid>
  </PageWrapper>
</template>

<script setup lang="tsx">
  import { onMounted, reactive, ref, computed } from 'vue';
  import { debounce } from 'lodash-es';
  import { ActionItem, TableAction } from '@/components/Table';

  import PageWrapper from '@/components/Page/src/PageWrapper.vue';
  import Description from '@/components/Description/src/Description.vue';
  import { DescItem, useDescription } from '@/components/Description';
  import { useDrawer } from '@/components/Drawer';

  import SampleVerifyBatchDrawer from './SampleVerifyBatchDrawer.vue';
  import { getSampleDictionary } from '@/api/inbound-management/sample-receive';
  import { GetApiCoreBatchSampleVerifyBatchSampleNoResponse } from '@/api/type/batchManage';
  import { sampleDictionary } from '@/enums/sampleEnum';
  import { getSampleVerifyDetail } from '@/api/inbound-management/sample-verify';
  import { VxeGridProps } from 'vxe-table';
  import { GetApiCoreBankStockRequest } from '@/api/type/plasmaStoreManage';
  import dayjs from 'dayjs';

  const sampleBatchData = ref<GetApiCoreBatchSampleVerifyBatchSampleNoResponse>({});
  const inputValue = ref('');
  const sampleTypeDictionary = ref<Recordable[] | undefined>([]);
  const sampleNonconformityDictionary = ref<Recordable[] | undefined>([]);

  onMounted(async () => {
    const dictionaryArr = await getSampleDictionary([
      sampleDictionary.NonconformityReason,
      sampleDictionary.SampleType,
    ]);
    if (!dictionaryArr) return;

    sampleTypeDictionary.value = dictionaryArr.find(
      (it) => it.dictNo === sampleDictionary.SampleType,
    )?.dictImtes;

    sampleNonconformityDictionary.value = dictionaryArr.find(
      (it) => it.dictNo === sampleDictionary.NonconformityReason,
    )?.dictImtes;
  });

  const unAcceptList = computed(() => sampleBatchData.value.unVerifyList);

  const acceptList = computed(() => sampleBatchData.value.verifyedList);

  const schema: DescItem[] = [
    {
      field: 'batchSampleNo',
      label: '样本批号',
      render() {
        return (
          <div class="flex items-center gap-2 w-[300px]">
            <a-input
              placeholder="请选择批号或输入批号回车"
              value={inputValue}
              onChange={handleSampleBatchChange}
              onPressEnter={debounce(handlePressEnter, 500)}
            />
            <a-button type="primary" onClick={handleSelectSampleBatch}>
              选择
            </a-button>
          </div>
        );
      },
    },
    {
      field: 'stationName',
      label: '采浆公司',
    },
    {
      field: 'acceptAt',
      label: '接收日期',
      render(text) {
        return text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '';
      },
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
    {
      field: 'lackCount',
      label: '浆站缺号数量',
    },
    {
      field: 'plasmaAcceptUnqualifiedCount',
      label: '血浆验收不合格数量',
    },
  ];
  const [register] = useDescription({
    contentStyle: {
      width: '20%',
    },
    title: '样本验收批次信息',
    schema: schema,
  });

  const gridOptionsUnaccept = reactive<VxeGridProps<GetApiCoreBankStockRequest>>({
    border: true,
    height: 'auto',
    showOverflow: true,
    exportConfig: {},
    columnConfig: {
      resizable: true,
    },
    scrollY: {
      enabled: true,
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
    ],
    showFooter: false,
  });
  const gridOptionsAccept = reactive<VxeGridProps<GetApiCoreBankStockRequest>>({
    border: true,
    height: 'auto',
    showOverflow: true,
    exportConfig: {},
    columnConfig: {
      resizable: true,
    },
    scrollY: {
      enabled: true,
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
        field: 'seq',
        title: '样本编号',
        width: 200,
      },
      {
        field: 'field',
        title: '验收人',
      },
      {
        field: '',
        title: '验收时间',
      },
      {
        field: '',
        title: '验收结果',
      },
      {
        field: '',
        title: '不合格原因',
      },
      {
        field: '',
        title: '操作',
        slots: {
          default: 'action',
        },
      },
    ],
    showFooter: false,
  });

  const [registerSampleVerifyBatchDrawer, { openDrawer: openSampleVerifyBatchDrawer }] =
    useDrawer();

  function handleSelectSampleBatch() {
    openSampleVerifyBatchDrawer(true, {
      reload: true,
      record: {
        sampleType: sampleTypeDictionary.value,
      },
    });
  }

  async function handleSelectSampleBatchSuccess(record: Recordable) {
    sampleBatchData.value = await getSampleVerifyDetail(record.batchSampleNo);
    updateTableData();
    inputValue.value = record.batchSampleNo;
  }

  function updateTableData() {}

  function handleSampleBatchChange(e: ChangeEvent) {
    inputValue.value = e.target.value;
  }

  async function handlePressEnter() {
    sampleBatchData.value = await getSampleVerifyDetail(inputValue.value);
  }

  function handleNonconformityRegister() {}

  function handleCompleteVerify() {}

  const createActions = (record) => {
    const actions: ActionItem[] = [
      {
        label: '确认',
        onClick: () => {
          console.log(record);
        },
        ifShow: (record: Recordable) =>
          record.unqualifiedReason ===
          sampleTypeDictionary.value!.find(
            (it) => it.value === sampleDictionary.NonconformityReason,
          ),
      },
      {
        label: '撤销',
        onClick: async () => {},
      },
    ];

    return actions;
  };
</script>
