<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { columns, searchFormSchema } from './entrySearch.data';
  import { settingListApi } from '@/api/plasmaStore/setting';

  const [registerTable] = useTable({
    title: '',
    api: settingListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    columns,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: false,
    rowSelection: { type: 'checkbox' },
  });
</script>
