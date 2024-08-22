<template>
  <PageWrapper dense contentFullHeight fixedHeight class="root">
    <BasicTable @register="registerTable" ref="tableRef" class="tableHeight" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './data';
  import { PageWrapper } from '@/components/Page';
  import { getPrepareQuery } from '@/api/query-statistics/prepareNo';
  import { useMessage } from '@/hooks/web/useMessage';
  import { ref } from 'vue';
  import { GetApiSearchProdPrepareResponse } from '@/api/type/queryStatistics';
  import { useSticky } from '@/hooks/web/useSticky';

  defineOptions({ name: 'PrepareNo' });
  const { createMessage } = useMessage();
  const tableRef = ref();
  const totalStyle = useSticky(tableRef);

  const totalData = ref<GetApiSearchProdPrepareResponse>({});

  function accAdd(arg1: number, arg2: number) {
    let r1: number, r2: number, m: number;
    try {
      r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
  }

  const [registerTable] = useTable({
    beforeFetch: (params) => {
      return {
        ...params,
        currPage: 1,
        pageSize: 9999,
      };
    },
    afterFetch: (data) => {
      const totalKey: string[] = [];

      const dfs = (cols, flag = false) => {
        cols.forEach((col) => {
          if (col.children) {
            dfs(col.children, true);
          } else {
            if (flag) totalKey.push(col.dataIndex);
          }
        });
      };

      dfs(columns);
      totalKey
        .filter((it) => it !== 'outAt')
        .map((key) => {
          totalData.value[key] = data.reduce((acc, cur) => {
            return accAdd(acc, cur[key]);
          }, 0);
        });

      if (!data.length) {
        return [];
      }

      return [...data, { prepareNo: '合计', ...totalData.value }];
    },
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
    pagination: false,
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
<style scoped>
  .root :deep(.ant-table-tbody tr:last-child) {
    position: v-bind('totalStyle.position');
    z-index: 9;
    top: v-bind('totalStyle.top');
    bottom: v-bind('totalStyle.bottom');
    background-color: #f5f5f5;
  }

  .tableHeight :deep(thead tr th) {
    padding: 5px !important;
  }
</style>
