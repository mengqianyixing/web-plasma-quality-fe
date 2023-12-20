<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-18 14:18:08
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-20 15:25:32
-->
<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleOutStore">出库</a-button>
        <a-button type="primary" @click="handleInStore">入库</a-button>
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
  import { STORE_FLAG } from '@/enums/plasmaStoreEnum';

  defineOptions({ name: 'OutInStore' });

  const [registerOutDrawer, { openDrawer }] = useDrawer();
  const [registerInDrawer, { openDrawer: openInDrawer }] = useDrawer();

  const [registerTable, { getSelectRows, reload }] = useTable({
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
    const rows = getSelections(false);
    if (!rows.length) return false;
    const [firstRow] = rows;
    const notAlike = rows.some((_) => _.houseNo !== firstRow.houseNo);
    if (notAlike) return message.warning('所选托盘不属于同一库房!');
    if (firstRow.houseType[1] === STORE_FLAG.S) {
      openDrawer(true, { data: rows, showSite: true });
    } else {
      openDrawer(true, { data: rows, showSite: false });
    }
  }
  function handleInStore() {
    const rows = getSelections<string>(false);
    if (!rows.length) return false;
    openInDrawer(true, { data: rows });
  }

  function getSelections<T = any>(onlyOne: boolean): Recordable<T>[] {
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
</script>
