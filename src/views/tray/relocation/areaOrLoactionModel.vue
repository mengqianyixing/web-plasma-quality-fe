<template>
  <BasicDrawer
    @register="registerDrawer"
    showFooter
    title="托盘/货位 选择"
    width="800px"
    @ok="handleSubmit"
  >
    <BasicTable @register="registerTable" />
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { useTable, BasicTable } from '@/components/Table';
  import { message } from 'ant-design-vue';

  defineEmits(['register']);

  const [registerTable, { getRowSelection, reload, clearSelectedRowKeys }] = useTable({
    title: '',
    immediate: false,
    api: () =>
      Promise.resolve({
        result: [{ trayNo: '10086110123' }, { trayNo: '11086110123' }],
      }),
    fetchSetting: {
      listField: 'result',
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
    },
    formConfig: {
      labelWidth: 60,
      showResetButton: false,
      schemas: [],
    },
    rowKey: 'trayNo',
    columns: [{ title: '区域', dataIndex: 'trayNo' }, { title: '货位' }],
    pagination: false,
    useSearchForm: false,
    bordered: true,
    rowSelection: { type: 'radio' },
  });
  const [registerDrawer] = useDrawerInner(() => {
    reload();
  });
  function handleSubmit() {
    const { selectedRowKeys } = getRowSelection() as { selectedRowKeys: any[] };
    if (selectedRowKeys.length !== 1) return message.warning('请选择数据');
    clearSelectedRowKeys();
  }
</script>
