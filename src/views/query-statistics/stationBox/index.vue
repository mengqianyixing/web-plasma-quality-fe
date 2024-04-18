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
  import { useMessage } from '@/hooks/web/useMessage';
  import { getStationBoxList } from '@/api/query-statistics/stationBox.js';

  defineOptions({ name: 'StationBox' });
  const { createMessage } = useMessage();

  const [registerTable, { getForm }] = useTable({
    api: _getStationBoxList,
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
    immediate: false,
  });

  const { stationOptions } = useStation();
  onMounted(async () => {
    watchEffect(async () => {
      await getForm().updateSchema({
        field: 'stationNo',
        componentProps: {
          options: stationOptions,
        },
      });
    });
  });

  function _getStationBoxList(params) {
    const { stationNo, batchStartNo, batchEndNo, boxNo } = params;
    if (!stationNo && !batchStartNo && !batchEndNo && !boxNo) {
      createMessage.warning('请输入查询条件');
      return Promise.reject();
    }
    return getStationBoxList(params);
  }
</script>
