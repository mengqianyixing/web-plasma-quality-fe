<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    width="800px"
    title="混样详情"
    :minHeight="600"
    @fullscreen="redoHeight"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit mixdt-table">
      <div class="absolute w-full h-full">
        <div class="flex-1 h-full shrink-1">
          <BasicTable @register="registerTable" />
        </div>
      </div>
    </div>
  </BasicModal>
</template>
<script setup lang="tsx">
  import { BasicTable, useTable } from '@/components/Table';
  import { mixDtColumns } from './data';
  import { getMixDtListApi } from '@/api/sample-manage/test-plan';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { reactive } from 'vue';

  const state = reactive({ mixTubeNo: '', planDate: '', mixType: '', batchNo: '' });
  const [registerTable, { reload, redoHeight, setPagination }] = useTable({
    api: getMixDtListApi,
    pagination: false,
    columns: mixDtColumns,
    size: 'small',
    useSearchForm: false,
    showIndexColumn: false,
    showTableSetting: false,
    isCanResizeParent: true,
    inset: true,
    beforeFetch: (p) => ({ ...p, ...state }),
    bordered: true,

    rowClassName: (record: Recordable) => {
      return record.sampleNo?.includes('缺号') ? 'bg-yellow-200' : '';
    },
  });
  const [registerModal] = useModalInner((data) => {
    state.mixTubeNo = data.mixTubeNo;
    state.planDate = data.planDate;
    state.mixType = data.mixType;
    state.batchNo = data.batchNo;
    setPagination({ current: 1 });
    reload();
  });
</script>
<style lang="less">
  .mixdt-table {
    .bg-yellow-200 {
      .ant-table-cell {
        background-color: inherit !important;
      }
    }
  }
</style>
