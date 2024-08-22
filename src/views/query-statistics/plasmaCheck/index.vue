<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <div>
      <BasicTable @register="registerTable" style="padding-bottom: 0" />
    </div>
    <Tabs
      v-model:activeKey="activeKey"
      class="flex-1 bg-white pb-16px m-16px"
      type="card"
      size="small"
      @change="reload"
    >
      <TabPane :tab="tabList[0].title" :key="tabList[0].key" force-render>
        <BasicTable @register="tableList[0][0]" class="tabel1" ref="tableRef1" />
      </TabPane>
      <TabPane :tab="tabList[0].title" :key="tabList[1].key" force-render>
        <BasicTable @register="tableList[1][0]" class="tabel2" ref="tableRef2" />
      </TabPane>
      <TabPane :tab="tabList[0].title" :key="tabList[2].key" force-render>
        <BasicTable @register="tableList[2][0]" class="tabel3" ref="tableRef3" />
      </TabPane>
    </Tabs>
    <TabelModal @register="registerModal" />
  </PageWrapper>
</template>
<script lang="tsx" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import {
    checkColumns,
    searchFormSchema,
    titerColumns,
    followUpColumns,
    checkUnKey,
    exteriorKey,
    bagCountKey,
    numKey,
    ratioKey,
    checkKey,
    dateKey,
    batchKey,
  } from './data';
  import { PageWrapper } from '@/components/Page';
  import { TabPane, Tabs, message } from 'ant-design-vue';
  import { nextTick, ref } from 'vue';
  import { cloneDeep, get } from 'lodash-es';
  import { isArray, isObject } from '@/utils/is';
  import {
    getCheckListApi,
    getFollowUpListApi,
    getTiterListApi,
  } from '@/api/query-statistics/plasmaCheck';
  import {
    DictionaryItemKeyEnum,
    DictionaryReasonEnum,
    getSysSecondaryDictionary,
  } from '@/api/_dictionary';
  import { useModal } from '@/components/Modal';
  import TabelModal from './tabelModal.vue';
  import { useSticky } from '@/hooks/web/useSticky';

  defineOptions({ name: 'PlasmaTest' });

  const [registerModal, { openModal }] = useModal();
  const activeKey = ref('0');
  const tableRef1 = ref();
  const tableRef2 = ref();
  const tableRef3 = ref();

  const totalStyle1 = useSticky(tableRef1);
  const totalStyle2 = useSticky(tableRef2);
  const totalStyle3 = useSticky(tableRef3);

  const CheckColumns = cloneDeep(
    checkColumns(({ record, key, label, type }) => {
      if (record.isCount) return get(record, key);
      return (
        <span
          class="text-blue-500 underline cursor-pointer"
          onClick={() => cellClick(null, label, record, type)}
        >
          {get(record, key)}
        </span>
      );
    }),
  );
  let params = {};
  const tabList = [
    {
      api: getCheckListApi,
      title: '检测结果',
      key: '0',
      columns: CheckColumns,
      afterFetch: (res: Recordable[]) => {
        setProps({ loading: false });
        const formatData = res.map((row) => ({
          ...row,
          [checkUnKey]: {
            ...row[checkUnKey],
            ...row[checkUnKey].projects,
          },
          [exteriorKey]: {
            ...row[exteriorKey],
            ...row[exteriorKey].projects,
          },
        }));
        const row = getCheckCountRow(formatData);
        return [...formatData, row];
      },
    },
    {
      api: getTiterListApi,
      title: '效价结果',
      key: '1',
      columns: titerColumns,
      afterFetch: (res: Recordable[]) => {
        setProps({ loading: false });
        const row = getTiterCountRow(res);
        return [...res, row];
      },
    },
    {
      api: getFollowUpListApi,
      title: '续追踪不合格',
      key: '2',
      columns: followUpColumns,
      afterFetch: (res: Recordable[]) => {
        setProps({ loading: false });
        const row = getFollowUpCountRow(res);
        return [...res, row];
      },
    },
  ];

  const tableList = tabList.map((tab) =>
    useTable({
      immediate: false,
      showIndexColumn: false,
      api: tab.api,
      columns: tab.columns,
      pagination: false,
      size: 'small',
      striped: false,
      bordered: true,
      afterFetch: tab.afterFetch,
      beforeFetch: () => params,
    }),
  );

  const [registerTable, { getForm, setProps }] = useTable({
    immediate: false,
    api: () => Promise.resolve([]),
    emptyDataIsShowTable: false,
    formConfig: { schemas: searchFormSchema, submitFunc },
    size: 'small',
    useSearchForm: true,
  });
  function getFormDateIsNotNull() {
    const values = getForm().getFieldsValue();
    params = values;
    return [...dateKey, ...batchKey].some((key) => values[key]);
  }
  function submitFunc() {
    if (getFormDateIsNotNull()) {
      reload();
      return Promise.resolve();
    }
    message.warning('请至少选择日期或输入血浆批号');
    return Promise.reject();
  }
  function reload() {
    setProps({ loading: false });
    if (getFormDateIsNotNull()) {
      nextTick(() => {
        setProps({ loading: true });
        tableList[activeKey.value][1].reload();
      });
    }
  }

  function getTiterCountRow(data: Recordable[]) {
    const row = titerColumns.reduce((row, { dataIndex }) => {
      row[dataIndex as string] = 0;
      return row;
    }, {});
    const bagCountMap = new Map();
    data.forEach((it) => {
      for (const key in it) {
        const data = it[key];
        row[key] += data || 0;
      }
      bagCountMap.set(it['stationName'] + it['rawImm'], it['bagCount']);
    });
    row[bagCountKey] = [...bagCountMap.values()].reduce((t, c) => {
      t += c;
      return t;
    }, 0);
    row[ratioKey] = row['titerCount'] / (row[bagCountKey] || 1);
    return {
      ...row,
      titerTypes: '--',
      rawImm: '--',
      stationName: '合计',
    };
  }
  function getCheckCountRow(data: Recordable[]) {
    const row = CheckColumns.reduce((row, { dataIndex, children = [] }) => {
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
    [checkKey, checkUnKey, exteriorKey].forEach((key) => {
      row[key][ratioKey] = row[key][numKey] / (row[bagCountKey] || 1);
    });
    return { ...row, batch: '--', stationName: '合计', isCount: true };
  }
  function getFollowUpCountRow(data: Recordable[]) {
    const row = followUpColumns.reduce((row, { dataIndex, children = [] }) => {
      row[dataIndex as string] = 0;
      children.forEach(({ dataIndex: ci }) => {
        row[ci as string] = 0;
      });
      return row;
    }, {});
    data.forEach((it) => {
      for (const key in it) {
        const data = it[key];
        row[key] += data || 0;
      }
    });
    row['sRatio'] = row['sTrack'] / (row[bagCountKey] || 1);
    row['fRatio'] = row['fTrack'] / (row[bagCountKey] || 1);
    row['ratio'] = row['count'] / (row[bagCountKey] || 1);

    return { ...row, batch: '--', stationName: '合计' };
  }

  Promise.all([
    getSysSecondaryDictionary({
      dataKey: DictionaryReasonEnum.PlasmaFailedReason as any,
      dictItemTypes: [DictionaryItemKeyEnum.PlasmaAccept, DictionaryItemKeyEnum.SampleAccept],
      show: 1,
    }),
    getSysSecondaryDictionary({
      dataKey: DictionaryReasonEnum.PlasmaFailedReason as any,
      dictItemTypes: [DictionaryItemKeyEnum.Test],
    }),
  ]).then(([res1, res2]) => {
    CheckColumns[5].children?.unshift(
      ...(res1 || []).map((it) => ({
        dataIndex: [exteriorKey, it.dictItemId],
        title: it.label,
        width: it.label.length * 18,
        customRender: ({ record, value }) => {
          if (record.isCount) return value || 0;
          return (
            <span
              class="text-blue-500 underline cursor-pointer"
              onClick={() => cellClick(it.dictItemId, it.label, record)}
            >
              {value || 0}
            </span>
          );
        },
      })),
    );
    CheckColumns[6].children?.unshift(
      ...(res2 || []).map((it) => ({
        dataIndex: [checkUnKey, it.dictItemId],
        title: it.label,
        width: it.label.length * 18,
        customRender: ({ record, value }) => {
          if (record.isCount) return value || 0;
          return (
            <span
              class="text-blue-500 underline cursor-pointer"
              onClick={() => cellClick(it.dictItemId, it.label, record)}
            >
              {value || 0}
            </span>
          );
        },
      })),
    );
    tableList[0][1].setColumns(CheckColumns);
  });
  function cellClick(failedCode: string | null, title: string, record: Recordable, type?: string) {
    openModal(true, {
      failedCode,
      title,
      type,
      ...params,
      stationNo: record.stationNo,
    });
  }
</script>
<style scoped lang="scss">
  .root :deep(.ant-table-body) {
    position: static;
  }

  :deep(.ant-table-tbody tr:last-child) {
    z-index: 9;
    background-color: #f5f5f5;

    & > td {
      background-color: #f5f5f5;
    }
  }

  .tabel1 :deep(.ant-table-tbody tr:last-child) {
    position: v-bind('totalStyle1.position');
    top: v-bind('totalStyle1.top');
    bottom: v-bind('totalStyle1.bottom');
  }

  .tabel2 :deep(.ant-table-tbody tr:last-child) {
    position: v-bind('totalStyle2.position');
    top: v-bind('totalStyle2.top');
    bottom: v-bind('totalStyle2.bottom');
  }

  .tabel3 :deep(.ant-table-tbody tr:last-child) {
    position: v-bind('totalStyle3.position');
    top: v-bind('totalStyle3.top');
    bottom: v-bind('totalStyle3.bottom');
  }
</style>
