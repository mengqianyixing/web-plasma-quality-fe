<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="`检测样本详情`"
    :minHeight="520"
    width="600px"
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
  import { dtColumns3 } from './data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { getDtList3Api } from '@/api/query-statistics/sampleCheck';

  const state = ref({});

  const [registerTable, { redoHeight, reload, setPagination }] = useTable({
    immediate: false,
    api: getDtList3Api,
    columns: dtColumns3,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    size: 'small',
    useSearchForm: false,
    bordered: true,
    formConfig: {},
    isCanResizeParent: true,
    inset: false,
    beforeFetch: (p) => {
      return { ...p, ...state.value };
    },
  });
  const [registerModal] = useModalInner(async (data) => {
    state.value = data;
    setPagination({ current: 1 });
    reload();
  });
</script>
