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
            v-if="pagerLeft.total > 0"
          >
            <span class="mr-2">共{{ pagerLeft.total }}条数据</span>
            <a-pagination
              @change="handlePageChange"
              @show-size-change="handleSizeChange"
              size="small"
              show-size-changer
              show-quick-jumper
              v-model:current="pagerLeft.current"
              :total="pagerLeft.total"
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
              v-if="pagerRight.total > 0"
            >
              <span class="mr-2">共{{ pagerRight.total }}条数据</span>
              <a-pagination
                @change="handlePageChange"
                @show-size-change="handleSizeChange"
                size="small"
                show-size-changer
                show-quick-jumper
                v-model:current="pagerRight.current"
                :total="pagerRight.total"
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
  import { debounce } from 'lodash-es';

  const globalApiStore = useGlobalApiStoreWithOut();
  defineOptions({ name: 'PlasmaBatchQueryStatistics' });

  const { currentRoute } = useRouter();

  const ATabs = Tabs;
  const ATabPane = Tabs.TabPane;
  const APagination = Pagination;

  const currentKey = ref('come');

  const pagerLeft = reactive({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const pagerRight = reactive({
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

  const _reloadTable = debounce(reloadTable, 300) as () => Promise<void>;
  const [registerBasicForm, { getFieldsValue }] = useForm({
    schemas: searchFormSchema,
    labelWidth: 100,
    actionColOptions: { style: 'max-width:unset; position: absolute; right: 10px;' },
    submitFunc: _reloadTable,
    resetFunc: resetFunc,
    submitOnReset: true,
    compact: true,
  });

  const resetFlag = ref(false);
  async function resetFunc() {
    resetFlag.value = true;
    if (currentKey.value === 'come') {
      pagerLeft.current = 1;
    } else {
      pagerRight.current = 1;
    }
    await _reloadTable();
  }

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
        currPage: pagerLeft.current ? pagerLeft.current : 1,
        pageSize: pagerLeft.pageSize,
      };
    },
    afterFetch: (data) => {
      const _data = getRawDataSourceLeft();

      pagerLeft.total = _data.totalCount;
      pagerLeft.pageSize = _data.pageSize;
      pagerLeft.current = _data.currPage;
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
          quarantineSpan:
            i === 0
              ? item.typeList.filter((it) => it.quarantineType === '检疫期合格血浆').length
              : it.quarantineType === '检疫期合格血浆'
                ? 0
                : 1,
        });
      });
    });
    console.log(res, 'res');
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
        ...getFieldsValue(),
        currPage: pagerRight.current ? pagerRight.current : 1,
        pageSize: pagerRight.pageSize,
      };
    },
    afterFetch: (data) => {
      const _data = getRawDataSourceRight();

      pagerRight.total = _data.totalCount;
      pagerRight.pageSize = _data.pageSize;
      pagerRight.current = _data.currPage;
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
    canResize: true,
    immediate: false,
  });
  async function handlePageChange(e) {
    if (currentKey.value === 'come') {
      pagerLeft.current = e;
    } else {
      pagerRight.current = e;
    }
    await reloadTable();
  }

  async function handleSizeChange(_, size) {
    if (currentKey.value === 'come') {
      pagerLeft.pageSize = size;
    } else {
      pagerRight.pageSize = size;
    }

    await reloadTable();
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
