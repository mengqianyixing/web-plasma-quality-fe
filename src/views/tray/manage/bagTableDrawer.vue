<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="trayText + '存放血浆列表'"
    width="1000px"
    :minHeight="520"
    @fullscreen="redoHeight"
  >
    <div class="flex h-inherit max-h-inherit min-h-inherit">
      <div class="flex-1 w-full">
        <BasicTable @register="registerTable" />
      </div>
    </div>
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { trayBagListApi } from '@/api/tray/list';
  import { trayBagColumns, trayBagSearch } from './manage.data';
  import { reactive } from 'vue';
  import { useServerConfig } from '@/hooks/common/useServerConfig';

  defineOptions({ name: 'BagTableModal' });
  const { trayText } = useServerConfig();

  const state = reactive({
    trayNo: '',
  });
  const [registerTable, { reload, redoHeight, setPagination }] = useTable({
    immediate: false,
    isCanResizeParent: true,
    size: 'small',
    api: trayBagListApi,
    inset: true,
    formConfig: { schemas: trayBagSearch },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: trayBagColumns,
    useSearchForm: true,
    bordered: true,
    beforeFetch: (params) => {
      return { ...params, trayNo: state.trayNo };
    },
  });
  const [registerModal] = useModalInner(({ trayNo }) => {
    state.trayNo = trayNo;
    setPagination({ current: 1 });
    reload();
  });
</script>
