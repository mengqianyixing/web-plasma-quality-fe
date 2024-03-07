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
          >发布</a-button
        >
        <a-button
          type="primary"
          @click="handlePrint"
          v-auth="InspectButtonEnum.ReportReleasePrintBack"
          >打印回访样本检检验报告</a-button
        >
        <a-button
          type="primary"
          @click="handlePrint"
          v-auth="InspectButtonEnum.ReportReleasePrintCheck"
          >打印原料血浆检验报告</a-button
        >
      </template>
      <template #totalUnqualified="{ record }: { record: Recordable }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleDetails(record, 3, '不合格')"
        >
          {{ record.totalUnqualified }}
        </span>
      </template>
      <template #totalQualified="{ record }: { record: Recordable }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleDetails(record, 4, '合格')"
        >
          {{ record.totalQualified }}
        </span>
      </template>
      <template #totalHighTiter="{ record }: { record: Recordable }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleDetails(record, 1, '高效价')"
        >
          {{ record.totalHighTiter }}
        </span>
      </template>
      <template #totalLowTiter="{ record }: { record: Recordable }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleDetails(record, 2, '低效价')"
        >
          {{ record.totalLowTiter }}
        </span>
      </template>
      <template #totalNormal="{ record }: { record: Recordable }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleDetails(record, 5, '无效价')"
        >
          {{ record.totalNormal }}
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
      title="取消原因"
    >
      <div class="m-20px">
        <BasicForm @register="registerForm" />
      </div>
    </Modal>
    <TabelModal @register="registerModal" />
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { columns, searchFormschema } from './reportRelease.data';
  import { useModal } from '@/components/Modal';

  import {
    getListApi,
    createReportApi,
    revokeReportApi,
    processReportApi,
    precessRevokeApi,
    releaseReportApi,
  } from '@/api/inspect/reportRelease';
  import { ref } from 'vue';
  import { message, Modal } from 'ant-design-vue';
  import { BasicForm, useForm } from '@/components/Form';
  import TabelModal from './tabelModal.vue';
  import { InspectButtonEnum } from '@/enums/authCodeEnum';

  defineOptions({ name: 'ReportRelease' });

  const open = ref(false);
  const confirmLoading = ref(false);
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
    await createReportApi({ reportNo: row.reportNo });
    message.success('制作成功');
    reload();
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
      message.success('取消成功');
      reload();
    } finally {
      confirmLoading.value = false;
    }
  }
  async function handleProcess() {
    const [row] = getSelections(true);
    if (!row) return;
    await processReportApi({ reportNo: row.reportNo });
    reload();
    message.success('审核成功');
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
    await releaseReportApi({ reportNo: row.reportNo });
    reload();
    message.success('发布成功');
  }
  function handlePrint() {
    const [row] = getSelections(true);
    if (!row) return;
  }
  function handleDetails(row: Recordable, type: number, title: string) {
    openModal(true, { ...row, type, title });
  }
</script>
