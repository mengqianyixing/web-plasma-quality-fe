<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增</a-button>
        <a-button type="primary" @click="handleUpdate">编辑</a-button>
        <a-button type="primary" @click="handleCheckStatus('CLOSED')">禁用</a-button>
        <a-button type="primary" @click="handleCheckStatus('NORMAL')">启用</a-button>
      </template>
    </BasicTable>
    <FormModal @register="registerDrawer" @success="reload" />
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { useDrawer } from '@/components/Drawer';
  import { columns, siteCodeSchema } from './site.data';
  import { message, Modal } from 'ant-design-vue';
  import FormModal from './formModal.vue';
  import { getSiteList, switchSite } from '@/api/plasmaStore/site';

  const [registerDrawer, { openDrawer }] = useDrawer();

  const [registerTable, { getRowSelection, findTableDataRecord, clearSelectedRowKeys, reload }] =
    useTable({
      api: getSiteList,
      fetchSetting: {
        pageField: 'currPage',
        sizeField: 'pageSize',
        totalField: 'totalCount',
        listField: 'result',
      },
      rowKey: 'siteNo',
      columns: columns,
      size: 'small',
      useSearchForm: true,
      showTableSetting: false,
      bordered: true,
      rowSelection: { type: 'checkbox' },
      formConfig: {
        labelWidth: 120,
        schemas: [siteCodeSchema],
      },
    });
  function getSelections<T = string>(onlyOne: boolean): T[] {
    const { selectedRowKeys } = getRowSelection() as any;
    if (selectedRowKeys.length === 0) {
      message.warning('请选择一条数据');
      return [];
    } else if (selectedRowKeys.length > 1 && onlyOne) {
      message.warning('只能选择一条数据');
      return [];
    }
    return selectedRowKeys;
  }
  function handleCreate() {
    openDrawer(true, {});
  }
  function handleUpdate() {
    const [key] = getSelections(true);
    if (!key) return;
    const record = findTableDataRecord(key) as Recordable;
    openDrawer(true, { data: record });
  }
  function handleCheckStatus(action: string) {
    const [key] = getSelections(true);
    if (!key) return;
    const { closed, id, siteName } = findTableDataRecord(key) as Recordable;
    if (closed === action) return message.warning('状态不需要变更');
    Modal.confirm({
      content: '确认' + (action ? '禁用' : '启用') + siteName + '?',
      onOk: async () => {
        await switchSite({ closed: action, id });
        clearSelectedRowKeys();
        reload();
      },
      onCancel: () => Modal.destroyAll(),
    });
  }
</script>
