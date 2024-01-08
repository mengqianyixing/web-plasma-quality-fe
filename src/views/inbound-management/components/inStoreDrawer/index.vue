<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2024-01-04 16:30:55
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-04 19:04:35
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    :title="'血浆批号【' + state + '】托盘入库'"
    width="1060px"
    @close="emit('close')"
  >
    <BasicTable @register="registerTable" ref="tableRef">
      <template #toolbar>
        <a-button type="primary" @click="handleIn">入库</a-button>
        <a-button type="primary" @click="handleReBind">托盘重绑</a-button>
      </template>
    </BasicTable>
    <InModal @register="registerInDrawer" @success="rePage" />
    <BasicDrawer
      @register="registerBindDrawer"
      showFooter
      title="托盘重绑"
      width="360px"
      @ok="okFunction"
      @close="emit('close')"
    >
      <BasicForm @register="registerForm" />
    </BasicDrawer>
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { BasicDrawer, useDrawerInner, useDrawer } from '@/components/Drawer';
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchForm } from './data';
  import { message, Modal } from 'ant-design-vue';
  import { getListApi, trayBoxListApi } from '@/api/tray/list';
  import InModal from '@/views/tray/outInStore/inModal.vue';
  import { nextTick, ref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { bindBoxApi } from '@/api/tray/relocation';

  const emit = defineEmits(['register', 'close']);
  defineOptions({ name: 'InStoreDrawer' });

  const state = ref('');

  const [registerForm, { validate, clearValidate, setFieldsValue, getFieldsValue }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: [
      { label: '托盘编号', component: 'Input', field: 'trayNo', required: true },
      { label: '箱号', component: 'Input', field: 'boxId', required: true },
    ],
    showActionButtonGroup: false,
  });

  const [registerInDrawer, { openDrawer: openInDrawer }] = useDrawer();
  const [registerBindDrawer, { openDrawer }] = useDrawer();

  const [registerDrawer] = useDrawerInner(async ({ batchNo }) => {
    state.value = batchNo;
    rePage();
  });

  const [registerTable, { getSelectRows, reload, clearSelectedRowKeys, setPagination }] = useTable({
    immediate: false,
    title: '',
    api: getListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    rowKey: 'trayNo',
    formConfig: {
      labelWidth: 80,
      baseColProps: { span: 6 },
      schemas: searchForm,
    },
    columns,
    useSearchForm: true,
    bordered: true,
    size: 'small',
    isCanResizeParent: true,
    rowSelection: { type: 'checkbox' },
    beforeFetch: (p) => ({ ...p, closed: '0', batchNo: state.value }),
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
  });
  function rePage() {
    setPagination({ current: 1 });
    reload();
  }

  function handleIn() {
    const rows = getSelections(false);
    if (rows.length === 0) return;
    if (rows.some((_) => _.wareHouseName)) return message.warning('所选托盘存在已入库!');
    openInDrawer(true, { data: rows });
  }

  async function handleReBind() {
    const rows = getSelections(true);
    if (rows.length === 0) return;
    openDrawer();
    await nextTick();
    setFieldsValue({ trayNo: rows[0].trayNo });
    clearValidate();
  }
  async function okFunction() {
    const values = await validate();
    const list = await trayBoxListApi({ trayNo: values.trayNo });
    if (list.length >= 24) {
      Modal.confirm({
        content: '托盘绑定已满24箱，继续绑定?',
        onOk: async () => {
          submit();
        },
        onCancel: () => {
          Modal.destroyAll();
        },
      });
    } else {
      submit();
    }
  }
  async function submit() {
    const { boxId, trayNo } = getFieldsValue();
    await bindBoxApi({ boxes: [boxId], trayNo, type: 'bind' });
    setFieldsValue({ boxId: '' });
    message.success('操作成功');
    reload();
  }
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
</script>
