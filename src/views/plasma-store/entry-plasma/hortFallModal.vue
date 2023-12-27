<template>
  <BasicDrawer
    wrapClassName="horFallModal"
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="血浆批次详情"
    width="800px"
    :isDetail="true"
    :showDetailBack="false"
  >
    <BasicTable @register="registerTable" />
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { useTable, BasicTable } from '@/components/Table';
  import { hortFallNumModalColums } from './entrySearch.data';

  const [registerDrawer] = useDrawerInner();
  const [registerTable] = useTable({
    title: '明细',
    immediate: true,
    fetchSetting: {
      listField: 'result',
    },
    formConfig: {
      labelWidth: 60,
      showResetButton: false,
      schemas: [],
    },
    rowKey: 'hortFallNum',
    columns: hortFallNumModalColums,
    pagination: false,
    useSearchForm: false,
    bordered: true,
  });
</script>
<style>
  .locationModal .scrollbar__view {
    height: 100%;
  }
</style>
