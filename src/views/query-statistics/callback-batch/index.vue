<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './batch.data';
  import { PageWrapper } from '@/components/Page';
  import { getCallbackBatchStatistics } from '@/api/query-statistics/callback';

  const [registerTable] = useTable({
    api: getCallbackBatchStatistics,
    columns,
    formConfig: {
      schemas: searchFormSchema,
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
  });
</script>
