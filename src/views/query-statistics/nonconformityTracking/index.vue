<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './nonconformityTracking.data';
  import { PageWrapper } from '@/components/Page';
  import {
    getNonconformityTrackingList,
    getBlockSource,
  } from '@/api/query-statistics/nonconformityTracking';

  defineOptions({ name: 'NonconformityTracking' });

  const [registerTable] = useTable({
    api: getNonconformityTrackingList,
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
    afterFetch: async (res) => {
      const enumBlock = {};
      try {
        const data = await getBlockSource();
        data[0].enumObjList.forEach((x) => {
          enumBlock[x['key']] = x['show'];
        });
      } catch (e) {
        console.log(e);
      }

      return res?.map((_) => ({
        ..._,
        collectAt: _.collectAt ? _.collectAt.slice(0, 10) : _.collectAt,
        blockAt: _.blockAt ? _.blockAt.slice(0, 10) : _.blockAt,
        blockBy: enumBlock[_.blockBy] || _.blockBy,
      }));
    },
  });
</script>
