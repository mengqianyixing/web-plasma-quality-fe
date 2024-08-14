<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="申请详情"
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

  import { getDeliverSampleSingleDetail } from '@/api/sample-manage/reserve-sample-destory-single';
  import {
    requisitionDetail,
    searchFormSchema,
  } from '@/views/sample-manage/reserve-sample-destroy-outbound-single/reserve-single.data';

  defineEmits(['success', 'register']);

  const dlvNo = ref('');

  const [register, { setModalProps }] = useModalInner(async (data) => {
    dlvNo.value = data.dlvNo;

    setModalProps({
      maskClosable: false,
      destroyOnClose: true,
    });
  });

  const [registerBatchTable, { redoHeight }] = useTable({
    api: getDeliverSampleSingleDetail,
    columns: requisitionDetail,
    beforeFetch: (params) => {
      return {
        ...params,
        dlvNo: dlvNo.value,
      };
    },
    size: 'small',
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    formConfig: {
      schemas: searchFormSchema,
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : '';
      },
    },
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
