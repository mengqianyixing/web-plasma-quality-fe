<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="样本明细"
    width="80%"
    :min-height="650"
    :footer="null"
    :showOkBtn="false"
    @fullscreen="redoHeight"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <BasicTable @register="registerBatchTable">
          <template #sampleNum="{ record }">
            <span
              :class="
                !record?.sampleNum
                  ? 'pointer-events-none'
                  : 'text-blue-500 underline cursor-pointer'
              "
              @click.stop.self="handleOpenSampleBatchDetail(record)"
            >
              {{ record?.sampleNum }}
            </span>
          </template>
        </BasicTable>
      </div>
    </div>
  </BasicModal>

  <SampleBatchDetailModal @register="registerSampleBatchDetailModal" />
</template>
<script lang="ts" setup>
  import { BasicModal, useModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';

  import { ref } from 'vue';

  import { retainPackColumns, searchRetainPackFormSchema } from './reserver.data';
  import { getRetainSamplePackDetail } from '@/api/query-statistics/reserve-sample';
  import SampleBatchDetailModal from '@/views/query-statistics/reserve-sample/SampleBatchDetailModal.vue';

  defineEmits(['success', 'register']);
  const [registerSampleBatchDetailModal, { openModal: openSampleDetailModal }] = useModal();

  const batchNo = ref('');

  const [register, { setModalProps }] = useModalInner(async (data) => {
    batchNo.value = data.record?.batchNo;

    setModalProps({
      maskClosable: false,
      destroyOnClose: true,
    });
  });

  const [registerBatchTable, { redoHeight }] = useTable({
    api: getRetainSamplePackDetail,
    columns: retainPackColumns,
    beforeFetch: (params) => {
      return {
        ...params,
        batchNo: batchNo.value,
      };
    },
    size: 'small',
    useSearchForm: true,
    formConfig: {
      schemas: searchRetainPackFormSchema,
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

  function handleOpenSampleBatchDetail(record) {
    openSampleDetailModal(true, {
      record,
    });
  }
</script>
<style scoped>
  .tabs :deep(.ant-tabs-content) {
    height: 100%;
  }
</style>
