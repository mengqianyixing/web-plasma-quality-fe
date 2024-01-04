<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2024-01-02 13:43:33
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-04 13:58:08
-->
<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate()">报告制作</a-button>
        <a-button type="primary" @click="handleUnCreate()">取消制作</a-button>
        <a-button type="primary" @click="handleProcess()">审核</a-button>
        <a-button type="primary" @click="handleUnProcess()">取消审核</a-button>
        <a-button type="primary" @click="handleRelease">结果发布</a-button>
        <a-button type="primary" @click="handlePrint">打印</a-button>
      </template>
      <template #sampleCode="{ record }: { record: Recordable }">
        {{ sampleTypeMap.get(record.sampleCode) }}
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
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { columns, searchFormschema } from './reportRelease.data';
  import {
    getListApi,
    createReportApi,
    revokeReportApi,
    processReportApi,
    precessRevokeApi,
    releaseReportApi,
  } from '@/api/inspect/reportRelease';
  import { getDictItemListByNoApi } from '@/api/dictionary';
  import { onMounted, ref } from 'vue';
  import { message, Modal } from 'ant-design-vue';
  import { BasicForm, useForm } from '@/components/Form';

  const sampleTypeMap = ref(new Map());
  const open = ref(false);
  const confirmLoading = ref(false);
  let revokeApi = revokeReportApi;

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
      labelWidth: 90,
      baseColProps: { span: 6 },
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
    message.success('发布成功');
  }
  function handlePrint() {
    const [row] = getSelections(true);
    if (!row) return;
  }
  onMounted(async () => {
    const [res] = await getDictItemListByNoApi(['sampleType']);
    res.dictImtes?.forEach((_) => {
      sampleTypeMap.value.set(_.value, _.label);
    });
  });
</script>
