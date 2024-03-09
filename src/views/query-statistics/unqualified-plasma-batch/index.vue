<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleExport" :loading="loading"> 导出 </a-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './batch.data';
  import { PageWrapper } from '@/components/Page';
  import { getUnqualifiedPlasmaBatch } from '@/api/query-statistics/batch-statistics';
  import { formatData, getHeader, jsonToSheetXlsx } from '@/components/Excel/src/Export2Excel';

  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  defineOptions({ name: 'UnqualifiedPlasmaByBatch' });

  const { currentRoute } = useRouter();

  const [registerTable, { getForm }] = useTable({
    api: getUnqualifiedPlasmaBatch,
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
    const OriginData = await getUnqualifiedPlasmaBatch({
      ...getForm().getFieldsValue(),
      currPage: '1',
      pageSize: '99999',
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
  }
</script>
