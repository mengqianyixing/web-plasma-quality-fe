<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './third.data';
  import { PageWrapper } from '@/components/Page';
  import { getThirdLogsList } from '@/api/logs/thirdLogs';

  defineOptions({ name: 'ThirdSysLogs' });

  const [registerTable] = useTable({
    api: getThirdLogsList,
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
    scroll: {
      x: 0,
    },
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
  });
</script>
