<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="样本编号明细"
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
  import { traySampleBagListApi } from '@/api/tray/list';
  import { traySampleBagColumns } from './manage.data';
  import { reactive } from 'vue';

  const state = reactive({
    trayNo: '',
  });
  const [registerTable, { redoHeight, setPagination, getForm }] = useTable({
    immediate: false,
    isCanResizeParent: true,
    size: 'small',
    api: traySampleBagListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    inset: true,
    formConfig: {
      schemas: [
        { field: 'batchNo', component: 'Input', label: '样本批号' },
        { field: 'packNo', component: 'Input', label: '样本袋号' },
        { field: 'sampleNo', component: 'Input', label: '样本编号' },
      ],
    },
    columns: traySampleBagColumns,
    useSearchForm: true,
    bordered: true,
    beforeFetch: (params) => {
      return { ...params, trayNo: state.trayNo };
    },
  });
  const [registerModal] = useModalInner(({ trayNo }) => {
    state.trayNo = trayNo;
    const { resetFields } = getForm();
    setPagination({ current: 1 });
    resetFields();
  });
</script>
