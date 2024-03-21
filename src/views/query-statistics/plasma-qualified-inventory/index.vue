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
  import { columns, searchFormSchema } from './inventory.data';

  import { getPlasmaQualifiedInventory } from '@/api/query-statistics/plasma';
  import { ref } from 'vue';
  import { formatData, getHeader, jsonToSheetXlsx } from '@/components/Excel/src/Export2Excel';
  import { useRouter } from 'vue-router';
  import { PageWrapper } from '@/components/Page';
  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';

  const globalApiStore = useGlobalApiStoreWithOut();
  defineOptions({ name: 'PlasmaQualifiedInventory' });

  const { currentRoute } = useRouter();

  const [registerTable, { getForm }] = useTable({
    api: getPlasmaQualifiedInventory,
    columns,
    formConfig: {
      schemas: searchFormSchema,
      alwaysShowLines: 7,
      showAdvancedButton: true,
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : '';
      },
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
    },
    clickToRowSelect: false,
    size: 'small',
    canResize: true,
    striped: false,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: true,
    pagination: false,
    showSummary: true,
    summaryFunc: handleSummary,
  });

  const loading = ref(false);
  async function handleExport() {
    try {
      loading.value = true;
      const pageSize = (await globalApiStore.getSysParamsValue('maxPageSize')) as string;

      const data = await getPlasmaQualifiedInventory({
        ...getForm().getFieldsValue(),
        currPage: 1,
        pageSize,
      } as any);
      const { rows, merges: headerMerge, lastLevelCols } = getHeader(columns);
      const { result, merge: bodyMerge } = formatData(lastLevelCols, data || [], rows.length);
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

  function handleSummary(tableData: any[]) {
    let immTypeCount = 0;
    let immTypeWeight = 0;
    tableData.forEach((item) => {
      immTypeCount += item.immTypeCount;
      immTypeWeight += item.immTypeWeight;
    });
    return [
      {
        immType: '总计',
        immTypeCount,
        immTypeWeight,
      },
    ];
  }
</script>
<style scoped>
  .root :deep(.ant-table-footer) {
    position: sticky;
    bottom: 3%;
    padding: 0 !important;
    border: 2px solid #f0f0f0 !important;
  }
</style>
