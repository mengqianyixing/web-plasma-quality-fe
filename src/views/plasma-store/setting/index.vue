<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增</a-button>
        <a-button type="primary" @click="handleCheckStatus('CLOSED')">禁用</a-button>
        <a-button type="primary" @click="handleCheckStatus('NORMAL')">启用</a-button>
      </template>
      <template #houseName="{ record }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleDetails(record)"
        >
          {{ record?.houseName }}
        </span>
      </template>
    </BasicTable>
    <FormModel @register="registerDrawer" @success="reload" />
    <LocationModel
      @register="registerLoactionDrawer"
      @close="reload"
      :showOkBtn="false"
      cancelText="关闭"
      :houseNo="houseNo"
    />
    <AreaModel
      @register="registerAreaDrawer"
      :showOkBtn="false"
      cancelText="关闭"
      :houseNo="houseNo"
    />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { columns, searchFormSchema } from './setting.data';
  import { settingListApi, checkHouseApi } from '@/api/plasmaStore/setting';
  import { SettingResp } from '@/api/plasmaStore/setting/type';
  import { useDrawer } from '@/components/Drawer';
  import { message, Modal } from 'ant-design-vue';
  import FormModel from './formModel.vue';
  import LocationModel from './locationModel.vue';
  import AreaModel from './areaModel.vue';

  defineOptions({ name: 'PlasmaStoreSetting' });

  const [registerDrawer, { openDrawer }] = useDrawer();
  const [registerLoactionDrawer, { openDrawer: openLoactionDrawer }] = useDrawer();
  const [registerAreaDrawer, { openDrawer: openAreaDrawer }] = useDrawer();
  const houseNo = ref('');

  const [registerTable, { getRowSelection, findTableDataRecord, reload, clearSelectedRowKeys }] =
    useTable({
      title: '库房列表',
      api: settingListApi,
      fetchSetting: {
        pageField: 'currPage',
        sizeField: 'pageSize',
        totalField: 'totalCount',
        listField: 'result',
      },
      formConfig: {
        labelWidth: 120,
        schemas: searchFormSchema,
      },
      rowKey: 'houseNo',
      columns,
      useSearchForm: true,
      showTableSetting: true,
      bordered: true,
      rowSelection: { type: 'checkbox' },
    });

  function handleCreate() {
    openDrawer(true, {});
  }
  function handleCheckStatus(action: string) {
    const { selectedRowKeys } = getRowSelection() as { selectedRowKeys: any[] };
    if (selectedRowKeys.length === 0) return message.warning('请选择一条数据');
    else if (selectedRowKeys.length > 1) return message.warning('只能选择一条数据');
    const { closed, houseNo, houseName } = findTableDataRecord(selectedRowKeys[0]) as any;
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
  function handleDetails(row: SettingResp) {
    houseNo.value = row.houseNo;
    if (row.houseType[1] === 'F') {
      openAreaDrawer(true, { houseNo: row.houseNo });
    } else {
      openLoactionDrawer(true, { houseNo: row.houseNo });
    }
  }
</script>
