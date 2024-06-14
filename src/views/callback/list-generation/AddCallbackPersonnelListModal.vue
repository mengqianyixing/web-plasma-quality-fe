<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="getTitle"
    width="85%"
    :min-height="680"
    showFooter
    @ok="handleOk"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <BasicForm @register="registerForm" :submitButtonOptions="{ loading: tableLoading }" />

      <vxe-grid
        v-bind="gridOptions"
        ref="vxeRef"
        :loading="tableLoading"
        :data="tableData"
        :columns="columnsComputed"
      />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { computed, nextTick, reactive, ref, unref } from 'vue';
  import { useMessage } from '@/hooks/web/useMessage';

  import {
    callbackModalColumns,
    addCallbackModalSearchFromSchema,
  } from '@/views/callback/list-generation/generation.data';
  import { generateCallback, getNeedCallbackList } from '@/api/callback/list-generation';
  import dayjs, { Dayjs } from 'dayjs';
  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
  import { VxeGridProps, VxeTableInstance } from 'vxe-table';
  import {
    GetApiCoreDonorCallbackNeedRequest,
    GetApiCoreDonorCallbackNeedResponse,
  } from '@/api/type/callbackManage';

  const globalApiStore = useGlobalApiStoreWithOut();
  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(false);
  const stationNo = ref('');
  const tableData = ref<GetApiCoreDonorCallbackNeedResponse>([]);
  const vxeRef = ref<VxeTableInstance<GetApiCoreDonorCallbackNeedResponse[number]>>();
  const gapDays = ref(0);

  const isShowTrackType = ref(false);

  const columnsComputed = computed(() =>
    isShowTrackType.value
      ? callbackModalColumns
      : callbackModalColumns.filter((it) => it.field !== 'trackType'),
  );

  const [registerForm, { updateSchema, getFieldsValue, removeSchemaByField }] = useForm({
    showAdvancedButton: false,
    schemas: addCallbackModalSearchFromSchema,
    transformDateFunc(date) {
      return dayjs(date).format('YYYY-MM-DD');
    },
    submitFunc,
    submitOnReset: true,
  });

  const gridOptions = reactive<VxeGridProps<any>>({
    border: true,
    showOverflow: true,
    height: 600,
    align: 'center',
    size: 'small',
    exportConfig: {},
    columnConfig: {
      resizable: true,
    },
    scrollY: {
      enabled: true,
    },
    checkboxConfig: {
      highlight: true,
      trigger: 'row',
      range: true,
    },
    toolbarConfig: {
      refresh: false,
      loading: false,
      export: false,
      custom: false,
    },
    showFooter: true,
  });

  const getTitle = computed(() => (unref(isUpdate) ? '编辑名单' : '选择名单'));

  const batchNo = ref('');
  const [register, { closeModal, setModalProps }] = useModalInner(async (data) => {
    setModalProps({
      maskClosable: false,
    });

    isUpdate.value = data.isUpdate;
    stationNo.value = data.record.stationNo;
    batchNo.value = data.record.batchNo;
    isShowTrackType.value = data.record.isShowTrackType;

    gapDays.value = (await globalApiStore.getSysParamsValue('callbackGapDays')) as number;

    await updateSchemaFunc();

    await initTableData();
  });

  const { createConfirm, createMessage } = useMessage();

  const tableLoading = ref(false);
  async function initTableData() {
    try {
      tableLoading.value = true;
      const values = getFieldsValue();
      if (!values.minCollectTime) {
        await updateSchemaFunc();
      }
      tableData.value = await getNeedCallbackList({
        ...getFieldsValue(),
        stationNo: stationNo.value,
        batchNo: batchNo.value,
      } as GetApiCoreDonorCallbackNeedRequest);

      await nextTick(() => {
        vxeRef.value?.setAllCheckboxRow(true);
      });
    } finally {
      tableLoading.value = false;
    }
  }

  async function updateSchemaFunc() {
    await updateSchema({
      field: '[minCollectTime, maxCollectTime]',
      defaultValue: [
        dayjs().subtract(1, 'year').add(1, 'day').format('YYYY-MM-DD'),
        dayjs().subtract(gapDays.value, 'day').format('YYYY-MM-DD'),
      ],
      componentProps: {
        disabledDate: (current: Dayjs) => {
          return (
            !current.isAfter(dayjs().subtract(1, 'year').add(1, 'day')) ||
            current.isAfter(dayjs().subtract(gapDays.value, 'day'))
          );
        },
      },
    });

    !isShowTrackType.value && (await removeSchemaByField('trackType'));
  }

  async function submitFunc() {
    await initTableData();
  }

  async function handleOk() {
    if (!vxeRef.value?.getCheckboxRecords().length) {
      createMessage.warn('请选择要添加的名单');

      return;
    }

    createConfirm({
      title: '确认',
      content: `名单共有${vxeRef.value?.getCheckboxRecords().length}位浆员待回访，确认添加吗？`,
      iconType: 'warning',
      onOk: async () => {
        await generateCallback({
          batchNo: batchNo.value,
          donorNos: vxeRef.value!.getCheckboxRecords().map((it) => it?.donorNo)!,
        });

        emit('success');
        closeModal();
      },
    });
  }
</script>
