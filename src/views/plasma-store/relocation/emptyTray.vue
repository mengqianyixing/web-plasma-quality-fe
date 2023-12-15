<template>
  <BasicTable @register="registerTable">
    <template #toolbar>
      <a-button type="primary" @click="handleOut">出库</a-button>
    </template>
  </BasicTable>
</template>
<script setup lang="ts">
  import { useTable, BasicTable } from '@/components/Table';
  import { reactive } from 'vue';

  const state = reactive({
    tableData: [],
  });
  const [registerTable, { reload }] = useTable({
    title: '',
    immediate: false,
    api: getData,
    fetchSetting: {
      listField: 'result',
    },
    formConfig: {
      labelWidth: 60,
      showResetButton: false,
      schemas: [
        {
          field: 'trayNo',
          component: 'Input',
          label: '托盘号',
          colProps: { span: 6 },
          componentProps: {
            onPressEnter: trayChange,
          },
        },
      ],
    },
    rowKey: 'houseNo',
    columns: [
      { title: '托盘号', dataIndex: 'trayNo' },
      { title: '所在货位(区域)', dataIndex: 'area' },
    ],
    pagination: false,
    useSearchForm: true,
    bordered: true,
    rowSelection: { type: 'checkbox' },
    afterFetch: async ([row]) => {
      state.tableData.push(row as never);
      return state.tableData;
    },
  });
  function getData() {
    return new Promise((rs) => {
      setTimeout(() => {
        rs({ result: [{ trayNo: Math.random().toString().slice(2), area: '合格区' }] });
      }, 3000);
    });
  }
  function trayChange() {
    reload();
  }
  function handleOut() {}
</script>
