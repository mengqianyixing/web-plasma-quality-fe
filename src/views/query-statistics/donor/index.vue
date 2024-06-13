<template>
  <PageWrapper
    dense
    contentFullHeight
    fixedHeight
    class="flex p-5px"
    content-class="flex flex-col w-full"
  >
    <BasicForm @register="register" class="h-12 pt-2 bg-white mb--3" @submit="handleSubmit" />
    <div class="p-3 bg-white">
      <div class="title">浆员基本信息</div>
      <Spin :spinning="spinning">
        <Description @register="donorTable" :data="mockData" />
      </Spin>
    </div>
    <Tabs
      class="flex-1 p-4 bg-white mt--3 tabs"
      type="card"
      size="small"
      v-model:activeKey="activeKey"
      @change="tabChange"
    >
      <TabPane key="batch" tab="血浆明细">
        <BasicTable @register="batchTable" class="donor-tab mt--2" />
      </TabPane>
      <TabPane key="callBack" tab="回访明细" force-render>
        <BasicTable @register="callBackTable" class="donor-tab mt--2" />
      </TabPane>
      <TabPane key="titer" tab="效价趋势" class="mt--2" force-render>
        <Chart ref="chartRef" />
      </TabPane>
    </Tabs>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { PageWrapper } from '@/components/Page';
  import { batchColumns, callbackColumns, donorSchema, searchFormSchema } from './donor.data';
  import { BasicForm, useForm } from '@/components/Form';
  import { ref, onMounted, nextTick } from 'vue';
  import { TabPane, Tabs, Spin } from 'ant-design-vue';
  import Chart from './chart.vue';
  import { BasicTable, useTable } from '@/components/Table';
  import {
    batchInfoListApi,
    callbacksInfoListApi,
    donorInfoListApi,
    donorChartApi,
  } from '@/api/query-statistics/donor';
  import { PostApiCoreDonorListRequest } from '@/api/type/donorQuery';
  import { Description, useDescription } from '@/components/Description';

  defineOptions({ name: 'DonorQuery' });
  const router = useRoute();

  const [register, { setFieldsValue, validate, setProps }] = useForm({
    schemas: searchFormSchema,
    submitOnReset: true,
    baseColProps: { flex: '0 0 370px' },
    autoSubmitOnEnter: true,
  });

  const activeKey = ref('batch');

  // 浆员查询
  const mockData = ref({});
  const spinning = ref(false);
  const cardNo = ref('');
  const chartRef = ref();
  async function handleSubmit() {
    const values = await validate();
    cardNo.value = values.cardNo;
    setProps({ submitButtonOptions: { loading: true } });
    spinning.value = true;
    try {
      const resList = await Promise.all([
        donorChartApi(values.cardNo),
        donorInfoListApi(values as PostApiCoreDonorListRequest),
        reloadBatchTable(),
        reloadCallbackTable(),
      ]);
      mockData.value = resList[1];
      chartRef.value.setData(resList[0] || []);
    } finally {
      setProps({ submitButtonOptions: { loading: false } });
      spinning.value = false;
    }
  }

  // 浆员明细
  const [donorTable] = useDescription({
    schema: donorSchema,
    column: 4,
    labelStyle: {
      width: '10%',
      padding: '10px 10px',
    },
    contentStyle: {
      padding: '10px 10px',
      width: '15%',
    },
  });

  defineEmits(['batchTable', 'callBackTable']);
  // 血浆明细
  const [batchTable, { reload: reloadBatchTable }] = useTable({
    api: batchInfoListApi,
    beforeFetch: (params) => {
      return {
        ...params,
        cardNo: cardNo.value,
      };
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: batchColumns,
    bordered: true,
    immediate: false,
    showIndexColumn: true,
    canResize: true,
  });

  // 回访明细
  const [callBackTable, { reload: reloadCallbackTable }] = useTable({
    api: callbacksInfoListApi,
    beforeFetch: (params) => {
      return {
        ...params,
        cardNo: cardNo.value,
      };
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: callbackColumns,
    bordered: true,
    immediate: false,
    showIndexColumn: true,
    canResize: true,
  });
  async function tabChange(tab) {
    await nextTick();
    tab === 'titer' && chartRef.value.resize();
  }
  onMounted(() => {
    if (router.query?.cardNo) {
      setFieldsValue({ cardNo: router.query.cardNo });
      setTimeout(() => {
        handleSubmit();
      }, 0);
    }
  });
</script>
<style scoped lang="less">
  .tabs :deep(.ant-tabs-content) {
    height: 100%;
  }

  .title {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
    margin: 5px 8px;
    margin-left: 10px;
    color: #333;
    font-size: 16px;
    font-weight: 600;

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 50%;
      left: -10px;
      width: 2px;
      height: 16px;
      margin-top: -8px;
      background: @primary-color;
    }
  }

  .donor-tab :deep(thead tr th) {
    padding: 5px !important;
  }
</style>
