<template>
  <div class="main" v-loading="loadingRef">
    <div class="search-bar" ref="searchBarRef">
      <Form layout="inline" :model="filterForm" :labelCol="{ style: { width: '70px' } }">
        <Row style="width: 100%">
          <Col>
            <FormItem label="复核人">
              <Input
                v-model:value="filterForm.checker"
                disabled
                placeholder="请点击登录"
                style="width: 180px"
              />
              <Button :disabled="!!filterForm.checker" @click="showRegisterModal">登录</Button>
            </FormItem>
          </Col>
          <Col>
            <FormItem label="托盘编号">
              <Input v-model:value="filterForm.trayNo" placeholder="请输入" style="width: 180px" />
              <!-- <Button @click="showBatchModal">更改</Button> -->
            </FormItem>
          </Col>
          <Col>
            <FormItem label="血浆编号">
              <Input
                v-model:value="filterForm.bagNo"
                :disabled="loadingRef"
                placeholder="请扫描"
                @keyup="keyupScan"
              />
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
              <Button
                v-if="filterForm.batchNo && filterForm.boxNo"
                type="link"
                @click="showBatchDetailModal('needBoxNo')"
                >{{ filterForm.boxNo }}</Button
              >
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
                >{{ filterForm.verifyBoxCount }}/{{ filterForm.boxCount }}</Button
              >
              <span v-else>{{ filterForm.verifyBoxCount }}/{{ filterForm.boxCount }}</span>
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
              <Button @click="suspendModal('BOX')">暂停箱记录</Button>
            </FormItem>
          </Col>
          <Col>
            <FormItem>
              <Button @click="suspendModal('BCH')">暂停批记录</Button>
            </FormItem>
          </Col>
          <Col>
            <FormItem>
              <Button @click="openInDrawer(true, filterForm)" :disabled="!filterForm.batchNo"
                >托盘入库</Button
              >
            </FormItem>
          </Col>
          <Col>
            <FormItem>
              <Button @click="openOutDrawer(true, filterForm)" :disabled="!filterForm.batchNo"
                >托盘出库</Button
              >
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
            <template #bodyCell="{ record, column }">
              <template v-if="column.key === 'operation'">
                <Button type="link" block @click="showRevokeModal(record)">撤销</Button>
              </template>
            </template>
          </Table>
        </Col>
      </Row>
    </div>
    <batchModal
      v-if="batchModalVisible"
      @close="closeBatch"
      @confirm="confirmBatch"
      mode="accept"
    />
    <registerModal v-if="registerModalVisible" @close="closeRegister" @login-data="handleLogin" />
    <batchDetail
      v-if="batchDetailVisible"
      @close="closeBatchDetail"
      ref="batchDetailRef"
      :checkOptsEnum="checkOpts"
    />
    <boxDetail
      v-if="boxDetailVisible"
      @close="closeBoxDetail"
      @show-box-detail="showBoxDetail"
      ref="boxDetailRef"
      :checkOpts="checkOpts"
    />
    <suspendOrResumeModal
      v-if="suspendModalVisible"
      :checkerOpts="checkerOpts"
      ref="suspendOrResumeRef"
      @close="closeSuspend"
      @clear-info="clearInfo"
      @go-register="registerModalVisible = true"
      @refresh-data="getPageData(filterForm.batchNo)"
    />
    <revokeModal
      v-if="revokeModalVisible"
      @close="closeRevoke"
      @go-register="registerModalVisible = true"
      ref="revokeModalRef"
      @query="getPageData"
    />
    <InStoreDrawer @register="registerInDrawer" />
    <OutStoreDrawer @register="registerOutDrawer" />
  </div>
</template>

