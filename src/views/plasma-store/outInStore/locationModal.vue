<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-18 17:53:22
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-19 09:58:17
-->
<template>
  <BasicDrawer
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
  import { BasicTable, useTable } from '/@/components/Table';
  import { message } from 'ant-design-vue';
  import { reactive } from 'vue';

  const emit = defineEmits(['confim', 'register']);
  const state = reactive({ disabledKeys: [] as string[] });
  const [registerTable, { reload, getRowSelection }] = useTable({
    api: () => Promise.resolve(),
    fetchSetting: {
      listField: 'result',
    },
    immediate: false,
    rowKey: 'locationNo',
    columns: [{ title: '货位号', dataIndex: 'locationNo' }],
    useSearchForm: false,
    bordered: true,
    rowSelection: {
      type: 'radio',
      getCheckboxProps: (record: { location: string }) => ({
        disabled: state.disabledKeys.includes(record.location),
      }),
    },
  });
  const [registerDrawer] = useDrawerInner(({ disabledKeys }) => {
    state.disabledKeys = disabledKeys;
    reload();
  });

  function handleSubmit() {
    const { selectedRowKeys } = getRowSelection() as { selectedRowKeys: any[] };
    if (!selectedRowKeys.length) return message.warning('请选择货位');
    emit('confim', selectedRowKeys);
  }
</script>
