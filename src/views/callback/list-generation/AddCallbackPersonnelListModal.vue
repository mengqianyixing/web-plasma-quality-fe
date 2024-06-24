<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="getTitle"
    width="85%"
    :min-height="680"
    showFooter
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <BasicForm @register="registerForm" :submitButtonOptions="{ loading: tableLoading }" />

      <vxe-grid
        v-bind="gridOptions"
        ref="vxeRef"
        :loading="tableLoading"
        :data="tableData"
        :columns="columnsComputed"
        @scroll="tableScroll"
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
  const tableData = ref<GetApiCoreDonorCallbackNeedResponse['result']>([]);
  const vxeRef =
    ref<VxeTableInstance<NonNullable<GetApiCoreDonorCallbackNeedResponse['result']>[number]>>();
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
      destroyOnClose: true,
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
  const pager = reactive({
    pageSize: 30,
    currPage: 1,
    totalPage: 0,
  });
  async function initTableData(flag?: Boolean) {
    try {
      tableLoading.value = true;
      if (flag) {
        pager.currPage = 1;
        tableData.value = [];
      }

      const values = getFieldsValue();
      if (!values.minCollectTime) {
        await updateSchemaFunc();
      }
      const originRes = await getNeedCallbackList({
        ...getFieldsValue(),
        stationNo: stationNo.value,
        batchNo: batchNo.value,
        pageSize: pager.pageSize,
        currPage: pager.currPage,
      } as unknown as GetApiCoreDonorCallbackNeedRequest);
      tableData.value = tableData.value!.concat(originRes.result as any);
      pager.totalPage = Number(originRes.totalPage);

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
    vxeRef.value?.clearScroll();
    setTimeout(async () => {
      await initTableData(true);
    }, 0);
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

  function tableScroll(e) {
    const { scrollHeight, clientHeight } = e.$event.srcElement;

    if (clientHeight + e.scrollTop + 1 >= scrollHeight) {
      pager.currPage++;

      if (pager.currPage > pager.totalPage) {
        return;
      }

      initTableData();
    }
  }

  function handleCancel() {
    pager.currPage = 1;
    tableData.value = [];
    closeModal();
  }
</script>
