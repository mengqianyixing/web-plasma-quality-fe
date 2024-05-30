<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <div class="root p-3">
      <div class="pt-5 bg-white mb-16px">
        <BasicForm @register="registerBasicForm" />
      </div>
      <a-tabs default-active-key="detail" v-model:activeKey="currentKey" type="card">
        <a-tab-pane key="come" tab="来浆数据">
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
          <div
            class="flex justify-end mx-5 mt-3 bg-white sticky bottom-0 right-0"
            v-if="leftTableLength > 0"
          >
            <span class="mr-2">共{{ leftTableLength }}条数据</span>
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
            <div
              class="flex justify-end mx-5 mt-3 bg-white sticky bottom-0 right-0"
              v-if="rightTaleLength > 0"
            >
              <span class="mr-2">共{{ rightTaleLength }}条数据</span>
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
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { SearchManager } from '@/enums/authCodeEnum';

  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema, columnsByQuarantine } from './batch.data';
  import { Pagination, Tabs, message } from 'ant-design-vue';

  import { PageWrapper } from '@/components/Page';
  import {
    getPlasmaBatchList,
    getPlasmaBatchListByQuarantine,
  } from '@/api/query-statistics/plasma-batch';
  import { reactive, ref } from 'vue';
  import { getHeader, formatData, jsonToSheetXlsx } from '@/components/Excel/src/Export2Excel';
  import { useRouter } from 'vue-router';
  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
  import { BasicForm, useForm } from '@/components/Form';

  const globalApiStore = useGlobalApiStoreWithOut();
  defineOptions({ name: 'PlasmaBatchQueryStatistics' });

  const { currentRoute } = useRouter();

  const ATabs = Tabs;
  const ATabPane = Tabs.TabPane;
  const APagination = Pagination;

  const currentKey = ref('come');

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

  const leftTableLength = ref(0);
  const rightTaleLength = ref(0);

  const [registerBasicForm, { getFieldsValue }] = useForm({
    schemas: searchFormSchema,
    labelWidth: 100,
    actionColOptions: { style: 'max-width:unset; position: absolute; right: 10px;' },
    submitFunc: reloadTable,
    submitOnReset: true,
    compact: true,
  });

  async function reloadTable() {
    if (currentKey.value === 'come') {
      await reloadLeft();
    } else {
      await reloadRight();
    }
  }

  const [
    registerTableLeft,
    { getForm: getFormLeft, getRawDataSource: getRawDataSourceLeft, reload: reloadLeft },
  ] = useTable({
    api: getPlasmaBatchList,
    beforeFetch: (params) => {
      return {
        ...params,
        ...getFieldsValue(),
        currPage: pager.current ? pager.current : 1,
        pageSize: pager.pageSize,
      };
    },
    afterFetch: (data) => {
      const _data = getRawDataSourceLeft();
      leftTableLength.value = data.length;
      pager.total = _data.totalCount;
      pager.pageSize = _data.pageSize;
      pager.current = _data.currPage;
      return leftFormat(data);
    },
    pagination: false,
    columns,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    clickToRowSelect: false,
    size: 'small',
    striped: false,
    useSearchForm: false,
    bordered: true,
    showIndexColumn: false,
    canResize: true,
    immediate: false,
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
        currPage: pager.current ? pager.current : 1,
        pageSize: pager.pageSize,
      };
    },
    afterFetch: (data) => {
      const _data = getRawDataSourceRight();
      rightTaleLength.value = data.length;

      pager.total = _data.totalCount;
      pager.pageSize = _data.pageSize;
      pager.current = _data.currPage;
      return rightFormat(data);
    },
    pagination: false,
    columns: columnsByQuarantine,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    clickToRowSelect: false,
    size: 'small',
    striped: false,
    useSearchForm: false,
    bordered: true,
    showIndexColumn: false,
    canResize: false,
    immediate: false,
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

  async function handleExportComeData() {
    const pageSize = (await globalApiStore.getSysParamsValue('maxPageSize')) as string;
    const data = await getPlasmaBatchList({
      ...getFormLeft().getFieldsValue(),
      currPage: '1',
      pageSize,
    });
    if ((data.totalCount || 0) > Number(pageSize))
      return message.warning('最多只能导出【' + pageSize + '】条数据');

    const { rows, merges: headerMerge, lastLevelCols } = getHeader(columns);
    const { result, merge: bodyMerge } = formatData(
      lastLevelCols,
      leftFormat(data.result || []),
      rows.length,
    );
    jsonToSheetXlsx({
      data: [...rows, ...result],
      json2sheetOpts: { skipHeader: true },
      merges: [...headerMerge, ...bodyMerge],
      filename: currentRoute.value.meta.title + '来浆数据.xlsx',
    });
  }

  async function handleExportQuarantineData() {
    const pageSize = (await globalApiStore.getSysParamsValue('maxPageSize')) as string;
    const data = await getPlasmaBatchListByQuarantine({
      ...getFormRight().getFieldsValue(),
      currPage: '1',
      pageSize,
    });
    if ((data.totalCount || 0) > Number(pageSize))
      return message.warning('最多只能导出【' + pageSize + '】条数据');

    const { rows, merges: headerMerge, lastLevelCols } = getHeader(columnsByQuarantine);
    const { result, merge: bodyMerge } = formatData(
      lastLevelCols,
      rightFormat(data.result || []),
      rows.length,
    );
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
