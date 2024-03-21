<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          type="primary"
          @click="handleExport"
          :loading="loading"
          v-auth="SearchManager.CallbackExport"
        >
          导出
        </a-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './callback.data';
  import { PageWrapper } from '@/components/Page';
  import { getCallbackStatisticList } from '@/api/query-statistics/callback';
  import { formatData, getHeader, jsonToSheetXlsx } from '@/components/Excel/src/Export2Excel';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { SearchManager } from '@/enums/authCodeEnum';
  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';

  const globalApiStore = useGlobalApiStoreWithOut();

  defineOptions({ name: 'CallbackStatistics' });

  const { currentRoute } = useRouter();

  const [registerTable, { getForm }] = useTable({
    api: getCallbackStatisticList,
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
  });

  const loading = ref(false);

  async function handleExport() {
    loading.value = true;
    try {
      const pageSize = (await globalApiStore.getSysParamsValue('maxPageSize')) as string;
      const OriginData = await getCallbackStatisticList({
        ...getForm().getFieldsValue(),
        currPage: '1',
        pageSize,
      });
      loading.value = false;
      const { rows, merges: headerMerge, lastLevelCols } = getHeader(columns);
      const { result, merge: bodyMerge } = formatData(
        lastLevelCols,
        OriginData.result || [],
        rows.length,
      );
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
