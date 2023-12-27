<template>
  <BasicDrawer
    wrapClassName="batchNoModal"
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="血浆批次详情"
    width="800px"
    :isDetail="true"
    :showDetailBack="false"
  >
    <BasicTable @register="registerTable" />
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { useTable, BasicTable } from '@/components/Table';
  import { entryDetailModalColumns } from './entrySearch.data';
  import { bagPlasmaDetailApi } from '@/api/plasmaStore/entryPlasma';

  const batchNoRef = ref('');
  const [registerTable, { setPagination, setTableData, getPaginationRef }] = useTable({
    title: '明细',
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

  const [registerDrawer] = useDrawerInner(async ({ batchNo }) => {
    batchNoRef.value = batchNo;
    const pager = getPaginationRef();
    getBatchDetail(pager);
  });
</script>
<style>
  .locationModal .scrollbar__view {
    height: 100%;
  }
</style>
