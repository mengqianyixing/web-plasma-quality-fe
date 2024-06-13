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
          <span>未接收袋数：</span>
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
            <span>已接收袋数：</span>
            <span>{{ acceptList?.length }}</span>
          </div>
          <div>
            <a-button type="primary" @click="handleAcceptSample" v-if="!isReceiveByBag">
              接收
            </a-button>
          </div>
        </div>
      </template>
    </vxe-grid>
  </PageWrapper>
</template>

<script setup lang="tsx">
  import { computed, nextTick, reactive, ref, shallowRef, watch } from 'vue';

  import PageWrapper from '@/components/Page/src/PageWrapper.vue';
  import Description from '@/components/Description/src/Description.vue';
  import { DescItem, useDescription } from '@/components/Description';
  import { useModal } from '@/components/Modal';

  import SelectSampleBatchModal from '../__components/SelectSampleBatchModal.vue';
  import {
    receiveSample,
    getSampleReceiveDetail,
    receiveSampleByBag,
  } from '@/api/inbound-management/sample-receive';
  import { GetApiCoreBatchSampleAcceptBatchSampleNoResponse } from '@/api/type/batchManage';
  import { useMessage } from '@/hooks/web/useMessage';
  import dayjs from 'dayjs';
  import { VxeGridProps } from 'vxe-table';
  import { GetApiCoreBankStockRequest } from '@/api/type/plasmaStoreManage';
  import { SERVER_ENUM } from '@/enums/serverEnum';
  import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
  import { sampleReceiveModalEnum, sampleReceiveStatusValueEnum } from '@/enums/sampleEnum';
  import { getSysParamsByParamKey } from '@/api/systemServer/params';
  import { SysParamsEnum } from '@/enums/sysParamsEnum';
  import { useScanHelper } from '@/hooks/common/useScanHelper';
  import { debounce } from 'lodash-es';

  const { barCode, enterFlag, startEvent } = useScanHelper();

  const { createMessage } = useMessage();

  defineOptions({ name: 'SampleAccept' });

  const serverEnumStore = useServerEnumStoreWithOut();
  const SampleType = serverEnumStore.getServerEnumText(SERVER_ENUM.SampleType);

  const sampleBatchData = ref<GetApiCoreBatchSampleAcceptBatchSampleNoResponse | {}>({});
  const inputValue = ref('');
  const tableLoading = ref(false);
  const bagRef = ref(null);

  const { createConfirm } = useMessage();

  getSysParamsByParamKey(SysParamsEnum.BatchSampleAcceptPattern).then((res) => {
    receiveModal.value = res;
    if (isReceiveByBag.value) startEvent();
  });
  const receiveModal = shallowRef<sampleReceiveModalEnum>();
  const isReceiveByBag = computed(() => receiveModal.value === sampleReceiveModalEnum.BAG);

  const schema: DescItem[] = [
    {
      field: 'bagNo',
      label: '样本袋号',
      contentMinWidth: 100,
      render() {
        return (
          <div
            class="flex items-center justify-center gap-2 w-[300px] max-w-full	 -mt-1"
            ref="bagRef"
          >
            <a-input
              ref={(el) => (bagRef.value = el)}
              placeholder="扫描袋号条码"
              enter-button="接收"
              value={bagValue}
              onChange={(e) => (bagValue.value = e.target.value)}
              onPressEnter={_handleReceiveByBag}
            />
          </div>
        );
      },
      show() {
        return isReceiveByBag.value;
      },
    },
    {
      field: 'batchSampleNo',
      label: '样本批号',
      contentMinWidth: 100,
      render() {
        return (
          <div class="flex items-center justify-center gap-2 w-[300px] max-w-full	 -mt-1">
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
      field: 'outWarehouseDate',
      label: '出库日期',
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
          sampleType: serverEnumStore.getServerEnum(SERVER_ENUM.SampleType),
        },
      });
    }
  }

  const unAcceptList = computed(
    () =>
      (sampleBatchData.value as GetApiCoreBatchSampleAcceptBatchSampleNoResponse)?.unAcceptList ??
      [],
  );
  const acceptList = computed(
    () =>
      (sampleBatchData.value as GetApiCoreBatchSampleAcceptBatchSampleNoResponse)?.acceptedList ??
      [],
  );
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
    tableLoading.value = true;
    sampleBatchData.value = await getSampleReceiveDetail(record.batchSampleNo);
    inputValue.value = record.batchSampleNo;
    tableLoading.value = false;
    await nextTick(() => {
      if (!bagRef.value) return;
      (bagRef.value as HTMLInputElement)?.focus();
    });
  }

  async function handlePressEnter() {
    tableLoading.value = true;
    sampleBatchData.value = await getSampleReceiveDetail(inputValue.value);
    tableLoading.value = false;
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

  const bagValue = ref('');
  watch(
    () => [barCode.value, enterFlag.value],
    (val) => {
      if (val[0] && val[1]) {
        bagValue.value = barCode.value;
        _handleReceiveByBag();
      }
    },
  );

  const _handleReceiveByBag = debounce(handleReceiveByBag, 300);

  const bsaNo = ref<undefined | string>(undefined);
  async function handleReceiveByBag() {
    try {
      const receiveData = await receiveSampleByBag({
        packNo: bagValue.value,
        bsaNo: bsaNo.value!,
      });
      inputValue.value = receiveData.batchSampleNo!;
      bsaNo.value = receiveData.bsaNo!;
      await handlePressEnter();

      if (receiveData.acceptState === sampleReceiveStatusValueEnum.S) {
        bsaNo.value = undefined;
        bagValue.value = '';
        inputValue.value = '';
        sampleBatchData.value = {};
        createMessage.success('该批次接收完成');
      }
    } finally {
      bagValue.value = '';
      barCode.value = '';
      enterFlag.value = false;
    }
  }
</script>
