<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable" class="tableHeight" ref="tableRef">
      <template #[checkUnqKey]="{ record }: { record: Recordable }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="cellClick(Type.CHECK_FAIL, void 0, '检测不合格合计', record)"
        >
          {{ record[checkUnqKey]?.[numKey] }}
        </span>
      </template>
      <template #[quarantineUnqKey]="{ record }: { record: Recordable }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="cellClick(Type.QUA_FAIL, void 0, '检疫期不合格合计', record)"
        >
          {{ record[quarantineUnqKey]?.[numKey] }}
        </span>
      </template>
      <template #[trackUnqKey]="{ record }: { record: Recordable }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="cellClick(Type.FTRK_FAIL, void 0, '续追踪不合格合计', record)"
        >
          {{ record[trackUnqKey]?.[numKey] }}
        </span>
      </template>
    </BasicTable>
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
  import { nextTick, ref } from 'vue';
  import { useSticky } from '@/hooks/web/useSticky';

  defineOptions({ name: 'QuarantinePeriodUnqualifiedStatistics' });

  const tableRef = ref();
  const totalStyle = useSticky(tableRef);
  let formData: Recordable = {};
  const cloneColumns = cloneDeep(columns);
  const [registerModal, { openModal }] = useModal();
  const dictMap = new Map();

  const [registerTable, { setColumns, getForm }] = useTable({
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
    formData = formatParams;
    return formatParams;
  }

  async function handlerChange(field: string) {
    const { setFieldsValue, getFieldsValue, resetFields } = getForm();
    await nextTick();
    const values = getFieldsValue();
    resetFields();
    if (field === 'stationNo') {
      return setFieldsValue(values);
    } else if (field === 'blockBy' || field === '[blockStartDate, blockEndDate]') {
      setFieldsValue({
        stationNo: values.stationNo,
        blockBy: values.blockBy,
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
      if (!row[bagNumKey]) return 0;
      row[key][ratioKey] = row[key][numKey] / row[bagNumKey];
    });
    return {
      ...row,
      batch: '--',
      batchCount: '--',
      stationName: '合计',
      isCount: true,
      stationNo: void 0,
    };
  }
  Promise.all([
    getSysSecondaryDictionary({
      dataKey: DictionaryReasonEnum.PlasmaFailedReason as any,
      dictItemTypes: [DictionaryItemKeyEnum.Test],
      show: 1,
    }),
    getSysSecondaryDictionary({
      dataKey: DictionaryReasonEnum.PlasmaFailedReason as any,
      dictItemTypes: [DictionaryItemKeyEnum.Quarantine],
      show: 1,
    }),
    getSysSecondaryDictionary({
      dataKey: DictionaryReasonEnum.PlasmaFailedReason as any,
      dictItemTypes: [DictionaryItemKeyEnum.Track],
      show: 1,
    }),
  ]).then(([res1, res2, res3]) => {
    cloneColumns[2].children?.unshift(
      ...(res1 || []).map((it) => ({
        dataIndex: [checkUnqKey, it.dictItemId],
        title: it.label,
        width: it.label.length * 16,
        customRender: ({ record }) => {
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
    [...res1, ...res2, ...res3].forEach((it) => {
      dictMap.set(it.dictItemId, it.label);
    });
    setColumns(cloneColumns);
  });
  function cellClick(
    unqBagQuaType: string,
    failedCode: string | undefined,
    title: string,
    record: Recordable,
  ) {
    openModal(true, {
      failedCode,
      title,
      ...formData,
      stationNo: record.stationNo || formData.stationNo,
      unqBagQuaType,
      dictMap,
    });
  }
</script>
<style scoped lang="scss">
  .tableHeight :deep(thead tr th) {
    padding: 5px !important;
  }

  :deep(.ant-table-tbody tr:last-child) {
    position: v-bind('totalStyle.position');
    z-index: 9;
    top: v-bind('totalStyle.top');
    bottom: v-bind('totalStyle.bottom');
    background-color: #f5f5f5;

    & > td {
      background-color: #f5f5f5;
    }
  }
</style>
