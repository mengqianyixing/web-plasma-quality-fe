<template>
  <div class="p-3 root">
    <div class="pt-5 bg-white mb-16px">
      <BasicForm @register="registerBasicForm" class="search-form" />
    </div>
    <a-tabs
      class="mt-2 bg-white"
      default-active-key="inStockSummary"
      v-model:activeKey="currentKey"
      type="card"
    >
      <a-tab-pane v-for="item in tabListComputed" :key="item.key" :tab="item.label" />
    </a-tabs>
    <PageWrapper dense contentFullHeight class="m-2">
      <BasicTable
        @register="registerTable"
        :columns="currentColumns"
        :dataSource="tableDataFields"
      />
    </PageWrapper>
  </div>
</template>
<script lang="ts" setup>
  import { BasicColumn, BasicTable, useTable } from '@/components/Table';
  import { BasicForm, useForm } from '@/components/Form';
  import { searchFormSchema } from './inventory.data';
  import { Tabs } from 'ant-design-vue';

  import { PageWrapper } from '@/components/Page';
  import { computed, onMounted, ref } from 'vue';
  import { getInventoryList } from '@/api/query-statistics/inventory';
  import { GetApiCoreBatchStockStatisticsResponse } from '@/api/type/queryStatistics';
  import { getSysParamsByParamKey } from '@/api/systemServer/params';
  import { SysParamsEnum } from '@/enums/sysParamsEnum';
  import { formatKg } from '@/utils';

  const ATabs = Tabs;
  const ATabPane = Tabs.TabPane;

  const currentKey = ref('inStockSummary');
  const quarantineBatchControlRes = ref('');
  const originData = ref<GetApiCoreBatchStockStatisticsResponse>({});

  const tableDataFields = computed(() => originData.value[currentKey.value] || []);
  const currentColumns = computed(
    () => tabList.find((item) => item.key === currentKey.value)?.columns || [],
  );
  const tabListComputed = computed(() => {
    if (quarantineBatchControlRes.value !== 'open') {
      return (
        tabList.filter(
          (it) => !['unMeetQuarantineFirstTrace', 'unMeetQuarantineRepeateTrace'].includes(it.key),
        ) || tabList
      );
    } else {
      return tabList;
    }
  });

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
      format: formatKg,
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
          format: formatKg,
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
          format: formatKg,
        },
        {
          title: '最早采集日期',
          dataIndex: 'earliestCollectAt',
        },
      ],
    },
    {
      key: 'unMeetQuarantineRepeateTrace',
      label: '未满足—反复续追踪',
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
          format: formatKg,
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
      label: '检测合格汇总',
      columns: baseColumns,
    },
    {
      key: 'testUnqualifiedSummary',
      label: '检测不合格汇总',
      columns: baseColumns,
    },
  ];

  const [registerBasicForm, { getFieldsValue, setProps }] = useForm({
    schemas: searchFormSchema,
    labelWidth: 140,
    baseColProps: { flex: '0 0 373px' },
    actionColOptions: { flex: '1 1 150px', style: 'max-width:unset;' },
    transformDateFunc(date) {
      return date ? date.format('YYYY-MM-DD') : '';
    },
    submitFunc: reloadTable,
    submitOnReset: true,
    compact: true,
  });

  const [registerTable, { setLoading }] = useTable({
    pagination: false,
    clickToRowSelect: false,
    size: 'small',
    striped: false,
    useSearchForm: false,
    bordered: true,
    showIndexColumn: false,
    immediate: false,
  });

  async function reloadTable() {
    try {
      setLoading(true);
      setProps({ submitButtonOptions: { loading: true } });
      originData.value = await getInventoryList({
        ...getFieldsValue(),
      });
    } finally {
      setLoading(false);
      setProps({ submitButtonOptions: { loading: false } });
    }
  }

  onMounted(async () => {
    quarantineBatchControlRes.value = await getSysParamsByParamKey(
      SysParamsEnum.QuarantineBatchControl,
    );
  });
</script>
<style scoped>
  :deep(.vben-basic-table-form-container) {
    padding: 0;
  }

  .root :deep(.ant-form-item-control-input-content) {
    margin-left: 20px;
  }
</style>
