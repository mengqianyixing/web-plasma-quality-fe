<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleOutStore">出库</a-button>
        <a-button type="primary" @click="handleInStore">入库</a-button>
        <a-button type="primary" @click="handlePrint()">打印托盘</a-button>
        <a-button type="primary" @click="handlePrint()">补打印托盘</a-button>
      </template>
    </BasicTable>
    <OutModal @register="registerOutDrawer" @success="reload" />
    <InModal @register="registerInDrawer" @success="reload" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { columns, searchFormSchema } from './outInStore.data';
  import { settingListApi } from '@/api/plasmaStore/setting';
  import { useDrawer } from '@/components/Drawer';
  import { message } from 'ant-design-vue';
  import OutModal from './outModal.vue';
  import InModal from './inModal.vue';

  defineOptions({ name: 'OutInStore' });

  const [registerOutDrawer, { openDrawer }] = useDrawer();
  const [registerInDrawer, { openDrawer: openInDrawer }] = useDrawer();

  const [registerTable, { getRowSelection, reload }] = useTable({
    title: '',
    api: settingListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    rowKey: 'houseNo',
    columns,
    useSearchForm: true,
    bordered: true,
    rowSelection: { type: 'checkbox' },
  });

  function handleOutStore() {
    const keys = getSelections<string>(false);
    if (!keys.length) return false;
    openDrawer(true, { data: keys });
  }
  function handleInStore() {
    const keys = getSelections<string>(false);
    if (!keys.length) return false;
    openInDrawer(true, { data: keys });
  }
  function handlePrint() {}
  function getSelections<T>(onlyOne: boolean): T[] {
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
</script>
