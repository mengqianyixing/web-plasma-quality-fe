<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable" class="tableHeight" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './data';
  import { PageWrapper } from '@/components/Page';
  import { getPrepareQuery } from '@/api/query-statistics/prepareNo';
  import { useMessage } from '@/hooks/web/useMessage';

  defineOptions({ name: 'PrepareNo' });
  const { createMessage } = useMessage();

  const [registerTable] = useTable({
    api: _getPrepareQuery,
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
    immediate: false,
  });

  function _getPrepareQuery(params) {
    const { batchNo, bagNo } = params;
    if (!batchNo && !bagNo) {
      createMessage.warning('请输入血浆批号或血浆编号!');
      return Promise.reject();
    }
    return getPrepareQuery(params);
  }
</script>
<style scoped lang="less">
  .tableHeight :deep(thead tr th) {
    padding: 5px !important;
  }
</style>
