<template>
  <PageWrapper dense contentFullHeight>
    <div class="flex-grow overflow-auto h-87vh">
      <BasicTable @register="registerTable">
        <template #toolbar>
          <a-button
            type="primary"
            @click="handleExport"
            :loading="buttonLoading"
            v-auth="SearchManager.ERPReportExport"
          >
            导出
          </a-button>
        </template>
      </BasicTable>
    </div>

    <div class="flex justify-end mx-5 mt-3">
      <a-pagination
        @change="handlePageChange"
        @show-size-change="handleSizeChange"
        size="small"
        show-size-changer
        show-quick-jumper
        v-model:current="pager.current"
        :total="pager.total"
      />
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { SearchManager } from '@/enums/authCodeEnum';
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './report.data';
  import { PageWrapper } from '@/components/Page';
  import { getERPInspectionReportList } from '@/api/query-statistics/ERP';
  import { reactive, ref } from 'vue';
  import { Pagination } from 'ant-design-vue';
  import { formatData, getHeader, jsonToSheetXlsx } from '@/components/Excel/src/Export2Excel';
  import { useRouter } from 'vue-router';
  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
  const globalApiStore = useGlobalApiStoreWithOut();
  defineOptions({ name: 'ERPInspectionReport' });

  const { currentRoute } = useRouter();
  const APagination = Pagination;

  const pager = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  function afterFetchDataFormat(data) {
    const res: any[] = [];

    data.forEach((item) => {
      item.titerDetailList.forEach((it, i) => {
        res.push({
          ...item,
          ...it,
          rowSpan: i === 0 ? item.titerDetailList.length : 0,
        });
      });
    });

    return res;
  }

  const [registerTable, { reload, getRawDataSource, getForm }] = useTable({
    api: getERPInspectionReportList,
    beforeFetch: (params) => {
      return {
        ...params,
        currPage: pager.current,
        pageSize: pager.pageSize,
      };
    },
    afterFetch: (data) => {
      const _data = getRawDataSource();
      pager.total = _data.totalCount;
      pager.pageSize = _data.pageSize;
      pager.current = _data.currPage;

      return afterFetchDataFormat(data);
    },
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
    pagination: false,
    showIndexColumn: false,
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
  });

  function handlePageChange(e) {
    pager.current = e;

    reload();
  }

  function handleSizeChange(_, size) {
    pager.pageSize = size;

    reload();
  }

  let buttonLoading = ref(false);
  async function handleExport() {
    buttonLoading.value = true;
    try {
      const pageSize = (await globalApiStore.getSysParamsValue('maxPageSize')) as string;
      const data = (
        await getERPInspectionReportList({
          ...getForm().getFieldsValue(),
          currPage: '1',
          pageSize: pageSize,
        })
      ).result!;

      buttonLoading.value = false;

      const { rows, merges: headerMerge, lastLevelCols } = getHeader(columns);
      const { result, merge: bodyMerge } = formatData(
        lastLevelCols,
        afterFetchDataFormat(data),
        rows.length,
      );
      jsonToSheetXlsx({
        data: [...rows, ...result],
        json2sheetOpts: { skipHeader: true },
        merges: [...headerMerge, ...bodyMerge],
        filename: currentRoute.value.meta.title + '.xlsx',
      });
    } finally {
      buttonLoading.value = false;
    }
  }
</script>
