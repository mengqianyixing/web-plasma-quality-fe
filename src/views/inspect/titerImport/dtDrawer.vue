<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" title="详情" width="1000px">
    <div class="flex">
      <div class="w-280px">
        <BasicTable @register="registerCheckboxTable" @selection-change="selectionChange" />
      </div>
      <div class="w-700px">
        <BasicTable @register="registerTable" />
      </div>
    </div>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { dtDrwaerColumns, dtCheckboxDrwaerColumns } from './titer.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { getTiterDtCountList, getTiterDtList } from '@/api/inspect/titerImport';
  import { reactive } from 'vue';

  defineOptions({ name: 'DtDrawer' });

  const state = reactive({
    bsNo: '',
    titerType: '',
  });
  const [registerTable, { reload, setPagination }] = useTable({
    immediate: false,
    api: getTiterDtList,
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
    beforeFetch: (p) => ({ ...p, batchNo: state.bsNo }),
  });
  const [registerCheckboxTable, { clearSelectedRowKeys }] = useTable({
    immediate: false,
    api: getTiterDtCountList,
    fetchSetting: { listField: 'result' },
    pagination: false,
    rowKey: 'projectId',
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
  const [registerDrawer] = useDrawerInner(({ bsNo }) => {
    state.bsNo = bsNo;
    clearSelectedRowKeys();
  });
</script>
