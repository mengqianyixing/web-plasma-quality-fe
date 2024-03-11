<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
    :showOkBtn="false"
    :showCancelBtn="false"
    @cancel="handleClose"
    width="1200px"
  >
    <div>
      <BasicForm @register="registerForm" />
      <div class="flex justify-end">
        <a-button type="primary" @click="handleSave" :loading="btnLoading" :disabled="isPreview">
          保存申请单
        </a-button>
      </div>
      <a-tabs default-active-key="detail" v-model:activeKey="currentKey">
        <a-tab-pane key="batch" tab="血浆批号">
          <BasicTable @register="registerBatchTable" />
        </a-tab-pane>
        <a-tab-pane key="box" tab="血浆箱号">
          <BasicTable @register="registerBoxTable" />
        </a-tab-pane>
        <a-tab-pane key="detail" tab="血浆明细">
          <BasicTable @register="registerDetailTable">
            <template #toolbar>
              <a-button type="primary" @click="handlePickPlasma" :disabled="isPreview">
                挑选血浆
              </a-button>
              <a-button type="primary" @click="handleDelete" :disabled="isPreview"> 移除 </a-button>
            </template>
          </BasicTable>
        </a-tab-pane>
      </a-tabs>
    </div>

    <PickPlasmaModal @register="registerPickModal" @success="handleSuccess" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { computed, ref, unref, watch } from 'vue';
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';
  import { BasicTable, useTable } from '@/components/Table';
  import { BasicForm, useForm } from '@/components/Form';
  import { plasmaBatchColumns, plasmaBoxColumns, plasmaDetailColumns } from './non.data';
  import { Tabs, TabPane } from 'ant-design-vue';
  import dayjs from 'dayjs';
  import {
    createCoreBankDeliver,
    deletePickPlasma,
    getDeliverNonProductiveDetailBatch,
    getDeliverNonProductiveDetailBox,
    getDeliverNonProductivePlasma,
    updateCoreBankDeliver,
  } from '@/api/stockout/non-productin-put-into';

  import PickPlasmaModal from './pickPlasmaModal.vue';
  import {
    PostApiCoreBankDeliverNonproductiveRequest,
    PutApiCoreBankDeliverNonproductiveRequest,
  } from '@/api/type/stockoutManage';

  const ATabs = Tabs;
  const ATabPane = TabPane;
  defineOptions({ name: 'OperateModal' });
  const { createMessage, createConfirm } = useMessage();

  const selectedRow = ref<Recordable>([]);

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(false);
  const isPreview = ref(false);

  const [registerPickModal, { openModal: openPickModal }] = useModal();

  const [registerForm, { resetFields, validate, setFieldsValue, getFieldsValue, updateSchema }] =
    useForm({
      labelWidth: 120,
      baseColProps: { span: 48 },
      schemas: [
        {
          field: 'dlvNo',
          label: '申请单号',
          component: 'Input',
          required: true,
        },
        {
          field: 'applicationDate',
          label: '申请日期',
          component: 'Input',
          defaultValue: dayjs().format('YYYY-MM-DD'),
          componentProps: {
            disabled: true,
          },
          required: true,
        },
        {
          field: 'applicant',
          label: '转移申请人',
          component: 'Input',
          required: true,
        },
        {
          field: 'transferDepartment',
          label: '转移部门',
          component: 'Input',
          required: true,
        },
        {
          field: 'reason',
          label: '转移原因',
          component: 'Input',
          required: true,
        },
      ],
      showActionButtonGroup: false,
    });

  const currentKey = ref('detail');
  watch(
    () => currentKey.value,
    (val) => {
      if (!getFieldsValue().dlvNo) return;

      if (val === 'batch') {
        setTimeout(() => {
          reloadBatchTable();
        }, 0);
      } else if (val === 'box') {
        setTimeout(() => {
          reloadBoxTable();
        }, 0);
      } else {
        setTimeout(() => {
          reloadDetailTable();
        }, 0);
      }
    },
  );

  const [registerBatchTable, { reload: reloadBatchTable, setTableData: setBatchTableData }] =
    useTable({
      api: getDeliverNonProductiveDetailBatch,
      beforeFetch(params) {
        return {
          ...params,
          dlvNo: getFieldsValue().dlvNo,
        };
      },
      pagination: false,
      columns: plasmaBatchColumns,
      fetchSetting: {
        pageField: 'currPage',
        sizeField: 'pageSize',
        totalField: 'totalCount',
        listField: 'result',
      },
      size: 'small',
      striped: false,
      useSearchForm: false,
      showTableSetting: false,
      bordered: true,
      showIndexColumn: false,
      canResize: true,
      immediate: false,
    });

  const [registerBoxTable, { reload: reloadBoxTable, setTableData: setBoxTableData }] = useTable({
    api: getDeliverNonProductiveDetailBox,
    beforeFetch(params) {
      return {
        ...params,
        dlvNo: getFieldsValue().dlvNo,
      };
    },
    pagination: false,
    columns: plasmaBoxColumns,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    size: 'small',
    striped: false,
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    canResize: true,
    immediate: false,
  });

  const [registerDetailTable, { reload: reloadDetailTable, setTableData: setDetailTableData }] =
    useTable({
      api: getDeliverNonProductivePlasma,
      beforeFetch(params) {
        return {
          ...params,
          dlvNo: getFieldsValue().dlvNo,
        };
      },
      pagination: false,
      columns: plasmaDetailColumns,
      fetchSetting: {
        pageField: 'currPage',
        sizeField: 'pageSize',
        totalField: 'totalCount',
        listField: 'result',
      },
      clickToRowSelect: true,
      rowSelection: {
        type: 'radio',
        onChange: (_, selectedRows: any) => {
          selectedRow.value = selectedRows;
        },
      },
      size: 'small',
      striped: false,
      useSearchForm: false,
      showTableSetting: false,
      bordered: true,
      showIndexColumn: false,
      canResize: true,
      immediate: false,
    });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });

    isUpdate.value = !!data.isUpdate;
    isPreview.value = !!data.isPreview;

    await updateSchema([
      {
        field: 'dlvNo',
        componentProps: {
          disabled: !!data.isUpdate || !!data.isPreview,
        },
      },
      {
        field: 'applicant',
        componentProps: {
          disabled: !!data.isPreview,
        },
      },
      {
        field: 'transferDepartment',
        componentProps: {
          disabled: !!data.isPreview,
        },
      },
      {
        field: 'reason',
        componentProps: {
          disabled: !!data.isPreview,
        },
      },
    ]);

    if (unref(isPreview)) {
      await setFieldsValue({
        ...data.record,
      });

      await reloadDetailTable();

      return;
    }

    if (unref(isUpdate)) {
      await setFieldsValue({
        ...data.record,
      });

      await reloadDetailTable();
    } else {
      setBoxTableData([]);
      setBatchTableData([]);
      setDetailTableData([]);
    }
  });

  const getTitle = computed(() => (unref(isUpdate) ? '编辑' : unref(isPreview) ? '查看' : '新增'));

  async function handleSubmit() {
    emit('success');
    closeModal();
  }

  async function handleSuccess() {
    await reloadDetailTable();
  }

  const btnLoading = ref(false);
  async function handleSave() {
    try {
      const values: PutApiCoreBankDeliverNonproductiveRequest &
        PostApiCoreBankDeliverNonproductiveRequest = await validate();

      btnLoading.value = true;
      if (unref(isUpdate)) {
        await updateCoreBankDeliver(values);
        createMessage.success('更新申请单成功。');
      } else {
        await createCoreBankDeliver(values);
        createMessage.success('创建申请单成功。');
      }

      setModalProps({ confirmLoading: true });
    } finally {
      btnLoading.value = false;
      setModalProps({ confirmLoading: false });
    }
  }

  async function handlePickPlasma() {
    if (!getFieldsValue().dlvNo) {
      createMessage.warning('请先保存申请单号');
      return;
    }

    const values = await validate();

    openPickModal(true, {
      dlvNo: values.dlvNo,
    });
  }

  function handleClose() {
    resetFields();
    currentKey.value = 'detail';
    emit('success');
  }

  async function handleDelete() {
    if (selectedRow.value.length === 0) {
      createMessage.warning('请先选择一条数据');
      return;
    }

    createConfirm({
      title: '确认',
      content: '确认移除吗？',
      iconType: 'warning',
      onOk: async () => {
        await deletePickPlasma(selectedRow.value[0]?.bagNo);

        await reloadDetailTable();
      },
    });
  }
</script>
