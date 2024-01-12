<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2024-01-04 16:30:55
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-12 18:11:38
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="'血浆批号【' + state + '】托盘出库'"
    width="1060px"
    @close="emit('close')"
    :minHeight="520"
    @fullscreen="redoHeight"
  >
    <div class="flex h-inherit max-h-inherit min-h-inherit">
      <div class="flex-1 w-full">
        <BasicTable @register="registerTable" ref="tableRef">
          <template #toolbar>
            <a-button type="primary" @click="handleOut">出库</a-button>
          </template>
        </BasicTable>
      </div>
    </div>
    <OutModal @register="registerInModal" @success="rePage" />
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchForm } from './data';
  import { message } from 'ant-design-vue';
  import { getListApi } from '@/api/tray/list';
  import OutModal from '@/views/tray/outInStore/outModal.vue';

  import { ref } from 'vue';
  import { STORE_FLAG } from '@/enums/plasmaStoreEnum';

  const state = ref('');

  const emit = defineEmits(['register', 'close']);
  defineOptions({ name: 'OutStoreModal' });

  const [registerInModal, { openModal: openOutModal }] = useModal();

  const [registerModal] = useModalInner(async ({ batchNo }) => {
    state.value = batchNo;
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

  function handleOut() {
    const rows = getSelections(false);
    if (!rows.length) return false;
    if (!rows.every((_) => _.wareHouseName)) return message.warning('所选托盘存在未入库!');
    const [firstRow] = rows;
    const notAlike = rows.some((_) => _.wareHouseName !== firstRow.wareHouseName);
    if (notAlike) return message.warning('所选托盘不属于同一库房!');
    if (firstRow.houseType[1] === STORE_FLAG.S) {
      openOutModal(true, { data: rows, showSite: true });
    } else {
      openOutModal(true, { data: rows, showSite: false });
    }
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
