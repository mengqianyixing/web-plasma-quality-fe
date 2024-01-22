<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handlePrint">打印</a-button>
        <a-button type="primary" @click="handlePrintAgain">补打</a-button>
        <a-button type="primary" @click="handleDiscard(1)">停用</a-button>
      </template>
      <template #trayNo="{ record }: { record: Recordable }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleDetails(record)"
        >
          {{ record.trayNo }}
        </span>
      </template>
      <template #totalNumber="{ record }: { record: Recordable }">
        <span class="text-blue-500 underline cursor-pointer" @click.stop.self="handleBox(record)">
          {{ record.totalNumber }}
        </span>
      </template>
    </BasicTable>
    <BasicModal @register="registerModal" @ok="submit" showFooter title="托盘打印">
      <BasicForm @register="registerForm" />
    </BasicModal>
    <TableModal @register="registerTableModal" />
    <BoxTableModal @register="registerBoxTableModal" />
    <Login @register="registerLoginModal" @success="login" />
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { columns, searchFormSchema } from './manage.data';
  import { BasicModal, useModal } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import Login from '@/__components/ReviewLoginModal/index.vue';

  import {
    getListApi,
    disableTrayApi,
    createTrayLabelApi,
    confirmTrayLabelApi,
  } from '@/api/tray/list';
  import { message } from 'ant-design-vue';
  import TableModal from './tableDrawer.vue';
  import BoxTableModal from './boxTableDrawer.vue';

  const [registerLoginModal, { openModal: openLoginModal }] = useModal();
  const [registerModal, { openModal, closeModal, setModalProps }] = useModal();
  const [registerTableModal, { openModal: openTableModal }] = useModal();
  const [registerBoxTableModal, { openModal: openBoxTableModal }] = useModal();
  const [registerForm, { validate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: [
      {
        component: 'InputNumber',
        field: 'trayNumber',
        label: '托盘数量',
        defaultValue: 1,
        required: true,
        componentProps: {
          min: 1,
        },
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
    rowKey: 'trayNo',
    columns: columns,
    size: 'small',
    useSearchForm: true,
    bordered: true,
    rowSelection: { type: 'checkbox' },
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
    formConfig: {
      schemas: searchFormSchema,
    },
  });
  function handlePrint() {
    setModalProps({ confirmLoading: false });
    openModal(true);
  }
  function handlePrintAgain() {}
  function handleDiscard(closed: number) {
    const rows = getSelectRows();
    if (rows.length > 1) return message.warning('只能选择一条数据');
    else if (rows.length === 0) return message.warning('请选择一条数据');
    const [row] = rows;
    if (row.closed === closed) return message.warning('状态不需要变更');
    openLoginModal(true, {});
  }
  async function login(userName, values) {
    const rows = getSelectRows();
    const [row] = rows;
    await disableTrayApi({ trayNo: row.trayNo, rechecker: values.userId });
    clearSelectedRowKeys();
    reload();
  }
  async function submit() {
    try {
      setModalProps({ confirmLoading: true });
      const { trayNumber } = await validate();
      const res = await createTrayLabelApi({ trayNumber });
      for (const key in res) {
        await confirmTrayLabelApi({ trayNo: key, action: 'confirm' });
      }
      setModalProps({ confirmLoading: false });
      closeModal();
      reload();
    } catch {
      setModalProps({ confirmLoading: false });
    }
  }
  function handleDetails(row: Recordable) {
    openTableModal(true, { trayNo: row.trayNo });
  }
  function handleBox(row: Recordable) {
    openBoxTableModal(true, { trayNo: row.trayNo });
  }
</script>
