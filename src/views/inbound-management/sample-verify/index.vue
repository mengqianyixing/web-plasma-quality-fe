<template>
  <PageWrapper>
    <Description @register="register" :data="sampleBatchData" />

    <SampleVerifyBatchDrawer
      @register="registerSampleVerifyBatchDrawer"
      @success="handleSelectSampleBatchSuccess"
    />

    <vxe-grid
      v-bind="gridOptionsUnaccept"
      :data="unAcceptList"
      class="w-1/5 mt-1 inline-block pr-2"
      :loading="tableLoading"
    >
      <template #toolbar>
        <div class="p-4 font-medium text-[16px] bg-[#ffffff] rounded">
          <span>未验收数：</span>
          <span>{{ unAcceptList?.length }}</span>
        </div>
      </template>
    </vxe-grid>
    <vxe-grid
      v-bind="gridOptionsAccept"
      :data="acceptList"
      :loading="tableLoading"
      class="inline-block w-[80%]"
    >
      <template #toolbar>
        <div class="flex justify-between items-center bg-[#ffffff] p-2">
          <div class="font-medium text-[16px] bg-[#ffffff] rounded">
            <span>已验收数：</span>
            <span>{{ sampleBatchData.verifyedList?.length }}</span>
          </div>
          <div class="text-[16px] bg-[#ffffff] rounded">
            <a-button @click="handleNonconformityRegister" class="mr-2"> 不合格登记 </a-button>
            <a-button type="primary" @click="handleCompleteVerify">完成验收</a-button>
          </div>
        </div>
      </template>
      <template #action="{ row }">
        <TableAction outside :actions="createActions(row)" />
      </template>
    </vxe-grid>

    <NonconformityModal @register="registerNonconformityModal" @success="handleNRSuccess" />
    <RevokeVerifySampleModal
      @register="registerRevokeVerifySampleModal"
      @success="handleNRSuccess"
    />
    <StationMissingNumberDrawer @register="registerMissingDrawer" />
    <PlasmaVerifyNonconformityDrawer @register="registerPlasmaVerifyDrawer" />
  </PageWrapper>
</template>

