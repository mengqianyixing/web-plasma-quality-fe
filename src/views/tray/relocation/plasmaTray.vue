<template>
  <BasicTable @register="registerTable">
    <template #toolbar>
      <a-button type="primary" @click="handleOut">出库</a-button>
    </template>
    <template #trayNo="{ record }">
      <span class="text-blue-500 underline cursor-pointer" @click.stop.self="handleDetails(record)">
        {{ record.trayNo }}
      </span>
    </template>
  </BasicTable>
  <TrayModel @register="register" />
</template>
<script setup lang="ts">
  import { useTable, BasicTable } from '@/components/Table';
  import { plasmaTrayColumns, plasmaTraySearchSchema } from './relocation.data';
  import { useDrawer } from '@/components/Drawer';
  import TrayModel from './trayModel.vue';

  const [register, { openDrawer }] = useDrawer();
  const [registerTable] = useTable({
    title: '',
    api: () =>
      Promise.resolve({
        result: [{ trayNo: '10086110123' }],
      }),
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    formConfig: {
      labelWidth: 90,
      schemas: plasmaTraySearchSchema,
    },
    rowKey: 'houseNo',
    columns: plasmaTrayColumns,
    useSearchForm: true,
    bordered: true,
    rowSelection: { type: 'checkbox' },
  });
  function handleOut() {}
  function handleDetails(record) {
    openDrawer(true, { trayNo: record.trayNo });
  }
</script>
