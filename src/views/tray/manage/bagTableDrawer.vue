<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="托盘存放血浆列表"
    width="1000px"
    :minHeight="600"
    @fullscreen="redoHeight"
    :footer="null"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
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

  defineOptions({ name: 'BagTableModal' });
  const state = reactive({
    trayNo: '',
  });
  const [registerTable, { reload, redoHeight, setPagination, getForm }] = useTable({
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
    const { resetFields } = getForm();
    resetFields();
    setPagination({ current: 1 });
    reload();
  });
</script>
