<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          type="primary"
          @click="handleExport"
          v-auth="SearchManager.DonorStateExport"
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
  import { columns, searchFormSchema } from './data';
  import { PageWrapper } from '@/components/Page';
  import { getListApi } from '@/api/query-statistics/donorState';
  import { jsonToSheetXlsx, formatData, getHeader } from '@/components/Excel/src/Export2Excel';
  import { useRouter } from 'vue-router';
  import { SearchManager } from '@/enums/authCodeEnum';
  import { ref } from 'vue';
  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
  import { message } from 'ant-design-vue';

  const globalApiStore = useGlobalApiStoreWithOut();

  const { currentRoute } = useRouter();

  defineOptions({ name: 'DonorState' });

  const loading = ref(false);

  const [registerTable, { getForm, reload, setPagination, setProps }] = useTable({
    immediate: false,
    api: getListApi,
    columns,
    formConfig: {
      schemas: searchFormSchema,
      submitFunc: () => {
        const values = getForm().getFieldsValue();
        const isNotEmptyObject = Object.keys(values).some(
          (key) => values[key] || values[key] === 0,
        );
        if (isNotEmptyObject) {
          setPagination({ current: 1 });
          reload();
          return Promise.resolve();
        }
        message.warning('请输入条件后进行查询');
        return Promise.reject();
      },
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    beforeFetch: () => false,
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
    sortFn: (e) => {
      setProps({
        searchInfo: {
          sortIdx: e.order && e.field,
          sortOrder: e?.order?.slice(0, -3).toUpperCase(),
        },
      });
    },
  });
  async function handleExport() {
    try {
      loading.value = true;
      const { getFieldsValue } = getForm();
      const values = getFieldsValue();
      const isNotEmptyObject = Object.keys(values).some((key) => values[key] || values[key] === 0);
      if (isNotEmptyObject === false) {
        message.warning('请输入条件后进行导出');
        return;
      }
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
