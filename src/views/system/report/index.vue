<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增</a-button>
        <a-button type="primary" @click="handleUpdate">编辑</a-button>
      </template>
    </BasicTable>
    <FormModal @register="registerFormModal" @success="reload" />
  </PageWrapper>
</template>
<script setup lang="ts">
  import { PageWrapper } from '@/components/Page';
  import { BasicTable, useTable } from '@/components/Table';
  import { useModal } from '@/components/Modal';
  import { columns } from './report.data';
  import { message } from 'ant-design-vue';
  import FormModal from './form-modal.vue';

  const [registerFormModal, { openModal: openFormModal }] = useModal();

  const [registerTable, { clearSelectedRowKeys, getSelectRows, reload }] = useTable({
    api: () => Promise.resolve(),
    size: 'small',
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    formConfig: {
      schemas: [
        {
          field: '',
          component: 'Input',
          label: '报表名称',
        },
      ],
    },
    columns: columns,
    useSearchForm: true,
    bordered: true,
    rowSelection: { type: 'radio' },
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
  });
  function getSelections(onlyOne: boolean, fn?: (rows: Recordable[]) => void) {
    const rows = getSelectRows();
    if (rows.length === 0) {
      message.warning('请选择一条数据');
      return [];
    } else if (rows.length > 1 && onlyOne) {
      message.warning('只能选择一条数据');
      return [];
    }
    fn?.(rows);
    return rows;
  }
  function handleCreate() {
    openFormModal(true, {});
  }
  function handleUpdate() {
    getSelections(true, ([row]) => {
      openFormModal(true, { isUpdate: true, ...row });
    });
  }
</script>
