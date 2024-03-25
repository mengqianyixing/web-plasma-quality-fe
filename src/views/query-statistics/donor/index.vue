<template>
  <PageWrapper
    dense
    contentFullHeight
    fixedHeight
    class="flex p-5px"
    content-class="flex flex-col w-full"
  >
    <BasicForm @register="register" class="h-12 pt-2 bg-white" @submit="handleSubmit" />
    <div class="p-3 m-2 bg-white">
      <div class="title">浆员基本信息</div>
      <Description @register="donorTable" :data="mockData" />
    </div>
    <Tabs
      class="flex-1 p-4 m-2 bg-white tabs"
      type="card"
      size="small"
      v-model:activeKey="activeKey"
    >
      <TabPane key="batch" tab="血浆明细">
        <BasicTable @register="batchTable" class="donor-tab mt--2" />
      </TabPane>
      <TabPane key="callBack" tab="回访明细">
        <BasicTable @register="callBackTable" class="donor-tab mt--2" />
      </TabPane>
      <TabPane key="titer" tab="效价趋势" class="mt--2">
        <Chart :donorNo="donorNo" />
      </TabPane>
    </Tabs>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { PageWrapper } from '@/components/Page';
  import { batchColumns, callbackColumns, donorSchema, searchFormSchema } from './donor.data';
  import { BasicForm, useForm } from '@/components/Form';
  import { ref, onMounted } from 'vue';
  import { TabPane, Tabs } from 'ant-design-vue';
  import Chart from './chart.vue';
  import { BasicTable, useTable } from '@/components/Table';
  import {
    batchInfoListApi,
    callbacksInfoListApi,
    donorInfoListApi,
  } from '@/api/query-statistics/donor';
  import { PostApiCoreDonorListRequest } from '@/api/type/donorQuery';
  import { Description, useDescription } from '@/components/Description';

  defineOptions({ name: 'DonorQuery' });
  const router = useRoute();

  const [register, { setFieldsValue, validate }] = useForm({
    schemas: searchFormSchema,
    submitOnReset: true,
    baseColProps: { flex: '0 0 370px' },
    autoSubmitOnEnter: true,
  });

  const activeKey = ref('batch');

  // 浆员查询
  const mockData = ref({});
  const donorNo = ref('');
  async function handleSubmit() {
    const values = await validate();
    donorNo.value = values.donorNo;
    mockData.value = donorInfoListApi(values as PostApiCoreDonorListRequest);
    reloadBatchTable();
    reloadCallbackTable();
  }

  // 浆员明细
  const [donorTable] = useDescription({
    schema: donorSchema,
    column: 4,
    labelStyle: {
      width: '10%',
      textAlign: 'right',
      padding: '10px 10px',
    },
    contentStyle: {
      textAlign: 'left',
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
        donorNo: donorNo.value,
      };
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    rowKey: 'fkBatchNo',
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
        donorNo: donorNo.value,
      };
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    rowKey: 'bsNo',
    columns: callbackColumns,
    bordered: true,
    immediate: false,
    showIndexColumn: true,
    canResize: true,
  });

  onMounted(() => {
    if (router.query?.donorNo) {
      setFieldsValue({ donorNo: router.query.donorNo });
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
