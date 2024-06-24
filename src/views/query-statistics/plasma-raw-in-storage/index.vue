<template>
  <div class="h-full">
    <div class="h-2/3 mb-50px">
      <BasicTable @register="registerTable">
        <template #toolbar>
          <a-button
            type="primary"
            v-auth="SearchManager.PlasmaRawInStoragePrint"
            @click="handlePrint"
            :loading="reportLoading"
          >
            打印
          </a-button>
        </template>
      </BasicTable>
    </div>
    <div class="h-1/4 p-4">
      <BasicTable
        @register="registerFooterTable"
        :dataSource="footerTableData"
        :columns="formatFooterColumns"
        class="tableHeight"
      >
        <template #summary>
          <div class="w-85vw">
            {{ footerTableData[0]?.remark }}
          </div>
        </template>
      </BasicTable>
    </div>
    <ReportModal @register="registerReportModal" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicColumn, BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema, footerColumns } from './storage.data';
  import { ref } from 'vue';

  import { getPlasmaRawInStorage } from '@/api/query-statistics/plasma';
  import { GetApiCoreBagOutInStorageStatisticResponse } from '@/api/type/queryStatistics';
  import { SearchManager } from '@/enums/authCodeEnum';
  import { getReportApi } from '@/api/report';
  import dayjs from 'dayjs';
  import { useModal } from '@/components/Modal';
  import ReportModal from '@/components/ReportModal/index.vue';

  defineOptions({ name: 'PlasmaRawInStorage' });

  const [registerReportModal, { openModal: openReportModal }] = useModal();

  const footerTableData = ref<any[]>([]);
  const formatFooterColumns = ref<BasicColumn[]>([]);
  const [registerTable, { getRawDataSource, getForm }] = useTable({
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

  function accAdd(arg1: number, arg2: number) {
    let r1: number, r2: number, m: number;
    try {
      r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
  }

  function handleSummary(tableData: any[]) {
    const inOfMonth = tableData.reduce((prev, curr) => accAdd(prev, curr.inOfMonth), 0);
    const inOfYear = tableData.reduce((prev, curr) => accAdd(prev, curr.inOfYear), 0);
    return [
      {
        stationName: '总计',
        inOfMonth,
        inOfYear,
      },
    ];
  }

  const reportLoading = ref(false);
  async function handlePrint() {
    try {
      reportLoading.value = true;
      const res = await getReportApi({
        reportKey: 'PLASMA_RECEPTION',
        contentKey: dayjs().valueOf().toString(),
        params: encodeURIComponent(
          JSON.stringify({
            ...getForm().getFieldsValue(),
          }),
        ),
      } as any);
      openReportModal(true, window.URL.createObjectURL(res));
    } finally {
      reportLoading.value = false;
    }
  }
</script>
<style scoped lang="less">
  .tableHeight :deep(thead tr th) {
    padding: 5px !important;
  }
</style>
