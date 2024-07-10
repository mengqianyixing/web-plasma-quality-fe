<template>
  <BasicModal
    wrapClassName="horFallModal"
    v-bind="$attrs"
    @register="registerHortFall"
    title="不足量详情"
    width="80%"
    :min-height="650"
    :showOkBtn="false"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute flex flex-col w-full h-full">
        <BasicTable @register="registerTable" />
      </div>
    </div>
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { useTable, BasicTable } from '@/components/Table';
  import { hortFallNumModalColumns } from './entrySearch.data';
  import { shortFailList } from '@/api/plasmaStore/entryPlasma';
  import { ref } from 'vue';

  defineEmits(['register']);

  const batchNo = ref('');
  const [registerTable, { reload }] = useTable({
    api: shortFailList,
    beforeFetch: (params) => {
      return {
        ...params,
        batchNo: batchNo.value,
      };
    },
    immediate: false,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    inset: true,
    isCanResizeParent: true,
    columns: hortFallNumModalColumns,
    useSearchForm: false,
    bordered: true,
  });

  const [registerHortFall, { setModalProps }] = useModalInner((data) => {
    setModalProps({
      maskClosable: false,
    });

    batchNo.value = data.batchNo;
    reload();
  });
</script>
