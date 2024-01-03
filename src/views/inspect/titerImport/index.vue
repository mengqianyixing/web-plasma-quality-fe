<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-26 15:27:18
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-03 17:00:26
-->
<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="openImportDrawer(true)">新增</a-button>
        <a-button type="primary" @click="handleRemove">删除</a-button>
      </template>
      <template #projectCode="{ record }: { record: Recordable }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="openDtDrawer(true, record)"
        >
          {{ record.projectCode }}
        </span>
      </template>
    </BasicTable>
    <DtDrawer @register="registerDtDrawer" />
    <ImportDrawer @register="registerImportDrawer" @close="success" />
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { useDrawer } from '@/components/Drawer';
  import { columns, searchFormschema } from './titer.data';
  import { message, Modal } from 'ant-design-vue';
  import DtDrawer from './dtDrawer.vue';
  import ImportDrawer from './importDrawer.vue';
  import { getListApi, removeItemSettingApi } from '@/api/inspect/itemSetting';

  const [registerDtDrawer, { openDrawer: openDtDrawer }] = useDrawer();
  const [registerImportDrawer, { openDrawer: openImportDrawer }] = useDrawer();

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
</script>
