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
  import { hortFallNumModalColumns } from './entrySearch.data';

  defineEmits(['register']);

  const [registerHortFall] = useModalInner();
  const [registerTable] = useTable({
    immediate: true,
    fetchSetting: {
      listField: 'result',
    },
    formConfig: {
      showResetButton: false,
      schemas: [],
    },
    rowKey: 'hortFallNum',
    columns: hortFallNumModalColumns,
    pagination: false,
    useSearchForm: false,
    bordered: true,
  });
</script>
