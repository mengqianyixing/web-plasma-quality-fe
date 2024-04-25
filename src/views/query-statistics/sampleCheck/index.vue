<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable" />
  </PageWrapper>
</template>
<script lang="tsx" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './data';
  import { PageWrapper } from '@/components/Page';
  import { getListApi } from '@/api/query-statistics/sampleCheck';
  import { isArray, isObject } from '@/utils/is';
  import {
    DictionaryItemKeyEnum,
    DictionaryReasonEnum,
    getSysSecondaryDictionary,
  } from '@/api/_dictionary';

  defineOptions({ name: 'SampleCheck' });

  const [registerTable, { setColumns, reload }] = useTable({
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
    afterFetch: (res: Recordable[]) => {
      const row = getCountRow(res);
      return [...res, row];
    },
    immediate: false,
  });
  getSysSecondaryDictionary({
    dataKey: DictionaryReasonEnum.PlasmaFailedReason as any,
    dictItemTypes: [DictionaryItemKeyEnum.Test],
  }).then((res1) => {
    columns[7].children?.unshift(
      ...(res1 || []).map((it) => ({
        dataIndex: ['failed', it.dictItemId],
        title: it.label,
        width: it.label.length * 18,
      })),
    );
    setColumns(columns);
    reload();
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
    ['check', 'verification'].forEach((key) => {
      row[key]['ratio'] = row[key]['count'] / (row['sampleCount'] || 1);
    });
    return { ...row, stationName: '合计', sampleType: '--', failed: ['--'] };
  }
</script>
