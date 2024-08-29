<template>
  <PageWrapper dense contentFullHeight fixedHeight class="root">
    <BasicTable @register="registerTable" ref="tableRef">
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
  import {
    getCallbackStatisticList,
    getTotalCallbackStatistic,
  } from '@/api/query-statistics/callback';
  import { formatData, getHeader, jsonToSheetXlsx } from '@/components/Excel/src/Export2Excel';
  import { useRouter } from 'vue-router';
  import { reactive, ref } from 'vue';
  import { SearchManager } from '@/enums/authCodeEnum';
  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
  import { message } from 'ant-design-vue';
  import {
    GetApiSearchDonorCallbackCountTotalRequest,
    GetApiSearchDonorCallbackCountTotalResponse,
  } from '@/api/type/queryStatistics';
  import { debounce } from 'lodash-es';
  import { useSticky } from '@/hooks/web/useSticky';

  const globalApiStore = useGlobalApiStoreWithOut();

  defineOptions({ name: 'CallbackStatistics' });

  const { currentRoute } = useRouter();

  const totalData = ref<GetApiSearchDonorCallbackCountTotalResponse>({});
  const pagerLeft = reactive({
    current: 1,
    pageSize: 99999,
    total: 0,
  });
  const tableRef = ref();
  const totalStyle = useSticky(tableRef);
  let _reloadTable: () => Promise<void>;
  const [registerTable, { getForm, reload, getRawDataSource }] = useTable({
    api: getCallbackStatisticList,
    columns,
    beforeFetch: (params) => {
      return {
        ...params,
        currPage: pagerLeft.current,
        pageSize: pagerLeft.pageSize,
      };
    },
    afterFetch: async (data) => {
      const _data = getRawDataSource();

      pagerLeft.total = _data.totalCount;
      pagerLeft.pageSize = _data.pageSize;
      pagerLeft.current = _data.currPage;

      totalData.value = await getTotalCallbackStatistic({
        ...getForm().getFieldsValue(),
        currPage: String(pagerLeft.current),
        pageSize: String(pagerLeft.pageSize),
      } as GetApiSearchDonorCallbackCountTotalRequest);

      if (!data.length) {
        return [];
      }

      return [
        ...data.map((it, idx) => ({ ...it, index: idx + 1 })),
        { ...totalData.value, index: '合计' },
      ];
    },
    formConfig: {
      schemas: searchFormSchema,
      submitFunc: () => _reloadTable(),
      resetFunc: resetFunc,
      submitOnReset: true,
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
    showIndexColumn: false,
    pagination: false,
    immediate: false,
  });

  _reloadTable = debounce(reload, 300) as () => Promise<void>;
  async function resetFunc() {
    pagerLeft.current = 1;

    await _reloadTable();
  }

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

      const OriginTotalData = await getTotalCallbackStatistic({
        ...getForm().getFieldsValue(),
        currPage: String(pagerLeft.current),
        pageSize: String(pagerLeft.pageSize),
      } as GetApiSearchDonorCallbackCountTotalRequest);

      if ((OriginData.totalCount || 0) > Number(pageSize))
        return message.warning('最多只能导出【' + pageSize + '】条数据');
      const { rows, merges: headerMerge, lastLevelCols } = getHeader(columns);
      const { result, merge: bodyMerge } = formatData(
        lastLevelCols,
        [
          ...OriginData.result!,
          {
            ...OriginTotalData,
            stationName: '合计',
          },
        ] || [],
        rows.length,
      );
      const _result = result.map((it, idx) => ({ ...it, index: idx + 1 }));
      jsonToSheetXlsx({
        data: [...rows, ..._result],
        json2sheetOpts: { skipHeader: true },
        merges: [...headerMerge, ...bodyMerge],
        filename: currentRoute.value.meta.title + '.xlsx',
      });
    } finally {
      loading.value = false;
    }
  }
</script>
<style scoped>
  .root :deep(.ant-table-tbody tr:last-child) {
    position: v-bind('totalStyle.position');
    z-index: 99;
    top: v-bind('totalStyle.top');
    bottom: v-bind('totalStyle.bottom');
    background-color: #f5f5f5;
  }
</style>
