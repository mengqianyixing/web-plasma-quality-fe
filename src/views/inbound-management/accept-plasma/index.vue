<template>
  <PageWrapper contentFullHeight fixedHeight>
    <Description @register="register" :data="filterForm" />
    <div class="flex gap-1 mt-1">
      <vxe-grid
        v-bind="gridOptionsUnaccept"
        :data="unAcceptList"
        class="inline-block w-1/4 pr-2"
        :loading="tableLoading"
      >
        <template #toolbar>
          <div class="p-3 font-medium text-[16px] bg-[#ffffff] rounded">
            <span>本箱未验收(袋)：</span>
            <span>{{ unAcceptList?.length }}</span>
          </div>
        </template>
      </vxe-grid>
      <vxe-grid
        v-bind="gridOptionsAccept"
        :data="acceptList"
        :loading="tableLoading"
        class="inline-block w-3/4"
      >
        <template #toolbar>
          <div class="flex items-center justify-between bg-[#ffffff]">
            <div class="p-3 font-medium text-[16px] bg-[#ffffff] rounded">
              <span>本箱已验收(袋)：</span>
              <span>{{ acceptList?.length }}</span>
            </div>
            <div class="flex gap-2">
              <a-button @click="handlePlasmaUnqualified">血浆不合格</a-button>
              <a-button @click="handleSampleUnqualified">样本不合格</a-button>
              <a-button @click="handleMissNumRegister">缺号登记</a-button>
              <a-button @click="suspendModal('BOX')">暂停箱记录</a-button>
              <a-button @click="suspendModal('BCH')">暂停批记录</a-button>
              <a-button
                @click="openInModal(true, { ...filterForm, isAccept: true })"
                :disabled="!filterForm.batchNo"
              >
                托盘入库
              </a-button>
              <a-button @click="openOutModal(true, filterForm)" :disabled="!filterForm.batchNo">
                托盘出库
              </a-button>
            </div>
          </div>
        </template>
        <template #action="{ row }">
          <a-button type="link" block @click="showRevokeModal(row)">撤销</a-button>
        </template>
      </vxe-grid>
    </div>
    <BatchModal @register="registerBoxModal" @success="batchModalSuccess" />
    <LoginModal @register="registerLoginModal" @success="handleSuccess" />
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
      ref="suspendOrResumeRef"
      @close="closeSuspend"
      @clear-info="clearInfo"
      @refresh-data="batchModalSuccess(filterForm.batchNo)"
    />
    <InStoreDrawer @register="registerInModal" />
    <OutStoreDrawer @register="registerOutModal" />
    <revokeModal
      v-if="revokeModalVisible"
      @close="closeRevoke"
      ref="revokeModalRef"
      @query="batchModalSuccess"
    />
    <PlasmaUnqualifiedModal
      @register="registerPlasmaUnqualifiedModal"
      @success="handleModalSuccess"
    />
    <SampleUnqualifiedModal
      @register="registerSampleUnqualifiedModal"
      @success="handleModalSuccess"
    />
    <MissNumModal @register="registerMissNumModal" />
  </PageWrapper>
</template>

