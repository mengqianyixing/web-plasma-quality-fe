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
  import { totalUnqualifiedColumns, columnsMap, totalUnqualifiedSearch } from './data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { getUnqualifiedApi } from '@/api/inspect/reportRelease';

  const state = reactive({ bsNo: '', type: 1, title: '' });

  const [registerTable, { redoHeight, setColumns, getForm }] = useTable({
    immediate: false,
    api: getUnqualifiedApi,
    columns: totalUnqualifiedColumns,
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
    const { resetFields } = getForm();
    state.bsNo = sampleBatchNo;
    state.type = type;
    state.title = title;
    const columns = [...totalUnqualifiedColumns, ...(columnsMap[type] || [])];
    setColumns(columns);
    resetFields();
  });
</script>
