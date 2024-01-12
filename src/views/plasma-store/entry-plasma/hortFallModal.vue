<template>
  <BasicModal
    wrapClassName="horFallModal"
    v-bind="$attrs"
    @register="registerHortFall"
    showFooter
    title="不足量详情"
    width="800px"
    :isDetail="true"
    :showDetailBack="false"
  >
    <BasicTable @register="registerTable" />
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { useTable, BasicTable } from '@/components/Table';
  import { hortFallNumModalColums } from './entrySearch.data';

  const [registerHortFall] = useModalInner();
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
