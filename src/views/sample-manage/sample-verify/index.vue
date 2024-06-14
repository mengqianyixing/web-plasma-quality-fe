<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <div class="flex flex-col h-full p-16px pb-4px">
      <Description @register="register" :data="sampleBatchData" />
      <div class="flex-1 pt-5px">
        <div class="inline-block w-1/5 h-full pr-2">
          <div class="font-medium text-[16px] bg-[#ffffff] rounded h-48px p-2 flex items-center">
            <span>未验收数：</span>
            <span>{{ unAcceptList?.length }}</span>
          </div>
          <div style="height: calc(100% - 60px)">
            <vxe-grid v-bind="gridOptionsUnaccept" :data="unAcceptList" :loading="tableLoading" />
          </div>
        </div>
        <div class="inline-block w-[80%] h-full">
          <div class="flex justify-between items-center h-48px bg-[#ffffff] p-2">
            <div class="font-medium text-[16px] bg-[#ffffff] rounded">
              <span>已验收数：</span>
              <span>{{ sampleBatchData.verifyedList?.length }}</span>
            </div>
            <div class="text-[16px] bg-[#ffffff] rounded">
              <a-button @click="handleNonconformityRegister" class="mr-2"> 不合格登记 </a-button>
              <a-button type="primary" @click="handleCompleteVerify" class="mr-2">
                完成验收
              </a-button>
              <a-button
                v-if="!isReceiveByBag"
                type="primary"
                @click="handleCancelVerify"
                class="mr-2"
                :disabled="!inputValue"
              >
                撤销验收
              </a-button>
              <a-button
                type="primary"
                @click="openArrangeModel(true, { batchNo: inputValue })"
                :disabled="!sampleBatchData.verifyedList?.length"
              >
                查看试管架
              </a-button>
            </div>
          </div>
          <div style="height: calc(100% - 60px)">
            <vxe-grid v-bind="gridOptionsAccept" :data="acceptList" :loading="tableLoading">
              <template #action="{ row }">
                <TableAction outside :actions="createActions(row)" />
              </template>
            </vxe-grid>
          </div>
        </div>
      </div>
    </div>
    <SampleVerifyBatchModal
      @register="registerSampleVerifyBatchModal"
      @success="handleSelectSampleBatchSuccess"
    />
    <NonconformityModal @register="registerNonconformityModal" @success="handleNRSuccess" />
    <RevokeVerifySampleModal
      @register="registerRevokeVerifySampleModal"
      @success="handleNRSuccess"
    />
    <StationMissingNumberModal @register="registerMissingModal" />
    <PlasmaVerifyNonconformityModal @register="registerPlasmaVerifyModal" />
    <ArrangeModel @register="registerArrangeModel" />
    <CancelVerifyModal @register="registerCancelVerifyModal" @success="handleNRSuccess" />
  </PageWrapper>
</template>

<script setup lang="tsx">
  import { reactive, ref, computed, unref, shallowRef } from 'vue';
  import { isEmpty } from 'lodash-es';
  import { ActionItem, TableAction } from '@/components/Table';

  import PageWrapper from '@/components/Page/src/PageWrapper.vue';
  import Description from '@/components/Description/src/Description.vue';
  import { DescItem, useDescription } from '@/components/Description';
  import { useModal } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';

  import SampleVerifyBatchModal from './SampleVerifyBatchModal.vue';
  import StationMissingNumberModal from '@/views/sample-manage/sample-verify/StationMissingNumberModal.vue';
  import PlasmaVerifyNonconformityModal from '@/views/sample-manage/sample-verify/PlasmaVerifyNonconformityModal.vue';
  import NonconformityModal from './NonconformityModal.vue';
  import RevokeVerifySampleModal from './RevokeVerifySampleModal.vue';
  import CancelVerifyModal from './CancelVerifyModal.vue';

  import {
    GetApiCoreBatchSampleVerifyBatchSampleNoResponse,
    GetApiCoreBatchSampleVerifyNonConformanceBatchSampleNoResponse,
  } from '@/api/type/batchManage';
  import {
    nonconformityReasonEnum,
    sampleReceiveModalEnum,
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
  import dayjs from 'dayjs';
  import { SERVER_ENUM } from '@/enums/serverEnum';
  import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
  import ArrangeModel from '@/views/inbound-management/components/arrange/index.vue';
  import { getSysParamsByParamKey } from '@/api/systemServer/params';
  import { SysParamsEnum } from '@/enums/sysParamsEnum';

  defineOptions({ name: 'SampleVerify' });

  const serverEnumStore = useServerEnumStoreWithOut();
  const SampleType = serverEnumStore.getServerEnumText(SERVER_ENUM.SampleType);

  const receiveModal = shallowRef<sampleReceiveModalEnum>();
  const isReceiveByBag = computed(() => receiveModal.value === sampleReceiveModalEnum.BAG);
  getSysParamsByParamKey(SysParamsEnum.BatchSampleVerifyPattern).then((res) => {
    receiveModal.value = res;
  });

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
              placeholder="请点击选择"
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
  const [registerArrangeModel, { openModal: openArrangeModel }] = useModal();
  const [registerCancelVerifyModal, { openModal: openCancelVerifyModal }] = useModal();

  const gridOptionsUnaccept = reactive<VxeGridProps<any>>({
    border: true,
    height: '100%',
    showOverflow: true,
    exportConfig: {},
    columnConfig: {
      resizable: true,
    },

    pagerConfig: {
      enabled: false,
    },
    formConfig: {
      enabled: false,
    },

    columns: [
      {
        field: 'sampleNo',
        title: '样本编号',
      },
    ],
    showFooter: false,
  });

  const gridOptionsAccept = reactive<VxeGridProps<any>>({
    border: true,
    height: '100%',
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
    donorBlock?: boolean;
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
          record?.donorBlock === false,
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

  async function handleCancelVerify() {
    openCancelVerifyModal(true, {
      record: {
        batchNo: inputValue.value,
      },
    });
  }
</script>
