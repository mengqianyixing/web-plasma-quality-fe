<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          v-auth="SearchManager.ERPEntryStoreExport"
          type="primary"
          @click="handleExport"
          :loading="loading"
          >导出</a-button
        >
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './entry.data';
  import { PageWrapper } from '@/components/Page';
  import { getERPInboundList } from '@/api/query-statistics/ERP';
  import { formatData, getHeader, jsonToSheetXlsx } from '@/components/Excel/src/Export2Excel';
  import { ref } from 'vue';
  import { SearchManager } from '@/enums/authCodeEnum';

  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
  import { useRouter } from 'vue-router';
  import { message } from 'ant-design-vue';

  const globalApiStore = useGlobalApiStoreWithOut();
  const { currentRoute } = useRouter();
  defineOptions({ name: 'ERPEntryStore' });

  const [registerTable, { getForm }] = useTable({
    immediate: false,

    api: getERPInboundList,
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
      const OriginData = await getERPInboundList({
        ...getForm().getFieldsValue(),
        currPage: '1',
        pageSize,
      });
      if ((OriginData.totalCount || 0) > Number(pageSize))
        return message.warning('最多只能导出【' + pageSize + '】条数据');
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
