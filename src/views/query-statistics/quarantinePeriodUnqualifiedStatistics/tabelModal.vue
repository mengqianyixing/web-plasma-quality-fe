<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="title + `详情`"
    :minHeight="600"
    width="1000px"
    :showOkBtn="false"
    cancelText="关闭"
    @fullscreen="redoHeight"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <BasicTable @register="registerTable">
          <template #fkFailedCode="{ value }">
            <span>
              {{ getText(value) }}
            </span>
          </template>
        </BasicTable>
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { dtColumns } from './data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { getDtListApi } from '@/api/query-statistics/quarantinePeriodUnqualifiedStatistics';

  const state = reactive({});
  const title = ref('');
  const dictMap = ref(new Map());
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
    isCanResizeParent: true,
    inset: false,
    beforeFetch: (p) => {
      return { ...p, ...state };
    },
  });
  const [registerModal] = useModalInner(async (data) => {
    title.value = data.title;
    setPagination({ current: 1 });
    dictMap.value = data.dictMap;
    Object.assign(state, data, { title: void 0, dictMap: void 0 });
    reload();
  });
  function getText(code: string | null) {
    return code
      ? code
          .split(',')
          .map((c) => dictMap.value.get(c))
          .join(',')
      : '';
  }
</script>
