<template>
  <div class="h-full">
    <BasicTable @register="registerTable" />
  </div>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { dtColumns } from './data';
  import { getCheckItemDtListApi } from '@/api/inspect/resultRegistration';

  const props = defineProps({
    checkResult: {
      type: String,
      default: '',
    },
    checkType: {
      type: String,
      default: '',
    },
    projectId: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    bsNo: {
      type: String,
      default: '',
    },
  });

  const [registerTable, { clearSelectedRowKeys }] = useTable({
    immediate: true,
    api: getCheckItemDtListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    showIndexColumn: false,
    columns: dtColumns(props.checkResult, props.checkType),
    size: 'small',
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    isCanResizeParent: true,
    beforeFetch: (p) => ({ ...p, projectId: props.projectId, type: props.type, bsNo: props.bsNo }),
    rowSelection: props.checkType ? { type: 'radio' } : void 0,
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
  });
</script>
