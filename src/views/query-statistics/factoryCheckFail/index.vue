<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          type="primary"
          @click="handleExport"
          :loading="loading"
          v-auth="QuarantineButtonEnum.FactoryCheckFailExcel"
        >
          导出
        </a-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './data';
  import { PageWrapper } from '@/components/Page';
  import { getListApi } from '@/api/query-statistics/factoryCheckFail';
  import { jsonToSheetXlsx, formatData, getHeader } from '@/components/Excel/src/Export2Excel';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
  import { message } from 'ant-design-vue';
  import { QuarantineButtonEnum } from '@/enums/authCodeEnum';

  const globalApiStore = useGlobalApiStoreWithOut();
  const { currentRoute } = useRouter();

  defineOptions({ name: 'FactoryCheckFail' });

  const loading = ref(false);

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
    loading.value = true;
    try {
      const { getFieldsValue } = getForm();
      const pageSize = (await globalApiStore.getSysParamsValue('maxPageSize')) as string;
      const data = await getListApi({ ...getFieldsValue(), currPage: 1, pageSize } as any);
      if ((data.totalCount || 0) > Number(pageSize))
        return message.warning('最多只能导出【' + pageSize + '】条数据');

      const { rows, merges: headerMerge, lastLevelCols } = getHeader(columns);
      const { result, merge: bodyMerge } = formatData(
        lastLevelCols,
        data.result || [],
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
