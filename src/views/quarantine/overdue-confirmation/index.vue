<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2024-01-26 14:02:29
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-30 10:54:05
-->
<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleReview">确认</a-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { message, Modal } from 'ant-design-vue';
  import { columns, searchFormSchema } from './overdue-confirmation.data';
  import { getListApi, submitConfirmApi } from '@/api/quarantine/overdue-confirmation';

  const [registerTable, { getSelectRows, clearSelectedRowKeys, reload }] = useTable({
    api: getListApi,
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
    if (row.creator) return message.warning('请选择【未确认】的数据');
    Modal.confirm({
      content: '确认血浆编号【' + row.bagNo + '】?',
      onOk: async () => {
        await submitConfirmApi({ bagNo: row.bagNo });
        message.success('确认成功');
        clearSelectedRowKeys();
        reload();
      },
      onCancel: () => Modal.destroyAll(),
    });
  }
</script>
