<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" title="详情" width="800px">
    <BasicTable @register="registerTable" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { dtDrwaerColumns } from './titer.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';

  defineOptions({ name: 'DtDrawer' });

  const [registerTable] = useTable({
    api: () => Promise.resolve({ result: [] }),
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    rowKey: 'projectId',
    columns: dtDrwaerColumns,
    size: 'small',
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
  });
  const [registerDrawer] = useDrawerInner();
</script>
