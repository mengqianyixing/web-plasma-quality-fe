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
  import { columns, searchFormSchema } from './collect.data';

  import { PageWrapper } from '@/components/Page';
  import { getPlasmaBagCollect } from '@/api/query-statistics/plasma';
  import { ref } from 'vue';
  import { formatData, getHeader, jsonToSheetXlsx } from '@/components/Excel/src/Export2Excel';
  import { useRouter } from 'vue-router';

  defineOptions({ name: 'PlasmaQuery' });

  const { currentRoute } = useRouter();

  const [registerTable, { getForm }] = useTable({
    api: getPlasmaBagCollect,
    columns,
    formConfig: {
      schemas: searchFormSchema,
      alwaysShowLines: 7,
      showAdvancedButton: true,
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : '';
      },
    },
    pagination: false,
    clickToRowSelect: false,
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: true,
    canResize: true,
  });

  const loading = ref(false);
  async function handleExport() {
    try {
      loading.value = true;
      const data = await getPlasmaBagCollect({
        ...getForm().getFieldsValue(),
        currPage: 1,
        pageSize: 50000,
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
</script>
