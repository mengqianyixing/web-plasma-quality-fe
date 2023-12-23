<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handlePrint">打印</a-button>
        <a-button type="primary" @click="handlePrintAgain">补打</a-button>
        <a-button type="primary" @click="handleDiscard(1)">报废</a-button>
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
    <BasicDrawer @register="registerDrawer" @ok="submit" showFooter title="托盘打印">
      <BasicForm @register="registerForm" />
    </BasicDrawer>
    <TableDrawer @register="registerTableDrawer" />
    <BoxTableDrawer @register="registerBoxTableDrawer" />
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { columns, searchFormSchema } from './manage.data';
  import { BasicDrawer, useDrawer } from '@/components/Drawer';
  import { BasicForm, useForm } from '@/components/Form';
  import { getListApi, disableTrayApi, createTrayLabelApi } from '@/api/tray/list';
  import { message, Modal } from 'ant-design-vue';
  import TableDrawer from './tableDrawer.vue';
  import BoxTableDrawer from './boxTableDrawer.vue';

  const [registerDrawer, { openDrawer, closeDrawer, setDrawerProps }] = useDrawer();
  const [registerTableDrawer, { openDrawer: openTableDrawer }] = useDrawer();
  const [registerBoxTableDrawer, { openDrawer: openBoxTableDrawer }] = useDrawer();
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
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
  });
  function handlePrint() {
    setDrawerProps({ confirmLoading: false });
    openDrawer(true);
  }
  function handlePrintAgain() {}
  function handleDiscard(closed: number) {
    const rows = getSelectRows();
    if (rows.length > 1) return message.warning('只能选择一条数据');
    else if (rows.length === 0) return message.warning('请选择一条数据');
    const [row] = rows;
    if (row.closed === closed) return message.warning('状态不需要变更');
    Modal.confirm({
      content: `确认废弃${row.trayNo}吗？`,
      onOk: async () => {
        await disableTrayApi({ trayNo: row.trayNo });
        clearSelectedRowKeys();
        reload();
      },
      onCancel: () => Modal.destroyAll(),
    });
  }

  async function submit() {
    try {
      setDrawerProps({ confirmLoading: true });
      const { trayNumber } = await validate();
      await createTrayLabelApi({ trayNumber });
      setDrawerProps({ confirmLoading: false });
      closeDrawer();
    } catch {
      setDrawerProps({ confirmLoading: false });
    }
  }
  function handleDetails(row: Recordable) {
    openTableDrawer(true, { trayNo: row.trayNo });
  }
  function handleBox(row: Recordable) {
    openBoxTableDrawer(true, { trayNo: row.trayNo });
  }
</script>
