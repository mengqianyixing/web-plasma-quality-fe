<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2024-01-03 22:22:57
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-12 17:38:11
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="详情"
    width="1000px"
    :minHeight="520"
    @fullscreen="
      redoHeight();
      redoHeight2();
    "
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute flex w-full h-full">
        <div class="w-280px">
          <BasicTable @register="registerCheckboxTable" @selection-change="selectionChange" />
        </div>
        <div style="width: calc(100% - 280px)">
          <BasicTable @register="registerTable" />
        </div>
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { dtDrwaerColumns, dtCheckboxDrwaerColumns } from './titer.data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { getTiterDtCountList, getTiterDtList } from '@/api/inspect/titerImport';
  import { reactive } from 'vue';

  defineOptions({ name: 'DtModal' });

  const state = reactive({
    bsNo: '',
    titerType: '',
    type: '',
  });
  const [registerTable, { reload, setPagination, setTableData, redoHeight }] = useTable({
    immediate: false,
    api: getTiterDtList,
    isCanResizeParent: true,
    inset: true,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: dtDrwaerColumns,
    size: 'small',
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    beforeFetch: (p) => ({ ...p, batchNo: state.bsNo, titerType: state.titerType }),
  });
  const [
    registerCheckboxTable,
    { reload: reloadCheck, clearSelectedRowKeys, redoHeight: redoHeight2 },
  ] = useTable({
    immediate: false,
    api: getTiterDtCountList,
    isCanResizeParent: true,
    inset: true,
    pagination: false,
    columns: dtCheckboxDrwaerColumns,
    size: 'small',
    useSearchForm: false,
    showIndexColumn: false,
    showTableSetting: false,
    bordered: true,
    beforeFetch: (p) => ({ ...p, bsNo: state.bsNo }),
    rowSelection: { type: 'radio' },
  });
  function selectionChange({ rows }) {
    state.titerType = rows[0].titerTypeName;
    setPagination({ current: 1 });

    reload();
  }
  const [registerModal] = useModalInner(({ sampleBatchNo, type }) => {
    state.bsNo = sampleBatchNo;
    state.type = type;
    setPagination({ total: 0 });
    setTableData([]);
    clearSelectedRowKeys();
    reloadCheck();
  });
</script>
