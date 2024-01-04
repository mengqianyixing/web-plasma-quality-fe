<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">报告生成</a-button>
        <a-button type="primary" @click="handleCheck(true)">复核</a-button>
        <a-button type="primary" @click="handleCheck(true)">取消复核</a-button>
        <a-button type="primary" @click="handleRelease">发布</a-button>
        <a-button type="primary" @click="handlePrint">报告打印</a-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { columns, searchFormschema } from './reportRelease.data';
  import { message } from 'ant-design-vue';
  // import { } from '@/api/inspect';

  const [registerTable, { getSelectRows, clearSelectedRowKeys }] = useTable({
    api: () => Promise.resolve({ result: [{}] }),
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    rowKey: 'dictItemId',
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
  function handleCreate() {
    const [row] = getSelections(true);
    if (!row) return;
  }
  function handleCheck(action: boolean) {
    console.log(action);
    const [row] = getSelections(true);
    if (!row) return;
  }

  function handleRelease() {
    const [row] = getSelections(true);
    if (!row) return;
  }
  function handlePrint() {
    const [row] = getSelections(true);
    if (!row) return;
  }
</script>
