<template>
  <PageWrapper>
    <Description @register="register" :data="sampleBatchData" />

    <SampleVerifyBatchModal
      @register="registerSampleVerifyBatchModal"
      @success="handleSelectSampleBatchSuccess"
    />

    <vxe-grid
      v-bind="gridOptionsUnaccept"
      :data="unAcceptList"
      class="inline-block w-1/5 pr-2 mt-1"
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
    <StationMissingNumberModal @register="registerMissingModal" />
    <PlasmaVerifyNonconformityModal @register="registerPlasmaVerifyModal" />
  </PageWrapper>
</template>

<script setup lang="tsx">
  import { reactive, ref, computed, unref } from 'vue';
  import { isEmpty } from 'lodash-es';
  import { ActionItem, TableAction } from '@/components/Table';

  import PageWrapper from '@/components/Page/src/PageWrapper.vue';
  import Description from '@/components/Description/src/Description.vue';
  import { DescItem, useDescription } from '@/components/Description';
  import { useModal } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';

  import SampleVerifyBatchModal from './SampleVerifyBatchModal.vue';
  import StationMissingNumberModal from '@/views/inbound-management/sample-verify/StationMissingNumberModal.vue';
  import PlasmaVerifyNonconformityModal from '@/views/inbound-management/sample-verify/PlasmaVerifyNonconformityModal.vue';
  import NonconformityModal from './NonconformityModal.vue';
  import RevokeVerifySampleModal from './RevokeVerifySampleModal.vue';
  import {
    GetApiCoreBatchSampleVerifyBatchSampleNoResponse,
    GetApiCoreBatchSampleVerifyNonConformanceBatchSampleNoResponse,
  } from '@/api/type/batchManage';
  import {
    nonconformityReasonEnum,
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
  import { SERVER_ENUM } from '@/enums/serverEnum';
  import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

  defineOptions({ name: 'SampleVerify' });

  const serverEnumStore = useServerEnumStoreWithOut();
  const SampleType = serverEnumStore.getServerEnumText(SERVER_ENUM.SampleType);

  const sampleBatchData = ref<GetApiCoreBatchSampleVerifyBatchSampleNoResponse>({});
  const verifyNonconformityData =
    ref<GetApiCoreBatchSampleVerifyNonConformanceBatchSampleNoResponse>([]);
  const sampleVerifyNo = ref(null);

  const inputValue = ref('');

  const { createConfirm, createMessage } = useMessage();

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
            <a-input-search
              readonly
              placeholder="请选择批号或输入批号回车"
              enter-button="选择"
              value={inputValue}
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
      field: 'acceptAt',
      label: '接收日期',
      render(text) {
        return text ? dayjs(text).format('YYYY-MM-DD') : '';
      },
    },
    {
      field: 'sampleType',
      label: '样本类型',
      render(text) {
        return <span>{SampleType(text)}</span>;
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
      label: '缺号数量',
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
  const [registerMissingModal, { openModal: openMissingModal }] = useModal();
  const [registerPlasmaVerifyModal, { openModal: openPlasmaVerifyModal }] = useModal();

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

  const [registerSampleVerifyBatchModal, { openModal: openSampleVerifyBatchModal }] = useModal();

  function handleSelectSampleBatch(value: string, event: MouseEvent) {
    if (value && event.type !== 'click') {
      handlePressEnter();
    } else {
      openSampleVerifyBatchModal(true, {
        reload: true,
        record: {
          sampleType: serverEnumStore.getServerEnum(SERVER_ENUM.SampleType),
        },
      });
    }
  }

  const verifyFlag = ref('');
  async function handleSelectSampleBatchSuccess(record: Recordable) {
    sampleVerifyNo.value = null;

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

  async function handlePressEnter() {
    sampleBatchData.value = await getSampleVerifyDetail(inputValue.value);
  }

  async function handleNonconformityRegister() {
    if (!sampleVerifyNo.value && inputValue.value) {
      await getSampleVerifyNo(inputValue.value);
    }
    openNonconformityModal(true, {
      record: {
        verifyNo: sampleVerifyNo.value,
        batchSampleNo: inputValue.value,
      },
    });
  }

  async function handleCompleteVerify() {
    if (isEmpty(unref(sampleBatchData))) {
      createMessage.warn('请选择样本批号');
      return;
    }

    createConfirm({
      title: '提示',
      content: `样本批号：${sampleBatchData.value.batchSampleNo}是否完成验收？`,
      iconType: 'warning',
      onOk: async () => {
        await receiveSample({
          batchSampleNo: sampleBatchData.value.batchSampleNo!,
        });
        await updateTableData();
      },
    });
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
    openMissingModal(true, {
      record: sampleBatchData.value.batchSampleNo,
    });
  }

  function handlePlasmaAcceptUnqualifiedCountClick() {
    openPlasmaVerifyModal(true, {
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
