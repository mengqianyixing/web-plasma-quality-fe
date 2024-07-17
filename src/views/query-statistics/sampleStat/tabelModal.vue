<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="`${state.title}`"
    :minHeight="600"
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
  import { nextTick, reactive } from 'vue';
  import { dtColumns, totalUnqualifiedSearch, typeMap } from './data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { getUnqualifiedApi } from '@/api/inspect/reportRelease';
  import { getDtApi } from '@/api/query-statistics/sampleStat';

  const state = reactive({ bsNo: '', type: 1, title: '' });

  const [registerTable, { redoHeight, getForm, setProps }] = useTable({
    immediate: false,
    api: getUnqualifiedApi,
    columns: dtColumns,
    formConfig: { schemas: totalUnqualifiedSearch },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    size: 'small',
    useSearchForm: true,
    bordered: true,
    isCanResizeParent: true,
    inset: false,
    beforeFetch: (p) => {
      return { ...p, ...state };
    },
  });
  const [registerModal] = useModalInner(async ({ sampleBatchNo, type, title }) => {
    await nextTick();
    if (type === typeMap.UNQ) {
      setProps({ api: getDtApi });
    } else {
      setProps({ api: getUnqualifiedApi });
    }
    const { resetFields } = getForm();
    state.bsNo = sampleBatchNo;
    state.type = type;
    state.title = title;
    resetFields();
  });
</script>
