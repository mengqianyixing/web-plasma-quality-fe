<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-25 14:30:13
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-26 14:22:40
-->
<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增</a-button>
        <a-button type="primary" @click="handleUpdate">编辑</a-button>
        <a-button type="primary" @click="handleRemove">删除</a-button>
        <a-button type="primary" @click="handleCheckStatus(1)">禁用</a-button>
        <a-button type="primary" @click="handleCheckStatus(0)">启用</a-button>
      </template>
      <template #projectCode="{ record }: { record: Recordable }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleDetails(record)"
        >
          {{ record.projectCode }}
        </span>
      </template>
    </BasicTable>
    <FormModal @register="registerDrawer" @success="success" />
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { useDrawer } from '@/components/Drawer';
  import { columns, searchFormschema } from './itemSetting.data';
  import { message, Modal } from 'ant-design-vue';
  import FormModal from './formModal.vue';
  import {
    getListApi,
    updateItemSettingApi,
    removeItemSettingApi,
  } from '@/api/inspect/itemSetting';

  const [registerDrawer, { openDrawer }] = useDrawer();

  const [registerTable, { getSelectRows, clearSelectedRowKeys, reload }] = useTable({
    api: getListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    rowKey: 'projectId',
    columns: columns,
    size: 'small',
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    rowSelection: { type: 'checkbox' },
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
    formConfig: {
      labelWidth: 90,
      baseColProps: { span: 6 },
      schemas: searchFormschema,
    },
  });
  function getSelections(onlyOne: boolean) {
    const rows = getSelectRows();
    if (rows.length === 0) {
      message.warning('请选择一条数据');
      return [];
    } else if (rows.length > 1 && onlyOne) {
      message.warning('只能选择一条数据');
      return [];
    }
    return rows;
  }
  function handleCreate() {
    openDrawer(true, { isUpdate: false, data: {} });
  }
  function handleUpdate() {
    const [row] = getSelections(true);
    if (!row) return;
    openDrawer(true, { data: row, isUpdata: true });
  }
  function success() {
    clearSelectedRowKeys();
    reload();
  }
  function handleRemove() {
    const [row] = getSelections(true);
    if (!row) return;
    const { projectId, projectName } = row;
    Modal.confirm({
      content: '确认删除' + projectName + '?',
      onOk: async () => {
        await removeItemSettingApi({ id: projectId });
        clearSelectedRowKeys();
        reload();
      },
      onCancel: () => Modal.destroyAll(),
    });
  }
  function handleCheckStatus(action: number) {
    const [row] = getSelections(true);
    if (!row) return;
    const { projectName, projectId, state } = row;
    if (state === action) return message.warning('状态不需要变更');
    Modal.confirm({
      content: '确认' + (action ? '禁用' : '启用') + projectName + '?',
      onOk: async () => {
        await updateItemSettingApi({ projectId, state: action, enableFlag: '1' });
        clearSelectedRowKeys();
        reload();
      },
      onCancel: () => Modal.destroyAll(),
    });
  }
  function handleDetails(record: Recordable) {
    openDrawer(true, { data: record, disabled: true });
  }
</script>
