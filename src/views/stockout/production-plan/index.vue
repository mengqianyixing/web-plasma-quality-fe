<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handlePick" v-auth="StockOutButtonEnum.ProductionPlanPick"
          >挑选血浆</a-button
        >
        <a-button
          type="primary"
          @click="handleComplate"
          v-auth="StockOutButtonEnum.ProductionPlanComplate"
          >完成计划</a-button
        >
        <a-button
          type="primary"
          @click="handleCancelComplate"
          v-auth="StockOutButtonEnum.ProductionPlanReComplate"
          >撤销计划</a-button
        >
        <a-button
          type="primary"
          @click="handleReview()"
          v-auth="StockOutButtonEnum.ProductionPlanReview"
          >复核</a-button
        >
        <a-button
          type="primary"
          @click="handleCancelReview()"
          v-auth="StockOutButtonEnum.ProductionPlanReReview"
          >撤销复核</a-button
        >
        <a-button
          type="primary"
          @click="handleCheck()"
          v-auth="StockOutButtonEnum.ProductionPlanCheck"
          >审核</a-button
        >
        <a-button
          type="primary"
          @click="handleStacker"
          v-if="isStacker"
          v-auth="StockOutButtonEnum.ProductionPlanPMS"
          >PMS组垛</a-button
        >
        <a-button
          type="primary"
          @click="handleCancelCheck()"
          v-auth="StockOutButtonEnum.ProductionPlanReCheck"
          >撤销审核</a-button
        >
        <a-dropdown
          v-auth="[
            StockOutButtonEnum.ProductionPlanCheckListReport,
            StockOutButtonEnum.ProductionPlanTransferReport,
            StockOutButtonEnum.ProductionPlanMaterialReport,
          ]"
        >
          <a-button type="primary" :loading="reportLoading"> 打印 </a-button>
          <template #overlay>
            <Menu>
              <MenuItem>
                <a-button
                  type="link"
                  @click="handlePrint('PLASMA_PRODUCTION_CHECKLIST')"
                  v-auth="StockOutButtonEnum.ProductionPlanCheckListReport"
                >
                  原料血浆投产清单
                </a-button>
              </MenuItem>
              <MenuItem>
                <a-button
                  type="link"
                  @click="handlePrint('PLASMA_TRANSFER_RECORD')"
                  v-auth="StockOutButtonEnum.ProductionPlanTransferReport"
                >
                  原料血浆转移记录
                </a-button>
              </MenuItem>
              <MenuItem>
                <a-button
                  type="link"
                  @click="handlePrint('MATERIAL_PLASMA')"
                  v-auth="StockOutButtonEnum.ProductionPlanMaterialReport"
                >
                  原料血浆复检试剂统计报表
                </a-button>
              </MenuItem>
              <MenuItem>
                <a-button
                  type="link"
                  @click="handlePrint('PLASMA_PRODUCTION_PLAN')"
                  v-auth="StockOutButtonEnum.ProductionPlanPlasmaReport"
                >
                  原料血浆投产计划
                </a-button>
              </MenuItem>
              <MenuItem>
                <a-button
                  type="link"
                  @click="handlePrint('PLASMA_PRODUCTION_APPLICATION')"
                  v-auth="StockOutButtonEnum.PlasmaProductionApplication"
                >
                  原料血浆投产申报表
                </a-button>
              </MenuItem>
            </Menu>
          </template>
        </a-dropdown>
        <a-button
          @click="handleDownloadAbstract(PrintServerEnum.PLASMA_ABSTRACT)"
          type="primary"
          :loading="loading"
          v-auth="StockOutButtonEnum.ProductionPlanSummary"
        >
          下载原料血浆摘要
        </a-button>
        <a-button
          @click="handleDownloadAbstract(PrintServerEnum.KM_PLASMA_ABSTRACT)"
          type="primary"
          :loading="loading"
          v-auth="StockOutButtonEnum.ProductionPlanSummaryKunMing"
        >
          下载原料血浆摘要
        </a-button>
      </template>
      <template #mesId="{ record }: { record: Recordable }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleDetails(record)"
        >
          {{ record.mesId }}
        </span>
      </template>
    </BasicTable>
    <PickedModal @register="registerModal" @success="success" @close="reload" />
    <Modal
      :open="open"
      @cancel="open = false"
      @ok="confirmCancel"
      okText="提交"
      width="300px"
      :confirmLoading="confirmLoading"
      :title="cancelText + '原因'"
    >
      <div class="m-20px">
        <BasicForm @register="registerForm" />
      </div>
    </Modal>
    <ReportModal @register="registerReportModal" />
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { columns, searchFormSchema } from './production-plan.data';
  import { message, Modal, Dropdown as ADropdown, MenuItem, Menu } from 'ant-design-vue';
  import PickedModal from './picked-modal.vue';
  import { STATUS, STATUS_TEXT } from '@/enums/productionPlanEnum';
  import {
    getListApi,
    submitComplateApi,
    submitComplateCancelApi,
    submitReviewCancelApi,
    submitReviewlApi,
    submitCheckCancelApi,
    submitChecklApi,
    submitPMSApi,
  } from '@/api/stockout/production-plan';
  import { nextTick, ref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { StockOutButtonEnum } from '@/enums/authCodeEnum';

  import ReportModal from '@/components/ReportModal/index.vue';
  import { getReportApi } from '@/api/report';
  import { useModal } from '@/components/Modal';
  import { downloadReport } from '@/api/stockout/plasma-summary';
  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
  import { useMessage } from '@/hooks/web/useMessage';
  import { PrintServerEnum } from '@/enums/printServerEnum';

  const { createErrorModal } = useMessage();

  const globalApiStore = useGlobalApiStoreWithOut();
  defineOptions({ name: 'ProductionPlan' });

  const [registerReportModal, { openModal: openReportModal }] = useModal();

  const [registerModal, { openModal }] = useModal();
  const confirmLoading = ref(false);
  const open = ref(false);
  const reportLoading = ref(false);
  const cancelText = ref('');
  const isStacker = ref(false);

  let iterator: AsyncIterator<any>;

  const [registerForm, { resetFields, clearValidate, validate }] = useForm({
    labelWidth: 80,
    baseColProps: { span: 24 },
    schemas: [
      {
        field: 'cause',
        component: 'Input',
        label: '原因',
        required: true,
      },
    ],
    showActionButtonGroup: false,
  });
  const [registerTable, { getSelectRows, clearSelectedRowKeys, reload }] = useTable({
    api: getListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: columns,
    size: 'small',
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    rowSelection: { type: 'radio' },
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
    formConfig: {
      schemas: searchFormSchema,
    },
  });

  globalApiStore.getSysParamsValue('regroupModel').then((res) => {
    isStacker.value = res === 'open';
  });
  function getSelections(onlyOne: boolean) {
    const rows = getSelectRows();
    if (rows.length === 0) {
      message.warning('请选择一条数据');
      return [];
    } else if (rows.length > 1 && onlyOne) {
      message.warning('只能选择一条数据');
      return [];
    }
    return rows;
  }
  function handlePick() {
    const [row] = getSelections(true);
    if (!row) return;
    if (row.state !== STATUS.TBP && row.state !== STATUS.PLI) {
      return message.warning(`请选择【
      ${STATUS_TEXT.get(STATUS.TBP)} 或
      ${STATUS_TEXT.get(STATUS.PLI)}
      】的数据`);
    }
    openModal(true, { ...row, isStacker: isStacker.value });
  }

  function success() {
    clearSelectedRowKeys();
    reload();
  }

  const { createConfirm } = useMessage();

  function handleStacker() {
    const [row] = getSelections(true);
    if (!row) return;
    createConfirm({
      iconType: 'warning',
      content: '确认调用制造批号【' + row.mesId + '】的PMS组垛任务?',
      onOk: async () => {
        await submitPMSApi({ orderNo: row.orderNo });
        message.success('调用组垛任务成功！');
        clearSelectedRowKeys();
        await reload();
      },
    });
  }
  async function confirmCancel() {
    await validate();
    iterator.next();
  }
  function handleComplate() {
    const [row] = getSelections(true);
    if (!row) return;
    if (row.state !== STATUS.PLI) {
      return message.warning(`请选择【${STATUS_TEXT.get(STATUS.PLI)}】的数据`);
    }
    handleConfirm({ api: submitComplateApi, text: '完成计划', row });
  }
  function handleCancelComplate() {
    const [row] = getSelections(true);
    if (!row) return;
    if (row.state !== STATUS.PBR) {
      return message.warning(`请选择【${STATUS_TEXT.get(STATUS.PBR)}】的数据`);
    }
    cancelText.value = '撤销计划';
    iterator = handleNext(() => handleCancelConfirm({ api: submitComplateCancelApi, row }));
    iterator.next();
  }

  function handleReview() {
    const [row] = getSelections(true);
    if (!row) return;
    if (row.state !== STATUS.PBR) {
      return message.warning(`请选择【${STATUS_TEXT.get(STATUS.PBR)}】的数据`);
    }
    handleConfirm({ api: submitReviewlApi, text: '复核', row });
  }
  function handleCancelReview() {
    const [row] = getSelections(true);
    if (!row) return;
    if (row.state !== STATUS.PLD) {
      return message.warning(`请选择【${STATUS_TEXT.get(STATUS.PLD)}】的数据`);
    }
    cancelText.value = '撤销复核';
    iterator = handleNext(() => handleCancelConfirm({ api: submitReviewCancelApi, row }));
    iterator.next();
  }
  function handleCheck() {
    const [row] = getSelections(true);
    if (!row) return;
    if (row.state !== STATUS.PLD) {
      return message.warning(`请选择【${STATUS_TEXT.get(STATUS.PLD)}】的数据`);
    }
    handleConfirm({ api: submitChecklApi, text: '审批', row });
  }
  function handleCancelCheck() {
    const [row] = getSelections(true);
    if (!row) return;
    if (row.state !== STATUS.PVD) {
      return message.warning(`请选择【${STATUS_TEXT.get(STATUS.PVD)}】的数据`);
    }
    cancelText.value = '撤销审核';
    iterator = handleNext(() => handleCancelConfirm({ api: submitCheckCancelApi, row }));
    iterator.next();
  }
  async function* handleNext(fn: Function, ...arg: any) {
    open.value = true;
    await nextTick();
    resetFields();
    yield clearValidate();
    while (true) {
      yield fn(...arg);
    }
  }
  function handleConfirm({ api, text, row }) {
    createConfirm({
      iconType: 'warning',
      content: '确认' + text + '制造批号' + row.mesId + '?',
      onOk: async () => {
        await api({ orderNo: row.orderNo, cause: '.' });
        clearSelectedRowKeys();
        await reload();
        message.success(text + '成功');
      },
    });
  }
  async function handleCancelConfirm({ api, row }) {
    try {
      const values = await validate();
      confirmLoading.value = true;
      await api({ orderNo: row.orderNo, cause: values.cause });
      open.value = false;
      message.success(cancelText.value + '成功');
      reload();
      clearSelectedRowKeys();
    } finally {
      confirmLoading.value = false;
    }
  }

  function handleDetails(record: Recordable) {
    openModal(true, { ...record, disabled: true, isStacker: isStacker.value });
  }
  async function handlePrint(reportType: string) {
    const [row] = getSelections(true);
    if (!row) return;
    if ([STATUS.TBP, STATUS.PLI].includes(row.state)) {
      return message.warning('未完成计划不可打印');
    }
    try {
      reportLoading.value = true;
      const res = await getReportApi({ reportKey: reportType, contentKey: row.mesId });
      openReportModal(true, window.URL.createObjectURL(res));
      clearSelectedRowKeys();
    } finally {
      reportLoading.value = false;
    }
  }

  const loading = ref(false);
  async function handleDownloadAbstract(key: PrintServerEnum) {
    const [row] = getSelections(true);
    if (!row) return;
    if ([STATUS.TBP, STATUS.PLI].includes(row.state)) {
      return message.warning('未完成计划不可下载');
    }
    try {
      loading.value = true;
      const res = await downloadReport({
        ReportKey: key,
        contentKey: row.mesId,
      });
      const blobFile = new Blob([res.data], { type: 'application/json' });
      const reader = new FileReader();
      reader.readAsText(blobFile, 'utf-8');
      reader.onload = function (e) {
        try {
          const data = JSON.parse(e.target!.result as string);
          if (data.code === '500') {
            createErrorModal({ title: '错误提示', content: data.msg });
          }
        } catch (e) {
          const blob = new Blob([res.data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.download = `原料血浆摘要${row.mesId}.doc`;
          a.href = url;
          a.click();
          window.URL.revokeObjectURL(url);
        }
      };
    } finally {
      loading.value = false;
    }
  }
</script>
