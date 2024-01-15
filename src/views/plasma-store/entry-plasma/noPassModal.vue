<template>
  <BasicModal
    wrapClassName="no-pass-modal"
    v-bind="$attrs"
    @register="registerNoPass"
    showFooter
    title="验收不合格详情"
    width="1200px"
    :isDetail="true"
    :showDetailBack="false"
    @ok="closeModal"
  >
    <BasicTable id="noPass" @register="registerTable" />
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { useTable, BasicTable } from '@/components/Table';
  import { noPassSearchFormSchema, noPassModalColums } from './entrySearch.data';
  import { verifyNoPassNumApi } from '@/api/plasmaStore/entryPlasma';
  import { reactive } from 'vue';

  defineOptions({ name: 'NoPassModal' });

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
  const [registerNoPass, { closeModal }] = useModalInner(({ batchNo, bagVerify }) => {
    // state.bagVerify = bagVerify;
    state.batchNo = batchNo;
    state.bagVerify = bagVerify;
    console.log(batchNo, bagVerify);

    setPagination({ current: 1 });
    reload();
    clearSelectedRowKeys();
  });
</script>
<style scoped>
  .locationModal .scrollbar__view {
    height: 100%;
  }

  #no-pass-modal {
    height: 600px;
  }
</style>
