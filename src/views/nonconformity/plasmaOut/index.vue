<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="openModal(true, {})">新增</a-button>
        <a-button type="primary" @click="handleEdit">编辑</a-button>
        <a-button type="primary" @click="handleRemove">删除</a-button>
        <a-button type="primary" @click="handleProcess">审核</a-button>
        <a-button type="primary" @click="handleUnProcess">取消审核</a-button>
        <a-button type="primary" @click="handleScan">出库扫描</a-button>
        <a-button type="primary" @click="handlePrint">转移记录打印</a-button>
        <a-button type="primary" @click="handlePrint">不合格原料血浆信息清单打印</a-button>
        <a-button type="primary" @click="handlePrint">不合格原理血浆销毁处理申请审批表</a-button>
      </template>
      <template #dlvNo="{ record }: { record: Recordable }">
        <span class="text-blue-500 underline cursor-pointer" @click.stop.self="handleDt(record)">
          {{ record.dlvNo }}
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
      :title="type + '原因'"
    >
      <div class="m-20px">
        <BasicForm @register="registerForm" />
      </div>
    </Modal>
    <FormModal @register="registerModal" @close="reload" />
    <OutModal @register="registerOutModal" />
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { useModal } from '@/components/Modal';
  import FormModal from './formDrawer.vue';
  import OutModal from './outDrawer.vue';
  import { columns, searchFormschema, PROCESS_STATE_TEXT } from './plasmaOut.data';
  import {
    getListApi,
    removeFormApi,
    processApi,
    unProcessApi,
  } from '@/api/nonconformity/plasmaOut';
  import { ref } from 'vue';
  import { message, Modal } from 'ant-design-vue';
  import { BasicForm, useForm } from '@/components/Form';

  const open = ref(false);
  const confirmLoading = ref(false);
  const type = ref('');

  let api = removeFormApi;

  const [registerModal, { openModal }] = useModal();
  const [registerOutModal, { openModal: openOutModal }] = useModal();
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
      endDate: p.endDate?.slice(0, 10),
      begnDate: p.begnDate?.slice(0, 10),
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

  function handleEdit() {
    const [row] = getSelections(true);
    if (!row) return;
    if (row.state !== PROCESS_STATE_TEXT.AUT) return message.warning('已审核的数据不可修改');
    openModal(true, { ...row });
  }
  function handleDt(record: Recordable) {
    openModal(true, { ...record, disabled: true });
  }
  function handleRemove() {
    const [row] = getSelections(true);
    if (!row) return;
    type.value = '删除';
    open.value = true;
    api = removeFormApi;
    resetFields();
    clearValidate();
  }
  async function confirmRemove() {
    const { cause } = await validate();
    const [row] = getSelections(true);
    try {
      confirmLoading.value = true;
      await api({ no: row.dlvNo, cause });
      open.value = false;
      message.success(type.value + '成功');
      reload();
    } finally {
      confirmLoading.value = false;
    }
  }
  async function handleProcess() {
    const [row] = getSelections(true);
    if (!row) return;
    Modal.confirm({
      content: '确认审核' + row.dlvNo + '?',
      onOk: async () => {
        await processApi({ no: row.dlvNo });
        message.success('审核成功');
        clearSelectedRowKeys();
        reload();
      },
      onCancel: () => Modal.destroyAll(),
    });
  }
  async function handleUnProcess() {
    const [row] = getSelections(true);
    if (!row) return;
    type.value = '取消审核';
    open.value = true;
    api = unProcessApi;
    resetFields();
    clearValidate();
  }
  async function handleScan() {
    const [row] = getSelections(true);
    if (!row) return;

    openOutModal(true, row);
  }
  function handlePrint() {
    const [row] = getSelections(true);
    if (!row) return;
  }
</script>
