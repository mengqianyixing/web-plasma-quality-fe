<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handlePrint" v-auth="StoreButtonEnum.TrayListPrint"
          >打印</a-button
        >
        <a-button
          type="primary"
          :loading="loading"
          @click="handlePrintAgain"
          v-auth="StoreButtonEnum.TrayListRePrint"
          >补打</a-button
        >
        <a-button type="primary" @click="handleDiscard(1)" v-auth="StoreButtonEnum.TrayListDisable"
          >停用</a-button
        >
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
      <template #totalBagNumber="{ record }: { record: Recordable }">
        <span class="text-blue-500 underline cursor-pointer" @click.stop.self="handleBag(record)">
          {{ record.totalBagNumber }}
        </span>
      </template>
    </BasicTable>
    <BasicModal
      @register="registerModal"
      @ok="submit"
      width="300px"
      :min-height="60"
      showFooter
      title="托盘打印"
    >
      <BasicForm @register="registerForm" />
    </BasicModal>
    <TableModal @register="registerTableModal" />
    <BoxTableModal @register="registerBoxTableModal" />
    <BagTableModal @register="registerBagTableModal" />
    <BagSampleTableModel @register="registerSampleBagTableModal" />
    <BoxSampleTableModel @register="registerSampleBoxTableModal" />
    <Login
      @register="registerLoginModal"
      @success="login"
      :auth-code="ReCheckButtonEnum.TrayManageCheck"
    />
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
    confirmTrayLabelApi,
    createTrayLabelApi,
    disableTrayApi,
    getListApi,
  } from '@/api/tray/list';
  import { printRecord, replayPrintRecord } from '@/api/tag/printRecord';
  import { message } from 'ant-design-vue';
  import TableModal from './tableDrawer.vue';
  import BoxTableModal from './boxTableDrawer.vue';
  import BagTableModal from './bagTableDrawer.vue';
  import BagSampleTableModel from './bagSampleTableModel.vue';
  import BoxSampleTableModel from './boxSampleTableModel.vue';
  import { ReCheckButtonEnum, StoreButtonEnum } from '@/enums/authCodeEnum';
  import { ref } from 'vue';

  defineOptions({ name: 'TrayList' });

  const loading = ref(false);
  const [registerLoginModal, { openModal: openLoginModal }] = useModal();
  const [registerModal, { openModal, closeModal, setModalProps }] = useModal();
  const [registerTableModal, { openModal: openTableModal }] = useModal();
  const [registerBoxTableModal, { openModal: openBoxTableModal }] = useModal();
  const [registerBagTableModal, { openModal: openBagTableModal }] = useModal();
  const [registerSampleBagTableModal, { openModal: openSampleBagTableModal }] = useModal();
  const [registerSampleBoxTableModal, { openModal: openSampleBoxTableModal }] = useModal();
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
    scroll: { x: 0 },
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
  async function handlePrintAgain() {
    let i = 0;
    const rows = getSelectRows();
    try {
      if (rows.length === 0) return message.warning('请选择数据');
      loading.value = true;
      for (const row of rows) {
        const res = await replayPrintRecord({ labelType: 'TRAY', bssNo: row.trayNo });
        const params = {
          ...res,
          dpi: res.resolution,
        };
        await printRecord(params);
        i++;
      }
      message.success('本次打印成功' + i + '个');
    } catch {
      message.warning(`本次成功${i}个、失败${rows.length - i}个。请检查打印机状态！！！`);
    } finally {
      loading.value = false;
    }
  }
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
      let n = 0;
      try {
        for (const key in res) {
          const re = await printRecord({
            ...res[key],
            resolution: void 0,
            dpi: res[key].resolution,
          });
          console.log(re);

          await confirmTrayLabelApi({ trayNo: key, action: 'confirm' });
          n++;
        }
        message.success('本次打印成功' + n + '个');
      } catch (e) {
        message.warning(`本次成功${n}个、失败${trayNumber - n}个。请检查打印机状态！！！`);
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
    if (row.trayType === 'PER') {
      openSampleBoxTableModal(true, { trayNo: row.trayNo });
    } else {
      openBoxTableModal(true, { trayNo: row.trayNo });
    }
  }
  function handleBag(row: Recordable) {
    if (row.trayType === 'PER') {
      openSampleBagTableModal(true, { trayNo: row.trayNo });
    } else {
      openBagTableModal(true, { trayNo: row.trayNo });
    }
  }
</script>
