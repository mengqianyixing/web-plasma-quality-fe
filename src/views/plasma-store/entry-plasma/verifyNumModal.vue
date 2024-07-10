<template>
  <BasicModal
    wrapClassName="verifyNumModal"
    v-bind="$attrs"
    @register="registerVerifyNum"
    showFooter
    title="验收数量详情"
    width="1200px"
    :minHeight="600"
    :isDetail="true"
    :showDetailBack="false"
    :showOkBtn="false"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full flex">
        <BasicTable @register="detailTable" :dataSource="detailTableSource" id="detail" />
        <BasicTable @register="sumTable" :dataSource="sumTableSource" id="sum" />
      </div>
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
    inset: true,
    isCanResizeParent: true,
  });

  const [sumTable, { setLoading: setSumTableLoading }] = useTable({
    pagination: false,
    rowKey: 'verifyNum',
    columns: verifySumColumns,
    bordered: true,
    inset: true,
    isCanResizeParent: true,
  });
  const [registerVerifyNum] = useModalInner((data) => {
    batchNo.value = data.batchNo;

    detailTableSource.value = [];
    sumTableSource.value = [];
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
