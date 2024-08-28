<template>
  <BasicModal
    wrapClassName="no-pass-modal"
    v-bind="$attrs"
    @register="registerNoPass"
    showFooter
    title="验收不合格详情"
    width="80%"
    :min-height="650"
    :showOkBtn="false"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute flex flex-col w-full h-full">
        <BasicTable id="noPass" @register="registerTable" />
      </div>
    </div>
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { useTable, BasicTable } from '@/components/Table';
  import { noPassSearchFormSchema, noPassModalColumns } from './entrySearch.data';
  import { verifyNoPassNumApi } from '@/api/plasmaStore/entryPlasma';
  import { reactive } from 'vue';

  defineOptions({ name: 'NoPassModal' });

  defineEmits(['register']);

  const state = reactive({
    verifyNoPassNum: '',
    batchNo: '',
    bagVerify: 'FAIL',
    bagNo: '',
  });
  const [registerTable, { clearSelectedRowKeys, reload }] = useTable({
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
    columns: noPassModalColumns,
    bordered: true,
    useSearchForm: true,
    beforeFetch: (params) => {
      return { ...params, batchNo: state.batchNo, bagVerify: state.bagVerify };
    },
    inset: true,
    isCanResizeParent: true,
  });
  const [registerNoPass] = useModalInner(({ batchNo, bagVerify }) => {
    state.batchNo = batchNo;
    state.bagVerify = bagVerify;

    reload();
    clearSelectedRowKeys();
  });
</script>
