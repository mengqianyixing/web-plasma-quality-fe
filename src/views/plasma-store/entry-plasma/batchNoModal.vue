<template>
  <BasicModal
    wrapClassName="batch-num-modal"
    v-bind="$attrs"
    @register="register"
    showFooter
    title="血浆批次详情"
    width="1500px"
    :isDetail="true"
    :showDetailBack="false"
    @ok="closeModal"
  >
    <BasicTable @register="registerTable" id="batchNoTable" />
  </BasicModal>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { useTable, BasicTable } from '@/components/Table';
  import { entryDetailModalColumns } from './entrySearch.data';
  import { bagPlasmaDetailApi } from '@/api/plasmaStore/entryPlasma';

  const batchNoRef = ref('');
  const [registerTable, { setPagination, setTableData, getPaginationRef }] = useTable({
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    rowKey: 'batchNo',
    columns: entryDetailModalColumns,
    isCanResizeParent: true,
    bordered: true,
    onChange: (page) => {
      getBatchDetail(page);
    },
  });

  async function getBatchDetail(pager) {
    const res = await bagPlasmaDetailApi({
      batchNo: batchNoRef.value,
      currPage: pager.current,
      pageSize: pager.defaultPageSize,
    });
    setTableData(res.result as any);

    setPagination({
      total: res.totalCount,
    });
  }

  const [register, { closeModal }] = useModalInner(async ({ batchNo }) => {
    batchNoRef.value = batchNo;
    const pager = getPaginationRef();
    getBatchDetail(pager);
  });
</script>
<style scoped>
  .locationModal .scrollbar__view {
    height: 100%;
  }

  #batch-num-modal {
    height: 600px;
  }
</style>
