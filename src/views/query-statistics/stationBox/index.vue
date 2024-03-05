<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { onMounted, watchEffect } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { useStation } from '@/hooks/common/useStation';
  import { columns, searchFormSchema } from './data';
  import { PageWrapper } from '@/components/Page';
  import { getStationBoxList } from '@/api/query-statistics/stationBox.js';

  defineOptions({ name: 'StationBox' });

  const [registerTable, { getForm }] = useTable({
    api: getStationBoxList,
    columns,
    formConfig: {
      schemas: searchFormSchema,
      labelWidth: 80,
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
