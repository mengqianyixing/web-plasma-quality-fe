<template>
  <PageWrapper contentFullHeight fixedHeight>
    <Description @register="register" :data="filterForm" />
    <div class="flex gap-1 mt-1">
      <vxe-grid
        v-bind="gridOptionsUnaccept"
        :data="unAcceptList"
        class="w-2/5 inline-block pr-2"
        :loading="tableLoading"
      >
        <template #toolbar>
          <div class="p-3 font-medium text-[16px] bg-[#ffffff] rounded">
            <span>未接收箱数：</span>
            <span>{{ unAcceptList?.length }}</span>
          </div>
        </template>
      </vxe-grid>
      <vxe-grid
        v-bind="gridOptionsAccept"
        :data="acceptList"
        :loading="tableLoading"
        class="inline-block w-3/5"
      >
        <template #toolbar>
          <div class="flex items-center justify-between bg-[#ffffff]">
            <div class="p-3 font-medium text-[16px] bg-[#ffffff] rounded">
              <span>已接收箱数：</span>
              <span>{{ acceptList?.length }}</span>
            </div>
            <div>
              <a-button @click="susModal">暂停接收</a-button>
              <a-button @click="openDrawer(true, filterForm)" :disabled="!filterForm.batchNo"
                >托盘入库</a-button
              >
            </div>
          </div>
        </template>
      </vxe-grid>
    </div>
    <BatchModal @register="registerBoxModal" @success="batchModalSuccess" />
    <suspendOrResumeModal
      @register="registerSusModal"
      @success="batchModalSuccess"
      @clear-info="clearInfo"
    />
    <InStoreDrawer @register="registerDrawer" />
  </PageWrapper>
</template>
<script setup lang="tsx">
  import { ref, computed, reactive, createVNode, nextTick } from 'vue';
  import { debounce } from 'lodash-es';
  import { getAccepts, acceptPlasma } from '@/api/inbound-management/receive-plasma';
  import PageWrapper from '@/components/Page/src/PageWrapper.vue';
  import Description from '@/components/Description/src/Description.vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { VxeGridProps } from 'vxe-table';
  import { DescItem, useDescription } from '@/components/Description';
  import { useModal } from '@/components/Modal';
  import BatchModal from '@/views/inbound-management/receive-plasma/components/batch-modal.vue';
  import suspendOrResumeModal from './components/suspend-or-resume.vue';
  import { Modal } from 'ant-design-vue';
  import { useDrawer } from '@/components/Drawer';
  import InStoreDrawer from '../components/inStoreDrawer/index.vue';
  import dayjs from 'dayjs';

  const { createMessage } = useMessage();
  const { success, warning } = createMessage;
  const [registerDrawer, { openDrawer }] = useDrawer();

  const filterForm = ref<any>({}); // 本批数据
  const trayNo = ref(''); // 托盘编号
  const boxNo = ref(''); // 当前箱号
  const batchNo = ref(''); // 当前批号
  const tableLoading = ref(false);
  const boxNoRef = ref<any>(null);

  // 血浆批次信息
  const schema: DescItem[] = [
    {
      field: 'batchNo',
      label: '血浆批号',
      contentMinWidth: 100,
      render() {
        return (
          <div class="flex items-center justify-center gap-2 w-[300px] -mt-1">
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
          <div class="flex items-center justify-center gap-2 w-[300px] -mt-1">
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
      label: '箱号',
      contentMinWidth: 100,
      render() {
        return (
          <div class="flex items-center justify-center gap-2 w-[300px] -mt-1">
            <a-input
              placeholder="请扫描"
              ref={boxNoRef}
              value={boxNo}
              disabled={tableLoading.value}
              onChange={(event) => (boxNo.value = event.target.value)}
              onPressEnter={debounce(handlePressEnter, 500)}
            />
          </div>
        );
      },
    },
    {
      field: 'stationName',
      label: '采浆公司',
    },
    // {
    //   field: 'transNo',
    //   label: '出库单号',
    //   render(text) {
    //     return <span>{text}</span>;
    //   },
    // },
    {
      field: 'boxCount',
      label: '血浆箱数',
      render() {
        return <span>{filterForm.value.acceptDetail?.boxCount}</span>;
      },
    },
    {
      field: 'plasmaCount',
      label: '血浆数量',
      render() {
        return <span>{filterForm.value.acceptDetail?.plasmaCount}</span>;
      },
    },
  ];
  const [register] = useDescription({
    bordered: false,
    column: 3,
    contentStyle: {
      width: '80px',
    },
    title: '血浆接收信息',
    schema: schema,
  });

  // 箱号扫描
  async function handlePressEnter() {
    if (!boxNo.value) {
      warning('请扫描箱号!');
      return;
    }
    if (!trayNo.value) {
      warning('请输入托盘编号!');
      return;
    }
    const params = {
      boxNo: boxNo.value,
      trayNo: trayNo.value,
      batchNo: batchNo.value,
    };
    try {
      tableLoading.value = true;
      const data = await acceptPlasma(params);
      if (data) {
        success('接收成功!');
        filterForm.value = data;
        if (data.acceptDetail?.unAcceptCount <= 0) {
          // 一批接收完毕 提示
          showConfirmGoon();
        }
      }
    } finally {
      tableLoading.value = false;
      boxNo.value = '';
      nextTick(() => {
        boxNoRef.value.focus();
      });
    }
  }

  function showConfirmGoon() {
    Modal.confirm({
      title: '是否继续接收其他批次?',
      content: createVNode('div', { style: 'color:red;' }, '当前批已接收完成！'),
      onOk() {
        // 清空当前批次信息
        filterForm.value = {};
        trayNo.value = '';
        boxNo.value = '';
        batchNo.value = '';
        // 打开批号选择框
        openBatchModal(true, {
          fresh: true,
        });
      },
      onCancel() {
        console.log('Cancel');
      },
      class: 'test',
    });
  }

  // 表格数据
  const unAcceptList = computed(() => filterForm.value?.acceptDetail?.unAcceptDetails ?? []);
  const acceptList = computed(() => filterForm.value?.acceptDetail?.acceptDetails ?? []);
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
        field: 'boxNo',
        title: '箱号',
      },
      {
        field: 'plasmaCount',
        title: '血浆数量',
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
        field: 'trayNo',
        title: '托盘编号',
      },
      {
        title: '箱号',
        field: 'boxNo',
      },
      {
        title: '血浆数量',
        field: 'plasmaCount',
      },
      {
        title: '接收人',
        field: 'operator',
      },
      {
        title: '接收日期',
        field: 'acceptAt',
        width: 200,
        formatter(params) {
          return params.cellValue ? dayjs(params.cellValue).format('YYYY-MM-DD') : '-';
        },
      },
    ],
    showFooter: false,
  });

  const [registerBoxModal, { openModal: openBatchModal }] = useModal();
  const [registerSusModal, { openModal: openSusModal }] = useModal();

  function selectBatchModal() {
    openBatchModal(true, {});
  }

  // 打开暂停记录框
  function susModal() {
    openSusModal(true, {
      batchNo: batchNo.value,
    });
  }
  function clearInfo() {
    filterForm.value.acceptDetail.unAcceptDetails = [];
    filterForm.value.acceptDetail.acceptDetails = [];
  }
  // 批号框确认
  async function batchModalSuccess(data) {
    batchNo.value = data;
    filterForm.value = await getAccepts(data);
  }
</script>