<script lang="ts" setup>
  import { ref, nextTick, createVNode } from 'vue';
  import { Form, FormItem, Input, Button, Row, Col, Table, Modal } from 'ant-design-vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import dayjs from 'dayjs';
  import batchModal from '../receive-plasma/components/batch-modal.vue';
  import registerModal from '../receive-plasma/components/register-modal.vue';
  import batchDetail from './components/batch-detail.vue';
  import boxDetail from './components/box-detail.vue';
  import suspendOrResumeModal from './components/suspend-or-resume.vue';
  import revokeModal from './components/revoke-modal.vue';
  import InStoreDrawer from '../components/inStoreDrawer/index.vue';
  import OutStoreDrawer from '../components/outStoreDrawer/index.vue';
  import { useDrawer } from '@/components/Drawer';

  import { getPlasmaVerify, plasmaVerifyBag } from '@/api/inbound-management/accept-plasma';

  const [registerInDrawer, { openDrawer: openInDrawer }] = useDrawer();
  const [registerOutDrawer, { openDrawer: openOutDrawer }] = useDrawer();

  const { createMessage } = useMessage();
  const { success, warning } = createMessage;

  const loadingRef = ref(false);
  const searchBarRef = ref<any>(null);
  const tableHeight = ref(570); // 动态表格高度

  const batchDetailRef = ref<any>('');
  const boxDetailRef = ref<any>('');
  const suspendOrResumeRef = ref<any>('');
  const revokeModalRef = ref<any>('');

  interface FilterForm {
    trayNo: string;
    boxNo: string; // 当前箱号
    bagNo: string; // 血浆编号
    checker: string; // 复核人
    batchNo: string;
    stationName: string | null;
    donorFailed?: string; // 献血浆者不符合项目
    verifyBagCount: number; // 已验收血浆数
    bagCount: number; // 血浆总数
    verifyBoxCount: number; // 已验收箱数
    boxCount: number; // 箱总数
    stationNo?: string | null;
  }
  // 表单数据
  const filterForm = ref<FilterForm>({
    trayNo: '',
    boxNo: '',
    bagNo: '',
    checker: '',
    batchNo: '',
    verifyBagCount: 0,
    bagCount: 0,
    verifyBoxCount: 0,
    boxCount: 0,
    stationNo: null,
    stationName: null,
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
      dataIndex: 'bagNo',
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
        if (text) {
          return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
        }
        return '';
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

  // 验收状态备选项
  const checkOpts = ref([
    {
      code: 'W',
      name: '未验收',
    },
    {
      code: 'R',
      name: '验收中',
    },
    {
      code: 'S',
      name: '已验收',
    },
  ]);

  // 登录框
  const registerModalVisible = ref(false);
  const showRegisterModal = () => {
    registerModalVisible.value = true;
  };
  const closeRegister = () => {
    registerModalVisible.value = false;
  };
  const handleLogin = (res: { username: string }) => {
    // 暂停批的确认登录
    if (suspendModalVisible.value && suspendOrResumeRef.value.searchForm.pattern === 'BCH') {
      suspendOrResumeRef.value.searchForm.checker = res.username;
    } else if (revokeModalVisible.value) {
      // 撤销验收登录
      revokeModalRef.value.searchForm.checker = res.username;
    } else {
      filterForm.value.checker = res.username;
    }
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

  // 暂停/继续框
  const suspendModalVisible = ref(false);
  const suspendModal = (pattern: string) => {
    if (!filterForm.value.batchNo) {
      warning('请先进行验收!');
      return;
    }
    suspendModalVisible.value = true;
    nextTick(() => {
      suspendOrResumeRef.value.searchForm.batchNo = filterForm.value.batchNo;
      suspendOrResumeRef.value.searchForm.boxNo = filterForm.value.boxNo;
      suspendOrResumeRef.value.searchForm.checker = filterForm.value.checker;
      suspendOrResumeRef.value.searchForm.pattern = pattern;
      suspendOrResumeRef.value.getList();
    });
  };
  const closeSuspend = () => {
    suspendModalVisible.value = false;
  };
  const clearInfo = () => {
    filterForm.value.boxNo = '';
    unVerifyBagDate.value = [];
    verifyBagData.value = [];
  };

  // 撤销验收
  const revokeModalVisible = ref(false);
  const showRevokeModal = (row: any) => {
    revokeModalVisible.value = true;
    nextTick(() => {
      revokeModalRef.value.rowInfow = { ...filterForm.value, ...row };
    });
  };
  const closeRevoke = () => {
    revokeModalVisible.value = false;
  };

  // 批详情
  const batchDetailVisible = ref(false);
  const showBatchDetailModal = (params) => {
    batchDetailVisible.value = true;
    nextTick(() => {
      batchDetailRef.value.searchForm.batchNo = filterForm.value.batchNo;
      batchDetailRef.value.searchForm.stationNo = filterForm.value.stationNo;
      batchDetailRef.value.searchForm.stationName = filterForm.value.stationName;
      // needBoxNo => 点击箱号需要带入参数
      if (params === 'needBoxNo') batchDetailRef.value.searchForm.boxNo = filterForm.value.boxNo;
      batchDetailRef.value.queryTable();
    });
  };
  const closeBatchDetail = () => {
    batchDetailVisible.value = false;
  };

  // 箱详情
  const boxDetailVisible = ref(false);
  const showBoxDetailModal = () => {
    boxDetailVisible.value = true;
    nextTick(() => {
      boxDetailRef.value.searchForm.batchNo = filterForm.value.batchNo;
      boxDetailRef.value.searchForm.stationNo = filterForm.value.stationNo;
      boxDetailRef.value.searchForm.stationName = filterForm.value.stationName;
      boxDetailRef.value.queryTable();
    });
  };
  // 批详情打开箱详情
  const showBoxDetail = (row: any) => {
    batchDetailVisible.value = true;
    nextTick(() => {
      batchDetailRef.value.searchForm.stationNo = filterForm.value.stationNo;
      batchDetailRef.value.searchForm.stationName = filterForm.value.stationName;
      batchDetailRef.value.searchForm.boxNo = row.boxNo;
      batchDetailRef.value.queryTable();
    });
  };

  const closeBoxDetail = () => {
    boxDetailVisible.value = false;
  };

  const _setReChecker = (val: string) => {
    if (val && filterForm.value.checker != val) {
      if (!filterForm.value.checker) {
        filterForm.value.checker = val;
      } else {
        Modal.confirm({
          title: '确认是否替换当前复核人？',
          content: `替换复核人为：【${val}】`,
          onOk() {
            filterForm.value.checker = val;
          },
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onCancel() {},
        });
      }
    }
  };

  // 查询页面数据
  const getPageData = async (batchNo: string) => {
    try {
      loadingRef.value = true;
      const data = await getPlasmaVerify(batchNo);
      filterForm.value.stationName = data.stationName;
      filterForm.value.batchNo = data.batchNo;
      filterForm.value.boxNo = data.boxNo;
      _setReChecker(data.checker);
      filterForm.value.verifyBagCount = data.verifyBagCount;
      filterForm.value.bagCount = data.bagCount;
      filterForm.value.verifyBoxCount = data.verifyBoxCount;
      filterForm.value.boxCount = data.boxCount;
      filterForm.value.trayNo = data.trayNo;
      filterForm.value.stationNo = data.stationNo;

      unVerifyBagDate.value = data.unVerifyBag.map((item: any) => {
        return {
          bagNo: item,
        };
      });
      verifyBagData.value = data.verifyBag;
      // 设置表格高度
      nextTick(() => {
        const searchBarHeight = searchBarRef.value.clientHeight;
        tableHeight.value = window.innerHeight - 80 - searchBarHeight - 195;
      });
    } finally {
      loadingRef.value = false;
    }
  };

  // 扫描血浆进行验收操作
  const keyupScan = async (e: { code: string }) => {
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
      const params = {
        batchNo: filterForm.value.batchNo,
        boxNo: filterForm.value.boxNo,
        bagNo: filterForm.value.bagNo,
        checker: filterForm.value.checker,
        trayNo: filterForm.value.trayNo,
      };
      // 没有选择批号直接扫码进行的验收操作，将批次信息回填，不作为实际验收操作,相当于查询此批信息
      const realAccept = !!filterForm.value.batchNo;
      try {
        loadingRef.value = true;
        const data = await plasmaVerifyBag(params);
        if (data) {
          filterForm.value.stationName = data.stationName;
          filterForm.value.batchNo = data.batchNo;
          filterForm.value.verifyBagCount = data.verifyBagCount;
          filterForm.value.bagCount = data.bagCount;
          _setReChecker(data.checker);
          filterForm.value.verifyBoxCount = data.verifyBoxCount;
          filterForm.value.boxCount = data.boxCount;
          filterForm.value.stationNo = data.stationNo;
          filterForm.value.boxNo = data.boxNo;
          // 更改托盘编号
          if (filterForm.value.trayNo && data.trayNo && filterForm.value.trayNo != data.trayNo) {
            Modal.confirm({
              title: '提示?',
              content: createVNode('div', { style: 'color:red;' }, '托盘编号不一致，需要替换吗?'),
              onOk() {
                filterForm.value.trayNo = data.trayNo;
              },
              onCancel() {
                console.log('Cancel');
              },
              class: 'test',
            });
          } else if (data.trayNo) {
            filterForm.value.trayNo = data.trayNo;
          }

          unVerifyBagDate.value = data.unVerifyBag.map((item: any) => {
            return {
              bagNo: item,
            };
          });
          verifyBagData.value = data.verifyBag;

          // 设置表格高度
          nextTick(() => {
            const searchBarHeight = searchBarRef.value.clientHeight;
            tableHeight.value = window.innerHeight - 80 - searchBarHeight - 195;
          });
          if (realAccept) {
            success('验收成功');
            filterForm.value.donorFailed = data.donorFailed; // 献血浆者不符合
            if (data.donorFailed) {
              Modal.confirm({
                title: '提示?',
                content: createVNode('div', { style: 'color:red;' }, data.donorFailed),
                onOk() {},
                onCancel() {
                  console.log('Cancel');
                },
                class: 'test',
              });
            }
            if (
              filterForm.value.verifyBagCount == filterForm.value.bagCount &&
              filterForm.value.verifyBagCount
            ) {
              success('当前批验收完成');
            } else if (!unVerifyBagDate.value.length) {
              success('当前箱验收完成');
            }
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        loadingRef.value = false;
        filterForm.value.bagNo = '';
      }
    }
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
