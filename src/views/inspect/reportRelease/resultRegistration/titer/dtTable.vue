<template>
  <div class="absolute w-full h-full">
    <BasicTable @register="registerTable" />
  </div>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { dtColumns, dtSearchSchema } from './data';
  import { getCheckItemDtListApi } from '@/api/inspect/resultRegistration';

  const props = defineProps({
    checkResult: {
      type: String,
      default: '',
    },
    projectId: {
      type: String,
      default: '',
    },
    bsNo: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    plasmaType: {
      type: String,
      default: '',
    },
  });

  const [registerTable, { clearSelectedRowKeys, redoHeight }] = useTable({
    immediate: true,
    api: getCheckItemDtListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    formConfig: {
      labelWidth: 90,
      schemas: dtSearchSchema,
    },
    rowKey: 'sampleNo',
    columns: dtColumns(props.checkResult),
    size: 'small',
    showIndexColumn: false,
    useSearchForm: !!props.checkResult,
    showTableSetting: false,
    bordered: true,
    isCanResizeParent: true,
    beforeFetch: (p) => ({ ...p, projectId: props.projectId, bsNo: props.bsNo, type: props.type }),
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
  });
  defineExpose({ redoHeight });
</script>
