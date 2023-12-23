<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-21 17:19:22
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-23 18:15:52
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="托盘选择"
    width="1200px"
    @ok="handleSubmit"
  >
    <BasicTable @register="registerTable" />
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { BasicTable, useTable } from '@/components/Table';
  import { message } from 'ant-design-vue';
  import { reactive } from 'vue';
  import { columns, formSchema } from './trayModal.data';
  import { getListApi } from '@/api/tray/list';

  const emit = defineEmits(['confim', 'register']);
  const state = reactive({ disabledKeys: [] as string[], params: {} });
  const [registerTable, { reload, getSelectRows, setPagination, clearSelectedRowKeys }] = useTable({
    api: getListApi,
    isCanResizeParent: true,
    fetchSetting: {
      listField: 'result',
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
    },
    formConfig: {
      labelWidth: 60,
      schemas: formSchema,
    },
    immediate: false,
    rowKey: 'trayNo',
    columns: columns,
    useSearchForm: false,
    bordered: true,
    beforeFetch: (params) => {
      return { ...params, ...state.params };
    },
    rowSelection: {
      type: 'radio',
      getCheckboxProps: (record: { location: string }) => ({
        disabled: state.disabledKeys.includes(record.location),
      }),
    },
  });
  const [registerDrawer] = useDrawerInner(({ disabledKeys, params }) => {
    state.disabledKeys = disabledKeys || [];
    state.params = params;
    setPagination({ current: 1 });
    clearSelectedRowKeys();
    reload();
  });

  function handleSubmit() {
    const rows = getSelectRows();
    if (!rows.length) return message.warning('请选择托盘');
    emit('confim', rows);
  }
</script>
<style></style>
