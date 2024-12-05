<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="`托盘【${state.trayNo}】血浆箱列表`"
    :minHeight="600"
    width="800px"
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
  import { reactive } from 'vue';
  import { dtColumns } from './data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { getTrayBoxListApi } from '@/api/tray/list';

  const state = reactive({ trayNo: '', batchNo: '' });

  const [registerTable, { redoHeight, reload, setPagination }] = useTable({
    immediate: false,
    api: getTrayBoxListApi,
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
      return { ...p, ...state };
    },
  });
  const [registerModal] = useModalInner(async (data) => {
    state.trayNo = data.trayNo;
    state.batchNo = data.batchNo;
    setPagination({ current: 1 });
    reload();
  });
</script>
