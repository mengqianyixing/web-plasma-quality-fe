<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable" />
    <TabelModal @register="registerModal" />
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
    Type,
  } from './data';
  import { PageWrapper } from '@/components/Page';
  import { isArray, isObject } from '@/utils/is';
  import { cloneDeep } from 'lodash-es';
  import {
    DictionaryItemKeyEnum,
    DictionaryReasonEnum,
    getSysSecondaryDictionary,
  } from '@/api/_dictionary';
  import { useModal } from '@/components/Modal';
  import TabelModal from './tabelModal.vue';

  import { getListApi } from '@/api/query-statistics/quarantinePeriodUnqualifiedStatistics';
  import { nextTick } from 'vue';

  defineOptions({ name: 'QuarantinePeriodUnqualifiedStatistics' });

  const cloneColumns = cloneDeep(columns);
  const [registerModal, { openModal }] = useModal();

  const [registerTable, { setColumns, reload, getForm }] = useTable({
    immediate: false,
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
    pagination: false,
    bordered: true,
    showIndexColumn: false,
    beforeFetch: getFormatParams,
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
  function getFormatParams(params: Recordable) {
    const formatParams = {};
    for (const key in params) {
      if (params[key]?.includes('00:00:00')) {
        formatParams[key] = params[key].slice(0, 10);
      } else {
        formatParams[key] = params[key];
      }
    }
    return formatParams;
  }

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
        width: it.label.length * 16,
        customRender: ({ record }) => {
          if (record.isCount) return record[checkUnqKey]?.[it.dictItemId];
          return (
            <span
              class="text-blue-500 underline cursor-pointer"
              onClick={() => cellClick(Type.CHECK_FAIL, it.dictItemId, it.label, record)}
            >
              {record[checkUnqKey]?.[it.dictItemId]}
            </span>
          );
        },
      })),
    );
    cloneColumns[3].children?.unshift(
      ...(res2 || []).map((it) => ({
        dataIndex: [quarantineUnqKey, it.dictItemId],
        title: it.label,
        width: it.label.length * 16,
        customRender: ({ record }) => {
          if (record.isCount) return record[quarantineUnqKey]?.[it.dictItemId];
          return (
            <span
              class="text-blue-500 underline cursor-pointer"
              onClick={() => cellClick(Type.QUA_FAIL, it.dictItemId, it.label, record)}
            >
              {record[quarantineUnqKey]?.[it.dictItemId]}
            </span>
          );
        },
      })),
    );
    cloneColumns[4].children?.unshift(
      ...(res3 || []).map((it) => ({
        dataIndex: [trackUnqKey, it.dictItemId],
        title: it.label,
        width: it.label.length * 16,
        customRender: ({ record }) => {
          if (record.isCount) return record[trackUnqKey]?.[it.dictItemId];
          return (
            <span
              class="text-blue-500 underline cursor-pointer"
              onClick={() => cellClick(Type.FTRK_FAIL, it.dictItemId, it.label, record)}
            >
              {record[trackUnqKey]?.[it.dictItemId]}
            </span>
          );
        },
      })),
    );
    setColumns(cloneColumns);
    reload();
  });
  function cellClick(
    unqBagQuaType: string,
    failedCode: string | undefined,
    title: string,
    record: Recordable,
  ) {
    const values = getForm().getFieldsValue();
    openModal(true, {
      failedCode,
      title,
      ...getFormatParams(values),
      stationNo: record.stationNo,
      unqBagQuaType,
    });
  }
</script>
