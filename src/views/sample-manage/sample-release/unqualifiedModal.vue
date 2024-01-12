<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="不合格样本数量列表"
    showFooter
    width="85%"
  >
    <BasicTable @register="registerTable" ref="table" />
    <template #footer>
      <a-button @click="closeModal">关闭</a-button>
    </template>
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
    title: '',
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
    canResize: false,
  });

  const [register, { setModalProps, closeModal }] = useModalInner((data) => {
    setModalProps({
      maskClosable: false,
    });

    batchSampleNo.value = data.record.batchSampleNo;

    reload();
  });
</script>