<script setup lang="tsx">
  import { onMounted, reactive, ref, computed, unref } from 'vue';
  import { debounce, isEmpty } from 'lodash-es';
  import { ActionItem, TableAction } from '@/components/Table';

  import PageWrapper from '@/components/Page/src/PageWrapper.vue';
  import Description from '@/components/Description/src/Description.vue';
  import { DescItem, useDescription } from '@/components/Description';
  import { useDrawer } from '@/components/Drawer';
  import { useModal } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';

  import SampleVerifyBatchDrawer from './SampleVerifyBatchDrawer.vue';
  import StationMissingNumberDrawer from '@/views/inbound-management/sample-verify/StationMissingNumberDrawer.vue';
  import PlasmaVerifyNonconformityDrawer from '@/views/inbound-management/sample-verify/PlasmaVerifyNonconformityDrawer.vue';
  import NonconformityModal from './NonconformityModal.vue';
  import RevokeVerifySampleModal from './RevokeVerifySampleModal.vue';

  import { getSampleDictionary } from '@/api/inbound-management/sample-receive';
  import {
    GetApiCoreBatchSampleVerifyBatchSampleNoResponse,
    GetApiCoreBatchSampleVerifyNonConformanceBatchSampleNoResponse,
  } from '@/api/type/batchManage';
  import {
    nonconformityReasonEnum,
    sampleDictionary,
    sampleTypeEnum,
    sampleVerifyResultMap,
    sampleVerifyResultValueEnum,
    sampleVerifyStatusValueEnum,
  } from '@/enums/sampleEnum';
  import {
    confirmNonconformity,
    createAcceptanceForm,
    getSampleVerifyDetail,
    getVerifyNonconformity,
    receiveSample,
  } from '@/api/inbound-management/sample-verify';
  import { VxeGridProps } from 'vxe-table';
  import { GetApiCoreBankStockRequest } from '@/api/type/plasmaStoreManage';
  import dayjs from 'dayjs';

  const sampleBatchData = ref<GetApiCoreBatchSampleVerifyBatchSampleNoResponse>({});
  const verifyNonconformityData =
    ref<GetApiCoreBatchSampleVerifyNonConformanceBatchSampleNoResponse>([]);
  const sampleVerifyNo = ref(null);

  const inputValue = ref('');
  const sampleTypeDictionary = ref<Recordable[] | undefined>([]);
  const sampleNonconformityDictionary = ref<Recordable[] | undefined>([]);

  const { createConfirm } = useMessage();

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

  const acceptList = computed(() => {
    if (isEmpty(unref(verifyNonconformityData)) && isEmpty(unref(sampleBatchData).verifyedList)) {
      return [];
    }

    return verifyNonconformityData.value
      ?.map((it) => ({
        ...it,
        unqualifiedReason: it.dictItemKey,
      }))
      .concat(sampleBatchData.value.verifyedList as any);
  });

  const schema: DescItem[] = [
    {
      field: 'batchSampleNo',
      label: '样本批号',
      render() {
        return (
          <div class="flex items-center justify-center gap-2 w-[300px] -mt-1">
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
      render(text) {
        return (
          <span onClick={handleLackCountClick} class="underline text-#2d5cf6 cursor-pointer">
            <span>{text}</span>
          </span>
        );
      },
      show(data) {
        return data.sampleType === sampleTypeEnum.PlasmaSample;
      },
    },
    {
      field: 'plasmaAcceptUnqualifiedCount',
      label: '血浆验收不合格数量',
      render(text) {
        return (
          <span
            onClick={handlePlasmaAcceptUnqualifiedCountClick}
            class="underline text-#2d5cf6 cursor-pointer"
          >
            {text}
          </span>
        );
      },
      show(data) {
        return data.sampleType === sampleTypeEnum.PlasmaSample;
      },
    },
  ];
  const [register] = useDescription({
    bordered: false,
    column: 3,
    contentStyle: {
      width: '80px',
    },
    title: '样本验收批次信息',
    schema: schema,
  });

  const [registerNonconformityModal, { openModal: openNonconformityModal }] = useModal();
  const [registerRevokeVerifySampleModal, { openModal: openRevokeVerifySampleModal }] = useModal();
  const [registerMissingDrawer, { openDrawer: openMissingDrawer }] = useDrawer();
  const [registerPlasmaVerifyDrawer, { openDrawer: openPlasmaVerifyDrawer }] = useDrawer();

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
        field: 'sampleNo',
        title: '样本编号',
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
        field: 'sampleNo',
        title: '样本编号',
        width: 200,
      },
      {
        field: 'verifier',
        title: '验收人',
      },
      {
        field: 'verifyAt',
        title: '验收时间',
        width: 200,
        formatter(params) {
          return params.cellValue ? dayjs(params.cellValue).format('YYYY-MM-DD HH:mm:ss') : '-';
        },
      },
      {
        field: 'qualified',
        title: '验收结果',
        formatter(params) {
          return sampleVerifyResultMap.get(
            params.cellValue as sampleVerifyResultValueEnum,
          ) as string;
        },
      },
      {
        field: 'unqualifiedReason',
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

  const verifyFlag = ref('');
  async function handleSelectSampleBatchSuccess(record: Recordable) {
    verifyFlag.value = record.verifyState;
    inputValue.value = record.batchSampleNo;
    await updateTableData();
  }

  const tableLoading = ref(false);
  async function updateTableData() {
    tableLoading.value = true;
    try {
      sampleBatchData.value = await getSampleVerifyDetail(inputValue.value);
      verifyNonconformityData.value = await getVerifyNonconformity(inputValue.value);
    } finally {
      tableLoading.value = false;
    }
  }

  function handleSampleBatchChange(e: ChangeEvent) {
    inputValue.value = e.target.value;
  }

  async function handlePressEnter() {
    sampleBatchData.value = await getSampleVerifyDetail(inputValue.value);
  }

  async function handleNonconformityRegister() {
    if (!sampleVerifyNo.value) {
      await getSampleVerifyNo(inputValue.value);
    }
    openNonconformityModal(true, {
      record: {
        options: sampleNonconformityDictionary.value,
        verifyNo: sampleVerifyNo.value,
        batchSampleNo: inputValue.value,
      },
    });
  }

  async function handleCompleteVerify() {
    await receiveSample({
      batchSampleNo: sampleBatchData.value.batchSampleNo!,
    });
    await updateTableData();
  }

  const createActions = (record: {
    sampleNo?: string;
    verifier?: string;
    verifyAt?: string;
    qualified?: number;
    unqualifiedReason?: string;
  }) => {
    const actions: ActionItem[] = [
      {
        label: '确认',
        onClick: () => {
          createConfirm({
            iconType: 'warning',
            title: '确认',
            content: `样本编号：${record.sampleNo}是否完成不符合确认？`,
            onOk: async () => {
              if (!sampleVerifyNo.value) {
                await getSampleVerifyNo(inputValue.value);
              }
              await confirmNonconformity({
                batchSampleNo: inputValue.value,
                sampleNo: record.sampleNo!,
                sampleVerifyNo: sampleVerifyNo.value!,
              });
              await updateTableData();
            },
          });
        },
        ifShow: () => {
          return (
            !record?.verifyAt &&
            verifyFlag.value !== sampleVerifyStatusValueEnum.S &&
            record?.unqualifiedReason === nonconformityReasonEnum.DonorNonConformance
          );
        },
      },
      {
        label: '撤销',
        onClick: async () => {
          openRevokeVerifySampleModal(true, {
            record: {
              sampleNo: record.sampleNo,
              batchSampleNo: inputValue.value,
            },
          });
        },
        ifShow: () =>
          verifyFlag.value !== sampleVerifyStatusValueEnum.S &&
          record?.qualified === sampleVerifyResultValueEnum.Unqualified &&
          record?.unqualifiedReason !== nonconformityReasonEnum.DonorNonConformance,
      },
    ];

    return actions;
  };

  function handleLackCountClick() {
    openMissingDrawer(true, {
      record: sampleBatchData.value.batchSampleNo,
    });
  }

  function handlePlasmaAcceptUnqualifiedCountClick() {
    openPlasmaVerifyDrawer(true, {
      record: sampleBatchData.value.batchSampleNo,
    });
  }

  async function getSampleVerifyNo(sampleNo: string) {
    sampleVerifyNo.value = await createAcceptanceForm({
      batchSampleNo: sampleNo,
    });
  }

  function handleNRSuccess() {
    updateTableData();
  }
</script>
