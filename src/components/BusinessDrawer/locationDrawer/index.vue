<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-21 17:19:22
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-26 10:20:32
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="货位选择"
    width="600px"
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
  import { locationListApi } from '@/api/plasmaStore/setting';

  const emit = defineEmits(['confim', 'register']);
  const state = reactive<{
    disabledKeys: string[];
    params: Recordable;
  }>({ disabledKeys: [] as string[], params: {} });
  const [registerTable, { reload, getSelectRows, setPagination, clearSelectedRowKeys }] = useTable({
    api: locationListApi,
    isCanResizeParent: true,
    fetchSetting: {
      listField: 'result',
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
    },
    immediate: false,
    rowKey: 'locationNo',
    columns: [{ title: '货位号', dataIndex: 'locationNo' }],
    useSearchForm: false,
    bordered: true,
    beforeFetch: (params) => {
      return { ...params, ...state.params };
    },
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
    rowSelection: {
      type: 'radio',
      getCheckboxProps: (record: { locationNo: string }) => ({
        disabled: state.disabledKeys.includes(record.locationNo),
      }),
    },
    rowClassName: (record: Recordable) => {
      return state.disabledKeys.includes(record.locationNo) ? 'pointer-events-none' : '';
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
    if (!rows.length) return message.warning('请选择货位');
    emit('confim', rows);
  }
</script>
<style></style>
