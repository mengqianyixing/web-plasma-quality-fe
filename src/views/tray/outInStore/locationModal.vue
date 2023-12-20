<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-18 17:53:22
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-20 17:23:46
-->
<template>
  <BasicDrawer
    wrapClassName="locationModal2"
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="货位选择"
    width="400px"
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
  const state = reactive({ disabledKeys: [] as string[], houseNo: '' });
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
      return { ...params, houseNo: state.houseNo };
    },
    rowSelection: {
      type: 'radio',
      getCheckboxProps: (record: { location: string }) => ({
        disabled: state.disabledKeys.includes(record.location),
      }),
    },
  });
  const [registerDrawer] = useDrawerInner(({ disabledKeys, houseNo }) => {
    state.disabledKeys = disabledKeys;
    state.houseNo = houseNo;
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
