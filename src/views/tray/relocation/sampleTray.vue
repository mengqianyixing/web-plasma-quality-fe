<template>
  <BasicTable @register="registerTable">
    <template #toolbar>
      <a-button type="primary" @click="handleOut">出库</a-button>
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
  import { sampleTrayColumns, sampleTraySearchSchema } from './relocation.data';

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
      schemas: sampleTraySearchSchema,
    },
    rowKey: 'houseNo',
    columns: sampleTrayColumns,
    useSearchForm: true,
    bordered: true,
    rowSelection: { type: 'checkbox' },
  });
  function handleOut() {}
  function handleDetails() {}
</script>
