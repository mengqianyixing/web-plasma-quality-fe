<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleExport"> 导出 </a-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './data';
  import { PageWrapper } from '@/components/Page';
  import { getListApi } from '@/api/query-statistics/location';
  import { jsonToSheetXlsx, formatData, getHeader } from '@/components/Excel';
  import { useRouter } from 'vue-router';

  const { currentRoute } = useRouter();
  const [registerTable, { getForm }] = useTable({
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
  });
  async function handleExport() {
    const { getFieldsValue } = getForm();
    const data = await getListApi({ ...getFieldsValue(), currPage: 1, pageSize: 999 } as any);
    jsonToSheetXlsx<any>({
      header: getHeader(columns),
      filename: `${currentRoute.value.meta.title}.xlsx`,
      data: formatData(columns, data.result || []),
    });
  }
</script>
