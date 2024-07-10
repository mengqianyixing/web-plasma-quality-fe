<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="不合格样本数量列表"
    showFooter
    width="85%"
    :minHeight="600"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute flex flex-col w-full h-full">
        <BasicTable @register="registerTable" ref="table" />
      </div>
    </div>
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
    striped: false,
    useSearchForm: false,
    bordered: true,
    showIndexColumn: true,
    inset: false,
    immediate: false,
    isCanResizeParent: true,
  });

  const [register, { setModalProps, closeModal }] = useModalInner((data) => {
    setModalProps({
      maskClosable: false,
    });

    batchSampleNo.value = data.record.batchSampleNo;

    reload();
  });
</script>
