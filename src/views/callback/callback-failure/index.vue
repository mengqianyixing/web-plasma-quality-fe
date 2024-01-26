<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #stationNo="{ record }">
        {{ getStationNameById(record?.stationNo) }}
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { useStation } from '@/hooks/common/useStation';

  import { onMounted, watchEffect } from 'vue';

  import { columns, searchFormSchema } from './failure.data';

  import { PageWrapper } from '@/components/Page';
  import { getCallbackFailureList } from '@/api/callback/callback-failure';

  const { isLoading, stationOptions, getStationNameById } = useStation();
  onMounted(() => {
    watchEffect(() => {
      if (!isLoading) {
        getForm().updateSchema({
          field: 'stationNo',
          componentProps: {
            options: stationOptions.value,
          },
        });
      }
    });
  });

  const [registerTable, { getForm }] = useTable({
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
    showTableSetting: true,
    tableSetting: {
      size: false,
      redo: false,
      setting: false,
    },
    bordered: true,
    showIndexColumn: false,
  });
</script>
