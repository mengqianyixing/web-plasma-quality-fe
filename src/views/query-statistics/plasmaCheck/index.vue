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
  </PageWrapper>
</template>
<script lang="ts" setup>
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
  } from './data';
  import { PageWrapper } from '@/components/Page';
  import { TabPane, Tabs } from 'ant-design-vue';
  import { nextTick, ref } from 'vue';
  import { cloneDeep } from 'lodash-es';
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

  const activeKey = ref('0');
  const CheckColumns = cloneDeep(checkColumns);
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
            ...row[checkUnKey].projects.reduce((t, c) => {
              t[c.key] = c.value;
              return t;
            }, {}),
          },
          [exteriorKey]: {
            ...row[exteriorKey],
            ...row[exteriorKey].projects.reduce((t, c) => {
              t[c.key] = c.value;
              return t;
            }, {}),
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

  const [registerTable] = useTable({
    immediate: false,
    api: () => Promise.resolve([]),
    emptyDataIsShowTable: false,
    formConfig: { schemas: searchFormSchema },
    size: 'small',
    useSearchForm: true,
    beforeFetch: (p) => {
      params = p;
      reload();
      return p;
    },
  });
  function reload() {
    nextTick(() => {
      tableList[activeKey.value][1].reload();
    });
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
    return { ...row, batch: '--', batchCount: '--', stationName: '合计' };
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
      dictItemTypes: [DictionaryItemKeyEnum.PlasmaAccept],
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
      })),
    );
    CheckColumns[6].children?.unshift(
      ...(res2 || []).map((it) => ({
        dataIndex: [checkUnKey, it.dictItemId],
        title: it.label,
        width: it.label.length * 18,
      })),
    );
    tableList[0][1].setColumns(CheckColumns);
    reload();
  });
</script>
