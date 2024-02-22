<template>
  <PageWrapper dense contentFullHeight fixedHeight class="p-16px">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate" :disabled="!props.bsNo">新增</a-button>
        <a-button type="primary" @click="handleDelete" :disabled="!props.bsNo">撤销</a-button>
      </template>
    </BasicTable>
    <FormModal @register="registerModal" @success="success" />
    <Modal
      :open="open"
      @cancel="open = false"
      @ok="handleSubmit"
      okText="提交"
      width="300px"
      :confirmLoading="confirmLoading"
      title="撤销原因'"
    >
      <div class="m-20px">
        <BasicForm @register="registerForm" />
      </div>
    </Modal>
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { useModal } from '@/components/Modal';
  import { columns } from './data';
  import { message, Modal } from 'ant-design-vue';
  import FormModal from './formModal.vue';
  import { onMounted, ref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { getMaterialListApi, deleteMaterialApi } from '@/api/inspect/resultRegistration';

  const emit = defineEmits(['reload']);
  const props = defineProps({
    bsNo: { type: String, default: '' },
  });

  const open = ref(false);
  const confirmLoading = ref(false);

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
      open.value = true;
      resetFields();
      clearValidate();
    });
  }
  async function handleSubmit() {
    const { cause } = await validate();
    const [row] = getSelections(true);
    try {
      confirmLoading.value = true;
      await deleteMaterialApi({ id: row.id, cause });
      open.value = false;
      message.success('撤销成功');
      reload();
    } finally {
      confirmLoading.value = false;
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
