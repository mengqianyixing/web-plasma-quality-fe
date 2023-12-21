<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-21 17:29:52
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-21 18:10:37
-->
<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex" class="p-16px">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增</a-button>
        <a-button type="primary" @click="handleUpdate()">编辑</a-button>
        <a-button type="primary" @click="handleRemove()">删除</a-button>
        <a-button type="primary" @click="handleCreateItem()">字典项配置</a-button>
      </template>
    </BasicTable>
    <FormModel @register="registerDrawer" @success="reload" />
    <ItemListDrawer @register="registerItemDrawer" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { columns, searchFormSchema } from './dictionary.data';
  import { useDrawer } from '@/components/Drawer';
  import { message, Modal } from 'ant-design-vue';
  import FormModel from './formDrawer.vue';
  import ItemListDrawer from './itemListDrawer.vue';

  defineOptions({ name: 'Dictionary' });

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerItemDrawer, { openDrawer: openItemDrawer }] = useDrawer();

  const [registerTable, { getSelectRows, reload, clearSelectedRowKeys }] = useTable({
    title: '',
    api: () => Promise.resolve({ result: [{}] }),
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    rowKey: 'houseNo',
    columns,
    size: 'small',
    formConfig: {
      labelWidth: 80,
      schemas: searchFormSchema,
    },
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    rowSelection: { type: 'radio' },
  });

  function handleCreate() {
    openDrawer(true, {});
  }
  function handleUpdate() {
    const [row] = getSelectRow();
    if (!row) return;
    openDrawer(true, { data: row, isUpdate: true });
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
  function handleCreateItem() {
    const [row] = getSelectRow();
    if (!row) return;
    openItemDrawer(true, { data: row });
  }
  function getSelectRow() {
    const rows = getSelectRows();
    if (rows.length === 0) {
      message.warning('请选择数据');
      return [];
    }
    return rows;
  }
</script>
