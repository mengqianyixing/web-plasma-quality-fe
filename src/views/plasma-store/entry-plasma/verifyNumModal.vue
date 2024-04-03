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
      <BasicTable @register="detailTable" :dataSource="detailTableSource" id="detail" />
      <BasicTable @register="sumTable" :dataSource="sumTableSource" id="sum" />
    </div>
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { useTable, BasicTable } from '@/components/Table';
  import { verifyDetailColumns, verifySumColumns } from './entrySearch.data';
  import { verifyNumApi } from '@/api/plasmaStore/entryPlasma';
  import { ref } from 'vue';
  import { GetApiCoreBagStatisticsBatchNoResponse } from '@/api/type/batchManage';

  defineOptions({ name: 'VerifyNumModal' });

  defineEmits(['register']);

  const batchNo = ref('');
  const detailTableSource = ref<GetApiCoreBagStatisticsBatchNoResponse['titerTypeList']>([]);
  const sumTableSource = ref<GetApiCoreBagStatisticsBatchNoResponse['summaryList']>([]);

  const [detailTable, { setLoading: setDetailTableLoading }] = useTable({
    pagination: false,
    rowKey: 'verifyNum',
    columns: verifyDetailColumns,
    bordered: true,
  });

  const [sumTable, { setLoading: setSumTableLoading }] = useTable({
    pagination: false,
    rowKey: 'verifyNum',
    columns: verifySumColumns,
    bordered: true,
  });
  const [registerVerifyNum, { closeModal }] = useModalInner((data) => {
    batchNo.value = data.batchNo;

    reloadTable();
  });

  async function reloadTable() {
    setDetailTableLoading(true);
    setSumTableLoading(true);
    const originData = await verifyNumApi(batchNo.value);
    setDetailTableLoading(false);
    setSumTableLoading(false);

    detailTableSource.value = originData.titerTypeList;
    sumTableSource.value = originData.summaryList;
  }
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
