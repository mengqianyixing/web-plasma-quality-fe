<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    width="800px"
    :minHeight="600"
    @fullscreen="redoHeight"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full arrangedt-table">
        <div class="flex-1 h-full shrink-1">
          <BasicTable @register="registerTable" />
        </div>
      </div>
    </div>
  </BasicModal>
</template>
<script setup lang="tsx">
  import { BasicTable, useTable } from '@/components/Table';
  import { dtColumns, searchForm } from './data';
  import { getArrangeDtApi } from '@/api/inbound-management/sample-verify';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { reactive } from 'vue';

  const state = reactive({ rackId: '' });
  const [registerTable, { reload, redoHeight }] = useTable({
    api: getArrangeDtApi,
    pagination: false,
    columns: dtColumns,
    size: 'small',
    useSearchForm: true,
    showIndexColumn: false,
    showTableSetting: false,
    isCanResizeParent: true,
    inset: true,
    beforeFetch: (p) => ({ ...p, ...state }),
    bordered: true,
    formConfig: {
      schemas: searchForm.slice(-1),
    },
    rowClassName: (record: Recordable) => (record.highlight ? 'bg-yellow-200' : ''),
  });
  const [registerModal] = useModalInner((data) => {
    state.rackId = data.rackId;
    reload();
  });
</script>
<style lang="less">
  .arrangedt-table {
    .bg-yellow-200 {
      .ant-table-cell {
        background-color: inherit !important;
      }
    }
  }
</style>
