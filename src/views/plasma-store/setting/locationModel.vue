<template>
  <BasicModal
    wrapClassName="locationModal"
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="货位列表"
    width="1100px"
    :isDetail="true"
    :showDetailBack="false"
    :minHeight="520"
    @cancel="close"
    @fullscreen="redoHeight"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <CellWapper :row-count="3" :data="state" :cell-list="cellSchema(locationCell)" />
        <div class="flex-1 shrink-1" style="height: calc(100% - 158px)">
          <BasicTable @register="registerTable">
            <template #toolbar>
              <a-button type="primary" @click="handleCheckStatus('CLOSED')">禁用</a-button>
              <a-button type="primary" @click="handleCheckStatus('NORMAL')">启用</a-button>
            </template>
          </BasicTable>
        </div>
      </div>
    </div>
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { locationListApi, checkLoactionApi, areaListApi } from '@/api/plasmaStore/setting';
  import {
    locationColumns as columns,
    locationSearchForSchema,
    cellSchema,
    locationCell,
  } from './setting.data';
  import { message, Modal } from 'ant-design-vue';
  import { reactive, defineEmits } from 'vue';
  import { CellWapper } from '@/components/CellWapper';

  defineOptions({ name: 'LocationModel' });
  const emit = defineEmits(['close', 'register']);

  const state = reactive({
    houseNo: '',
    houseName: '',
    houseType: '',
    locationCount: '',
    closed: '',
    locationUsedCount: '',
    standard: {
      maxLocationSize: '',
    },
  });

  const [
    registerTable,
    {
      getRowSelection,
      findTableDataRecord,
      clearSelectedRowKeys,
      reload,
      setPagination,
      redoHeight,
    },
  ] = useTable({
    title: '',
    immediate: false,
    size: 'small',
    api: locationListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    formConfig: {
      schemas: locationSearchForSchema,
    },
    rowKey: 'locationNo',
    columns,
    useSearchForm: true,
    bordered: true,
    isCanResizeParent: true,
    rowSelection: { type: 'checkbox' },
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
    beforeFetch: (params) => {
      return { ...params, houseNo: state.houseNo };
    },
  });
  const [registerModal] = useModalInner(({ houseNo }) => {
    state.houseNo = houseNo;
    setPagination({ current: 1 });
    clearSelectedRowKeys();
    pageReload();
  });
  function pageReload() {
    reload();
    areaListApi({ houseNo: state.houseNo }).then((res) => {
      for (const key in state) {
        state[key] = res[key] || '--';
      }
    });
  }
  function handleCheckStatus(action: string) {
    const { selectedRowKeys } = getRowSelection() as { selectedRowKeys: string[] };
    if (selectedRowKeys.length === 0) return message.warning('请选择一条数据');
    else if (selectedRowKeys.length > 1) return message.warning('只能选择一条数据');
    const { closed, locationNo } = findTableDataRecord(selectedRowKeys[0]) as Recordable;
    if (closed === action) return message.warning('状态不需要变更');
    Modal.confirm({
      content: '确认' + (action ? '禁用' : '启用') + locationNo + '?',
      onOk: async () => {
        await checkLoactionApi({ closed: action, locationNo });
        clearSelectedRowKeys();
        reload();
      },
      onCancel: () => Modal.destroyAll(),
    });
  }
  function close() {
    emit('close');
  }
</script>
<style>
  .locationModal .scrollbar__view {
    height: 100%;
  }
</style>
