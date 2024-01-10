<template>
  <BasicModal v-bind="$attrs" @register="register" title="明细" showFooter width="85%">
    <BasicTable @register="registerTable" ref="table" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { ref } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';

  import { getSampleUnqualifiedList } from '@/api/sample-manage/sample-release';
  import { unqualifiedColumns } from '@/views/sample-manage/sample-release/release.data';

  const batchSampleNo = ref('');
  const [registerTable, { reload }] = useTable({
    title: '不合格数量列表',
    api: getSampleUnqualifiedList,
    columns: unqualifiedColumns,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    beforeFetch: (params) => {
      return {
        ...params,
        batchSampleNo: batchSampleNo.value,
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

  const [register, { setModalProps }] = useModalInner((data) => {
    setModalProps({
      maskClosable: false,
    });

    batchSampleNo.value = data.record.batchSampleNo;

    reload();
  });
</script>
