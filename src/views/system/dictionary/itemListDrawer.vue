<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="字典项列表"
    width="1200px"
  >
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增</a-button>
        <a-button type="primary" @click="handleUpdate">编辑</a-button>
        <a-button type="primary" @click="handleRemove">删除</a-button>
        <a-button type="primary" @click="handleSwitch">启用</a-button>
        <a-button type="primary" @click="handleSwitch">禁用</a-button>
      </template>
    </BasicTable>
    <ItemFormDrawer @register="registerItemFormDrawer" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { itemColumns, itemSearchFormSchema } from './dictionary.data';
  import { BasicDrawer, useDrawerInner, useDrawer } from '@/components/Drawer';
  import ItemFormDrawer from './itemFormDrawer.vue';
  import { message, Modal } from 'ant-design-vue';

  // const emit = defineEmits(['success', 'register']);

  const [registerItemFormDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { getSelectRows, clearSelectedRowKeys, reload }] = useTable({
    title: '',
    isCanResizeParent: true,
    api: () => Promise.resolve({ result: [{}] }),
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    rowKey: 'houseNo',
    columns: itemColumns,
    size: 'small',
    formConfig: {
      labelWidth: 80,
      schemas: itemSearchFormSchema,
    },
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    rowSelection: { type: 'radio' },
  });
  const [registerDrawer, { setDrawerProps }] = useDrawerInner(() => {
    setDrawerProps({ confirmLoading: false });
  });
  function getSelectRow() {
    const rows = getSelectRows();
    if (rows.length === 0) {
      message.warning('请选择数据');
      return [];
    }
    return rows;
  }
  function handleCreate() {
    openDrawer(true, {});
  }
  function handleUpdate() {
    const [row] = getSelectRow();
    if (!row) return;
    openDrawer(true, { data: row });
  }
  function handleRemove() {
    const [row] = getSelectRow();
    if (!row) return;
    Modal.confirm({
      content: '确定删除？',
      onOk: async () => {
        clearSelectedRowKeys();
        reload();
      },
      onCancel: () => Modal.destroyAll(),
    });
  }
  function handleSwitch() {
    const [row] = getSelectRow();
    if (!row) return;
  }
</script>
