<template>
  <PageWrapper dense contentFullHeight fixedHeight class="root">
    <BasicTable @register="registerTable" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './storage.data';

  import { getPlasmaRawInStorage } from '@/api/query-statistics/plasma';
  import { PageWrapper } from '@/components/Page';

  defineOptions({ name: 'PlasmaRawInStorage' });

  const [registerTable] = useTable({
    api: getPlasmaRawInStorage,
    columns,
    formConfig: {
      schemas: searchFormSchema,
      fieldMapToTime: [['timeField', ['beginAt', 'endAt'], 'YYYY-MM-DD']],
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : '';
      },
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'stationDeatailList',
    },
    clickToRowSelect: false,
    size: 'small',
    canResize: true,
    striped: false,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: true,
    indexColumnProps: {
      className: 'content-none',
    },
    pagination: false,
    showSummary: true,
    summaryFunc: handleSummary,
  });

  function handleSummary(tableData: any[]) {
    const inOfMonth = tableData.reduce((prev, curr) => prev + curr.inOfMonth, 0);
    const inOfYear = tableData.reduce((prev, curr) => prev + curr.inOfYear, 0);
    return [
      {
        stationName: '总计',
        inOfMonth,
        inOfYear,
      },
      {
        stationName: '总计',
        inOfMonth,
        inOfYear,
      },
    ];
  }
</script>
<style scoped>
  .root :deep(.ant-table-footer) {
    position: sticky;
    bottom: 13%;
    padding: 0 !important;
    border: 2px solid #f0f0f0 !important;
  }
</style>
