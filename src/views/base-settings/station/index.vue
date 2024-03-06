<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <div class="flex gap-2">
          <a-button type="primary" @click="handleAdd">新增</a-button>
          <a-button type="primary" @click="handleEdit">编辑</a-button>
          <a-button
            type="primary"
            @click="handleEnable"
            v-auth="BaseSettingButtonEnum.StationEnable"
          >
            启用
          </a-button>
          <a-button
            type="primary"
            @click="handleDisable"
            v-auth="BaseSettingButtonEnum.StationDisable"
          >
            禁用
          </a-button>
        </div>
      </template>
    </BasicTable>

    <AddOrEditModal @register="registerModal" @success="handleSuccess" />

    <Login
      @register="registerLoginModal"
      @success="loginSuccess"
      :auth-code="BaseSettingButtonEnum.StationDisable"
    />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { useMessage } from '@/hooks/web/useMessage';
  import { ref } from 'vue';
  import { columns } from './station.data';

  import AddOrEditModal from '@/views/base-settings/station/AddOrEditModal.vue';

  import { PageWrapper } from '@/components/Page';
  import { disableStation, enableStation, getStationList } from '@/api/base-settings/station';
  import { useModal } from '@/components/Modal';
  import Login from '@/__components/ReviewLoginModal/index.vue';
  import { BaseSettingButtonEnum } from '@/enums/authCodeEnum';

  defineOptions({ name: 'Station' });

  const { createMessage, createConfirm } = useMessage();
  const selectedRow = ref<Recordable>([]);

  const [registerModal, { openModal }] = useModal();
  const [registerLoginModal, { openModal: openLoginModal }] = useModal();

  const [registerTable, { clearSelectedRowKeys, reload }] = useTable({
    api: getStationList,
    columns,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    clickToRowSelect: true,
    rowSelection: {
      type: 'radio',
      onChange: (_, selectedRows: any) => {
        selectedRow.value = selectedRows;
      },
    },
    size: 'small',
    striped: false,
    useSearchForm: false,
    pagination: false,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
  });

  function handleAdd() {
    openModal(true, { isUpdate: false });
  }

  function handleEdit() {
    openModal(true, { isUpdate: true, record: selectedRow.value[0] });
  }

  async function handleEnable() {
    if (!selectedRow.value.length) {
      createMessage.warn('请选择一条记录');
      return;
    }

    if (selectedRow.value[0].status === '启用') {
      createMessage.warn('该浆站已启用');
      return;
    }

    createConfirm({
      title: '确认',
      content: '确认启用该浆站？',
      iconType: 'warning',
      onOk: async () => {
        await enableStation(selectedRow.value[0].stationNo);

        handleSuccess();
      },
    });
  }

  function handleDisable() {
    if (!selectedRow.value.length) {
      createMessage.warn('请选择一条记录');
      return;
    }

    if (selectedRow.value[0].status === '禁用') {
      createMessage.warn('该浆站已禁用');
      return;
    }

    openLoginModal();
  }

  function loginSuccess(username: string) {
    createConfirm({
      title: '禁用',
      content: '确认禁用该浆站？',
      iconType: 'warning',
      onOk: async () => {
        await disableStation({
          stationNo: selectedRow.value[0].stationNo,
          reviewer: username,
        });

        handleSuccess();
      },
    });
  }

  function handleSuccess() {
    clearSelectedRowKeys();
    reload();
  }
</script>
