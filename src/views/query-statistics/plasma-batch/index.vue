<template>
  <a-tabs default-active-key="detail" v-model:activeKey="currentKey" type="card">
    <a-tab-pane key="come" tab="来浆数据">
      <PageWrapper dense contentFullHeight>
        <div class="overflow-auto flex-grow h-83vh">
          <BasicTable @register="registerTableLeft">
            <template #toolbar>
              <a-button type="primary" @click="handleExportComeData">导出</a-button>
            </template>
          </BasicTable>
        </div>
        <div class="flex justify-end bg-white mx-5 mt-3">
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
        <div class="overflow-auto flex-grow h-83vh">
          <BasicTable @register="registerTableRight" />
        </div>
        <div class="flex justify-end bg-white mx-5 mt-3">
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
    },
    pagination: false,
    columns,
    formConfig: {
      schemas: searchFormSchema,
      resetFunc: handleResetBtn,
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

      const res: any[] = [];

      data.forEach((item) => {
        const qualified = item.typeList.filter((it) => Boolean(it.titerType)).length;

        item.typeList.forEach((it, i) => {
          res.push({
            ...it,
            batchNo: item.batchNo,
            rowSpan: i === 0 ? item.typeList.length : 0,
            quarantineSpan: i === 0 && it.titerType ? qualified : !it.titerType ? 1 : 0,
          });
        });
      });

      return res;
    },
    pagination: false,
    columns: columnsByQuarantine,
    formConfig: {
      schemas: searchFormSchema,
      resetFunc: handleResetBtn,
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

    reloadLeft();
  }

  function handleSizeChange(_, size) {
    pager.pageSize = size;

    reloadLeft();
  }

  async function handleResetBtn() {
    pager.current = 1;
    pager.total = 0;
    pager.pageSize = 10;
  }

  function handleExportComeData() {}
</script>
<style scoped>
  :deep(.vben-basic-table-form-container) {
    padding: 0;
  }
</style>
