<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="血浆验收不合格列表"
    width="80%"
    :min-height="600"
    :showOkBtn="false"
    @fullscreen="redoHeight"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <BasicTable @register="registerTable" />
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { ref } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { plasmaUnqualifiedColumns } from '@/views/sample-manage/sample-verify/verify.data';
  import { getVerifyUnqualified } from '@/api/inbound-management/sample-verify';

  const batchSampleNo = ref('');

  const [registerTable, { reload, redoHeight }] = useTable({
    api: getVerifyUnqualified,
    columns: plasmaUnqualifiedColumns,
    beforeFetch: (_) => {
      return batchSampleNo.value;
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    pagination: false,
    size: 'small',
    striped: false,
    useSearchForm: false,

    bordered: true,
    showIndexColumn: true,
    isCanResizeParent: false,
    immediate: false,
  });

  const [register] = useModalInner((data) => {
    batchSampleNo.value = data.record;
    reload();
  });
</script>
