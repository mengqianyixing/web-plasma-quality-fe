<template>
  <BasicDrawer v-bind="$attrs" @register="register" title="明细" showFooter width="85%">
    <BasicTable @register="registerTable" ref="table">
      <template #footer>
        <a-button @click="handleCancel">取消</a-button>
      </template>
    </BasicTable>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { ref } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';

  import { getSampleUnqualifiedList } from '@/api/sample-manage/sample-release';
  import { unqualifiedColumns } from '@/views/sample-manage/sample-release/release.data';

  const batchSampleNo = ref('');
  const [registerTable, { reload }] = useTable({
    title: '不合格数量列表',
    api: getSampleUnqualifiedList,
    columns: unqualifiedColumns,
    pagination: false,
    beforeFetch: (params) => {
      return {
        ...params,
        batchNo: batchSampleNo.value,
      };
    },
    size: 'large',
    striped: false,
    useSearchForm: false,
    showTableSetting: true,
    tableSetting: {
      size: false,
      redo: false,
      setting: false,
    },
    bordered: true,
    showIndexColumn: true,
    indexColumnProps: {
      width: 80,
    },
    immediate: false,
  });

  const [register, { setDrawerProps, closeDrawer }] = useDrawerInner((data) => {
    setDrawerProps({
      maskClosable: false,
    });

    batchSampleNo.value = data.record.batchSampleNo;

    reload();
  });

  function handleCancel() {
    closeDrawer();
  }
</script>
