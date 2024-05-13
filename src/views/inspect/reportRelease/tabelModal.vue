<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="`${state.title}`"
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
  import { nextTick, reactive } from 'vue';
  import {
    totalUnqualifiedColumns,
    columnsMap,
    totalUnqualifiedSearch,
  } from './reportRelease.data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { getUnqualifiedApi } from '@/api/inspect/reportRelease';

  const state = reactive({ reportNo: '', type: 1, title: '' });

  const [registerTable, { redoHeight, reload, setColumns, getForm }] = useTable({
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
  const [registerModal] = useModalInner(async ({ reportNo, type, title }) => {
    await nextTick();
    const { setFieldsValue, getFieldsValue } = getForm();
    const nullFormObject = Object.keys(getFieldsValue()).reduce((t, c) => ((t[c] = void 0), t), {});
    setFieldsValue(nullFormObject);
    state.reportNo = reportNo;
    state.type = type;
    state.title = title;
    const columns = [...totalUnqualifiedColumns, ...(columnsMap[type] || [])];
    setColumns(columns);
    reload();
  });
</script>
