<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2024-01-29 10:43:03
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-30 17:07:34
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="`血浆入库`"
    width="1200px"
    :show-ok-btn="false"
    cancelText="关闭"
    :min-height="600"
    @cancel="cancel"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute flex flex-col w-full h-full">
        <Tabs
          v-model:activeKey="state.activeKey"
          @change="change"
          class="h-full bg-white tabs"
          type="card"
          size="small"
        >
          <TabPane tab="分拣血浆箱" key="1">
            <BasicForm @register="registerForm" @submit="handleSubmit" />
            <div class="border border-slate-100"></div>
            <div style="height: calc(100% - 60px)">
              <BasicTable @register="registerBindTable">
                <template #toolbar>
                  <a-button type="primary" @click="handleUnbind">解绑</a-button>
                </template>
              </BasicTable>
            </div>
          </TabPane>
          <TabPane tab="托盘入库" key="2">
            <BasicTable @register="registerTable">
              <template #toolbar>
                <a-button type="primary" @click="handleInStore">入库</a-button>
              </template>
            </BasicTable>
          </TabPane>
        </Tabs>
      </div>
    </div>
    <InModal @register="registerInModal" @success="reload" />
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { BasicForm, useForm } from '@/components/Form';
  import { message, TabPane, Tabs, Modal } from 'ant-design-vue';
  import { nextTick, reactive } from 'vue';
  import {
    trayInStoreColumns,
    trayInStoreFormSchema,
    bindFormSchema,
    bindSearchFormSchema,
    sortingBoxBindColumns,
  } from '../production-sorting.data';
  import InModal from '@/views/tray/outInStore/inModal.vue';
  import { bindBoxApi } from '@/api/tray/relocation';
  import { trayBoxListApi } from '@/api/tray/list';
  import { getInStoreListApi, getSortingBoxListApi } from '@/api/stockout/production-sorting/index';
  import { TRAY_STORE_STATE, TRAY_STORE_STATE_TEXT } from '@/enums/stockoutEnum';

  const state = reactive({
    activeKey: '1',
    prepareNo: '',
  });
  const emit = defineEmits(['close']);
  const [registerModal] = useModalInner(async ({ prepareNo }) => {
    state.prepareNo = prepareNo;
    change(state.activeKey);
  });
  const [registerInModal, { openModal: openInModal }] = useModal();
  const [registerForm, { getFieldsValue, setFieldsValue }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 8 },
    schemas: bindFormSchema,
    showActionButtonGroup: false,
    showResetButton: false,
    autoSubmitOnEnter: true,
  });
  const [
    registerBindTable,
    {
      getSelectRows: getBindSelectRows,
      clearSelectedRowKeys: clearBindSelectedRowKeys,
      reload: reloadBind,
    },
  ] = useTable({
    immediate: false,
    api: getSortingBoxListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: sortingBoxBindColumns,
    inset: true,
    isCanResizeParent: true,
    size: 'small',
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    rowSelection: { type: 'radio' },
    beforeFetch: (p) => ({ ...p, prepareNo: state.prepareNo }),
    afterFetch: (res) => {
      clearBindSelectedRowKeys();
      return res;
    },
    formConfig: {
      schemas: bindSearchFormSchema,
    },
  });
  const [registerTable, { getSelectRows, clearSelectedRowKeys, reload }] = useTable({
    immediate: false,
    api: getInStoreListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: trayInStoreColumns,
    inset: true,
    isCanResizeParent: true,
    size: 'small',
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    rowSelection: { type: 'checkbox' },
    beforeFetch: (p) => ({ ...p, prepareNo: state.prepareNo }),
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
    formConfig: {
      schemas: trayInStoreFormSchema,
    },
  });
  async function change(activeKey) {
    const map = {
      1: reloadBind,
      2: reload,
    };
    await nextTick();
    map[activeKey]();
  }
  function cancel() {
    emit('close');
  }
  function handleUnbind() {
    const rows: Recordable[] = getBindSelectRows();
    if (rows.length === 0) return message.warning('请选择数据');
    const [row] = rows;
    if (!row.trayNo) return message.warning('请选择已绑定托盘的数据');
    Modal.confirm({
      content: '确定解绑箱号【' + row.boxNo + '】?',
      onOk: async () => {
        await bindBoxApi({ trayNo: row.trayNo, type: 'unbind', boxes: [row.boxNo] });
        message.success('解绑成功');
      },
      onCancel: () => {
        Modal.destroyAll();
      },
    });
  }
  function handleInStore() {
    const rows: Recordable[] = getSelectRows();
    if (rows.length === 0) return message.warning('请选择数据');
    if (rows.some((_) => _.state !== TRAY_STORE_STATE.W)) {
      return message.warning(
        '请选择【' + TRAY_STORE_STATE_TEXT.get(TRAY_STORE_STATE.W) + '】的数据',
      );
    }
    openInModal(true, { data: rows });
  }
  async function submit() {
    const { boxId, trayNo } = getFieldsValue();
    await bindBoxApi({ trayNo: trayNo, type: 'bind', boxes: [boxId] });
    setFieldsValue({ boxId: '' });
    message.success('绑定成功');
    reloadBind();
  }
  async function handleSubmit() {
    const { boxId, trayNo } = getFieldsValue();
    let count = 0;
    if (trayNo) {
      const list = await trayBoxListApi({ trayNo });
      count = list.length;
    }
    if (!boxId || !trayNo) return;
    if (count >= 24) {
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
</script>
<style scoped>
  .tabs :deep(.ant-tabs-content) {
    height: 100%;
  }
</style>
