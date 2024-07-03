<template>
  <div class="h-full">
    <BasicTable @register="registerTable" />
  </div>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { columns } from './data';
  import { onMounted, watch, nextTick } from 'vue';
  import { getMaterialListApi } from '@/api/inspect/resultRegistration';

  const emit = defineEmits(['reload']);
  const props = defineProps({
    bsNo: { type: String, default: '' },
  });

  const [registerTable, { clearSelectedRowKeys, reload }] = useTable({
    immediate: false,
    api: getMaterialListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: columns,
    size: 'small',
    useSearchForm: false,
    scroll: { x: 0 },
    showTableSetting: false,
    bordered: true,
    rowSelection: { type: 'radio' },
    beforeFetch: (p) => ({ ...p, bsNo: props.bsNo }),
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
    isCanResizeParent: true,
  });
  watch(
    () => props.bsNo,
    async (value) => {
      await nextTick();
      value && reload();
    },
    {
      immediate: true,
    },
  );

  onMounted(async () => {
    emit('reload', reload, '3');
  });
</script>
