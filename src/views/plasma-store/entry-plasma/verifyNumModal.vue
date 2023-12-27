<template>
  <BasicDrawer
    wrapClassName="verifyNumModal"
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="验收数量详情"
    width="1000px"
    :showDetailBack="false"
  >
    <div class="drawerTable">
      <BasicTable @register="detailTable" id="detail" />
      <BasicTable @register="sumTable" id="sum" />
    </div>
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { useTable, BasicTable } from '@/components/Table';
  import { verifyDetailColumns, verifySumColumns } from './entrySearch.data';
  import { verifyNumApi } from '@/api/plasmaStore/entryPlasma';
  import { reactive } from 'vue';

  defineOptions({ name: 'VerifyNumModal' });

  const state = reactive({
    batchNo: '',
    verifyNum: '',
  });

  const [detailTable] = useTable({
    title: '明细',
    immediate: true,
    api: verifyNumApi,
    rowKey: 'verifyNum',
    columns: verifyDetailColumns,
    bordered: true,
    isCanResizeParent: true,
    beforeFetch: (params) => {
      return { ...params, batchNo: state.batchNo };
    },
  });

  const [sumTable, { clearSelectedRowKeys, reload, setPagination }] = useTable({
    title: '汇总',
    immediate: true,
    api: verifyNumApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    rowKey: 'verifyNum',
    columns: verifySumColumns,
    bordered: true,
    isCanResizeParent: true,
    // rowSelection: { type: 'checkbox' },
    beforeFetch: (params) => {
      return { ...params, batchNo: state.batchNo };
    },
  });
  const [registerDrawer] = useDrawerInner(({ batchNo }) => {
    state.batchNo = batchNo;
    setPagination({ current: 1 });
    reload();
    clearSelectedRowKeys();
  });
</script>
<style>
  .drawerTable {
    display: flex;
    justify-content: center;
  }

  #detail {
    width: 500px;
  }

  #sum {
    width: 400px;
  }
</style>
