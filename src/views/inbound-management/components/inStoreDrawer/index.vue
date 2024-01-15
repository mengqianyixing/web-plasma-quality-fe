<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2024-01-04 16:30:55
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-13 18:50:42
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="'血浆批号【' + state + '】托盘入库'"
    width="1060px"
    @close="emit('close')"
    :minHeight="520"
    @fullscreen="redoHeight"
  >
    <div class="flex h-inherit max-h-inherit min-h-inherit">
      <div class="flex-1 w-full">
        <BasicTable @register="registerTable" ref="tableRef">
          <template #toolbar>
            <a-button type="primary" @click="handleIn">入库</a-button>
            <a-button type="primary" @click="handleReBind">托盘重绑</a-button>
          </template>
        </BasicTable>
      </div>
    </div>
    <InModal @register="registerInModal" @success="rePage" />
    <BasicModal
      @register="registerBindModal"
      showFooter
      title="托盘重绑"
      width="360px"
      @ok="okFunction"
      @cancel="emit('close')"
    >
      <BasicForm @register="registerForm" />
    </BasicModal>
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchForm } from './data';
  import { message, Modal } from 'ant-design-vue';
  import { getListApi } from '@/api/tray/list';
  import InModal from '@/views/tray/outInStore/inModal.vue';
  import { nextTick, ref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { bindVerifyBoxApi } from '@/api/tray/relocation';

  const emit = defineEmits(['register', 'close']);
  defineOptions({ name: 'InStoreModal' });

  const state = ref('');
  let isAcceptNow = false;

  const [registerForm, { validate, clearValidate, setFieldsValue, getFieldsValue, resetFields }] =
    useForm({
      labelWidth: 90,
      baseColProps: { span: 24 },
      schemas: [
        { label: '托盘编号', component: 'Input', field: 'trayNo', required: true },
        { label: '箱号', component: 'Input', field: 'boxId', required: true },
      ],
      showActionButtonGroup: false,
    });

  const [registerInModal, { openModal: openInModal }] = useModal();
  const [registerBindModal, { openModal }] = useModal();

  const [registerModal] = useModalInner(async ({ batchNo, isAccept }) => {
    state.value = batchNo;
    isAcceptNow = isAccept || false;
    rePage();
  });

  const [
    registerTable,
    { getSelectRows, reload, clearSelectedRowKeys, setPagination, redoHeight },
  ] = useTable({
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
    openInModal(true, { data: rows });
  }

  async function handleReBind() {
    openModal();
    await nextTick();
    resetFields();
    clearValidate();
  }
  async function okFunction() {
    const values = await validate();

    let list: any[] = [];
    if (isAcceptNow) {
      import('@/api/tray/list').then(async (module) => {
        const { trayBoxListApi } = module;
        list = await trayBoxListApi({ trayNo: values.trayNo });
      });
    } else {
      import('@/api/tray/list').then(async (module) => {
        const { trayBoxListApiAccept } = module;
        list = await trayBoxListApiAccept({ trayNo: values.trayNo });
      });
    }
    console.log(isAcceptNow);

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
    await bindVerifyBoxApi({ boxes: [boxId], trayNo, type: 'bind' });
    setFieldsValue({ boxId: '', trayNo: '' });
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
