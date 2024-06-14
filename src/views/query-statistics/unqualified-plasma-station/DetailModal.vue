<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="明细"
    :minHeight="520"
    width="85%"
    :showOkBtn="false"
    cancelText="关闭"
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
  import { ref } from 'vue';
  import { detailColumns } from './station.data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { getUnqualifiedDetail } from '@/api/query-statistics/batch-statistics';

  const params = ref({});
  const [registerTable, { redoHeight, reload }] = useTable({
    immediate: false,
    api: getUnqualifiedDetail,
    columns: detailColumns,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    size: 'small',
    useSearchForm: false,
    bordered: true,
    isCanResizeParent: true,
    inset: false,
    beforeFetch: (p) => {
      return { ...p, ...params.value };
    },
  });
  const [registerModal] = useModalInner(async (data) => {
    params.value = data;

    await reload();
  });
</script>
