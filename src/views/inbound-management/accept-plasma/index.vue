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
            <FormItem label="复核人">
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
            </FormItem>
          </Col>
          <Col>
            <FormItem label="托盘编号">
              <Input v-model:value="filterForm.trayNo" placeholder="请输入" />
            </FormItem>
          </Col>
          <Col>
            <FormItem label="血浆编号">
              <Input v-model:value="filterForm.bagNo" placeholder="请扫描" @keyup="keyupScan" />
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
            <FormItem label="当前箱号">
              <Button v-if="filterForm.batchNo" type="link" @click="showBatchDetailModal">{{
                filterForm.boxNo
              }}</Button>
              <span v-else>{{ filterForm.boxNo }}</span>
            </FormItem>
          </Col>
          <Col>
            <FormItem label="已验收袋">
              <Button v-if="filterForm.batchNo" type="link" @click="showBatchDetailModal"
                >{{ filterForm.verifyBagCount }}/{{ filterForm.bagCount }}</Button
              >
              <span v-else>{{ filterForm.verifyBagCount }}/{{ filterForm.bagCount }}</span>
            </FormItem>
          </Col>
          <Col>
            <FormItem label="已验收箱">
              <Button v-if="filterForm.batchNo" type="link" @click="showBoxDetailModal"
                >{{ filterForm.verifyBagCount }}/{{ filterForm.bagCount }}</Button
              >
              <span v-else>{{ filterForm.verifyBagCount }}/{{ filterForm.bagCount }}</span>
            </FormItem>
          </Col>
        </Row>
        <Row style="margin-top: 16px">
          <Col>
            <FormItem>
              <Button>血浆不合格</Button>
            </FormItem>
          </Col>
          <Col>
            <FormItem>
              <Button>样本不合格</Button>
            </FormItem>
          </Col>
          <Col>
            <FormItem>
              <Button>缺号登记</Button>
            </FormItem>
          </Col>
          <Col>
            <FormItem>
              <Button>暂停箱验收</Button>
            </FormItem>
          </Col>
          <Col>
            <FormItem>
              <Button>暂停批验收</Button>
            </FormItem>
          </Col>
          <Col>
            <FormItem>
              <Button>托盘入库</Button>
            </FormItem>
          </Col>
          <Col>
            <FormItem>
              <Button>托盘出库</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="content-bar">
      <Row>
        <Col :span="6">
          <Table
            :columns="unVerifyBagColumns"
            :data-source="unVerifyBagDate"
            bordered
            :scroll="{ y: tableHeight }"
            :pagination="false"
          >
            <template #title>本箱未验收（袋）：{{ unVerifyBagDate.length }}</template>
          </Table>
        </Col>
        <Col :span="17" :offset="1">
          <Table
            :columns="verifyBagColumns"
            :data-source="verifyBagData"
            bordered
            :scroll="{ y: tableHeight }"
            :pagination="false"
          >
            <template #title>本箱已验收（袋）：{{ verifyBagData.length }}</template>
            <template #bodyCell="{ column }">
              <template v-if="column.key === 'operation'">
                <Button type="link" block>撤销</Button>
              </template>
            </template>
          </Table>
        </Col>
      </Row>
    </div>
    <batchModal v-if="batchModalVisible" @close="closeBatch" @confirm="confirmBatch" />
    <registerModal v-if="registerModalVisible" @close="closeRegister" />
    <batchDetail v-if="batchDetailVisible" @close="closeBatchDetail" />
    <boxDetail v-if="boxDetailVisible" @close="closeBoxDetail" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, nextTick, createVNode } from 'vue';
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
    Modal,
  } from 'ant-design-vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import dayjs from 'dayjs';
  import batchModal from '../receive-plasma/components/batch-modal.vue';
  import registerModal from '../receive-plasma/components/register-modal.vue';
  import batchDetail from './components/batch-detail.vue';
  import boxDetail from './components/box-detail.vue';
  import { getPlasmaVerify, plasmaVerifyBag } from '@/api/inbound-management/accept-plasma.ts';

  const { createMessage } = useMessage();
  const { success, warning } = createMessage;

  const loadingRef = ref(false);
  const searchBarRef = ref(null);
  const tableHeight = ref(570); // 动态表格高度

  interface FilterForm {
    trayNo: string;
    boxNo: string; // 当前箱号
    bagNo: string; // 血浆编号
    checker: string;
    batchNo: string;
    stationName: string;
    donorFailed?: string; // 献血浆者不符合项目
    verifyBagCount: number; // 已验收血浆数
    bagCount: number; // 血浆总数
    verifyBoxCount: number; // 已验收箱数
    boxCount: number; // 箱总数
  }
  // 表单数据
  const filterForm = ref<FilterForm>({
    trayNo: '',
    boxNo: '',
    bagNo: '',
    checker: '',
    batchNo: '',
    stationName: '',
    verifyBagCount: 0,
    bagCount: 0,
    verifyBoxCount: 0,
    boxCount: 0,
  });

  const checkerOpts = [];

  // 未验收数据
  const unVerifyBagColumns = [
    {
      title: '序号',
      dataIndex: 'index',
      customRender: ({ index }) => {
        return `${index + 1}`;
      },
    },
    {
      title: '血浆编号',
      dataIndex: 'unVerifyBag',
    },
  ];
  let unVerifyBagDate = ref<any[]>([]);
  // 已验收数据
  const verifyBagColumns = [
    {
      title: '序号',
      dataIndex: 'index',
      customRender: ({ index }) => `${index + 1}`,
    },
    {
      title: '血浆编号',
      dataIndex: 'bagNo',
    },
    {
      title: '验收时间',
      dataIndex: 'verifyAt',
      customRender: ({ text }) => {
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '血浆验收结果',
      dataIndex: 'bagResult',
    },
    {
      title: '样本验收结果',
      dataIndex: 'sampleResult',
    },
    { title: '操作', key: 'operation' },
  ];
  let verifyBagData = ref<any[]>([]);

  // 登录框
  const registerModalVisible = ref(false);
  const showRegisterModal = () => {
    registerModalVisible.value = true;
  };
  const closeRegister = () => {
    registerModalVisible.value = false;
  };

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

  // 批详情
  const batchDetailVisible = ref(false);
  const showBatchDetailModal = () => {
    batchDetailVisible.value = true;
  };
  const closeBatchDetail = () => {
    batchDetailVisible.value = false;
  };

  // 箱详情
  const boxDetailVisible = ref(false);
  const showBoxDetailModal = () => {
    boxDetailVisible.value = true;
  };
  const closeBoxDetail = () => {
    boxDetailVisible.value = false;
  };

  // 查询页面数据
  const getPageData = async (boxNo) => {
    loadingRef.value = true;
    const data = await getPlasmaVerify(boxNo);
    loadingRef.value = false;
    filterForm.value.stationName = data.stationName;
    filterForm.value.batchNo = data.batchNo;
    filterForm.value.boxNo = data.boxNo;
    filterForm.value.verifyBagCount = data.verifyBagCount;
    filterForm.value.bagCount = data.bagCount;
    filterForm.value.verifyBoxCount = data.verifyBoxCount;
    filterForm.value.boxCount = data.boxCount;

    unVerifyBagDate.value = data.unVerifyBag;
    verifyBagData.value = data.verifyBag;
    // 设置表格高度
    nextTick(() => {
      const searchBarHeight = searchBarRef.value.clientHeight;
      tableHeight.value = window.innerHeight - 80 - searchBarHeight - 195;
    });
  };

  // 扫描血浆进行验收操作
  const keyupScan = async (e) => {
    // filterForm.value.bagNo = e.target.value.toUpperCase();
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      if (!filterForm.value.bagNo) {
        warning('请扫描袋号！');
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
        batchNo: filterForm.value.batchNo,
        boxNo: filterForm.value.boxNo,
        bagNo: filterForm.value.bagNo,
        checker: filterForm.value.checker,
        trayNo: filterForm.value.trayNo,
      };
      try {
        loadingRef.value = true;
        const data = await plasmaVerifyBag(params);
        if (data) {
          filterForm.value.stationName = data.stationName;
          filterForm.value.batchNo = data.batchNo;
          filterForm.value.verifyBagCount = data.verifyBagCount;
          filterForm.value.bagCount = data.bagCount;
          filterForm.value.verifyBoxCount = data.verifyBoxCount;
          filterForm.value.boxCount = data.boxCount;
          filterForm.value.boxNo = data.boxNo;
          filterForm.value.donorFailed = data.donorFailed; // 献血浆者不符合

          unVerifyBagDate.value = data.unVerifyBag;
          verifyBagData.value = data.verifyBag;

          // 设置表格高度
          nextTick(() => {
            const searchBarHeight = searchBarRef.value.clientHeight;
            tableHeight.value = window.innerHeight - 80 - searchBarHeight - 195;
          });
          if (data.donorFailed) {
            Modal.confirm({
              title: '提示?',
              content: createVNode(
                'div',
                { style: 'color:red;' },
                '献血浆者于xx年xx月xx日检测xxx不合格，血浆验收不合格',
              ),
              onOk() {},
              onCancel() {
                console.log('Cancel');
              },
              class: 'test',
            });
          }
          success('验收成功');

          // if (data.acceptDetail.unAcceptCount <= 0) {
          //   // 一批接收完毕 提示
          //   showConfirmGoon();
          // }
        }
      } catch (error) {
        console.log(error);
      } finally {
        loadingRef.value = false;
        filterForm.value.boxNo = '';
      }
    }
  };

  // const showConfirmGoon = () => {
  //   Modal.confirm({
  //     title: '是否继续接收其他批次?',
  //     content: createVNode('div', { style: 'color:red;' }, '当前批已接收完成！'),
  //     onOk() {
  //       // 清空当前批次信息
  //       filterForm.value.trayNo = '';
  //       filterForm.value.batchNo = '';
  //       filterForm.value.stationName = '';
  //       filterForm.value.boxCount = '';
  //       filterForm.value.plasmaCount = '';
  //       unVerifyBagDate.value = [];
  //       verifyBagData.value = [];
  //     },
  //     onCancel() {
  //       console.log('Cancel');
  //     },
  //     class: 'test',
  //   });
  // };
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
