<template>
  <PageWrapper dense contentFullHeight fixedHeight class="p-16px">
    <BasicForm @register="register" class="bg-white shadow pt-10" @submit="handleSubmit" />
    <div class="p-4" style="background-color: white !important">
      <div class="title">浆员明细</div>
      <Description @register="donorTable" class="mt-4" :data="mockData" />
    </div>
    <Card
      :tab-list="tabListTitle"
      :active-tab-key="activeKey"
      @tab-change="onTabChange"
      class="mb-20"
      @ok="handleSubmit"
    >
      <p v-if="activeKey === 'tab1'">
        <BasicTable @register="batchTable" :key="donorNo" />
      </p>
      <p v-if="activeKey === 'tab2'">
        <BasicTable @register="callBackTable" :key="donorNo" />
      </p>
      <p v-if="activeKey === 'tab3'">
        <Chart />
      </p>
    </Card>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '@/components/Page';
  import { batchColumns, callbackColumns, donorSchema, searchFormSchema } from './donor.data';
  import { BasicForm, useForm } from '@/components/Form';
  import { ref } from 'vue';
  import { Card } from 'ant-design-vue';
  import Chart from './chart.vue';
  import { BasicTable, useTable } from '@/components/Table';
  import {
    batchInfoListApi,
    callbacksInfoListApi,
    donorInfoListApi,
  } from '@/api/query-statistics/donor';
  import { PostApiCoreDonorListRequest } from '@/api/type/donorQuery';
  import { Description, useDescription } from '@/components/Description';

  const [register, { getFieldsValue }] = useForm({
    schemas: searchFormSchema,
    submitOnReset: true,
    baseColProps: { flex: '0 0 370px' },
    autoSubmitOnEnter: true,
  });

  const activeKey = ref('tab1');
  const tabListTitle = [
    { key: 'tab1', tab: '血浆明细' },
    { key: 'tab2', tab: '回访明细' },
    { key: 'tab3', tab: '效价趋势' },
  ];

  function onTabChange(key) {
    activeKey.value = key;
    if (key === 'tab1') {
      reloadBatchTable();
    } else if (key === 'tab2') {
      reloadCallbackTable();
    } else {
      console.log('趋势图~');
    }
  }
  // 浆员查询
  const mockData = ref({});
  const donorNo = ref('');
  async function handleSubmit() {
    const values = getFieldsValue();
    mockData.value = await donorInfoListApi(values as PostApiCoreDonorListRequest);
    await reloadBatchTable();
    await reloadCallbackTable();
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
      const data = getFieldsValue();
      return {
        ...params,
        donorNo: data.donorNo,
        ...data,
      };
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    //
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
      const data = getFieldsValue();
      return {
        ...params,
        donorNo: data.donorNo,
        ...data,
      };
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    //
    rowKey: 'bsNo',
    columns: callbackColumns,
    bordered: true,
    immediate: false,
    showIndexColumn: true,
    canResize: true,
  });
</script>
<style scoped lang="less">
  .title {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;
    margin: 14px 0;
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
</style>
