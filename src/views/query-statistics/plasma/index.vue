<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './plasma.data';

  import { PageWrapper } from '@/components/Page';
  import { getPlasmaQueryList } from '@/api/query-statistics/plasma';

  const [registerTable] = useTable({
    api: getPlasmaQueryList,
    columns,
    formConfig: {
      schemas: searchFormSchema,
      alwaysShowLines: 7,
      showAdvancedButton: true,
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    clickToRowSelect: false,
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: false,
    canResize: true,
  });
</script>
