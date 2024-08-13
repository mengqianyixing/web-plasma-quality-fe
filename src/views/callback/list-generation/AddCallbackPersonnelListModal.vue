<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="getTitle"
    width="85%"
    :min-height="600"
    showFooter
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <BasicForm
        @register="registerForm"
        class="search-form"
        :submitButtonOptions="{ loading: tableLoading }"
      />

      <vxe-grid
        v-bind="gridOptions"
        ref="vxeRef"
        :loading="tableLoading"
        :data="tableData"
        :columns="columnsComputed"
      >
        <template #plasmaCount="{ row }">
          <span>
            {{ row?.plasmaCount }}
          </span>
        </template>
      </vxe-grid>

      <a-pagination
        class="float-right mt-2"
        @change="handlePageChange"
        @show-size-change="handleSizeChange"
        size="small"
        show-size-changer
        show-quick-jumper
        v-model:current="pager.currPage"
        v-model:pageSize="pager.pageSize"
        :total="pager.total"
        :show-total="(total) => `共 ${total} 条数据`"
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
  import { Pagination as APagination } from 'ant-design-vue';

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
    baseColProps: { flex: '0 0 370px' },
    actionColOptions: { flex: '1 1 150px', style: 'max-width:unset;' },
    schemas: addCallbackModalSearchFromSchema,
    transformDateFunc(date) {
      return dayjs(date).format('YYYY-MM-DD');
    },
    submitFunc,
    submitOnReset: true,
  });

  const gridOptions = reactive<VxeGridProps<any>>({
    border: true,
    rowConfig: {
      isHover: true,
    },
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
    pageSize: 100,
    currPage: 1,
    total: 0,
  });
  async function initTableData() {
    try {
      tableLoading.value = true;

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
      if (tableData.value!.length === 0)
        createMessage.warn(`共${originRes.totalCount}位浆员待回访`);
      tableData.value = originRes.result!;
      pager.total = originRes.totalCount!;

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
            !current.isAfter(dayjs().subtract(1, 'year')) ||
            current.isAfter(dayjs().subtract(gapDays.value, 'day'))
          );
        },
      },
    });

    !isShowTrackType.value && (await removeSchemaByField('trackType'));
  }

  async function submitFunc() {
    vxeRef.value?.clearScroll();

    await initTableData();
  }

  async function handleOk() {
    if (!vxeRef.value?.getCheckboxRecords().length) {
      createMessage.warn('请选择要添加的名单');

      return;
    }

    createConfirm({
      title: '确认',
      content: `已选择${vxeRef.value?.getCheckboxRecords().length}位浆员待回访，确认添加吗？`,
      iconType: 'warning',
      onOk: async () => {
        await generateCallback({
          batchNo: batchNo.value,
          donorNos: vxeRef.value!.getCheckboxRecords().map((it) => it?.donorNo)!,
        });

        createMessage.warn(
          `名单添加成功，剩余${
            pager.total - Number(vxeRef.value?.getCheckboxRecords().length)
          }位浆员`,
        );

        pager.currPage = 1;
        await initTableData();
      },
    });
  }

  function handleCancel() {
    emit('success');
    pager.currPage = 1;
    tableData.value = [];
    closeModal();
  }

  async function handlePageChange(e) {
    pager.currPage = e;

    await initTableData();
  }

  async function handleSizeChange(_, size) {
    pager.pageSize = size;

    await initTableData();
  }
</script>
<style scoped>
  ::v-deep(.ant-form-item-control-input-content button) {
    margin-right: 8px;
    margin-left: 4px;
    float: right;
  }
</style>
