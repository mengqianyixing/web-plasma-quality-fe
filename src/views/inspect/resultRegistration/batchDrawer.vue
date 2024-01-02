<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-29 16:24:20
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-30 09:47:02
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="选择批次"
    width="1200px"
    @ok="handleSubmit"
  >
    <BasicTable @register="registerTable" />
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { BasicTable, useTable } from '@/components/Table';
  import { batchColumns, batchSearchScheam } from './resultRegistration.data';
  import { defineEmits } from 'vue';
  import { getBatchListApi } from '@/api/inspect/resultRegistration';
  import { message } from 'ant-design-vue';

  defineOptions({ name: 'LocationModel' });
  const emit = defineEmits(['confirm', 'register']);

  const [registerTable, { clearSelectedRowKeys, reload, setPagination, getSelectRows }] = useTable({
    title: '',
    immediate: false,
    size: 'small',
    api: getBatchListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    formConfig: {
      labelWidth: 90,
      baseColProps: {
        span: 6,
      },
      schemas: batchSearchScheam,
    },
    rowKey: 'bsNo',
    columns: batchColumns,
    useSearchForm: true,
    bordered: true,
    isCanResizeParent: true,
    rowSelection: { type: 'radio' },
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
  });
  const [registerDrawer] = useDrawerInner(() => {
    setPagination({ current: 1 });
    clearSelectedRowKeys();
    reload();
  });
  function handleSubmit() {
    const rows = getSelectRows();
    if (rows.length === 0) return message.warning('请选择一条数据');
    emit('confirm', rows);
  }
</script>
