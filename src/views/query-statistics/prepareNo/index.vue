<template>
  <PageWrapper dense contentFullHeight fixedHeight class="root">
    <BasicTable @register="registerTable" class="tableHeight" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './data';
  import { PageWrapper } from '@/components/Page';
  import { getPrepareQuery } from '@/api/query-statistics/prepareNo';
  import { useMessage } from '@/hooks/web/useMessage';
  import { ref, watch } from 'vue';
  import { GetApiSearchProdPrepareResponse } from '@/api/type/queryStatistics';
  import { PositionType } from 'ant-design-vue/es/image/style';

  defineOptions({ name: 'PrepareNo' });
  const { createMessage } = useMessage();

  const totalData = ref<GetApiSearchProdPrepareResponse>({});
  const totalStyle = ref<{
    position: PositionType;
    top: number | string;
    bottom: number | string;
  }>({
    position: 'sticky',
    top: 0,
    bottom: 0,
  });

  watch(
    () => totalData.value,
    () => {
      setTimeout(() => {
        const bodyDom = document.getElementsByClassName('ant-table-tbody')[0];
        const containerDom = document.getElementsByClassName('ant-table-container')[0];
        const headerDom = document.getElementsByClassName('ant-table-thead')[0];

        const length = getDataSource().length;
        const filterPx = (str: string) => str.replace(/px/g, '');

        const bodyH = Number(filterPx(getComputedStyle(bodyDom).height));
        const containerH = Number(filterPx(getComputedStyle(containerDom).height));
        const headerH = Number(filterPx(getComputedStyle(headerDom).height));

        if (bodyH < containerH - headerH) {
          totalStyle.value.position = 'relative';
          totalStyle.value.top = containerH - 38 * length - headerH - 10 + 'px';
          totalStyle.value.bottom = '';
        } else {
          totalStyle.value.position = 'sticky';
          totalStyle.value.bottom = 0;
          totalStyle.value.top = '';
        }
      }, 200);
    },
    {
      deep: true,
    },
  );

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

  const [registerTable, { getDataSource }] = useTable({
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
    z-index: 99;
    top: v-bind('totalStyle.top');
    bottom: v-bind('totalStyle.bottom');
    background-color: #f5f5f5;
  }

  .tableHeight :deep(thead tr th) {
    padding: 5px !important;
  }
</style>
