<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" showFooter title="托盘详情" width="800px">
    <BasicTable @register="registerTable" />
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { useTable, BasicTable } from '@/components/Table';
  import { plasmaTrayModelColumns } from './relocation.data';

  const [registerDrawer] = useDrawerInner();
  const [registerTable] = useTable({
    title: '',
    immediate: false,
    fetchSetting: {
      listField: 'result',
    },
    formConfig: {
      labelWidth: 60,
      showResetButton: false,
      schemas: [],
    },
    rowKey: 'houseNo',
    columns: plasmaTrayModelColumns,
    pagination: false,
    useSearchForm: false,
    bordered: true,
  });
</script>
