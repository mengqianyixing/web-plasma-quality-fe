<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './data';
  import { PageWrapper } from '@/components/Page';
  import { getListApi } from '@/api/query-statistics/titerPlasmaQuery';
  import { isArray, isObject } from '@/utils/is';
  import { PostApiCoreBagTiterResponse } from '@/api/type/queryStatistics';

  defineOptions({ name: 'TiterPlasmaQuery' });

  const [registerTable] = useTable({
    api: getListApi,
    columns,
    formConfig: {
      schemas: searchFormSchema,
    },
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
    pagination: false,
    showIndexColumn: false,
    afterFetch: (res: PostApiCoreBagTiterResponse) => {
      const formatData = res.map((row) => {
        row['B'] = row.titers.find((it) => it.rawImm === '乙免') || {};
        row['R'] = row.titers.find((it) => it.rawImm === '狂免') || {};
        row['T'] = row.titers.find((it) => it.rawImm === '破免') || {};
        row['N'] = row.titers.find((it) => it.rawImm === '普浆') || {};
        row['G'] = row.titers.find((it) => it.rawImm === '巨细胞') || {};
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
    row['B']['reagentBatch'] = '--';
    row['R']['reagentBatch'] = '--';
    row['T']['reagentBatch'] = '--';
    ['B', 'R', 'T', 'N', 'G'].map((it) => {
      row[it]['hRatio'] = row[it]['hTiter'] / row['bagCount'];
      row[it]['lRatio'] = row[it]['lTiter'] / row['bagCount'];
      row[it]['nRatio'] = row[it]['nTiter'] / row['bagCount'];
    });

    return { ...row, stationName: '合计', batchNo: '批次数：' + data.length + '批' };
  }
</script>
