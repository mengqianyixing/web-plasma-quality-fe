<template>
  <BasicModal v-bind="$attrs" @register="register" title="浆站缺号列表" width="80%">
    <div>
      <BasicTable @register="registerTable" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { ref } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { missingNumberListColumns } from '@/views/inbound-management/sample-verify/verify.data';
  import { getMissingNumberList } from '@/api/inbound-management/sample-verify';

  const batchSampleNo = ref('');
  const [registerTable, { reload }] = useTable({
    title: '浆站缺号列表',
    api: getMissingNumberList,
    columns: missingNumberListColumns,
    beforeFetch: (_) => {
      return batchSampleNo.value;
    },
    showIndexColumn: true,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    pagination: false,
    size: 'small',
    striped: false,
    useSearchForm: false,
    showTableSetting: true,
    tableSetting: {
      size: false,
      redo: false,
      setting: false,
    },
    bordered: true,
    canResize: false,
    immediate: false,
  });

  const [register] = useModalInner((data) => {
    batchSampleNo.value = data.record;
    reload();
  });
</script>
