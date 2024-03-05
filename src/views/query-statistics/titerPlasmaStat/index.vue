<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './data';
  import { PageWrapper } from '@/components/Page';
  import { getListApi } from '@/api/query-statistics/titerPlasmaStat';
  import { isArray, isObject } from '@/utils/is';
  import { PostApiCoreBagTiterCountResponse } from '@/api/type/queryStatistics';

  defineOptions({ name: 'TiterPlasmaStat' });

  const [registerTable] = useTable({
    api: getListApi,
    columns,
    formConfig: {
      schemas: searchFormSchema,
    },
    pagination: false,
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: false,
    afterFetch: (res: PostApiCoreBagTiterCountResponse) => {
      const formatData = res.map((row) => {
        row['H'] = row.details.find((it) => it.level === '高效价') || {};
        row['L'] = row.details.find((it) => it.level === '低效价') || {};
        row['N'] = row.details.find((it) => it.level === '合格普通浆') || {};
        return row;
      });
      const row = getCountRow(formatData);
      return [...formatData, row];
    },
  });

  function getCountRow(data: Recordable[]) {
    const row = columns.reduce((row, { dataIndex, children = [] }) => {
      row[dataIndex as string] = 0;
      children.forEach(({ dataIndex: ci }) => {
        if (isArray(ci)) {
          row[ci[0]] = row[ci[0]] || {};
          row[ci[0]][ci[1]] = 0;
        } else {
          row[ci as string] = 0;
        }
      });
      return row;
    }, {});
    data.forEach((it) => {
      for (const key in it) {
        const data = it[key];
        if (isObject(data)) {
          for (const ck in data) {
            row[key][ck] += data[ck] || 0;
          }
        } else {
          row[key] += data || 0;
        }
      }
    });
    ['H', 'L', 'N'].map((it) => {
      row[it]['ratio'] = row[it]['bagCount'] / row['bagCount'];
    });

    return { ...row, stationName: '合计', rawImm: '--' };
  }
</script>
