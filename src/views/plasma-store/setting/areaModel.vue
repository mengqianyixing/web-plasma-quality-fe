<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="区域列表"
    width="860px"
    :minHeight="520"
    @fullscreen="redoHeight"
    @close="emit('close')"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <CellWapper :data="state" cell-width="33.33%" :cell-list="cellSchema([])" />
        <div class="flex-1 shrink-1" style="height: calc(100% - 111px)">
          <BasicTable @register="registerTable" @fetch-success="fetchSuccess">
            <template #toolbar>
              <a-button type="primary" @click="handleAdd">新增</a-button>
              <a-button type="primary" @click="handleCapacityAdd">扩容</a-button>
              <a-button type="primary" @click="handleCheckStatus('CLOSED')">禁用</a-button>
              <a-button type="primary" @click="handleCheckStatus('NORMAL')">启用</a-button>
            </template>
          </BasicTable>
        </div>
      </div>
    </div>
    <CapacityModel @register="registerCapacityModal" @success="reload" />
    <FormModel @register="registerFormModal" @success="reload" />
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
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
  const [registerModal] = useModalInner(({ houseNo }) => {
    state.houseNo = houseNo;
    setPagination({ current: 1 });
    reload();
  });
  const [registerFormModal, { openModal }] = useModal();

  const [registerCapacityModal, { openModal: openCapacityModal }] = useModal();

  const [
    registerTable,
    {
      getRowSelection,
      findTableDataRecord,
      reload,
      clearSelectedRowKeys,
      getRawDataSource,
      setPagination,
      redoHeight,
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
    openModal(true, { parentHouseType: state.houseType, parentHouseNo: state.houseNo });
  }
  function handleCapacityAdd() {
    const { houseNo, closed } = getOnlyOneRow();
    if (closed === CLOSED.CLOSED) return message.warning('禁用状态不可扩容');
    if (!houseNo) return;
    openCapacityModal(true, { houseNo });
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
