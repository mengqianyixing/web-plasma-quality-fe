<template>
  <BasicModal
    wrapClassName="verifyNumModal"
    v-bind="$attrs"
    @register="registerVerifyNum"
    showFooter
    title="验收数量详情"
    width="1000px"
    :isDetail="true"
    :showDetailBack="false"
    @ok="closeModal"
  >
    <div class="modalTable">
      <BasicTable @register="detailTable" id="detail" />
      <BasicTable @register="sumTable" id="sum" />
    </div>
  </BasicModal>
</template>
<script setup lang="ts">
  // import { ref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { useTable, BasicTable } from '@/components/Table';
  import { verifyDetailColumns, verifySumColumns } from './entrySearch.data';
  import { verifyNumApi } from '@/api/plasmaStore/entryPlasma';
  import { reactive } from 'vue';

  defineOptions({ name: 'VerifyNumModal' });

  const state = reactive({
    batchNo: '',
    verifyNum: '',
  });

  const [
    detailTable,
    {
      clearSelectedRowKeys: clearSelectedRowKeysDetail,
      reload: reloadDetail,
      setPagination: setPaginationDetail,
    },
  ] = useTable({
    title: '明细',
    immediate: true,
    api: verifyNumApi,
    pagination: false,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    rowKey: 'verifyNum',
    columns: verifyDetailColumns,
    bordered: true,
    isCanResizeParent: true,
    beforeFetch: (params) => {
      return { ...params, batchNo: state.batchNo };
    },
  });

  const [sumTable, { clearSelectedRowKeys, reload: reloadSum, setPagination }] = useTable({
    title: '汇总',
    immediate: true,
    api: verifyNumApi,
    pagination: false,
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
  const [registerVerifyNum, { closeModal }] = useModalInner(({ batchNo }) => {
    state.batchNo = batchNo;
    setPagination({ current: 1 });
    setPaginationDetail({ current: 1 });
    reloadDetail();
    reloadSum();
    clearSelectedRowKeysDetail();
    clearSelectedRowKeys();
  });
</script>
<style>
  .modalTable {
    display: flex;
    justify-content: center;
  }

  #detail {
    width: 500px;
    height: 300px;
    margin-right: 20px;
  }

  #sum {
    width: 400px;
    height: 300px;
  }
</style>
