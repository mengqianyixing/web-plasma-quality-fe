<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2024-01-29 10:43:03
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-30 17:01:47
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="`血浆出库`"
    width="1200px"
    :show-ok-btn="false"
    cancelText="关闭"
    :min-height="600"
    @cancel="cancel"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute flex flex-col w-full h-full">
        <BasicTable @register="registerTable">
          <template #toolbar>
            <a-button type="primary" @click="handleOutStore">出库</a-button>
          </template>
          <template #box="{ record }: { record: Recordable }">
            <span
              v-if="record.boxCount"
              class="text-blue-500 underline cursor-pointer"
              @click.stop.self="handleBoxClick(record)"
            >
              {{ record.boxCount }}
            </span>
            <span v-else>
              {{ record.boxCount }}
            </span>
          </template>
        </BasicTable>
      </div>
    </div>
    <OutModal @register="registerOutModal" @success="reload" />
    <BasicModal
      @register="registenBindModal"
      showFooter
      :title="`托盘存放血浆箱`"
      width="800px"
      :show-ok-btn="false"
      cancelText="关闭"
      :min-height="600"
      @cancel="reload"
    >
      <div class="relative h-inherit max-h-inherit min-h-inherit">
        <div class="absolute flex flex-col w-full h-full">
          <BasicTable @register="registerBindTable">
            <template #toolbar>
              <a-button type="primary" @click="handleUnbind">解绑托盘</a-button>
            </template>
          </BasicTable>
        </div>
      </div>
    </BasicModal>
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { message, Modal } from 'ant-design-vue';
  import { reactive, nextTick } from 'vue';
  import { bindBoxApi } from '@/api/tray/relocation';
  import {
    trayOutStoreColumns,
    trayOutStoreFormSchema,
    boxBindColumns,
  } from '../production-sorting.data';
  import OutModal from '@/views/tray/outInStore/outModal.vue';
  import { getBoxListApi, getOutStoreListApi } from '@/api/stockout/production-sorting/index';
  import { TRAY_STORE_STATE, TRAY_STORE_STATE_TEXT } from '@/enums/stockoutEnum';

  const state = reactive({
    prepareNo: '',
    trayNo: '',
  });
  const emit = defineEmits(['close']);
  const [registerModal] = useModalInner(async ({ prepareNo }) => {
    state.prepareNo = prepareNo;
    reload();
  });
  const [registerOutModal, { openModal: openOutModal }] = useModal();
  const [registenBindModal, { openModal: openBindModal }] = useModal();
  const [registerTable, { getSelectRows, clearSelectedRowKeys, reload }] = useTable({
    immediate: false,
    api: getOutStoreListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: trayOutStoreColumns,
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
      schemas: trayOutStoreFormSchema,
    },
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
    api: getBoxListApi,
    columns: boxBindColumns,
    inset: true,
    isCanResizeParent: true,
    pagination: false,
    size: 'small',
    showTableSetting: false,
    bordered: true,
    rowSelection: { type: 'radio' },
    beforeFetch: (p) => ({ ...p, ...state }),
    afterFetch: (res) => {
      clearBindSelectedRowKeys();
      return res;
    },
  });
  function cancel() {
    emit('close');
  }
  function handleOutStore() {
    const rows: Recordable[] = getSelectRows();
    if (rows.length === 0) return message.warning('请选择数据');
    const [row] = rows;
    if (rows.some((_) => _.state !== TRAY_STORE_STATE.S)) {
      return message.warning(
        '请选择【' + TRAY_STORE_STATE_TEXT.get(TRAY_STORE_STATE.S) + '】的数据',
      );
    }
    if (rows.some((_) => _.wareHouseName !== row.wareHouseName)) {
      return message.warning('请选择相同库房的数据');
    }
    openOutModal(true, { data: rows });
  }
  function handleUnbind() {
    const rows: Recordable[] = getBindSelectRows();
    if (rows.length === 0) return message.warning('请选择数据');
    const [row] = rows;
    Modal.confirm({
      content: '确定解绑箱号【' + row.boxNo + '】?',
      onOk: async () => {
        await bindBoxApi({ trayNo: state.trayNo, type: 'unbind', boxes: [row.boxNo] });
        message.success('解绑成功');
        reloadBind();
      },
      onCancel: () => {
        Modal.destroyAll();
      },
    });
  }
  async function handleBoxClick(row: Recordable) {
    state.trayNo = row.trayNo;
    openBindModal(true);
    await nextTick();
    reloadBind();
  }
</script>
