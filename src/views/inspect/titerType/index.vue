<!--
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-25 14:30:13
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-13 16:23:33
-->
<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate" v-auth="BaseSettingButtonEnum.TiterTypeAdd">
          新增
        </a-button>
        <a-button
          type="primary"
          @click="handleUpdate"
          v-auth="BaseSettingButtonEnum.TiterTypeUpdate"
        >
          编辑
        </a-button>
        <a-button
          type="primary"
          @click="handleRemove"
          v-if="false"
          v-auth="BaseSettingButtonEnum.TiterTypeDelete"
        >
          删除
        </a-button>
        <a-button
          type="primary"
          @click="handleCheckStatus(false)"
          v-auth="BaseSettingButtonEnum.TiterTypeDisable"
          >禁用
        </a-button>
        <a-button
          type="primary"
          @click="handleCheckStatus(true)"
          v-auth="BaseSettingButtonEnum.TiterTypeEnable"
          >启用
        </a-button>
      </template>
      <template #itemValue="{ record }: { record: Recordable }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleDetails(record)"
        >
          {{ record.itemValue }}
        </span>
      </template>
    </BasicTable>
    <FormModal @register="registerModal" @success="success" />
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { useModal } from '@/components/Modal';
  import { columns, searchFormschema } from './titerType.data';
  import { message } from 'ant-design-vue';
  import FormModal from './formModal.vue';
  import { getListApi, updateTitlerTypeApi, removeTitlerTypeApi } from '@/api/inspect/titerType';
  import { BaseSettingButtonEnum } from '@/enums/authCodeEnum';
  import { useMessage } from '@/hooks/web/useMessage';

  defineOptions({ name: 'TiterType' });

  const [registerModal, { openModal }] = useModal();

  const [registerTable, { getSelectRows, clearSelectedRowKeys, reload }] = useTable({
    api: getListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    rowKey: 'dictItemId',
    columns: columns,
    size: 'small',
    useSearchForm: true,
    showTableSetting: false,
    showIndexColumn: false,
    bordered: true,
    rowSelection: { type: 'radio' },
    scroll: { x: 0 },
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
    formConfig: {
      schemas: searchFormschema,
    },
  });
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
  function handleCreate() {
    openModal(true, { isUpdate: false, data: {} });
  }
  function handleUpdate() {
    const [row] = getSelections(true);
    if (!row) return;
    openModal(true, { data: row, isUpdata: true });
  }
  function success() {
    clearSelectedRowKeys();
    reload();
  }

  const { createConfirm } = useMessage();

  function handleRemove() {
    const [row] = getSelections(true);
    if (!row) return;
    const { dictItemId, itemKey } = row;
    createConfirm({
      iconType: 'warning',
      content: '确认删除' + itemKey + '?',
      onOk: async () => {
        await removeTitlerTypeApi({ dictItemId: dictItemId });
        clearSelectedRowKeys();
        await reload();
      },
    });
  }
  function handleDetails(row) {
    openModal(true, { data: row, disabled: true });
  }
  function handleCheckStatus(action: boolean) {
    const [row] = getSelections(true);
    if (!row) return;
    const { itemKey, dictItemId, enable } = row;
    if (enable === action) {
      if (action) {
        return message.warning('该效价类型已启用');
      } else {
        return message.warning('该效价类型已禁用');
      }
    }
    createConfirm({
      iconType: 'warning',
      content: '确认' + (action ? '启用' : '禁用') + itemKey + '?',
      onOk: async () => {
        await updateTitlerTypeApi({ dictItemId: dictItemId, enable: action });
        clearSelectedRowKeys();
        await reload();
      },
    });
  }
</script>
