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
      <TabPane v-for="(tab, i) in tabList" :key="tab.key" :tab="tab.title">
        <BasicTable @register="tableList[i][0]" />
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

  defineOptions({ name: 'PlasmaTest' });

  const [registerModal, { openModal }] = useModal();
  const activeKey = ref('0');
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

  const [registerTable, { getForm }] = useTable({
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
    return dateKey.some((key) => values[key]);
  }
  function submitFunc() {
    if (getFormDateIsNotNull()) {
      reload();
      return Promise.resolve();
    }
    message.warning('请选择日期后进行查询');
    return Promise.reject();
  }
  function reload() {
    if (getFormDateIsNotNull()) {
      nextTick(() => {
        tableList[activeKey.value][1].reload();
      });
    }
  }

  function getTiterCountRow(data: Recordable[]) {
    const row = titerColumns.reduce((row, { dataIndex }) => {
      row[dataIndex as string] = 0;
      return row;
    }, {});
    data.forEach((it) => {
      for (const key in it) {
        const data = it[key];
        row[key] += data || 0;
      }
    });
    row[ratioKey] = row['titerCount'] / (row[bagCountKey] || 1);
    return { ...row, titerTypes: '--', rawImm: '--', stationName: '合计' };
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
        customRender: ({ record }) => {
          if (record.isCount) return record[exteriorKey]?.[it.dictItemId];
          return (
            <span
              class="text-blue-500 underline cursor-pointer"
              onClick={() => cellClick(it.dictItemId, it.label, record)}
            >
              {record[exteriorKey]?.[it.dictItemId]}
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
        customRender: ({ record }) => {
          if (record.isCount) return record[checkUnKey]?.[it.dictItemId];
          return (
            <span
              class="text-blue-500 underline cursor-pointer"
              onClick={() => cellClick(it.dictItemId, it.label, record)}
            >
              {record[checkUnKey]?.[it.dictItemId]}
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
