<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2024-01-26 14:02:29
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-26 14:21:18
-->
<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleReview">复核</a-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { message, Modal } from 'ant-design-vue';
  import { columns, searchFormSchema } from './overdue-confirmation.data';

  const [registerTable, { getSelectRows, clearSelectedRowKeys, reload }] = useTable({
    api: () => Promise.resolve(),
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
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
      schemas: searchFormSchema,
    },
  });
  function handleReview() {
    const rows = getSelectRows();
    if (rows.length === 0) return message.warning('请选择数据');
    const [row] = rows;
    Modal.confirm({
      content: '确认复核' + row + '?',
      onOk: async () => {
        message.success('复核成功');
        clearSelectedRowKeys();
        reload();
      },
      onCancel: () => Modal.destroyAll(),
    });
  }
</script>
