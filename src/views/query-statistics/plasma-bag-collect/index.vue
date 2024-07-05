<template>
  <PageWrapper dense contentFullHeight fixedHeight class="root">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          type="primary"
          @click="handleExport"
          :loading="loading"
          v-auth="SearchManager.PlasmaBagCollectExport"
        >
          导出
        </a-button>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './collect.data';
  import { SearchManager } from '@/enums/authCodeEnum';

  import { PageWrapper } from '@/components/Page';
  import { getPlasmaBagCollect } from '@/api/query-statistics/plasma';
  import { ref } from 'vue';
  import { formatData, getHeader, jsonToSheetXlsx } from '@/components/Excel/src/Export2Excel';
  import { useRouter } from 'vue-router';
  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
  import { message } from 'ant-design-vue';

  const globalApiStore = useGlobalApiStoreWithOut();
  defineOptions({ name: 'PlasmaBagCollect' });

  const { currentRoute } = useRouter();

  const [registerTable, { getForm }] = useTable({
    immediate: false,
    api: getPlasmaBagCollect,
    columns,
    formConfig: {
      schemas: searchFormSchema,
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : '';
      },
    },
    clickToRowSelect: false,
    pagination: {
      pageSize: 9999,
    },
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: true,
    showSummary: true,
    summaryFunc: handleSummary,
    canResize: true,
  });

  function handleSummary(tableData: Recordable[]) {
    return [
      {
        stationName: '合计',
        bagCollectCount: tableData.reduce((prev, cur) => prev + Number(cur.bagCollectCount), 0),
        bagAcceptCount: tableData.reduce((prev, cur) => prev + Number(cur.bagAcceptCount), 0),
      },
    ];
  }

  const loading = ref(false);
  async function handleExport() {
    try {
      loading.value = true;
      const pageSize = (await globalApiStore.getSysParamsValue('maxPageSize')) as string;

      const data = await getPlasmaBagCollect({
        ...getForm().getFieldsValue(),
        currPage: 1,
        pageSize,
      } as any);
      if ((data.length || 0) > Number(pageSize))
        return message.warning('最多只能导出【' + pageSize + '】条数据');

      data.push({
        stationName: '合计',
        bagCollectCount: data.reduce((prev, cur) => prev + Number(cur.bagCollectCount), 0),
        bagAcceptCount: data.reduce((prev, cur) => prev + Number(cur.bagAcceptCount), 0),
      });

      // 获取当前日期
      const dateMerge = { s: { r: 0, c: 0 }, e: { r: 0, c: 2 } };

      const headerWithDate = [
        {
          stationName: `采集日期：${
            getForm().getFieldsValue().collectBeginAt
              ? `${getForm().getFieldsValue().collectBeginAt}-${
                  getForm().getFieldsValue().collectEndAt
                }`
              : '无'
          }`,
        },
      ];

      const { rows, merges: headerMerge, lastLevelCols } = getHeader(columns);
      const { result, merge: bodyMerge } = formatData(lastLevelCols, data || [], rows.length);

      const combinedData = [...headerWithDate, ...rows, ...result];
      const combinedMerges = [dateMerge, ...headerMerge, ...bodyMerge];

      jsonToSheetXlsx({
        data: combinedData,
        json2sheetOpts: { skipHeader: true },
        merges: combinedMerges,
        filename: currentRoute.value.meta.title + '.xlsx',
      });
    } finally {
      loading.value = false;
    }
  }
</script>
<style scoped>
  .root :deep(.ant-pagination) {
    visibility: hidden;
  }
</style>