<script setup lang="tsx">
  import { ref, computed, reactive, nextTick, createVNode } from 'vue';
  import PageWrapper from '@/components/Page/src/PageWrapper.vue';
  import Description from '@/components/Description/src/Description.vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useModal } from '@/components/Modal';
  import { debounce } from 'lodash-es';
  import { VxeGridProps } from 'vxe-table';
  import { DescItem, useDescription } from '@/components/Description';
  import { getPlasmaVerify, plasmaVerifyBag } from '@/api/inbound-management/accept-plasma';
  import { Modal } from 'ant-design-vue';
  import dayjs from 'dayjs';

  import BatchModal from '@/views/inbound-management/receive-plasma/components/batch-modal.vue';
  import revokeModal from './components/revoke-modal.vue';
  import InStoreDrawer from '../components/inStoreDrawer/index.vue';
  import OutStoreDrawer from '../components/outStoreDrawer/index.vue';
  import LoginModal from '@/__components/ReviewLoginModal/index.vue';
  import batchDetail from './components/batch-detail.vue';
  import boxDetail from './components/box-detail.vue';
  import suspendOrResumeModal from './components/suspend-or-resume.vue';
  import PlasmaUnqualifiedModal from '@/views/inbound-management/accept-plasma/components/PlasmaUnqualifiedModal.vue';
  import SampleUnqualifiedModal from '@/views/inbound-management/accept-plasma/components/SampleUnqualifiedModal.vue';
  import MissNumModal from '@/views/inbound-management/accept-plasma/components/MissNumModal.vue';

  const { createMessage } = useMessage();
  const { success, warning } = createMessage;

  const filterForm = ref<any>({}); // 本批数据
  const trayNo = ref(''); // 托盘编号
  const bagNo = ref(''); // 血浆编号
  const batchNo = ref(''); // 当前批号
  const checker = ref(''); // 当前复核人
  const tableLoading = ref(false);
  const donorFailed = ref(''); // 献血浆者不符合

  const bagNoRef = ref<any>(null);
  const batchDetailRef = ref<any>('');
  const boxDetailRef = ref<any>('');
  const suspendOrResumeRef = ref<any>('');
  const revokeModalRef = ref<any>('');

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
  // 血浆批次信息
  const schema: DescItem[] = [
    {
      field: 'checker',
      label: '复核人',
      contentMinWidth: 100,
      render() {
        return (
          <div class="flex items-center justify-center gap-2 w-[250px] -mt-1">
            <a-input placeholder="请登录" value={checker} disabled />
            <a-button type="primary" onClick={handleLogin}>
              选择
            </a-button>
          </div>
        );
      },
    },
    {
      field: 'batchNo',
      label: '血浆批号',
      contentMinWidth: 100,
      render() {
        return (
          <div class="flex items-center justify-center gap-2 w-[250px] -mt-1">
            <a-input placeholder="请选择" value={batchNo} disabled />
            <a-button type="primary" onClick={selectBatchModal}>
              选择
            </a-button>
          </div>
        );
      },
    },
    {
      field: 'trayNo',
      label: '托盘编号',
      contentMinWidth: 100,
      render() {
        return (
          <div class="flex items-center justify-center gap-2 w-[250px] -mt-1">
            <a-input
              placeholder="请输入"
              onChange={(event) => (trayNo.value = event.target.value)}
              value={trayNo}
            />
          </div>
        );
      },
    },
    {
      field: 'boxNo',
      label: '血浆编号',
      contentMinWidth: 100,
      render() {
        return (
          <div class="flex items-center justify-center gap-2 w-[250px] -mt-1">
            <a-input
              placeholder="请扫描"
              ref={bagNoRef}
              value={bagNo}
              disabled={tableLoading.value}
              onChange={(event) => (bagNo.value = event.target.value)}
              onkeyup={debounce(handlePressEnter, 500)}
            />
          </div>
        );
      },
    },
    {
      field: 'stationName',
      label: '采浆公司',
    },
    {
      field: 'boxNo',
      label: '当前箱号',
      render() {
        return (
          <div>
            {filterForm.value.batchNo && filterForm.value.boxNo ? (
              <span
                style="color: #4f99d6; cursor: pointer;"
                onClick={() => showBatchDetailModal('needBoxNo')}
              >
                {filterForm.value.boxNo}
              </span>
            ) : (
              <span>{filterForm.value.boxNo}</span>
            )}
          </div>
        );
      },
    },
    {
      field: 'verifyBagCount',
      label: '已验收袋',
      render() {
        return (
          <div>
            {filterForm.value.batchNo ? (
              <span style="color: #4f99d6; cursor: pointer;" onClick={showBatchDetailModal}>
                {`${filterForm.value.verifyBagCount}/${filterForm.value.bagCount}`}
              </span>
            ) : (
              <span>{`${filterForm.value.verifyBagCount || 0}/${
                filterForm.value.bagCount || 0
              }`}</span>
            )}
          </div>
        );
      },
    },
    {
      field: 'verifyBoxCount',
      label: '已验收箱',
      render() {
        return (
          <div>
            {filterForm.value.batchNo ? (
              <span style="color: #4f99d6;cursor: pointer;" onClick={showBoxDetailModal}>
                {`${filterForm.value.verifyBoxCount}/${filterForm.value.boxCount}`}
              </span>
            ) : (
              <span>{`${filterForm.value.verifyBoxCount || 0}/${
                filterForm.value.boxCount || 0
              }`}</span>
            )}
          </div>
        );
      },
    },
  ];
  const [register] = useDescription({
    bordered: false,
    column: 4,
    contentStyle: {
      width: '80px',
    },
    title: '血浆验收信息',
    schema: schema,
  });
  const [registerLoginModal, { openModal: openLoginModal }] = useModal();
  const [registerBoxModal, { openModal: openBatchModal }] = useModal();

  const [registerInModal, { openModal: openInModal }] = useModal();
  const [registerOutModal, { openModal: openOutModal }] = useModal();
  const [registerPlasmaUnqualifiedModal, { openModal: openPlasmaUnqualifiedModal }] = useModal();
  const [registerSampleUnqualifiedModal, { openModal: openSampleUnqualifiedModal }] = useModal();
  const [registerMissNumModal, { openModal: openMissNumModal }] = useModal();

  // 表格数据
  const unAcceptList = computed(() => filterForm.value?.unVerifyBag ?? []);
  const acceptList = computed(() => filterForm.value?.verifyBag ?? []);
  const gridOptionsUnaccept = reactive<VxeGridProps<any>>({
    border: true,
    height: '760px',
    showOverflow: true,
    exportConfig: {},
    columnConfig: {
      resizable: true,
    },
    scrollY: {
      enabled: true,
      gt: 0,
    },
    pagerConfig: {
      enabled: false,
    },
    formConfig: {
      enabled: false,
    },
    toolbarConfig: {
      refresh: false,
      loading: false,
      export: false,
      custom: false,
    },
    columns: [
      {
        field: 'index',
        title: '序号',
        type: 'seq',
      },
      {
        field: 'bagNo',
        title: '血浆编号',
      },
    ],
    showFooter: false,
  });
  const gridOptionsAccept = reactive<VxeGridProps<any>>({
    border: true,
    height: '760px',
    showOverflow: true,
    columnConfig: {
      resizable: true,
    },
    scrollY: {
      enabled: true,
      gt: 0,
    },
    pagerConfig: {
      enabled: false,
    },
    formConfig: {
      enabled: false,
    },
    toolbarConfig: {
      refresh: false,
      loading: false,
      export: false,
      custom: false,
    },
    columns: [
      {
        field: 'index',
        title: '序号',
        type: 'seq',
      },
      {
        field: 'bagNo',
        title: '血浆编号',
      },
      {
        title: '验收时间',
        field: 'verifyAt',
        width: 200,
        formatter(params) {
          return params.cellValue ? dayjs(params.cellValue).format('YYYY-MM-DD HH:mm:ss') : '-';
        },
      },
      {
        title: '血浆验收结果',
        field: 'bagResult',
      },
      {
        title: '样本验收结果',
        field: 'sampleResult',
      },
      {
        title: '操作',
        field: 'operator',
        slots: {
          default: 'action',
        },
      },
    ],
    showFooter: false,
  });

  // 血浆扫描
  async function handlePressEnter(e) {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      if (!bagNo.value) {
        warning('请扫描袋号！');
        return;
      }
      if (!checker.value) {
        warning('请登录复核人！');
        return;
      }

      const params = {
        batchNo: batchNo.value,
        boxNo: filterForm.value.boxNo,
        bagNo: bagNo.value,
        checker: checker.value,
        trayNo: trayNo.value,
      };

      // 没有选择批号直接扫码进行的验收操作，将批次信息回填，不作为实际验收操作,相当于查询此批信息
      const realAccept = !!filterForm.value.batchNo;
      try {
        tableLoading.value = true;
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
          if (trayNo.value && data.trayNo && trayNo.value != data.trayNo) {
            Modal.confirm({
              title: '提示?',
              content: createVNode('div', { style: 'color:red;' }, '托盘编号不一致，需要替换吗?'),
              onOk() {
                trayNo.value = data.trayNo;
              },
              onCancel() {
                console.log('Cancel');
              },
              class: 'test',
            });
          } else if (data.trayNo) {
            filterForm.value.trayNo = data.trayNo;
          }

          filterForm.value.unVerifyBag = data.unVerifyBag.map((item: any) => {
            return {
              bagNo: item,
            };
          });

          filterForm.value.verifyBag = data.verifyBag;

          if (realAccept) {
            success('验收成功');
            donorFailed.value = data.donorFailed; // 献血浆者不符合
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
            } else if (!filterForm.value.unVerifyBag.length) {
              success('当前箱验收完成');
            }
          }
        }
      } finally {
        tableLoading.value = false;
        bagNo.value = '';
        nextTick(() => {
          bagNoRef.value.focus();
        });
      }
    }
  }
  // 接口返回设置复核人
  const _setReChecker = (val: string) => {
    if (val && checker.value != val) {
      if (!checker.value) {
        checker.value = val;
      } else {
        Modal.confirm({
          title: '确认是否替换当前复核人？',
          content: `替换复核人为：【${val}】`,
          onOk() {
            checker.value = val;
          },
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onCancel() {},
        });
      }
    }
  };

  // 打开批号选择框
  function selectBatchModal() {
    openBatchModal(true, {
      isAccept: true,
    });
  }
  // 批号框确认
  async function batchModalSuccess(data) {
    batchNo.value = data;
    const res = await getPlasmaVerify(data);
    filterForm.value = res;
    _setReChecker(res.checker);
    filterForm.value.unVerifyBag = res.unVerifyBag.map((item: any) => {
      return {
        bagNo: item,
      };
    });
  }

  // 点击登录按钮
  function handleLogin() {
    openLoginModal(true);
  }
  // 登录成功事件
  function handleSuccess(nickname: string) {
    checker.value = nickname;
  }

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

  // 暂停/继续框
  const suspendModalVisible = ref(false);
  const suspendModal = (pattern: string) => {
    if (!filterForm.value.batchNo) {
      warning('请先选择批次!');
      return;
    }
    if (pattern === 'BOX') {
      if (!checker.value) {
        warning('请先登录复核人!');
        return;
      }
    }
    suspendModalVisible.value = true;
    nextTick(() => {
      suspendOrResumeRef.value.searchForm.batchNo = filterForm.value.batchNo;
      suspendOrResumeRef.value.searchForm.boxNo = filterForm.value.boxNo;
      // 箱暂停使用已登录的复核人，批暂停需要单独登录
      if (pattern === 'BOX') {
        suspendOrResumeRef.value.searchForm.checker = checker.value;
      }
      suspendOrResumeRef.value.searchForm.pattern = pattern;
      suspendOrResumeRef.value.getList();
    });
  };
  const closeSuspend = () => {
    suspendModalVisible.value = false;
  };
  const clearInfo = () => {
    filterForm.value.boxNo = '';
    filterForm.value.unVerifyBag = [];
    filterForm.value.verifyBag = [];
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

  function handlePlasmaUnqualified() {
    if (!batchNo.value) {
      warning('请先选择批号!');
      return;
    }
    openPlasmaUnqualifiedModal(true);
  }

  function handleSampleUnqualified() {
    if (!batchNo.value) {
      warning('请先选择批号!');
      return;
    }

    openSampleUnqualifiedModal(true);
  }

  function handleMissNumRegister() {
    if (!batchNo.value) {
      warning('请先选择批号!');
      return;
    }
    openMissNumModal(true);
  }

  async function handleModalSuccess() {
    try {
      tableLoading.value = true;
      const res = await getPlasmaVerify(batchNo.value);
      filterForm.value = res;
      _setReChecker(res.checker);
      filterForm.value.unVerifyBag = res.unVerifyBag.map((item: any) => {
        return {
          bagNo: item,
        };
      });
    } finally {
      tableLoading.value = false;
    }
  }
</script>
