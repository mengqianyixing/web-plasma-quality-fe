<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';

  import { columns, searchFormSchema } from './failure.data';

  import { PageWrapper } from '@/components/Page';
  import { getCallbackFailureList } from '@/api/callback/callback-failure';

  defineOptions({ name: 'CallbackFailure' });

  const [registerTable] = useTable({
    api: getCallbackFailureList,
    columns,
    formConfig: {
      schemas: searchFormSchema,
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : '';
      },
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
  });
</script>
