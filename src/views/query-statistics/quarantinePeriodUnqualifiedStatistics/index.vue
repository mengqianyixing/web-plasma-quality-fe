<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable" />
  </PageWrapper>
</template>
<script lang="tsx" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import {
    columns,
    searchFormSchema,
    numKey,
    ratioKey,
    bagNumKey,
    checkUnqKey,
    projectsKey,
    trackUnqKey,
    quarantineUnqKey,
  } from './data';
  import { PageWrapper } from '@/components/Page';
  import { isArray, isObject } from '@/utils/is';
  import { cloneDeep } from 'lodash-es';
  import {
    DictionaryItemKeyEnum,
    DictionaryReasonEnum,
    getSysSecondaryDictionary,
  } from '@/api/_dictionary';
  import { getListApi } from '@/api/query-statistics/quarantinePeriodUnqualifiedStatistics';
  import { nextTick } from 'vue';

  defineOptions({ name: 'QuarantinePeriodUnqualifiedStatistics' });

  const cloneColumns = cloneDeep(columns);

  const [registerTable, { setColumns, reload, getForm }] = useTable({
    api: getListApi,
    columns: cloneColumns,
    formConfig: {
      schemas: searchFormSchema.map((schema) => ({
        ...schema,
        componentProps: {
          ...schema.componentProps,
          onBlur: () => handlerChange(schema.field),
        },
      })),
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
    showIndexColumn: false,
    afterFetch: (res: Recordable[]) => {
      const formatData = res.map((row) => ({
        ...row,
        [checkUnqKey]: { ...row[checkUnqKey], ...row[checkUnqKey][projectsKey] },
        [quarantineUnqKey]: { ...row[quarantineUnqKey], ...row[quarantineUnqKey][projectsKey] },
        [trackUnqKey]: { ...row[trackUnqKey], ...row[trackUnqKey][projectsKey] },
      }));
      return [...formatData, getCountRow(formatData)];
    },
  });
  async function handlerChange(field: string) {
    const { setFieldsValue, getFieldsValue, resetFields } = getForm();
    await nextTick();
    const values = getFieldsValue();
    resetFields();
    console.log(values);
    if (field === 'stationNo') {
      return setFieldsValue(values);
    } else if (field === 'blockBy') {
      setFieldsValue({ stationNo: values.stationNo, blockBy: values.blockBy });
    } else if (field === '[blockStartDate, blockEndDate]') {
      setFieldsValue({
        stationNo: values.stationNo,
        blockStartDate: values.blockStartDate,
        blockEndDate: values.blockEndDate,
      });
    } else {
      setFieldsValue({
        ...getFieldsValue(),
        blockBy: void 0,
        blockStartDate: void 0,
        blockEndDate: void 0,
      });
    }
  }
  function getCountRow(data: Recordable[]) {
    const row = cloneColumns.reduce((row, { dataIndex, children = [] }) => {
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
    [checkUnqKey, quarantineUnqKey, trackUnqKey].forEach((key) => {
      row[key][ratioKey] = row[key][numKey] / (row[bagNumKey] || 1);
    });
    return { ...row, batch: '--', batchCount: '--', stationName: '合计', isCount: true };
  }
  Promise.all([
    getSysSecondaryDictionary({
      dataKey: DictionaryReasonEnum.PlasmaFailedReason as any,
      dictItemTypes: [DictionaryItemKeyEnum.Test],
    }),
    getSysSecondaryDictionary({
      dataKey: DictionaryReasonEnum.PlasmaFailedReason as any,
      dictItemTypes: [DictionaryItemKeyEnum.Quarantine],
    }),
    getSysSecondaryDictionary({
      dataKey: DictionaryReasonEnum.PlasmaFailedReason as any,
      dictItemTypes: [DictionaryItemKeyEnum.Track],
    }),
  ]).then(([res1, res2, res3]) => {
    cloneColumns[2].children?.unshift(
      ...(res1 || []).map((it) => ({
        dataIndex: [checkUnqKey, it.dictItemId],
        title: it.label,
        width: it.label.length * 18,
      })),
    );
    cloneColumns[3].children?.unshift(
      ...(res2 || []).map((it) => ({
        dataIndex: [quarantineUnqKey, it.dictItemId],
        title: it.label,
        width: it.label.length * 18,
      })),
    );
    cloneColumns[4].children?.unshift(
      ...(res3 || []).map((it) => ({
        dataIndex: [trackUnqKey, it.dictItemId],
        title: it.label,
        width: it.label.length * 18,
      })),
    );
    setColumns(cloneColumns);
    reload();
  });
</script>
