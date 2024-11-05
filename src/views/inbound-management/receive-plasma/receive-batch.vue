<template>
  <PageWrapper>
    <Description @register="register" :data="filterForm" />
    <div class="flex gap-1 mt-1">
      <vxe-grid
        v-bind="gridOptionsUnaccept"
        :data="unAcceptList"
        class="inline-block w-2/5 pr-2"
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
            <div class="flex gap-2">
              <a-button
                v-if="!isKm"
                @click="openModal(true, filterForm)"
                :disabled="!filterForm.batchNo"
                type="primary"
                v-auth="ReCheckButtonEnum.PlasmaReceiveTray"
              >
                托盘入库
              </a-button>
              <a-button
                v-auth="ReCheckButtonEnum.PlasmaReceiveBatch"
                type="primary"
                @click="handleAcceptSample"
                :disabled="!filterForm.batchNo"
              >
                接收
              </a-button>
            </div>
          </div>
        </template>
      </vxe-grid>
    </div>
    <BatchModal @register="registerBoxModal" @success="batchModalSuccess" />
    <InStoreDrawer @register="registerModal" />
  </PageWrapper>
</template>
<script setup lang="tsx">
  import { ref, computed, reactive } from 'vue';
  import { debounce } from 'lodash-es';
  import {
    getAccepts,
    acceptPlasmaBatch,
    checkTrayNo,
  } from '@/api/inbound-management/receive-plasma';
  import PageWrapper from '@/components/Page/src/PageWrapper.vue';
  import Description from '@/components/Description/src/Description.vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { VxeGridProps } from 'vxe-table';
  import { DescItem, useDescription } from '@/components/Description';
  import { Modal } from 'ant-design-vue';
  import { useModal } from '@/components/Modal';
  import BatchModal from '@/views/inbound-management/receive-plasma/components/batch-modal.vue';
  import InStoreDrawer from '../components/inStoreDrawer/index.vue';
  import dayjs from 'dayjs';
  import { ReCheckButtonEnum } from '@/enums/authCodeEnum';
  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
  import { SysParamsEnum } from '@/enums/sysParamsEnum';
  import { COMPANY } from '@/enums/company';

  const globalApiStore = useGlobalApiStoreWithOut();
  const isKm = globalApiStore.getSysParams(SysParamsEnum.BloodProductionCompany) === COMPANY.KM;

  defineOptions({ name: 'ReceivePlasma' });

  const { createMessage, createConfirm, createWarningModal } = useMessage();
  const { success, warning } = createMessage;
  const [registerModal, { openModal }] = useModal();

  const filterForm = ref<any>({}); // 本批数据
  const trayNo = ref(''); // 托盘编号
  const batchNo = ref(''); // 当前批号
  const tableLoading = ref(false);

  // 血浆批次信息
  const schema: DescItem[] = [
    {
      field: 'batchNo',
      label: '血浆批号',
      contentMinWidth: 100,
      render() {
        return (
          <div class="flex items-center justify-center gap-2 w-[300px] max-w-full	 -mt-1">
            <a-input-search
              placeholder="请点击选择"
              enter-button="选择"
              value={batchNo}
              readonly
              onSearch={selectBatchModal}
            ></a-input-search>
          </div>
        );
      },
    },
    {
      field: 'trayNo',
      label: '托盘编号',
      show() {
        return !isKm;
      },
      contentMinWidth: 100,
      render() {
        return (
          <div class="flex items-center justify-center gap-2 w-[300px] max-w-full	 -mt-1">
            <a-input
              placeholder="请输入"
              onChange={(event) => (trayNo.value = event.target.value)}
              value={trayNo}
              onkeyup={debounce(handlePressEntertrayNo, 500)}
              disabled={tableLoading.value}
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

  // 表格数据
  const unAcceptList = computed(() => filterForm.value?.acceptDetail?.unAcceptDetails ?? []);
  const acceptList = computed(() => filterForm.value?.acceptDetail?.acceptDetails ?? []);
  const gridOptionsUnaccept = reactive<VxeGridProps<any>>({
    border: true,
    height: '710px',
    rowConfig: {
      isHover: true,
    },
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
    height: '710px',
    rowConfig: {
      isHover: true,
    },
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

  function selectBatchModal() {
    openBatchModal(true, {});
  }

  // 批号框确认
  async function batchModalSuccess(data) {
    trayNo.value = '';
    batchNo.value = data;
    filterForm.value = await getAccepts(data);
  }

  async function handleAcceptSample() {
    if (!trayNo.value && !isKm) {
      warning('请扫描托盘编号!');
      return;
    }
    createConfirm({
      title: '确认',
      content: '确认接收血浆',
      iconType: 'warning',
      onOk: async () => {
        try {
          tableLoading.value = true;
          Modal.destroyAll();
          await acceptPlasmaBatch({
            batchNo: batchNo.value,
            trayNo: trayNo.value,
          });
          success('血浆接收成功!');
          batchModalSuccess(batchNo.value);
        } finally {
          tableLoading.value = false;
        }
      },
      onCancel: () => Modal.destroyAll(),
    });
  }

  // 托盘编号扫描
  async function handlePressEntertrayNo(e) {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      if (!batchNo.value) {
        warning('请先选择血浆批号!');
        return;
      }
      if (!trayNo.value && !isKm) {
        warning('请扫描托盘编号!');
        return;
      }
      try {
        tableLoading.value = true;

        const res = await checkTrayNo(trayNo.value);
        if (res.data.code !== '0' && res.data.msg) {
          createWarningModal({
            title: '提示',
            content: res.data.msg,
            keyboard: false,
            wrapClassName: 'rpbat9527',
          });
          const dom: HTMLElement | null = document.querySelector('.rpbat9527 button');
          setTimeout(() => {
            dom?.blur();
          });
          return;
        }
      } finally {
        tableLoading.value = false;
      }
    }
  }
</script>
