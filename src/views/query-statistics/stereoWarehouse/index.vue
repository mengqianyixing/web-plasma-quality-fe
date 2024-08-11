<template>
  <PageWrapper dense contentFullHeight fixedHeight class="root">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleExport" :loading="loading"> 导出 </a-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './data';
  import { PageWrapper } from '@/components/Page';
  import { getListApi } from '@/api/query-statistics/stereoWarehouse';
  import { jsonToSheetXlsx, formatData, getHeader } from '@/components/Excel/src/Export2Excel';
  import { useRouter } from 'vue-router';
  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
  import { ref } from 'vue';
  import { message } from 'ant-design-vue';

  const globalApiStore = useGlobalApiStoreWithOut();
  const { currentRoute } = useRouter();
  defineOptions({ name: 'StereoWarehouse' });
  const loading = ref(false);

  const [registerTable, { getForm, getDataSource }] = useTable({
    api: getListApi,
    columns,
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
    immediate: false,
    showSummary: true,
    summaryFunc: handleSummary,
  });

  function handleSummary() {
    const origin = getDataSource();
    return [
      {
        stationName: '合计',
        bagCount: origin[0]?.allBagCount,
        totalWeight: origin[0]?.allTotalWeight,
      },
    ];
  }

  async function handleExport() {
    try {
      loading.value = true;
      const { getFieldsValue } = getForm();
      const pageSize = (await globalApiStore.getSysParamsValue('maxPageSize')) as string;
      const data = await getListApi({ ...getFieldsValue(), currPage: 1, pageSize } as any);
      if ((data.totalCount || 0) > Number(pageSize))
        return message.warning('最多只能导出【' + pageSize + '】条数据');
      const dataExport = data.result || [];
      dataExport.push({
        stationName: '合计',
        batchNo: '',
        bagCount: dataExport.reduce((acc, item) => acc + (item.bagCount ?? 0), 0),
        totalWeight: dataExport.reduce((acc, item) => acc + (item.totalWeight ?? 0), 0),
      });

      const { rows, merges: headerMerge, lastLevelCols } = getHeader(columns);
      const { result, merge: bodyMerge } = formatData(lastLevelCols, dataExport, rows.length);
      jsonToSheetXlsx({
        data: [...rows, ...result],
        json2sheetOpts: { skipHeader: true },
        merges: [...headerMerge, ...bodyMerge],
        filename: currentRoute.value.meta.title + '.xlsx',
      });
    } finally {
      loading.value = false;
    }
  }
</script>
