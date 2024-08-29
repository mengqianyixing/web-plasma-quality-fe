<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable" ref="tableRef" class="tableHeight" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './data';
  import { PageWrapper } from '@/components/Page';
  import { message } from 'ant-design-vue';
  import { getListApi } from '@/api/query-statistics/titerPlasmaStat';
  import { isArray, isObject } from '@/utils/is';
  import { GetApiSearchPlasmaPrivilegeCountResponse } from '@/api/type/queryStatistics';
  import { useSticky } from '@/hooks/web/useSticky';
  import { ref } from 'vue';

  defineOptions({ name: 'TiterPlasmaStat' });
  const tableRef = ref();
  const totalStyle = useSticky(tableRef);
  const [registerTable, { getForm, reload }] = useTable({
    api: getListApi,
    columns,
    formConfig: {
      schemas: searchFormSchema,
      submitFunc,
    },
    pagination: false,
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: false,
    afterFetch: (res: GetApiSearchPlasmaPrivilegeCountResponse) => {
      const formatData = res.map((row) => {
        row['H'] = row.details.find((it) => it.level === '高效价') || {};
        row['L'] = row.details.find((it) => it.level === '低效价') || {};
        row['N'] = row.details.find((it) => it.level === '合格普通浆') || {};
        return row;
      });
      const row = getCountRow(formatData);
      return [...formatData, row];
    },
    immediate: false,
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
    ['H', 'L', 'N'].map((it) => {
      row[it]['ratio'] = row[it]['bagCount'] / row['bagCount'];
    });

    return { ...row, stationName: '合计', rawImm: '--' };
  }
  function submitFunc() {
    if (getFormIsNotNull()) {
      reload();
      return Promise.resolve();
    }
    message.warning('请选择特免检测项目');
    return Promise.reject();
  }
  function getFormIsNotNull() {
    const values = getForm().getFieldsValue();
    return values.immunity;
  }
</script>
<style scoped lang="scss">
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

  .tableHeight :deep(thead tr th) {
    padding: 5px !important;
  }
</style>
