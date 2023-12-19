<template>
  <BasicDrawer
    wrapClassName="locationModel"
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="货位列表"
    width="1000px"
    @close="close"
  >
    <CellWapper :row-count="3" :data="state" :cell-list="cellSchema(locationCell)" />
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleAdd">扩容</a-button>
        <a-button type="primary" @click="handleCheckStatus('CLOSED')">禁用</a-button>
        <a-button type="primary" @click="handleCheckStatus('NORMAL')">启用</a-button>
      </template>
    </BasicTable>
    <CapacityModel @register="registerCapacityDrawer" @success="pageReload" />
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { BasicDrawer, useDrawerInner, useDrawer } from '@/components/Drawer';
  import { BasicTable, useTable } from '@/components/Table';
  import { locationListApi, checkLoactionApi, areaListApi } from '@/api/plasmaStore/setting';
  import {
    locationColumns as columns,
    locationSearchForSchema,
    cellSchema,
    locationCell,
  } from './setting.data';
  import { message, Modal } from 'ant-design-vue';
  import CapacityModel from './capacityModel.vue';
  import { reactive, defineEmits } from 'vue';
  import { CellWapper } from '@/components/CellWapper';
  import { CLOSED } from '@/enums/plasmaStoreEnum';

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

  const [registerCapacityDrawer, { openDrawer }] = useDrawer();

  const [
    registerTable,
    { getRowSelection, findTableDataRecord, clearSelectedRowKeys, reload, setPagination },
  ] = useTable({
    title: '',
    immediate: false,
    api: locationListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    formConfig: {
      labelWidth: 60,
      schemas: locationSearchForSchema,
    },
    rowKey: 'locationNo',
    columns,
    useSearchForm: true,
    bordered: true,
    rowSelection: { type: 'checkbox' },
    beforeFetch: (params) => {
      return { ...params, houseNo: state.houseNo };
    },
  });
  const [registerDrawer] = useDrawerInner(({ houseNo }) => {
    state.houseNo = houseNo;
    setPagination({ current: 1 });
    clearSelectedRowKeys();
    pageReload();
  });
  function handleAdd() {
    if (state.closed === CLOSED.CLOSED) return message.warning('禁用状态不可扩容');
    openDrawer(true, { houseNo: state.houseNo });
  }
  function pageReload() {
    reload();
    areaListApi({ houseNo: state.houseNo }).then((res) => {
      for (const key in state) {
        state[key] = res[key] || '--';
      }
    });
  }
  function handleCheckStatus(action: string) {
    const { selectedRowKeys } = getRowSelection() as { selectedRowKeys: any[] };
    if (selectedRowKeys.length === 0) return message.warning('请选择一条数据');
    else if (selectedRowKeys.length > 1) return message.warning('只能选择一条数据');
    const { closed, locationNo } = findTableDataRecord(selectedRowKeys[0]) as any;
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
