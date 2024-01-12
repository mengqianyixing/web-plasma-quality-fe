<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-18 14:18:08
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-10 15:48:44
-->
<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleOutStore">出库</a-button>
        <a-button type="primary" @click="handleInStore">入库</a-button>
      </template>
    </BasicTable>
    <OutModal @register="registerOutModal" @success="success" />
    <InModal @register="registerInModal" @success="success" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { columns, searchFormSchema } from './outInStore.data';
  import { useModal } from '@/components/Modal';
  import { message } from 'ant-design-vue';
  import OutModal from './outModal.vue';
  import InModal from './inModal.vue';
  import { STORE_FLAG } from '@/enums/plasmaStoreEnum';
  import { getListApi } from '@/api/tray/list';

  defineOptions({ name: 'OutInStore' });

  const [registerOutModal, { openModal }] = useModal();
  const [registerInModal, { openModal: openInModal }] = useModal();

  const [registerTable, { getSelectRows, reload, clearSelectedRowKeys }] = useTable({
    title: '',
    api: getListApi,
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
    rowKey: 'trayNo',
    columns,
    useSearchForm: true,
    bordered: true,
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
    rowSelection: { type: 'checkbox' },
    beforeFetch: (p) => ({ ...p, closed: 0 }),
  });

  function handleOutStore() {
    const rows = getSelections(false);
    if (!rows.length) return false;
    if (!rows.every((_) => _.wareHouseName)) return message.warning('所选托盘存在未入库!');
    const [firstRow] = rows;
    const notAlike = rows.some((_) => _.wareHouseName !== firstRow.wareHouseName);
    if (notAlike) return message.warning('所选托盘不属于同一库房!');
    if (firstRow.houseType[1] === STORE_FLAG.S) {
      openModal(true, { data: rows, showSite: true });
    } else {
      openModal(true, { data: rows, showSite: false });
    }
  }
  function handleInStore() {
    const rows = getSelections<string>(false);
    if (rows.some((_) => _.wareHouseName)) return message.warning('所选托盘存在已入库!');
    if (!rows.length) return false;
    openInModal(true, { data: rows });
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
  function success() {
    clearSelectedRowKeys();
    reload();
  }
</script>
