<template>
  <BasicModal
    wrapClassName="batch-num-modal"
    v-bind="$attrs"
    @register="register"
    title="血浆批次详情"
    width="80%"
    :min-height="650"
    :showOkBtn="false"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute flex flex-col w-full h-full">
        <BasicTable @register="registerTable" id="batchNoTable" />
      </div>
    </div>
  </BasicModal>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { useTable, BasicTable } from '@/components/Table';
  import { entryDetailModalColumns } from './entrySearch.data';
  import { getPlasmaQueryList } from '@/api/query-statistics/plasma';

  defineEmits(['register']);

  const batchNo = ref('');
  const [registerTable, { reload }] = useTable({
    api: getPlasmaQueryList,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    beforeFetch: (params) => {
      return {
        ...params,
        batchNo: batchNo.value,
      };
    },
    columns: entryDetailModalColumns,
    bordered: true,
    immediate: false,
    inset: true,
    isCanResizeParent: true,
  });

  const [register, { setModalProps }] = useModalInner((data) => {
    setModalProps({
      maskClosable: false,
    });

    batchNo.value = data.batchNo;

    reload();
  });
</script>
<style scoped>
  .locationModal .scrollbar__view {
    height: 100%;
  }

  #batch-num-modal {
    height: 600px;
  }
</style>
