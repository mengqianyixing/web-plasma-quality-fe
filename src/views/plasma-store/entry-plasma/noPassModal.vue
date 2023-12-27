<template>
  <BasicDrawer
    wrapClassName="noPassModal"
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="验收不合格详情"
    width="1000px"
    :isDetail="true"
    :showDetailBack="false"
  >
    <BasicTable @register="registerTable" />
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { useTable, BasicTable } from '@/components/Table';
  import { noPassSearchFormSchema, noPassModalColums } from './entrySearch.data';
  import { verifyNoPassNumApi } from '@/api/plasmaStore/entryPlasma';
  import { reactive } from 'vue';

  defineOptions({ name: 'NoPassModel' });

  const state = reactive({
    verifyNoPassNum: '',
    batchNo: '',
    bagVerify: 'FAIL',
    bagNo: '',
  });
  const [registerTable, { clearSelectedRowKeys, reload, setPagination }] = useTable({
    title: '明细',
    immediate: false,
    api: verifyNoPassNumApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    formConfig: {
      labelWidth: 85,
      schemas: noPassSearchFormSchema,
    },
    rowKey: 'verifyNoPassNum',
    columns: noPassModalColums,
    bordered: true,
    isCanResizeParent: true,
    useSearchForm: true,
    // rowSelection: { type: 'checkbox' },
    beforeFetch: (params) => {
      return { ...params, batchNo: state.batchNo, bagVerify: state.bagVerify };
    },
  });
  const [registerDrawer] = useDrawerInner(({ batchNo, bagVerify }) => {
    // state.bagVerify = bagVerify;
    state.batchNo = batchNo;
    state.bagVerify = bagVerify;
    console.log(batchNo, bagVerify);

    setPagination({ current: 1 });
    reload();
    clearSelectedRowKeys();
  });
</script>
<style>
  .locationModal .scrollbar__view {
    height: 100%;
  }
</style>
