<template>
  <a-tabs
    class="mt-2"
    default-active-key="inStockSummary"
    v-model:activeKey="currentKey"
    type="card"
  >
    <a-tab-pane v-for="item in tabList" :key="item.key" :tab="item.label" />
  </a-tabs>
  <PageWrapper dense contentFullHeight>
    <BasicTable @register="registerTable" :columns="currentColumns" :dataSource="tableDataFields" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicColumn, BasicTable, useTable } from '@/components/Table';
  import { searchFormSchema } from './inventory.data';
  import { Tabs } from 'ant-design-vue';

  import { PageWrapper } from '@/components/Page';
  import { computed, onMounted, ref } from 'vue';
  import { getInventoryList } from '@/api/query-statistics/inventory';
  import { GetApiCoreBatchStockStatisticsResponse } from '@/api/type/queryStatistics';

  const ATabs = Tabs;
  const ATabPane = Tabs.TabPane;

  const currentKey = ref('inStockSummary');
  const originData = ref<GetApiCoreBatchStockStatisticsResponse>({});

  const tableDataFields = computed(() => originData.value[currentKey.value] || []);
  const currentColumns = computed(
    () => tabList.find((item) => item.key === currentKey.value)?.columns || [],
  );

  const baseColumns: BasicColumn[] = [
    {
      title: '采浆公司',
      dataIndex: 'stationName',
    },
    {
      title: '批次数量',
      dataIndex: 'batchCount',
    },
    {
      title: '血浆数量',
      dataIndex: 'bagCount',
    },
    {
      title: '验收净重（kg）',
      dataIndex: 'totalVerifyWeight',
    },
  ];
  const tabList: {
    key: keyof GetApiCoreBatchStockStatisticsResponse;
    label: string;
    columns: BasicColumn[];
  }[] = [
    {
      key: 'inStockSummary',
      label: '入库汇总',
      columns: baseColumns,
    },
    {
      key: 'outStockSummary',
      label: '出库汇总',
      columns: baseColumns,
    },
    {
      key: 'meetQuarantineUnProduct',
      label: '满足检疫期未投产',
      columns: [
        {
          title: '效价类型',
          dataIndex: 'titerType',
        },
        {
          title: '血浆数量',
          dataIndex: 'bagCount',
        },
        {
          title: '验收净重（kg）',
          dataIndex: 'totalVerifyWeight',
        },
        {
          title: '最早采集日期',
          dataIndex: 'earliestCollectAt',
        },
      ],
    },
    {
      key: 'unMeetQuarantineFirstTrace',
      label: '未满足—首次续追踪',
      columns: [
        {
          title: '效价类型',
          dataIndex: 'titerType',
        },
        {
          title: '血浆数量',
          dataIndex: 'bagCount',
        },
        {
          title: '验收净重（kg）',
          dataIndex: 'totalVerifyWeight',
        },
        {
          title: '最早采集日期',
          dataIndex: 'earliestCollectAt',
        },
      ],
    },
    {
      key: 'unMeetQuarantineRepeateTrace',
      label: '未满足—重复续追踪',
      columns: [
        {
          title: '效价类型',
          dataIndex: 'titerType',
        },
        {
          title: '血浆数量',
          dataIndex: 'bagCount',
        },
        {
          title: '验收净重（kg）',
          dataIndex: 'totalVerifyWeight',
        },
        {
          title: '最早采集日期',
          dataIndex: 'earliestCollectAt',
        },
      ],
    },
    {
      key: 'waitVerifySummary',
      label: '待验收汇总',
      columns: baseColumns,
    },
    {
      key: 'waitTestSummary',
      label: '待检测汇总',
      columns: baseColumns,
    },
    {
      key: 'testQualifiedSummary',
      label: '检查合格汇总',
      columns: baseColumns,
    },
    {
      key: 'testUnqualifiedSummary',
      label: '检测不合格汇总',
      columns: baseColumns,
    },
  ];

  const [registerTable, { getForm, setLoading }] = useTable({
    pagination: false,
    formConfig: {
      schemas: searchFormSchema,
      submitFunc: reloadTable,
      resetFunc: reloadTable,
    },
    clickToRowSelect: false,
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: false,
    immediate: false,
  });

  async function reloadTable() {
    setLoading(true);
    originData.value = await getInventoryList({
      ...getForm().getFieldsValue(),
    });
    setLoading(false);
  }

  onMounted(() => {
    reloadTable();
  });
</script>
<style scoped>
  :deep(.vben-basic-table-form-container) {
    padding: 0;
  }
</style>
