<template>
  <PageWrapper dense contentFullHeight fixedHeight class="p-16px">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate" :disabled="!props.bsNo">新增</a-button>
        <a-button type="primary" @click="handleDelete" :disabled="!props.bsNo">撤销</a-button>
      </template>
    </BasicTable>
    <FormModal @register="registerModal" @success="success" />
    <BasicModal
      @register="registerCancelModal"
      title="撤销原因"
      okText="提交"
      width="300px"
      @ok="handleSubmit"
    >
      <BasicForm @register="registerForm" />
    </BasicModal>
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { useModal, BasicModal } from '@/components/Modal';
  import { columns } from './data';
  import { message } from 'ant-design-vue';
  import FormModal from './formModal.vue';
  import { onMounted } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { getMaterialListApi, deleteMaterialApi } from '@/api/inspect/resultRegistration';

  const emit = defineEmits(['reload']);
  const props = defineProps({
    bsNo: { type: String, default: '' },
  });

  const [registerForm, { resetFields, clearValidate, validate }] = useForm({
    labelWidth: 80,
    baseColProps: { span: 24 },
    schemas: [
      {
        field: 'cause',
        component: 'Input',
        label: '原因',
        required: true,
      },
    ],
    showActionButtonGroup: false,
  });
  const [registerModal, { openModal }] = useModal();
  const [registerCancelModal, { openModal: openCancelModal, setModalProps }] = useModal();

  const [registerTable, { getSelectRows, clearSelectedRowKeys, reload }] = useTable({
    immediate: false,
    api: getMaterialListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: columns,
    size: 'small',
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    rowSelection: { type: 'radio' },
    beforeFetch: (p) => ({ ...p, bsNo: props.bsNo }),
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
  });
  function getSelections(onlyOne: boolean, callBack?: Function) {
    const rows = getSelectRows();
    if (rows.length === 0) {
      message.warning('请选择一条数据');
      return [];
    } else if (rows.length > 1 && onlyOne) {
      message.warning('只能选择一条数据');
      return [];
    }
    rows.length && callBack?.(rows);
    return rows;
  }
  function handleCreate() {
    openModal(true, { bsNo: props.bsNo });
  }
  function handleDelete() {
    getSelections(true, () => {
      openCancelModal(true);
      resetFields();
      clearValidate();
    });
  }
  async function handleSubmit() {
    const { cause } = await validate();
    const [row] = getSelections(true);
    try {
      setModalProps({ confirmLoading: true });
      await deleteMaterialApi({ id: row.id, cause });
      openCancelModal(false);
      message.success('撤销成功');
      reload();
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
  function success() {
    clearSelectedRowKeys();
    reload();
  }

  onMounted(async () => {
    emit('reload', reload, '3');
  });
</script>
