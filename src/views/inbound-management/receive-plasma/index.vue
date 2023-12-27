<template>
  <div class="main" v-loading="loadingRef">
    <div class="search-bar" ref="searchBarRef">
      <Form
        layout="inline"
        :model="filterForm"
        style="margin-bottom: 16px"
        :labelCol="{ style: { width: '70px' } }"
      >
        <Row style="width: 100%">
          <Col>
            <!-- <FormItem label="复核人">
              <Select
                v-model:value="filterForm.checker"
                allowClear
                disabled
                style="width: 180px"
                placeholder="请点击登录"
              >
                <SelectOption v-for="item in checkerOpts" :key="item.value" :value="item.value">{{
                  item.name
                }}</SelectOption>
              </Select>
              <Button @click="showRegisterModal">登录</Button>
            </FormItem> -->
          </Col>
          <Col>
            <FormItem label="托盘编号">
              <Input v-model:value="filterForm.trayNo" placeholder="请输入" />
            </FormItem>
          </Col>
          <Col>
            <FormItem label="箱号">
              <Input v-model:value="filterForm.boxNo" placeholder="请扫描" @keyup="keyupScan" />
            </FormItem>
          </Col>
          <Col>
            <FormItem>
              <Button @click="suspendModal">提交接收单</Button>
            </FormItem>
          </Col>
          <Col>
            <FormItem>
              <Button>托盘入库</Button>
            </FormItem>
          </Col>
        </Row>
        <Row style="width: 100%; margin-top: 16px">
          <Col>
            <FormItem label="血浆批号">
              <Input
                v-model:value="filterForm.batchNo"
                disabled
                style="width: 180px"
                placeholder="请点击选择"
              />
              <Button @click="showBatchModal">选择</Button>
            </FormItem>
          </Col>
          <Col>
            <FormItem label="采浆公司">
              <span>{{ filterForm.stationName }}</span>
            </FormItem>
          </Col>
          <Col>
            <FormItem label="出库单号">
              <span>{{ filterForm.transNo }}</span>
            </FormItem>
          </Col>
          <Col>
            <FormItem label="血浆箱数">
              <span>{{ filterForm.boxCount }}</span>
            </FormItem>
          </Col>
          <Col>
            <FormItem label="血浆数量">
              <span>{{ filterForm.plasmaCount }}</span>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="content-bar">
      <Row>
        <Col :span="9">
          <Table
            :columns="noReceiveColumns"
            :data-source="unAcceptDetails"
            bordered
            :scroll="{ y: tableHeight }"
            :pagination="false"
          >
            <template #title>未接收箱数：{{ filterForm.unAcceptCount }}</template>
          </Table>
        </Col>
        <Col :span="14" :offset="1">
          <Table
            :columns="receivedColumns"
            :data-source="acceptDetails"
            bordered
            :scroll="{ y: tableHeight }"
            :pagination="false"
          >
            <template #title>已接收箱数：{{ filterForm.acceptCount }}</template>
          </Table>
        </Col>
      </Row>
    </div>
    <batchModal v-if="batchModalVisible" @close="closeBatch" @confirm="confirmBatch" />
    <registerModal v-if="registerModalVisible" @close="closeRegister" />
    <suspendOrResumeModal
      v-if="suspendModalVisible"
      :checkerOpts="checkerOpts"
      :batchNo="filterForm.batchNo"
      @close="closeSuspend"
      @go-register="registerModalVisible = true"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref, createVNode, nextTick } from 'vue';
  import dayjs from 'dayjs';
  import {
    Form,
    FormItem,
    Input,
    Button,
    // Select,
    // SelectOption,
    Row,
    Col,
    Table,
    Modal,
  } from 'ant-design-vue';
  import batchModal from './components/batch-modal.vue';
  import registerModal from './components/register-modal.vue';
  import suspendOrResumeModal from './components/suspend-or-resume.vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { getAccepts, acceptPlasma } from '@/api/inbound-management/receive-plasma.ts';

  const { createMessage } = useMessage();
  const { success, warning } = createMessage;

  const loadingRef = ref(false);
  const searchBarRef = ref(null);
  const tableHeight = ref(570); // 动态表格高度

  interface FilterForm {
    trayNo: string;
    boxNo: string;
    checker: string;
    batchNo: string;
    stationName: string;
    transNo: string;
    boxCount: number;
    plasmaCount: number;
    unAcceptCount: number;
    acceptCount: number;
  }
  const initFilterForm = {
    trayNo: '',
    boxNo: '',
    checker: '',
    batchNo: '',
    stationName: '',
    transNo: '',
    boxCount: 0, // 血浆箱数
    plasmaCount: 0, // 血浆数量
    unAcceptCount: 0, // 未接收箱数
    acceptCount: 0, // 已接收箱数
  };
  // 表单数据1
  const filterForm = ref<FilterForm>(initFilterForm);

  const checkerOpts = [];

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
  let unAcceptDetails = ref<any[]>([]);
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
    // {
    //   title: '复核人',
    //   dataIndex: 'checker',
    // },
    {
      title: '接收日期',
      dataIndex: 'acceptAt',
      customRender: ({ text }) => {
        return dayjs(text).format('YYYY-MM-DD');
      },
    },
  ];
  let acceptDetails = ref<any[]>([]);

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
    filterForm.value.batchNo = val;
    batchModalVisible.value = false;
    getPageData(filterForm.value.batchNo);
  };

  // 登录框
  const registerModalVisible = ref(false);
  // const showRegisterModal = () => {
  //   registerModalVisible.value = true;
  // };
  const closeRegister = () => {
    registerModalVisible.value = false;
  };

  // 申请单框
  const suspendModalVisible = ref(false);
  const suspendModal = () => {
    if (!filterForm.value.batchNo) {
      warning('请先选择血浆批号!');
      return;
    }
    suspendModalVisible.value = true;
  };
  const closeSuspend = () => {
    suspendModalVisible.value = false;
  };

  // 查询页面数据
  const getPageData = async (batchNo) => {
    loadingRef.value = true;
    const data = await getAccepts(batchNo);
    loadingRef.value = false;
    filterForm.value.stationName = data.stationName;
    filterForm.value.transNo = data.transNo;
    filterForm.value.batchNo = data.batchNo;
    filterForm.value.unAcceptCount = data.acceptDetail.unAcceptCount;
    filterForm.value.acceptCount = data.acceptDetail.acceptCount;
    filterForm.value.plasmaCount = data.acceptDetail.plasmaCount;
    filterForm.value.boxCount = data.acceptDetail.boxCount;

    unAcceptDetails.value = data.acceptDetail.unAcceptDetails;
    acceptDetails.value = data.acceptDetail.acceptDetails;

    // 设置表格高度
    nextTick(() => {
      const searchBarHeight = searchBarRef.value.clientHeight;
      tableHeight.value = window.innerHeight - 80 - searchBarHeight - 195;
    });
  };

  // 扫描箱号进行接收操作
  const keyupScan = async (e) => {
    // filterForm.value.boxNo = e.target.value.toUpperCase();
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      if (!filterForm.value.boxNo) {
        warning('请扫描箱号！');
        return;
      }
      if (!filterForm.value.trayNo) {
        warning('请输入托盘编号！');
        return;
      }
      // if (!filterForm.value.checker) {
      //   warning('请登录复核人！');
      //   return;
      // }
      // if (!filterForm.value.batchNo) {
      //   warning('请选择血浆批号！');
      //   return;
      // }
      const params = {
        ...filterForm.value,
        batchNo: filterForm.value.batchNo,
      };
      try {
        loadingRef.value = true;
        const data = await acceptPlasma(params);
        if (data) {
          filterForm.value.stationName = data.stationName;
          filterForm.value.transNo = data.transNo;
          filterForm.value.batchNo = data.batchNo;
          filterForm.value.unAcceptCount = data.acceptDetail.unAcceptCount;
          filterForm.value.acceptCount = data.acceptDetail.acceptCount;
          filterForm.value.plasmaCount = data.acceptDetail.plasmaCount;
          filterForm.value.boxCount = data.acceptDetail.boxCount;

          unAcceptDetails.value = data.acceptDetail.unAcceptDetails;
          acceptDetails.value = data.acceptDetail.acceptDetails;
          // 设置表格高度
          nextTick(() => {
            const searchBarHeight = searchBarRef.value.clientHeight;
            tableHeight.value = window.innerHeight - 80 - searchBarHeight - 195;
          });
          success('接收成功');
          if (data.acceptDetail.unAcceptCount <= 0) {
            // 一批接收完毕 提示
            showConfirmGoon();
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        loadingRef.value = false;
        filterForm.value.boxNo = '';
      }
    }
  };

  const showConfirmGoon = () => {
    Modal.confirm({
      title: '是否继续接收其他批次?',
      content: createVNode('div', { style: 'color:red;' }, '当前批已接收完成！'),
      onOk() {
        // 清空当前批次信息
        filterForm.value.trayNo = '';
        filterForm.value.batchNo = '';
        filterForm.value.stationName = '';
        filterForm.value.transNo = '';
        filterForm.value.boxCount = 0;
        filterForm.value.plasmaCount = 0;
        filterForm.value.unAcceptCount = 0;
        filterForm.value.acceptCount = 0;
        unAcceptDetails.value = [];
        acceptDetails.value = [];
      },
      onCancel() {
        console.log('Cancel');
      },
      class: 'test',
    });
  };
</script>
<style lang="less" scoped>
  .main {
    // height: 100%;
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
