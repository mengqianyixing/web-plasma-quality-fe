<template>
  <a-tabs default-active-key="detail" v-model:activeKey="currentKey" type="card">
    <a-tab-pane key="come" tab="来浆数据">
      <PageWrapper dense contentFullHeight>
        <div class="flex-grow overflow-auto h-83vh">
          <BasicTable @register="registerTableLeft">
            <template #toolbar>
              <a-button
                type="primary"
                @click="handleExportComeData"
                v-auth="SearchManager.PlasmaBatchExport"
              >
                导出
              </a-button>
            </template>
          </BasicTable>
        </div>
        <div class="flex justify-end mx-5 mt-3 bg-white">
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
    </a-tab-pane>
    <a-tab-pane key="quarantine" tab="检疫期">
      <PageWrapper dense contentFullHeight fixedHeight>
        <div class="flex-grow overflow-auto h-83vh">
          <BasicTable @register="registerTableRight">
            <template #toolbar>
              <a-button type="primary" @click="handleExportQuarantineData">导出</a-button>
            </template>
          </BasicTable>
        </div>
        <div class="flex justify-end mx-5 mt-3 bg-white">
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
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup>
  import { SearchManager } from '@/enums/authCodeEnum';

  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema, columnsByQuarantine } from './batch.data';
  import { Pagination, Tabs } from 'ant-design-vue';

  import { PageWrapper } from '@/components/Page';
  import {
    getPlasmaBatchList,
    getPlasmaBatchListByQuarantine,
  } from '@/api/query-statistics/plasma-batch';
  import { useStation } from '@/hooks/common/useStation';
  import { watchEffect, reactive, ref, onMounted, watch } from 'vue';
  import { getHeader, formatData, jsonToSheetXlsx } from '@/components/Excel/src/Export2Excel';
  import { useRouter } from 'vue-router';

  defineOptions({ name: 'PlasmaBatchQueryStatistics' });

  const { currentRoute } = useRouter();

  const { isLoading, stationOptions } = useStation();

  const ATabs = Tabs;
  const ATabPane = Tabs.TabPane;
  const APagination = Pagination;

  const currentKey = ref('come');

  onMounted(() => {
    watchEffect(() => {
      if (!isLoading) {
        getFormLeft().updateSchema({
          field: 'stationNo',
          componentProps: {
            options: stationOptions.value,
          },
        });
      }
    });
  });

  watch(
    () => currentKey.value,
    (val) => {
      if (val === 'come') {
        setTimeout(() => {
          reloadLeft();
        }, 0);
      } else {
        setTimeout(() => {
          reloadRight();
        }, 0);
      }

      if (!isLoading) {
        setTimeout(() => {
          getFormRight()?.updateSchema({
            field: 'stationNo',
            componentProps: {
              options: stationOptions.value,
            },
          });
        }, 0);
      }
    },
  );

  const pager = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  function leftFormat(data) {
    const res: any[] = [];
    data.forEach((item) => {
      item.typeList.forEach((it, i) => {
        res.push({
          ...it,
          batchNo: item.batchNo,
          rowSpan: i === 0 ? item.typeList.length : 0,
        });
      });
    });
    return res;
  }
  const [
    registerTableLeft,
    { getForm: getFormLeft, getRawDataSource: getRawDataSourceLeft, reload: reloadLeft },
  ] = useTable({
    api: getPlasmaBatchList,
    beforeFetch: (params) => {
      return {
        ...params,
        currPage: pager.current,
        pageSize: pager.pageSize,
      };
    },
    afterFetch: (data) => {
      const _data = getRawDataSourceLeft();
      pager.total = _data.totalCount;
      pager.pageSize = _data.pageSize;
      pager.current = _data.currPage;
      return leftFormat(data);
    },
    pagination: false,
    columns,
    formConfig: {
      schemas: searchFormSchema,
      resetFunc: handleResetBtn,
      actionColOptions: { style: 'max-width:unset; position: absolute; right: 10px;' },
      baseColProps: {
        span: 24,
      },
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    clickToRowSelect: false,
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
  });

  function rightFormat(data) {
    const res: any[] = [];
    data.forEach((item) => {
      item.typeList.forEach((it, i) => {
        res.push({
          ...it,
          batchNo: item.batchNo,
          rowSpan: i === 0 ? item.typeList.length : 0,
        });
      });
    });
    return res;
  }
  const [
    registerTableRight,
    { getForm: getFormRight, getRawDataSource: getRawDataSourceRight, reload: reloadRight },
  ] = useTable({
    api: getPlasmaBatchListByQuarantine,
    beforeFetch: (params) => {
      return {
        ...params,
        currPage: pager.current,
        pageSize: pager.pageSize,
      };
    },
    afterFetch: (data) => {
      const _data = getRawDataSourceRight();
      pager.total = _data.totalCount;
      pager.pageSize = _data.pageSize;
      pager.current = _data.currPage;
      return rightFormat(data);
    },
    pagination: false,
    columns: columnsByQuarantine,
    formConfig: {
      schemas: searchFormSchema,
      resetFunc: handleResetBtn,
      actionColOptions: { style: 'max-width:unset; position: absolute; right: 10px;' },
      baseColProps: {
        span: 24,
      },
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    clickToRowSelect: false,
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
  });
  function handlePageChange(e) {
    pager.current = e;

    if (currentKey.value === 'come') {
      reloadLeft();
    } else {
      reloadRight();
    }
  }

  function handleSizeChange(_, size) {
    pager.pageSize = size;

    if (currentKey.value === 'come') {
      reloadLeft();
    } else {
      reloadRight();
    }
  }

  async function handleResetBtn() {
    pager.current = 1;
    pager.total = 0;
    pager.pageSize = 10;
  }

  async function handleExportComeData() {
    const data = (
      await getPlasmaBatchList({
        ...getFormLeft().getFieldsValue(),
        currPage: '1',
        pageSize: '1000',
      })
    ).result!;
    const { rows, merges: headerMerge, lastLevelCols } = getHeader(columns);
    const { result, merge: bodyMerge } = formatData(lastLevelCols, leftFormat(data), rows.length);
    jsonToSheetXlsx({
      data: [...rows, ...result],
      json2sheetOpts: { skipHeader: true },
      merges: [...headerMerge, ...bodyMerge],
      filename: currentRoute.value.meta.title + '来浆数据.xlsx',
    });
  }

  async function handleExportQuarantineData() {
    const data = (
      await getPlasmaBatchListByQuarantine({
        ...getFormRight().getFieldsValue(),
        currPage: '1',
        pageSize: '1000',
      })
    ).result!;
    const { rows, merges: headerMerge, lastLevelCols } = getHeader(columnsByQuarantine);
    const { result, merge: bodyMerge } = formatData(lastLevelCols, rightFormat(data), rows.length);
    jsonToSheetXlsx({
      data: [...rows, ...result],
      json2sheetOpts: { skipHeader: true },
      merges: [...headerMerge, ...bodyMerge],
      filename: currentRoute.value.meta.title + '检疫期.xlsx',
    });
  }
</script>
<style scoped>
  :deep(.vben-basic-table-form-container) {
    padding: 0;
  }
</style>
