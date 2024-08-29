<!--
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-19 16:45:20
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-16 14:19:20
-->
<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex" class="p-16px">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate" v-auth="StoreButtonEnum.StoreSettingAdd">
          新增
        </a-button>
        <a-button type="primary" @click="handleUpdate" v-auth="StoreButtonEnum.StoreSettingUpdate">
          编辑
        </a-button>

        <a-button
          type="primary"
          @click="handleCheckStatus('CLOSED')"
          v-auth="StoreButtonEnum.StoreSettingDisable"
          >禁用</a-button
        >
        <a-button
          type="primary"
          @click="handleCheckStatus('NORMAL')"
          v-auth="StoreButtonEnum.StoreSettingEnable"
          >启用</a-button
        >
      </template>
      <template #houseName="{ record }: { record: Recordable }">
        <span
          :class="
            record.houseType[1] === STORE_FLAG.S ? 'text-blue-500 underline cursor-pointer' : ''
          "
          @click.stop.self="handleDetails(record)"
        >
          {{ record.houseName }}
        </span>
      </template>
    </BasicTable>
    <FormModel @register="registerModal" @success="reload" />
    <LocationModel
      @register="registerLoactionModal"
      @close="reload"
      :showOkBtn="false"
      cancelText="关闭"
      :houseNo="houseNo"
    />
    <AreaModel
      @register="registerAreaModal"
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
  import { columns } from './setting.data';
  import { settingListApi, checkHouseApi } from '@/api/plasmaStore/setting';
  import { useModal } from '@/components/Modal';
  import { message } from 'ant-design-vue';
  import FormModel from './formModel.vue';
  import LocationModel from './locationModel.vue';
  import AreaModel from './areaModel.vue';
  import { STORE_FLAG } from '@/enums/plasmaStoreEnum';
  import { StoreButtonEnum } from '@/enums/authCodeEnum';
  import { useMessage } from '@/hooks/web/useMessage';

  defineOptions({ name: 'StoreSetting' });

  const [registerModal, { openModal }] = useModal();
  const [registerLoactionModal, { openModal: openLoactionModal }] = useModal();
  const [registerAreaModal] = useModal();
  const houseNo = ref('');

  const [registerTable, { getSelectRows, reload, clearSelectedRowKeys }] = useTable({
    api: settingListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    rowKey: 'houseNo',
    columns,
    size: 'small',
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    rowSelection: { type: 'radio' },
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
  });

  function handleCreate() {
    openModal(true, {});
  }
  function handleUpdate() {
    const rows = getSelectRows();
    if (rows.length === 0) return message.warning('请选择一条数据');
    const [row] = rows;
    row.houseType = row.houseType.replace(/R|T|V/g, '-');
    const [typeFlag, storeFlag, autoFlag] = row.houseType.split('');
    openModal(true, {
      isUpdate: true,
      row: { ...row, typeFlag, storeFlag, autoFlag, capacity: row.standard.maxLocationSize },
    });
  }

  const { createConfirm } = useMessage();

  function handleCheckStatus(action: string) {
    const rows = getSelectRows();
    if (rows.length === 0) return message.warning('请选择一条数据');
    const { closed, houseNo, houseName } = rows[0];
    if (closed === action) return message.warning('状态不需要变更');
    createConfirm({
      iconType: 'warning',
      content: '确认' + (action === 'CLOSED' ? '禁用' : '启用') + houseName + '?',
      onOk: async () => {
        await checkHouseApi({ closed: action, houseNo });
        clearSelectedRowKeys();
        await reload();
      },
    });
  }
  function handleDetails(row: Recordable) {
    houseNo.value = row.houseNo;
    if (row.houseType[1] !== STORE_FLAG.S) {
      return;
    } else {
      openLoactionModal(true, { houseNo: row.houseNo });
    }
  }
</script>
