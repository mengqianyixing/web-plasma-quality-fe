<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-20 09:47:04
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-10 15:30:12
-->
<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate" v-auth="StoreButtonEnum.PlasmaSiteAdd"
          >新增</a-button
        >
        <a-button type="primary" @click="handleUpdate" v-auth="StoreButtonEnum.PlasmaSiteUpdate"
          >编辑</a-button
        >
        <a-button
          type="primary"
          @click="handleCheckStatus(1)"
          v-auth="StoreButtonEnum.PlasmaSiteDisable"
          >禁用</a-button
        >
        <a-button
          type="primary"
          @click="handleCheckStatus(0)"
          v-auth="StoreButtonEnum.PlasmaSiteEnable"
          >启用</a-button
        >
      </template>
    </BasicTable>
    <FormModal @register="registerModal" @success="success" />
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { useModal } from '@/components/Modal';
  import { columns, siteCodeSchema } from './site.data';
  import { message, Modal } from 'ant-design-vue';
  import FormModal from './formModal.vue';
  import { getListApi, updateSiteApi } from '@/api/plasmaStore/site';
  import { StoreButtonEnum } from '@/enums/authCodeEnum';

  const [registerModal, { openModal }] = useModal();

  const [registerTable, { getSelectRows, clearSelectedRowKeys, reload }] = useTable({
    api: getListApi,
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
    rowSelection: { type: 'radio' },
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
    formConfig: {
      schemas: [siteCodeSchema],
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
    openModal(true, { isUpdate: false, data: {} });
  }
  function handleUpdate() {
    const [row] = getSelections(true);
    if (!row) return;
    openModal(true, { data: row, isUpdata: true });
  }
  function success() {
    clearSelectedRowKeys();
    reload();
  }
  function handleCheckStatus(action: number) {
    const [row] = getSelections(true);
    if (!row) return;
    const { siteNo, siteName, fkHouseNo, closed } = row;
    if (closed === action) return message.warning('状态不需要变更');
    Modal.confirm({
      content: '确认' + (action ? '禁用' : '启用') + siteName + '?',
      onOk: async () => {
        await updateSiteApi({ siteNo, siteName, fkHouseNo, closed: action, siteNoOld: siteNo });
        clearSelectedRowKeys();
        reload();
      },
      onCancel: () => Modal.destroyAll(),
    });
  }
</script>
