<!--
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2024-01-02 13:43:33
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-13 17:28:35
-->
<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          type="primary"
          @click="handleCreate"
          :loading="createLoading"
          v-auth="InspectButtonEnum.ReportReleaseCreate"
          >报告生成</a-button
        >
        <a-button
          type="primary"
          @click="handleUnCreate"
          v-auth="InspectButtonEnum.ReportReleaseUnCreate"
          >撤销生成</a-button
        >
        <a-button
          type="primary"
          @click="handleProcess"
          :loading="reviewLoading"
          v-auth="InspectButtonEnum.ReportReleaseProcess"
          >复核</a-button
        >
        <a-button
          type="primary"
          @click="handleUnProcess"
          v-auth="InspectButtonEnum.ReportReleaseUnProcess"
          >撤销复核</a-button
        >
        <a-button
          type="primary"
          @click="handleRelease"
          v-auth="InspectButtonEnum.ReportReleaseRelease"
          :loading="releaseLoading"
          >发布</a-button
        >
        <a-button
          type="primary"
          @click="handlePrint"
          :loading="reportLoading"
          v-auth="InspectButtonEnum.ReportReleasePrint"
          >打印
        </a-button>
        <a-button
          type="primary"
          @click="handlePrintKM"
          :loading="reportLoading"
          v-auth="InspectButtonEnum.KMReportReleasePrint"
          >打印
        </a-button>
      </template>
      <template #totalUnqualified="{ record }: { record: Recordable }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleDetails(record, 3, '检测不合格样本总数')"
        >
          {{ record.totalUnqualified }}
        </span>
      </template>
      <template #totalQualified="{ record }: { record: Recordable }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleDetails(record, 4, '检测合格样本总数')"
        >
          {{ record.totalQualified }}
        </span>
      </template>
      <template #totalHighTiter="{ record }: { record: Recordable }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleDetails(record, 1, '高效价总数')"
        >
          {{ record.totalHighTiter }}
        </span>
      </template>
      <template #totalLowTiter="{ record }: { record: Recordable }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleDetails(record, 2, '低效价总数')"
        >
          {{ record.totalLowTiter }}
        </span>
      </template>
      <template #totalNormal="{ record }: { record: Recordable }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleDetails(record, 5, '无效价总数')"
        >
          {{ record.totalNormal }}
        </span>
      </template>
      <template #bsNo="{ value }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="opeResultModal(true, { bsNo: value })"
        >
          {{ value }}
        </span>
      </template>
    </BasicTable>
    <Modal
      :open="open"
      @cancel="open = false"
      @ok="confirmRemove"
      okText="提交"
      width="300px"
      :confirmLoading="confirmLoading"
      title="撤销原因"
    >
      <div class="m-20px">
        <BasicForm @register="registerForm" />
      </div>
    </Modal>
    <TabelModal @register="registerModal" />
    <ReportModal @register="registerReportModal" />
    <ResultRegistration @register="registeResultModal" />
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { columns, searchFormschema } from './reportRelease.data';
  import { useModal } from '@/components/Modal';

  import {
    createReportApi,
    getListApi,
    precessRevokeApi,
    processReportApi,
    releaseReportApi,
    revokeReportApi,
  } from '@/api/inspect/reportRelease';
  import { ref } from 'vue';
  import { message, Modal } from 'ant-design-vue';
  import { BasicForm, useForm } from '@/components/Form';
  import TabelModal from './tabelModal.vue';
  import { InspectButtonEnum } from '@/enums/authCodeEnum';
  import ReportModal from '@/components/ReportModal/index.vue';
  import { getReportApi } from '@/api/report';
  import ResultRegistration from './resultRegistration/index.vue';
  import { PrintServerEnum } from '@/enums/printServerEnum';

  defineOptions({ name: 'ReportRelease' });

  const [registerReportModal, { openModal: openReportModal }] = useModal();
  const [registeResultModal, { openModal: opeResultModal }] = useModal();
  const reportLoading = ref(false);
  const open = ref(false);
  const confirmLoading = ref(false);
  const createLoading = ref(false);
  const reviewLoading = ref(false);
  const releaseLoading = ref(false);

  let revokeApi = revokeReportApi;

  const [registerModal, { openModal }] = useModal();
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
    beforeFetch: (p) => ({
      ...p,
      begnIssueAt: p.begnIssueAt?.slice(0, 10),
      endIssueAt: p.endIssueAt?.slice(0, 10),
    }),
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
    formConfig: {
      schemas: searchFormschema,
    },
  });
  const [registerForm, { resetFields, clearValidate, validate }] = useForm({
    labelWidth: 60,
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
  async function handleCreate() {
    const [row] = getSelections(true);
    if (!row) return;
    try {
      createLoading.value = true;
      await createReportApi({ reportNo: row.reportNo });
      message.success('制作成功');
      reload();
    } finally {
      createLoading.value = false;
    }
  }
  function handleUnCreate() {
    const [row] = getSelections(true);
    if (!row) return;
    open.value = true;
    revokeApi = revokeReportApi;
    resetFields();
    clearValidate();
  }
  async function confirmRemove() {
    const { cause } = await validate();
    const [row] = getSelections(true);
    try {
      confirmLoading.value = true;
      await revokeApi({ reportNo: row.reportNo, cause });
      open.value = false;
      message.success('撤销成功');
      reload();
    } finally {
      confirmLoading.value = false;
    }
  }
  async function handleProcess() {
    const [row] = getSelections(true);
    if (!row) return;
    reviewLoading.value = true;
    try {
      await processReportApi({ reportNo: row.reportNo });
      reload();
      message.success('审核成功');
    } finally {
      reviewLoading.value = false;
    }
  }
  async function handleUnProcess() {
    const [row] = getSelections(true);
    if (!row) return;
    open.value = true;
    revokeApi = precessRevokeApi;
    resetFields();
    clearValidate();
  }
  async function handleRelease() {
    const [row] = getSelections(true);
    if (!row) return;
    releaseLoading.value = true;
    try {
      await releaseReportApi({ reportNo: row.reportNo });
      reload();
      message.success('发布成功');
    } finally {
      releaseLoading.value = false;
    }
  }
  async function handlePrint() {
    const [row] = getSelections(true);
    if (!row) return;
    if (row.state === 'TBG') {
      return message.warning('报告制作前不允许打印！');
    }
    let reportType = PrintServerEnum.CALLBACK_CHECK_REPORT;
    if (row.sampleCode === 'NOR') reportType = PrintServerEnum.PLASMA_CHECK_REPORT;
    try {
      reportLoading.value = true;
      const res = await getReportApi({ reportKey: reportType, contentKey: row.reportNo });
      openReportModal(true, window.URL.createObjectURL(res));
      clearSelectedRowKeys();
    } finally {
      reportLoading.value = false;
    }
  }

  async function handlePrintKM() {
    const [row] = getSelections(true);
    if (!row) return;
    if (row.state === 'TBG') {
      return message.warning('报告制作前不允许打印！');
    }
    let reportType = PrintServerEnum.CALLBACK_CHECK_REPORT;
    if (row.sampleCode === 'NOR') reportType = PrintServerEnum.PLASMA_CHECK_REPORT;
    try {
      reportLoading.value = true;
      const res = await getReportApi({ reportKey: reportType, contentKey: row.reportNo });
      openReportModal(true, window.URL.createObjectURL(res));
      clearSelectedRowKeys();
    } finally {
      reportLoading.value = false;
    }
  }

  function handleDetails(row: Recordable, type: number, title: string) {
    openModal(true, { ...row, type, title });
  }
</script>
