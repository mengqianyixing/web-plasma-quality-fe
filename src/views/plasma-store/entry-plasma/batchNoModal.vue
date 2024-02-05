<template>
  <BasicModal
    wrapClassName="batch-num-modal"
    v-bind="$attrs"
    @register="register"
    showFooter
    title="血浆批次详情"
    width="1500px"
    :isDetail="true"
    :showDetailBack="false"
    @ok="closeModal"
  >
    <BasicTable @register="registerTable" id="batchNoTable" />
  </BasicModal>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { useTable, BasicTable } from '@/components/Table';
  import { entryDetailModalColumns } from './entrySearch.data';
  import { bagPlasmaDetailApi } from '@/api/plasmaStore/entryPlasma';

  defineEmits(['register']);

  const batchNo = ref('');
  const [registerTable, { reload }] = useTable({
    api: bagPlasmaDetailApi,
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
    rowKey: 'batchNo',
    columns: entryDetailModalColumns,
    bordered: true,
    immediate: false,
  });

  const [register, { closeModal, setModalProps }] = useModalInner((data) => {
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
