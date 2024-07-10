<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="title + `合计详情`"
    :minHeight="600"
    width="1000px"
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
  import { dtColumns } from './data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { getDtListApi } from '@/api/query-statistics/sampleCheck';

  const title = ref('');
  const state = ref({});

  const [registerTable, { redoHeight, reload, setPagination }] = useTable({
    immediate: false,
    api: getDtListApi,
    columns: dtColumns,
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
    title.value = data.title;
    setPagination({ current: 1 });
    reload();
  });
</script>
