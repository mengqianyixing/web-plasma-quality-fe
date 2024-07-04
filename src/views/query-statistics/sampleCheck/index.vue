<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable" class="tableHeight" />
    <TabelModal @register="registerModal" />
    <TabelModal2 @register="registerModal2" />
    <TabelModal3 @register="registerModal3" />
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
  import { useModal } from '@/components/Modal';
  import TabelModal from './tabelModal.vue';
  import TabelModal2 from './tabelModal2.vue';
  import TabelModal3 from './tabelModal3.vue';

  defineOptions({ name: 'SampleCheck' });

  const [registerModal, { openModal }] = useModal();
  const [registerModal2, { openModal: openModal2 }] = useModal();
  const [registerModal3, { openModal: openModal3 }] = useModal();
  const [registerTable, { setColumns, getColumns, getForm }] = useTable({
    api: getListApi,
    columns: columns(void 0, void 0, void 0),
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
    const _columns = columns(
      ({ record, column, value }) => {
        if (!record.isCount) return value || 0;
        return (
          <span
            class="text-blue-500 underline cursor-pointer"
            onClick={() => cellClick(column.dataIndex, column.title, null)}
          >
            {value || 0}
          </span>
        );
      },
      ({ record, column, value }) => {
        return (
          <span
            class="text-blue-500 underline cursor-pointer"
            onClick={() => cellClick2(column.dataIndex, column.title, null, record)}
          >
            {value || 0}
          </span>
        );
      },
      ({ record, value }) => {
        return (
          <span class="text-blue-500 underline cursor-pointer" onClick={() => cellClick3(record)}>
            {value || 0}
          </span>
        );
      },
    );
    _columns[8].children?.unshift(
      ...(res1 || []).map((it) => ({
        dataIndex: ['failed', it.dictItemId],
        title: it.label,
        width: it.label.length * 16,
        ellipsis: false,
        customRender: ({ record, value }) => {
          return (
            <span
              class="text-blue-500 underline cursor-pointer"
              onClick={() => cellClick2('failed', it.label, it.dictItemId, record)}
            >
              {value || 0}
            </span>
          );
        },
      })),
    );
    setColumns(_columns);
  });

  function cellClick(key: Array<string> | string, title: string, failedCode: string | null) {
    const type = isArray(key) ? key[0] + key[1].slice(0, 1).toUpperCase() + key[1].slice(1) : key;
    const values = getForm().getFieldsValue();
    openModal(true, { type, title, failedCode, ...values });
  }
  function cellClick2(
    key: Array<string> | string,
    title: string,
    failedCode: string | null,
    record: Recordable,
  ) {
    const type = isArray(key) ? key[0] + key[1].slice(0, 1).toUpperCase() + key[1].slice(1) : key;
    const values = getForm().getFieldsValue();
    openModal2(true, {
      type,
      title,
      failedCode,
      sampleType: record.sampleType === '--' ? void 0 : record.sampleType,
      stationNo: record.sampleType === '--' ? void 0 : record.stationNo,
      ...values,
    });
  }
  function cellClick3(record: Recordable) {
    const values = getForm().getFieldsValue();

    openModal3(true, {
      sampleType: record.sampleType === '--' ? void 0 : record.sampleType,
      stationNo: record.sampleType === '--' ? void 0 : record.stationNo,
      ...values,
    });
  }
  function getCountRow(data: Recordable[]) {
    const row = getColumns().reduce((row, { dataIndex, children = [] }) => {
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
    row['check']['ratio'] = row['check']['count'] / (row['checkCount'] || 1);
    row['failed']['ratio'] = row['failed']['count'] / (row['checkCount'] || 1);
    row['verification']['ratio'] = row['verification']['count'] / (row['sampleCount'] || 1);
    return { ...row, stationName: '合计', sampleType: '--', isCount: true };
  }
</script>
<style scoped lang="less">
  .tableHeight :deep(thead tr th) {
    padding: 5px !important;
  }
</style>
