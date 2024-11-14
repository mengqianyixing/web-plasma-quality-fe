<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <div class="flex flex-col h-full p-3 root">
      <div class="bg-white pt-8px mb-8px">
        <BasicForm @register="registerBasicForm" class="search-form" />
      </div>
      <a-tabs
        default-active-key="detail"
        v-model:activeKey="currentKey"
        type="card"
        class="flex-1 h-full bg-white mb-16px tabs"
        @change="handleTabChange"
      >
        <a-tab-pane key="come" tab="来浆数据">
          <div style="height: calc(100% - 40px)">
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
          <div class="bg-white mb-10px pb-6px pr-16px h-40px mb-6px" v-if="pagerLeft.total > 0">
            <a-pagination
              class="float-right mt-2"
              @change="handlePageChange"
              @show-size-change="handleSizeChange"
              size="small"
              show-size-changer
              show-quick-jumper
              v-model:current="pagerLeft.current"
              v-model:pageSize="pagerLeft.pageSize"
              :total="pagerLeft.total"
              :show-total="(total) => `共 ${total} 条数据`"
            />
          </div>
        </a-tab-pane>
        <a-tab-pane key="quarantine" tab="检疫期">
          <div style="height: calc(100% - 40px)">
            <BasicTable @register="registerTableRight">
              <template #toolbar>
                <a-button type="primary" @click="handleExportQuarantineData">导出</a-button>
              </template>
            </BasicTable>
          </div>
          <div class="bg-white mb-10px pb-6px pr-16px h-40px mb-6px" v-if="pagerRight.total > 0">
            <a-pagination
              class="float-right mt-2"
              @change="handlePageChange"
              @show-size-change="handleSizeChange"
              size="small"
              show-size-changer
              show-quick-jumper
              v-model:current="pagerRight.current"
              v-model:pageSize="pagerRight.pageSize"
              :total="pagerRight.total"
              :show-total="(total) => `共 ${total} 条数据`"
            />
          </div>
        </a-tab-pane>
        <a-tab-pane key="inventory" tab="库存" force-render>
          <div style="height: calc(100% - 40px)">
            <BasicTable
              class="inventoryTable"
              @register="registerInventoryTable"
              :columns="columnsRef"
              ref="tableRef"
            >
              <template #toolbar>
                <a-button type="primary" @click="handleExportInventoryData">导出</a-button>
              </template>
            </BasicTable>
          </div>
          <div
            class="bg-white mb-10px pb-6px pr-16px h-40px mb-6px"
            v-if="pagerInventory.total > 0"
          >
            <a-pagination
              class="float-right mt-2"
              @change="handlePageChange"
              @show-size-change="handleSizeChange"
              size="small"
              show-size-changer
              show-quick-jumper
              v-model:current="pagerInventory.current"
              v-model:pageSize="pagerInventory.pageSize"
              :total="pagerInventory.total"
              :show-total="(total) => `共 ${total} 条数据`"
            />
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { SearchManager } from '@/enums/authCodeEnum';

  import { BasicColumn, BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema, columnsByQuarantine, columnsByInventory } from './batch.data';
  import { Pagination, Tabs, message } from 'ant-design-vue';

  import { PageWrapper } from '@/components/Page';
  import {
    getPlasmaBatchList,
    getPlasmaBatchListByInventory,
    getPlasmaBatchListByInventoryTotal,
    getPlasmaBatchListByQuarantine,
  } from '@/api/query-statistics/plasma-batch';
  import { reactive, ref, unref } from 'vue';
  import { getHeader, formatData, jsonToSheetXlsx } from '@/components/Excel/src/Export2Excel';
  import { useRouter } from 'vue-router';
  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
  import { BasicForm, useForm } from '@/components/Form';
  import { debounce } from 'lodash-es';
  import { useMessage } from '@/hooks/web/useMessage';
  import {
    GetApiSearchBankPlasmaStatisticStockRequest,
    GetApiSearchBankPlasmaStatisticStockTotalRequest,
    GetApiSearchBankPlasmaStatisticStockTotalResponse,
  } from '@/api/type/queryStatistics';
  import { useSticky } from '@/hooks/web/useSticky';

  const globalApiStore = useGlobalApiStoreWithOut();
  defineOptions({ name: 'PlasmaBatchQueryStatistics' });

  const { currentRoute } = useRouter();
  const { createMessage } = useMessage();

  const ATabs = Tabs;
  const ATabPane = Tabs.TabPane;
  const APagination = Pagination;

  const tableRef = ref();

  const totalStyle = useSticky(tableRef);

  const currentKey = ref('come');

  const pagerLeft = reactive({
    current: 1,
    pageSize: 30,
    total: 0,
  });

  const pagerRight = reactive({
    current: 1,
    pageSize: 30,
    total: 0,
  });

  const columnsRef = ref<BasicColumn[]>(columnsByInventory);
  const totalData = ref<GetApiSearchBankPlasmaStatisticStockTotalResponse>({});

  function handleTabChange(key: string | number) {
    updateSchema([
      {
        field: 'stationNo',
        show: key !== 'inventory',
      },
      {
        field: 'batchStartNo',
        colProps: {
          push: key !== 'inventory' ? 2 : 0,
        },
      },
    ]);
  }

  const pagerInventory = reactive({
    current: 1,
    pageSize: 30,
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
  const [registerBasicForm, { getFieldsValue, setProps, updateSchema }] = useForm({
    schemas: searchFormSchema,
    submitFunc: () => {
      pagerRight.current = 1;
      pagerLeft.current = 1;
      return _reloadTable();
    },
    resetFunc: resetFunc,
    submitOnReset: true,
    labelWidth: 140,
    showAdvancedButton: false,
    baseColProps: { flex: '0 0 373px' },
    actionColOptions: { flex: '1 1 150px', style: 'max-width:unset;' },
    compact: true,
  });

  const resetFlag = ref(false);
  async function resetFunc() {
    resetFlag.value = true;
    if (currentKey.value === 'come') {
      pagerLeft.current = 1;
    } else if (currentKey.value === 'quarantine') {
      pagerRight.current = 1;
    } else if (currentKey.value === 'inventory') {
      pagerInventory.current = 1;
    }

    await _reloadTable();
  }

  async function reloadTable() {
    try {
      await setProps({ submitButtonOptions: { loading: true } });

      if (currentKey.value === 'come') {
        await reloadLeft();
      } else if (currentKey.value === 'quarantine') {
        await reloadRight();
      } else if (currentKey.value === 'inventory') {
        await reloadInventory();
      }
    } finally {
      await setProps({ submitButtonOptions: { loading: false } });
    }
  }

  const [registerTableLeft, { getRawDataSource: getRawDataSourceLeft, reload: reloadLeft }] =
    useTable({
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
      isCanResizeParent: true,
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
    return res;
  }
  const [registerTableRight, { getRawDataSource: getRawDataSourceRight, reload: reloadRight }] =
    useTable({
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
      isCanResizeParent: true,
      immediate: false,
    });

  const [
    registerInventoryTable,
    { getRawDataSource: getRawDataSourceInventory, reload: reloadInventory },
  ] = useTable({
    api: getPlasmaBatchListByInventory,
    beforeFetch: (params) => {
      const { batchEndNo, batchStartNo } = getFieldsValue();
      if (!batchStartNo || !batchEndNo) {
        createMessage.warn('批号起止不能为空');

        throw new Error('批号起止不能为空');
      }

      return {
        ...params,
        ...getFieldsValue(),
        currPage: pagerInventory.current ? pagerInventory.current : 1,
        pageSize: pagerInventory.pageSize,
      };
    },
    afterFetch: async (data) => {
      const _data = getRawDataSourceInventory();

      pagerInventory.total = _data.totalCount;
      pagerInventory.pageSize = _data.pageSize;
      pagerInventory.current = _data.currPage;

      totalData.value = await getPlasmaBatchListByInventoryTotal(
        getFieldsValue() as GetApiSearchBankPlasmaStatisticStockTotalRequest,
      );

      const nullCols: string[] = [];
      for (const key in unref(totalData)) {
        if (!unref(totalData)[key]) {
          nullCols.push(key.replace(/(Num|num)$/, '').toUpperCase());
        }
      }

      columnsRef.value = columnsByInventory.map((it) => {
        if (it.children) {
          return {
            ...it,
            children: it.children.filter(
              (child) => !nullCols.includes(child.title as unknown as string),
            ) as any,
          };
        }
        return it;
      });

      if (!data.length) {
        return [];
      }

      return [
        ...data,
        {
          ...totalData.value,
          batchNo: '合计',
        },
      ];
    },
    pagination: false,
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
    isCanResizeParent: true,
    immediate: false,
  });

  async function handlePageChange(e) {
    if (currentKey.value === 'come') {
      pagerLeft.current = e;
    } else if (currentKey.value === 'quarantine') {
      pagerRight.current = e;
    } else if (currentKey.value === 'inventory') {
      pagerInventory.current = e;
    }
    await reloadTable();
  }

  async function handleSizeChange(_, size) {
    if (currentKey.value === 'come') {
      pagerLeft.pageSize = size;
    } else if (currentKey.value === 'quarantine') {
      pagerRight.pageSize = size;
    } else if (currentKey.value === 'inventory') {
      pagerInventory.pageSize = size;
    }

    await reloadTable();
  }

  async function handleExportComeData() {
    const pageSize = (await globalApiStore.getSysParamsValue('maxPageSize')) as string;
    const data = await getPlasmaBatchList({
      ...getFieldsValue(),
      currPage: '1',
      pageSize,
      exportFlag: true,
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
      ...getFieldsValue(),
      currPage: '1',
      pageSize,
      exportFlag: true,
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

  async function handleExportInventoryData() {
    const pageSize = (await globalApiStore.getSysParamsValue('maxPageSize')) as string;

    const { batchEndNo, batchStartNo } = getFieldsValue();
    if (!batchStartNo || !batchEndNo) {
      return createMessage.warn('批号起止不能为空');
    }
    const data = await getPlasmaBatchListByInventory({
      ...getFieldsValue(),
      currPage: '1',
      pageSize,
      exportFlag: true,
    } as GetApiSearchBankPlasmaStatisticStockRequest);

    let totalData: any = await getPlasmaBatchListByInventoryTotal(
      getFieldsValue() as GetApiSearchBankPlasmaStatisticStockTotalRequest,
    );
    totalData = {
      ...totalData,
      batchNo: '合计',
    };
    if ((data.totalCount || 0) > Number(pageSize))
      return message.warning('最多只能导出【' + pageSize + '】条数据');

    const { rows, merges: headerMerge, lastLevelCols } = getHeader(columnsByInventory);
    const { result, merge: bodyMerge } = formatData(
      lastLevelCols,
      (data.result || []).concat(totalData as any),
      rows.length,
    );
    jsonToSheetXlsx({
      data: [...rows, ...result],
      json2sheetOpts: { skipHeader: true },
      merges: [...headerMerge, ...bodyMerge],
      filename: currentRoute.value.meta.title + '库存.xlsx',
    });
  }
</script>
<style scoped lang="scss">
  :deep(.vben-basic-table-form-container) {
    padding: 0;
  }

  .inventoryTable :deep(.ant-table-tbody tr:last-child) {
    position: v-bind('totalStyle.position');
    top: v-bind('totalStyle.top');
    bottom: v-bind('totalStyle.bottom');
    background-color: #f5f5f5;
  }

  :deep(.ant-form-item-control-input-content > .ant-btn) {
    margin-left: 5px;
    float: right;
  }

  .tabs :deep(.ant-tabs-content) {
    position: relative;
    height: 100%;
  }
</style>
