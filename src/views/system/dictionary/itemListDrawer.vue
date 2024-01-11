<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-21 18:22:50
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-09 19:09:14
-->
<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" :title="dictName" width="1200px">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增</a-button>
        <template v-if="!systemLevel">
          <a-button type="primary" @click="handleUpdate">编辑</a-button>
          <a-button type="primary" @click="handleRemove">删除</a-button>
          <a-button type="primary" @click="handleSwitch(true)">启用</a-button>
          <a-button type="primary" @click="handleSwitch(false)">禁用</a-button>
        </template>
      </template>
    </BasicTable>
    <ItemFormDrawer @register="registerItemFormDrawer" @success="formSuccess" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { itemColumns, itemSearchFormSchema } from './dictionary.data';
  import { BasicDrawer, useDrawerInner, useDrawer } from '@/components/Drawer';
  import ItemFormDrawer from './itemFormDrawer.vue';
  import { message, Modal } from 'ant-design-vue';
  import { getDictItemListApi, removeDictItemApi, updateDictItemApi } from '@/api/dictionary';
  import { ref } from 'vue';

  const dictId = ref('');
  const dictName = ref('');
  const systemLevel = ref(false);
  const [registerItemFormDrawer, { openDrawer }] = useDrawer();
  const [registerTable, { getSelectRows, clearSelectedRowKeys, reload }] = useTable({
    title: '',
    isCanResizeParent: true,
    api: getDictItemListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    rowKey: 'dictItemId',
    columns: itemColumns,
    size: 'small',
    formConfig: {
      labelWidth: 80,
      schemas: itemSearchFormSchema,
    },
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    beforeFetch: (params) => {
      return { ...params, dataDictId: dictId.value };
    },
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
    rowSelection: { type: 'radio' },
  });
  const [registerDrawer, { setDrawerProps }] = useDrawerInner(({ data }) => {
    dictId.value = data.dictId;
    dictName.value = data.dictName;
    systemLevel.value = data.systemLevel;
    setDrawerProps({ confirmLoading: false });
    reload();
  });
  function formSuccess() {
    reload();
    clearSelectedRowKeys();
  }
  function getSelectRow() {
    const rows = getSelectRows();
    if (rows.length === 0) {
      message.warning('请选择数据');
      return [];
    }
    return rows;
  }
  function handleCreate() {
    openDrawer(true, { data: { dictId: dictId.value } });
  }
  function handleUpdate() {
    const [row] = getSelectRow();
    if (!row) return;
    openDrawer(true, { data: { ...row, dictId: dictId.value }, isUpdate: true });
  }
  function handleRemove() {
    const [row] = getSelectRow();
    if (!row) return;
    Modal.confirm({
      content: `确定删除${row.itemKey}？`,
      onOk: async () => {
        await removeDictItemApi({ dictItemId: row.dictItemId });
        clearSelectedRowKeys();
        reload();
      },
      onCancel: () => Modal.destroyAll(),
    });
  }
  function handleSwitch(enable: boolean) {
    const [row] = getSelectRow();
    if (!row) return;
    if (enable === !!row.enable) return message.warning('状态不需要变更');
    Modal.confirm({
      content: '确认' + (enable ? '启用' : '禁用') + row.itemKey + '?',
      onOk: async () => {
        await updateDictItemApi({ dictItemId: row.dictItemId, ...row, enable });
        clearSelectedRowKeys();
        reload();
      },
      onCancel: () => Modal.destroyAll(),
    });
  }
</script>
