<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #otherNum="{ record }: { record: Recordable }">
        <span v-if="record.isCount"> {{ record[otherNumUnqKey][numKey] }}</span>
        <span
          v-else
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="cellClick(Type.OTHER, void 0, '其他无后续信息', record)"
        >
          {{ record[otherNumUnqKey][numKey] }}
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
    backTrackUnqKey,
    followTrackNumUnqKey,
    projectsKey,
    otherNumUnqKey,
    numKey,
    ratioKey,
    trackNumKey,
    Type,
  } from './data';
  import { PageWrapper } from '@/components/Page';
  import {
    DictionaryItemKeyEnum,
    DictionaryReasonEnum,
    getSysSecondaryDictionary,
  } from '@/api/_dictionary';
  import { cloneDeep } from 'lodash-es';
  import { useModal } from '@/components/Modal';
  import { isArray, isObject } from '@/utils/is';
  import { getListApi } from '@/api/query-statistics/followDisqualificationStatistics';
  import TabelModal from './tabelModal.vue';

  defineOptions({ name: 'FollowDisqualificationStatistics' });
  const cloneColumns = cloneDeep(columns);

  const [registerModal, { openModal }] = useModal();

  const [registerTable, { getForm, reload, setColumns }] = useTable({
    immediate: false,
    api: getListApi,
    columns: cloneColumns,
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
    pagination: false,
    showIndexColumn: false,
    afterFetch: (res: Recordable[]) => {
      const formatData = res.map((row) => ({
        ...row,
        [backTrackUnqKey]: { ...row[backTrackUnqKey], ...row[backTrackUnqKey][projectsKey] },
        [followTrackNumUnqKey]: {
          ...row[followTrackNumUnqKey],
          ...row[followTrackNumUnqKey][projectsKey],
        },
      }));
      return [...formatData, getCountRow(formatData)];
    },
  });
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
    [backTrackUnqKey, followTrackNumUnqKey, otherNumUnqKey].forEach((key) => {
      row[key][ratioKey] = row[key][numKey] / (row[trackNumKey] || 1);
    });
    return { ...row, batch: '--', batchCount: '--', year: '合计', isCount: true };
  }
  getSysSecondaryDictionary({
    dataKey: DictionaryReasonEnum.PlasmaFailedReason as any,
    dictItemTypes: [DictionaryItemKeyEnum.Track],
  }).then((res) => {
    cloneColumns[2].children?.unshift(
      ...(res || []).map((it) => ({
        dataIndex: [backTrackUnqKey, it.dictItemId],
        title: it.label,
        width: it.label.length * 18,
        customRender: ({ record }) => {
          if (record.isCount) return record[backTrackUnqKey]?.[it.dictItemId];
          return (
            <span
              class="text-blue-500 underline cursor-pointer"
              onClick={() =>
                cellClick(Type.BACK, it.dictItemId, cloneColumns[2].title + it.label, record)
              }
            >
              {record[backTrackUnqKey]?.[it.dictItemId]}
            </span>
          );
        },
      })),
    );
    cloneColumns[3].children?.unshift(
      ...(res || []).map((it) => ({
        dataIndex: [followTrackNumUnqKey, it.dictItemId],
        title: it.label,
        width: it.label.length * 18,
        customRender: ({ record }) => {
          if (record.isCount) return record[followTrackNumUnqKey]?.[it.dictItemId];
          return (
            <span
              class="text-blue-500 underline cursor-pointer"
              onClick={() =>
                cellClick(Type.FOLLOW, it.dictItemId, cloneColumns[3].title + it.label, record)
              }
            >
              {record[followTrackNumUnqKey]?.[it.dictItemId]}
            </span>
          );
        },
      })),
    );
    setColumns(cloneColumns);
    reload();
  });

  function cellClick(
    trackType: string,
    failedCode: string | undefined,
    title: string,
    record: Recordable,
  ) {
    const values = getForm().getFieldsValue();
    openModal(true, {
      failedCode,
      title,
      ...values,
      year: record.year,
      trackType,
    });
  }
</script>
