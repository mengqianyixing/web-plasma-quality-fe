<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="区域列表"
    width="860px"
    @close="emit('close')"
  >
    <div class="flex flex-col h-full">
      <CellWapper :data="state" cell-width="33.33%" :cell-list="cellSchema([])" />
      <BasicTable @register="registerTable" @fetch-success="fetchSuccess">
        <template #toolbar>
          <a-button type="primary" @click="handleAdd">新增</a-button>
          <a-button type="primary" @click="handleCapacityAdd">扩容</a-button>
          <a-button type="primary" @click="handleCheckStatus('CLOSED')">禁用</a-button>
          <a-button type="primary" @click="handleCheckStatus('NORMAL')">启用</a-button>
        </template>
      </BasicTable>
    </div>
    <CapacityModel @register="registerCapacityDrawer" @success="reload" />
    <FormModel @register="registerFormDrawer" @success="reload" />
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { BasicDrawer, useDrawerInner, useDrawer } from '@/components/Drawer';
  import { BasicTable, useTable } from '@/components/Table';
  import { areaListApi, checkHouseApi } from '@/api/plasmaStore/setting';
  import { areaColumns as columns, cellSchema } from './setting.data';
  import { message, Modal } from 'ant-design-vue';
  import { CellWapper } from '@/components/CellWapper';
  import FormModel from './formModel.vue';
  import CapacityModel from './capacityModel.vue';
  import { CLOSED } from '@/enums/plasmaStoreEnum';

  import { reactive } from 'vue';

  const emit = defineEmits(['register', 'close']);
  defineOptions({ name: 'AreaModel' });

  const state = reactive({
    houseNo: '',
    houseName: '',
    houseType: '',
    locationCount: '',
    closed: '',
    locationUsedCount: '',
  });
  const [registerDrawer] = useDrawerInner(({ houseNo }) => {
    state.houseNo = houseNo;
    setPagination({ current: 1 });
    reload();
  });
  const [registerFormDrawer, { openDrawer }] = useDrawer();

  const [registerCapacityDrawer, { openDrawer: openCapacityDrawer }] = useDrawer();

  const [
    registerTable,
    {
      getRowSelection,
      findTableDataRecord,
      reload,
      clearSelectedRowKeys,
      getRawDataSource,
      setPagination,
    },
  ] = useTable({
    immediate: false,
    title: '',
    api: areaListApi,
    fetchSetting: {
      listField: 'subHouseList',
    },
    pagination: false,
    rowKey: 'houseNo',
    columns,
    useSearchForm: false,
    bordered: true,
    size: 'small',
    rowSelection: { type: 'checkbox' },
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
    canResize: false,
    beforeFetch: () => {
      return { houseNo: state.houseNo };
    },
  });
  function handleAdd() {
    openDrawer(true, { parentHouseType: state.houseType, parentHouseNo: state.houseNo });
  }
  function handleCapacityAdd() {
    const { houseNo, closed } = getOnlyOneRow();
    if (closed === CLOSED.CLOSED) return message.warning('禁用状态不可扩容');
    if (!houseNo) return;
    openCapacityDrawer(true, { houseNo });
  }
  function getOnlyOneRow() {
    const { selectedRowKeys } = getRowSelection() as { selectedRowKeys: string[] };
    if (selectedRowKeys.length === 0) {
      message.warning('请选择一条数据');
      return {};
    } else if (selectedRowKeys.length > 1) {
      message.warning('只能选择一条数据');
      return {};
    }
    return findTableDataRecord(selectedRowKeys[0]) as Recordable;
  }
  function handleCheckStatus(action: string) {
    const { closed, houseNo, houseName } = getOnlyOneRow();
    if (!houseNo) return;
    if (closed === action) return message.warning('状态不需要变更');
    Modal.confirm({
      content: '确认' + (action ? '禁用' : '启用') + houseName + '?',
      onOk: async () => {
        await checkHouseApi({ closed: action, houseNo });
        clearSelectedRowKeys();
        reload();
      },
      onCancel: () => Modal.destroyAll(),
    });
  }
  function fetchSuccess() {
    const res = getRawDataSource();
    for (const key in state) {
      state[key] = res[key] || '--';
    }
  }
</script>
