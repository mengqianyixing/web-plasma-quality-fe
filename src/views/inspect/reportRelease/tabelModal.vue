<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="检验不合格样本详情"
    :minHeight="520"
    width="1000px"
    :showOkBtn="false"
    cancelText="关闭"
    @fullscreen="redoHeight"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full"> <BasicTable @register="registerTable" /> </div
    ></div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { totalUnqualifiedColumns } from './reportRelease.data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { getUnqualifiedApi } from '@/api/inspect/reportRelease';

  const state = reactive({ reportNo: '' });

  const [registerTable, { redoHeight, reload }] = useTable({
    immediate: false,
    api: getUnqualifiedApi,
    columns: totalUnqualifiedColumns,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    size: 'small',
    useSearchForm: false,
    bordered: true,
    isCanResizeParent: true,
    inset: false,
    beforeFetch: (p) => {
      return { ...p, ...state };
    },
  });
  const [registerModal] = useModalInner(async ({ reportNo }) => {
    state.reportNo = reportNo;
    reload();
  });
</script>
