<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="样本袋详情"
    width="80%"
    :min-height="650"
    showFooter
    :showOkBtn="false"
    @fullscreen="redoHeight"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <BasicTable @register="registerBatchTable" />
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';

  import { ref } from 'vue';

  import { getRetainSampleBatchDetail } from '@/api/query-statistics/reserve-sample';
  import {
    retainBatchColumns,
    searchRetainBatchFormSchema,
  } from '@/views/query-statistics/reserve-sample/reserver.data';

  defineEmits(['success', 'register']);

  const batchNo = ref('');

  const [register, { setModalProps }] = useModalInner(async (data) => {
    batchNo.value = data.record?.batchNo;

    setModalProps({
      maskClosable: false,
      destroyOnClose: true,
    });
  });

  const [registerBatchTable, { redoHeight }] = useTable({
    api: getRetainSampleBatchDetail,
    columns: retainBatchColumns,
    beforeFetch: (params) => {
      return {
        ...params,
        batchNo: batchNo.value,
      };
    },
    size: 'small',
    useSearchForm: true,
    formConfig: {
      schemas: searchRetainBatchFormSchema,
    },
    showTableSetting: false,
    bordered: true,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    inset: true,
    isCanResizeParent: true,
  });
</script>
<style scoped>
  .tabs :deep(.ant-tabs-content) {
    height: 100%;
  }
</style>
