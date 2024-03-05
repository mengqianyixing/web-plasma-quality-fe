<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { onMounted, watchEffect } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './data';
  import { PageWrapper } from '@/components/Page';
  import { useStation } from '@/hooks/common/useStation';
  import { getStationRefuseList } from '@/api/query-statistics/stationRefuse.js';

  defineOptions({ name: 'StationRefuse' });

  const [registerTable, { getForm }] = useTable({
    api: getStationRefuseList,
    columns,
    formConfig: {
      schemas: searchFormSchema,
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : ''; // 时间格式只要日期
      },
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

  const { isLoading, stationOptions } = useStation();
  onMounted(async () => {
    watchEffect(async () => {
      if (!isLoading) {
        await getForm().updateSchema({
          field: 'stationNo',
          componentProps: {
            options: stationOptions.value,
          },
        });
      }
    });
  });
</script>
