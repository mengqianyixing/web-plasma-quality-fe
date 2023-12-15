<template>
  <BasicTable @register="registerTable">
    <template #toolbar>
      <a-button type="primary" @click="handleOut">打印</a-button>
      <a-button type="primary" @click="handleOut">补打印</a-button>
    </template>
    <template #trayNo="{ record }">
      <span class="text-blue-500 underline cursor-pointer" @click.stop.self="handleDetails()">
        {{ record.houseName }}
      </span>
    </template>
  </BasicTable>
</template>
<script setup lang="ts">
  import { useTable, BasicTable } from '@/components/Table';
  import { trayPrintColumns } from './relocation.data';

  const [registerTable] = useTable({
    title: '',
    api: () => Promise.resolve(),
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    formConfig: {
      labelWidth: 90,

      schemas: [{ label: '托盘编号', component: 'Input', field: 'trayNo', colProps: { span: 6 } }],
    },
    rowKey: 'houseNo',
    columns: trayPrintColumns,
    useSearchForm: true,
    bordered: true,
  });
  function handleOut() {}
  function handleDetails() {}
</script>
