<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2024-01-29 10:43:03
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-29 14:07:29
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
            <a-button type="primary" @click="handleInStore">入库</a-button>
          </template>
          <template #box="{ record }: { record: Recordable }">
            <span
              class="text-blue-500 underline cursor-pointer"
              @click.stop.self="handleBoxClick(record)"
            >
              {{ record.box }}
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
      @cancel="cancel"
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
  import { message } from 'ant-design-vue';
  import { reactive } from 'vue';
  import {
    trayOutStoreColumns,
    trayOutStoreFormSchema,
    boxBindColumns,
  } from '../production-sorting.data';
  import OutModal from '@/views/tray/outInStore/outModal.vue';

  const state = reactive({
    prepareNo: '',
  });
  const emit = defineEmits(['close']);
  const [registerModal] = useModalInner(async ({ prepareNo }) => {
    state.prepareNo = prepareNo;
  });
  const [registerOutModal, { openModal: openOutModal }] = useModal();
  const [registenBindModal, { openModal: openBindModal }] = useModal();
  const [registerTable, { getSelectRows, clearSelectedRowKeys, reload }] = useTable({
    api: () => Promise.resolve({ result: [{ box: '123' }] }),
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
    api: () => Promise.resolve({ result: [{ box: '123' }] }),
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: boxBindColumns,
    inset: true,
    isCanResizeParent: true,
    size: 'small',
    showTableSetting: false,
    bordered: true,
    rowSelection: { type: 'checkbox' },
    beforeFetch: (p) => ({ ...p, prepareNo: state.prepareNo }),
    afterFetch: (res) => {
      clearBindSelectedRowKeys();
      return res;
    },
  });
  function cancel() {
    emit('close');
  }
  function handleInStore() {
    const rows: Recordable[] = getSelectRows();
    if (rows.length === 0) return message.warning('请选择数据');
    if (rows.some((_) => _.status)) return message.warning('请选择在库中的数据');
    openOutModal(true, { data: rows });
  }
  function handleUnbind() {
    const rows: Recordable[] = getBindSelectRows();
    if (rows.length === 0) return message.warning('请选择数据');
  }
  function handleBoxClick(row: Recordable) {
    console.log(row);
    reloadBind();
    openBindModal(true);
  }
</script>
