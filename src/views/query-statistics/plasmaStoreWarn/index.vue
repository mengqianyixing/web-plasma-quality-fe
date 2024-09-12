<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          type="primary"
          @click="handleExport"
          v-auth="SearchManager.PlasmaStoreWarnExport"
          :loading="loading"
        >
          导出
        </a-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema, getClass } from './data';
  import { PageWrapper } from '@/components/Page';
  import { getListApi } from '@/api/query-statistics/plasmaStoreWarn';
  import { jsonToSheetXlsx, formatData, getHeader } from '@/components/Excel/src/Export2Excel';
  import { useRouter } from 'vue-router';
  import { SearchManager } from '@/enums/authCodeEnum';
  import { ref } from 'vue';
  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
  import { message } from 'ant-design-vue';

  const globalApiStore = useGlobalApiStoreWithOut();
  defineOptions({ name: 'PlasmaStoreWarn' });
  const loading = ref(false);

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
    rowClassName: (record) => getClass(record.warnLimitDay),
  });
  async function handleExport() {
    try {
      loading.value = true;
      const { getFieldsValue } = getForm();
      const pageSize = (await globalApiStore.getSysParamsValue('maxPageSize')) as string;

      const data = await getListApi({
        ...getFieldsValue(),
        currPage: 1,
        pageSize,
        exportFlag: true,
      } as any);
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
<style scoped lang="scss">
  :deep(.blue td) {
    &:nth-last-child(1),
    &:nth-last-child(2) {
      background-color: rgb(0 0 255 / 50%);
    }
  }

  :deep(.red td) {
    &:nth-last-child(1),
    &:nth-last-child(2) {
      background-color: rgb(255 0 0 / 50%);
    }
  }

  :deep(.orange td) {
    &:nth-last-child(1),
    &:nth-last-child(2) {
      background-color: rgb(255 165 0 / 50%);
    }
  }

  :deep(.yellow td) {
    &:nth-last-child(1),
    &:nth-last-child(2) {
      background-color: rgb(255 255 0 / 50%);
    }
  }
</style>
