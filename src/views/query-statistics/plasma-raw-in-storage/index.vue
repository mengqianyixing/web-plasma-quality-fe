<template>
  <div class="h-full">
    <div class="h-2/3 mb-50px">
      <BasicTable @register="registerTable">
        <template #toolbar>
          <a-button type="primary">打印</a-button>
        </template>
      </BasicTable>
    </div>
    <div class="h-1/4 p-4">
      <BasicTable
        @register="registerFooterTable"
        :dataSource="footerTableData"
        :columns="formatFooterColumns"
      >
        <template #summary>
          <div class="w-85vw">
            备注；
            {{ footerTableData[0]?.remark }}
          </div>
        </template>
      </BasicTable>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { BasicColumn, BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema, footerColumns } from './storage.data';
  import { ref } from 'vue';

  import { getPlasmaRawInStorage } from '@/api/query-statistics/plasma';
  import { GetApiCoreBagOutInStorageStatisticResponse } from '@/api/type/queryStatistics';

  defineOptions({ name: 'PlasmaRawInStorage' });

  const footerTableData = ref<any[]>([]);
  const formatFooterColumns = ref<BasicColumn[]>([]);
  const [registerTable, { getRawDataSource }] = useTable({
    api: getPlasmaRawInStorage,
    afterFetch: (data) => {
      const _data: GetApiCoreBagOutInStorageStatisticResponse = getRawDataSource();

      footerTableData.value = [
        {
          ..._data,
        },
      ];

      formatFooterColumns.value = footerColumns.map((it) => ({
        ...it,
        title: it.title! + `(${_data.quantityUnit!})`,
      }));

      return data;
    },
    columns,
    formConfig: {
      schemas: searchFormSchema,
      fieldMapToTime: [['timeField', ['beginAt', 'endAt'], 'YYYY-MM-DD']],
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : '';
      },
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'stationDeatailList',
    },
    clickToRowSelect: false,
    size: 'small',
    striped: false,
    useSearchForm: true,
    pagination: false,
    bordered: true,
    showIndexColumn: true,
    showSummary: true,
    summaryFunc: handleSummary,
    isCanResizeParent: true,
  });

  const [registerFooterTable] = useTable({
    clickToRowSelect: false,
    size: 'small',
    striped: false,
    useSearchForm: false,
    bordered: true,
    pagination: false,
    showSummary: true,
    isCanResizeParent: true,
    showIndexColumn: false,
  });

  function handleSummary(tableData: any[]) {
    const inOfMonth = tableData.reduce((prev, curr) => prev + curr.inOfMonth, 0);
    const inOfYear = tableData.reduce((prev, curr) => prev + curr.inOfYear, 0);
    return [
      {
        stationName: '总计',
        inOfMonth,
        inOfYear,
      },
    ];
  }
</script>
<style scoped></style>
