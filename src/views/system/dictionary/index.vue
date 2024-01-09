<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-21 17:29:52
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-09 19:07:16
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
    <FormModel @register="registerDrawer" @success="formSuccess" />
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
  import { getDictListApi, removeDictApi } from '@/api/dictionary';

  defineOptions({ name: 'Dictionary' });

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerItemDrawer, { openDrawer: openItemDrawer }] = useDrawer();

  const [registerTable, { getSelectRows, reload, clearSelectedRowKeys }] = useTable({
    title: '',
    api: getDictListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    rowKey: 'dictId',
    columns,
    size: 'small',
    formConfig: {
      labelWidth: 80,
      schemas: searchFormSchema,
    },
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
    rowSelection: { type: 'radio' },
  });
  function formSuccess() {
    reload();
    clearSelectedRowKeys();
  }
  function handleCreate() {
    openDrawer(true, { data: {} });
  }
  function handleUpdate() {
    const [row] = getSelectRow();
    if (!row) return;
    if (row.systemLevel) return message.warning('系统字典不可修改');
    openDrawer(true, { data: row, isUpdate: true });
  }
  function handleRemove() {
    const [row] = getSelectRow();
    if (!row) return;
    if (row.systemLevel) return message.warning('系统字典不可删除');
    Modal.confirm({
      content: `确定删除${row.dictName}？`,
      onOk: async () => {
        removeDictApi({ dictId: row.dictId });
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
