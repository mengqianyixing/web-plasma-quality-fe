<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-23 20:54:41
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-10 15:44:41
-->
<template>
  <BasicModal v-bind="$attrs" @register="registerModal" showFooter title="托盘详情" width="600px">
    <BasicTable @register="registerTable" v-show="false" />
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { trayDtListApi } from '@/api/tray/list';
  import { trayDtColumns, trayDtSearchSchema } from './manage.data';
  import { reactive } from 'vue';

  defineOptions({ name: 'TableModal' });
  const state = reactive({
    trayNo: '',
  });
  const [registerTable, { reload, setPagination }] = useTable({
    title: '',
    immediate: false,
    size: 'small',
    api: trayDtListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    formConfig: {
      labelWidth: 60,
      schemas: trayDtSearchSchema,
    },
    rowKey: 'locationNo',
    columns: trayDtColumns,
    useSearchForm: true,
    bordered: true,
    beforeFetch: (params) => {
      return { ...params, trayNo: state.trayNo };
    },
  });
  const [registerModal] = useModalInner(({ trayNo }) => {
    state.trayNo = trayNo;
    setPagination({ current: 1 });
    reload();
  });
</script>
