<template>
  <div class="main">
    <div class="search-bar">
      <Form
        layout="inline"
        :model="filterForm"
        style="margin-bottom: 16px"
        :labelCol="{ style: { width: '70px' } }"
      >
        <FormItem label="复核人">
          <Select
            v-model:value="filterForm.receiveMan"
            allowClear
            disabled
            style="width: 180px"
            placeholder="请点击登录"
          >
            <SelectOption v-for="item in receiveManOpts" :key="item.value" :value="item.value">{{
              item.name
            }}</SelectOption>
          </Select>
          <Button @click="showRegisterModal">登录</Button>
        </FormItem>
        <FormItem label="托盘编号">
          <Input v-model:value="filterForm.trayNo" placeholder="请输入" />
        </FormItem>
        <FormItem label="箱号">
          <Input v-model:value="filterForm.boxNo" placeholder="请扫描" />
        </FormItem>
        <FormItem>
          <Button @click="suspendModal">提交接收单</Button>
        </FormItem>
        <FormItem>
          <Button>托盘入库</Button>
        </FormItem>
      </Form>
      <Form layout="inline" :model="detailData">
        <FormItem label="血浆批号">
          <Input
            v-model:value="detailData.batchNo"
            disabled
            style="width: 180px"
            placeholder="请点击选择"
          />
          <Button @click="showBatchModal">选择</Button>
        </FormItem>
        <FormItem label="采浆公司">
          <span>{{ detailData.stationName }}</span>
        </FormItem>
        <FormItem label="出库单号">
          <span>{{ detailData.transNo }}</span>
        </FormItem>
        <FormItem label="血浆箱数">
          <span>{{ detailData.boxCount }}</span>
        </FormItem>
        <FormItem label="血浆数量">
          <span>{{ detailData.plasmaCount }}</span>
        </FormItem>
      </Form>
    </div>
    <div class="content-bar">
      <Row>
        <Col :span="9">
          <Table
            :columns="noReceiveColumns"
            :data-source="unAcceptDetails"
            bordered
            :scroll="{ y: 570 }"
            :pagination="false"
          >
            <template #title>未接收箱数：{{ detailData.unAcceptCount }}</template>
          </Table>
        </Col>
        <Col :span="14" :offset="1">
          <Table
            :columns="receivedColumns"
            :data-source="acceptDetails"
            bordered
            :scroll="{ y: 570 }"
            :pagination="false"
          >
            <template #title>已接收箱数：{{ detailData.acceptCount }}</template>
          </Table>
        </Col>
      </Row>
    </div>
    <batchModal v-if="batchModalVisible" @close="closeBatch" @confirm="confirmBatch" />
    <registerModal v-if="registerModalVisible" @close="closeRegister" />
    <suspendOrResumeModal
      v-if="suspendModalVisible"
      :receiveManOpts="receiveManOpts"
      @close="closeSuspend"
      @go-register="registerModalVisible = true"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import dayjs from 'dayjs';
  import {
    Form,
    FormItem,
    Input,
    Button,
    Select,
    SelectOption,
    Row,
    Col,
    Table,
  } from 'ant-design-vue';
  import batchModal from './components/batch-modal.vue';
  import registerModal from './components/register-modal.vue';
  import suspendOrResumeModal from './components/suspend-or-resume.vue';
  import { getAccepts } from '@/api/inbound-management/receive-plasma.ts';

  interface FilterForm {
    trayNo: string;
    boxNo: string;
    receiveMan: string;
  }
  interface DetailData {
    batchNo: string;
    stationName: string;
    transNo: string;
    boxCount: number;
    plasmaCount: number;
    unAcceptCount: number;
    acceptCount: number;
  }
  // 表单数据1
  const filterForm = ref<FilterForm>({
    trayNo: '',
    boxNo: '',
    receiveMan: '',
  });
  // 表单数据2
  const detailData = ref<DetailData>({
    batchNo: '',
    stationName: '',
    transNo: '',
    boxCount: 0, // 血浆箱数
    plasmaCount: 0, // 血浆数量
    unAcceptCount: 0,
    acceptCount: 0,
  });
  const receiveManOpts = [
    {
      value: '1',
      name: '肚鸡熊',
    },
    {
      value: '2',
      name: '上鱼',
    },
  ];

  // 未接收数据
  const noReceiveColumns = [
    {
      title: '序号',
      dataIndex: 'index',
      customRender: ({ index }) => {
        return `${index + 1}`;
      },
    },
    {
      title: '箱号',
      dataIndex: 'boxNo',
    },
    {
      title: '血浆数量',
      dataIndex: 'plasmaCount',
    },
  ];
  let unAcceptDetails = [];
  // 已接收数据
  const receivedColumns = [
    {
      title: '序号',
      dataIndex: 'index',
      customRender: ({ index }) => `${index + 1}`,
    },
    {
      title: '托盘编号',
      dataIndex: 'trayNo',
    },
    {
      title: '箱号',
      dataIndex: 'boxNo',
    },
    {
      title: '血浆数量',
      dataIndex: 'plasmaCount',
    },
    {
      title: '接收人',
      dataIndex: 'operator',
    },
    {
      title: '复核人',
      dataIndex: 'checker',
    },
    {
      title: '接收日期',
      dataIndex: 'acceptAt',
      customRender: ({ text }) => {
        return dayjs(text).format('YYYY-MM-DD');
      },
    },
  ];
  let acceptDetails = [];

  // 批号框
  const batchModalVisible = ref(false);

  const showBatchModal = () => {
    batchModalVisible.value = true;
  };
  const closeBatch = () => {
    batchModalVisible.value = false;
  };
  // 确认选择批号
  const confirmBatch = (val: any) => {
    detailData.value.batchNo = val;
    batchModalVisible.value = false;
    getPageData(detailData.value.batchNo);
  };

  // 登录框
  const registerModalVisible = ref(false);
  const showRegisterModal = () => {
    registerModalVisible.value = true;
  };
  const closeRegister = () => {
    registerModalVisible.value = false;
  };

  // 暂停继续框
  const suspendModalVisible = ref(false);
  const suspendModal = () => {
    suspendModalVisible.value = true;
  };
  const closeSuspend = () => {
    suspendModalVisible.value = false;
  };

  // 查询页面数据
  const getPageData = async (batchNo) => {
    const data = await getAccepts(batchNo);
    detailData.value.stationName = data.stationName;
    detailData.value.transNo = data.transNo;
    unAcceptDetails = data.acceptDetail.unAcceptDetails;
    acceptDetails = data.acceptDetail.acceptDetails;
  };

  // // 扫描箱号进行接收操作
  // const keyupScan = async (e) => {
  //   filterForm.value.boxNo = e.target.value.toUpperCase();
  //   if (e.code === 'Enter' || e.code === 'NumpadEnter') {
  //     // 校验
  //     // ...
  //     const params = {};
  //     const data = await acceptPlasma(params);
  //     console.log(data);
  //   }
  // };
</script>
<style lang="less" scoped>
  .main {
    height: 100%;
    padding: 16px;

    .search-bar {
      margin-bottom: 16px;
      padding: 16px;
      border-radius: 2px;
      background-color: @white;
    }

    .content-bar {
      padding: 16px;
      border-radius: 2px;
      background-color: @white;
    }
  }
</style>
