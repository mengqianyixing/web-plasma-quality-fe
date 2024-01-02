<template>
  <div class="h-full">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleRemove" v-if="props.checkType">删除</a-button>
      </template>
    </BasicTable>
  </div>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { message } from 'ant-design-vue';
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
  });
  const [registerTable, { getSelectRows, clearSelectedRowKeys, reload }] = useTable({
    immediate: true,
    api: getCheckItemDtListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    rowKey: 'sampleId',
    columns: dtColumns(props.checkResult, props.checkType),
    size: 'small',
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    isCanResizeParent: true,
    beforeFetch: (p) => ({ ...p, projectId: props.projectId, type: props.checkResult }),
    rowSelection: props.checkType ? { type: 'checkbox' } : void 0,
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
  });
  function handleRemove() {
    const rows = getSelectRows();
    if (rows.length === 0) return message.warning('请选择一条数据');
    reload();
  }
</script>
