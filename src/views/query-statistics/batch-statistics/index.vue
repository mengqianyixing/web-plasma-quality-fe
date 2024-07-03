<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable" class="tableHeight" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './batch.data';
  import { PageWrapper } from '@/components/Page';
  import { getBatchList } from '@/api/query-statistics/batch-statistics';

  defineOptions({ name: 'BatchStatistics' });

  const sortMap = {
    stationName: 'station_no',
    batchNo: 'bp_no',
  };

  const [registerTable] = useTable({
    api: getBatchList,
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
    sortFn(sortInfo) {
      return {
        sortIdx: sortMap[sortInfo.field],
        sortOrder: sortInfo.order === 'ascend' ? 'ASC' : 'DESC',
      };
    },
  });
</script>
<style scoped lang="less">
  .tableHeight :deep(thead tr th) {
    padding: 5px !important;
  }
</style>
