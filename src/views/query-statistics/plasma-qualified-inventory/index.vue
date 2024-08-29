<template>
  <PageWrapper dense contentFullHeight fixedHeight class="root">
    <BasicTable @register="registerTable" ref="tableRef">
      <template #toolbar>
        <a-button
          type="primary"
          @click="handleExport"
          :loading="loading"
          v-auth="SearchManager.PlasmaQualifiedInventoryExport"
        >
          导出
        </a-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './inventory.data';
  import { SearchManager } from '@/enums/authCodeEnum';

  import { getPlasmaQualifiedInventory } from '@/api/query-statistics/plasma';
  import { ref } from 'vue';
  import { formatData, getHeader, jsonToSheetXlsx } from '@/components/Excel/src/Export2Excel';
  import { useRouter } from 'vue-router';
  import { PageWrapper } from '@/components/Page';
  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
  import { message } from 'ant-design-vue';
  import dayjs from 'dayjs';
  import { useSticky } from '@/hooks/web/useSticky';
  import { GetApiSearchBankQualifiedInventoryStatisticQueryDateResponse } from '@/api/type/queryStatistics';

  const globalApiStore = useGlobalApiStoreWithOut();
  defineOptions({ name: 'PlasmaQualifiedInventory' });

  const { currentRoute } = useRouter();
  const tableRef = ref();
  const totalStyle = useSticky(tableRef);
  const [registerTable, { getForm }] = useTable({
    immediate: false,
    api: getPlasmaQualifiedInventory,
    columns,
    formConfig: {
      schemas: searchFormSchema,
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
    showIndexColumn: false,
    pagination: false,
    afterFetch: (res) => {
      const count = handleSummary(res);
      return [...res, count];
    },
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
      if ((data.length || 0) > Number(pageSize))
        return message.warning('最多只能导出【' + pageSize + '】条数据');

      const { rows, merges: headerMerge, lastLevelCols } = getHeader(columns);
      const { result, merge: bodyMerge } = formatData(lastLevelCols, data || [], rows.length);

      result.push({
        ...handleSummary(data),
        immTypeWeightValue: void 0,
        minCollectAtValue: void 0,
      });
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

  type Row = {
    immTypeCount: number;
    immTypeWeight?: string;
    minCollectAt?: string;
    immTypeWeightValue: number;
    minCollectAtValue: number;
    immType: string;
  };
  function handleSummary(data: GetApiSearchBankQualifiedInventoryStatisticQueryDateResponse) {
    const initData: Row = {
      immTypeCount: 0,
      immTypeWeightValue: 0,
      minCollectAtValue: Date.now(),
      minCollectAt: '',
      immTypeWeight: '',
      immType: '合计',
    };
    const row = data.reduce((pre, cur) => {
      pre.immTypeCount += cur.immTypeCount || 0;
      pre.immTypeWeightValue += cur.immTypeWeight || 0;
      pre.minCollectAtValue = Math.min(
        pre.minCollectAtValue,
        new Date(cur.minCollectAt!).getTime(),
      );
      return pre;
    }, initData);
    row.minCollectAt = dayjs(row.minCollectAtValue).format('YYYY-MM-DD');
    row.immTypeWeight = row.immTypeWeightValue.toFixed(3);
    return row;
  }
</script>
<style scoped>
  :deep(.ant-table-tbody tr:last-child) {
    position: v-bind('totalStyle.position');
    z-index: 99;
    top: v-bind('totalStyle.top');
    bottom: v-bind('totalStyle.bottom');
    background-color: #f5f5f5;
  }
</style>
