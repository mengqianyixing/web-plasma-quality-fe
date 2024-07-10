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
        <BasicTable @register="registerTable" />
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { dtColumns } from './data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { getDtApi } from '@/api/query-statistics/sampleStat';

  const state = reactive({
    batchNo: '',
    sampleType: '',
    sampleSubType: '',
  });
  const title = ref('');
  const [registerTable, { redoHeight, reload, setPagination, getForm }] = useTable({
    immediate: false,
    api: getDtApi,
    columns: dtColumns,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    size: 'small',
    useSearchForm: true,
    formConfig: {
      schemas: [
        { field: 'sampleNo', component: 'Input', label: '样本编号' },
        { field: 'donorNo', component: 'Input', label: '浆员编号' },
      ],
    },
    bordered: true,
    isCanResizeParent: true,
    inset: false,
    beforeFetch: (p) => {
      return { ...p, ...state };
    },
  });
  const [registerModal] = useModalInner(async ({ record, slot }) => {
    Object.assign(state, {
      batchNo: record.sampleBatchNo,
      sampleType: record.sampleType,
      sampleSubType: slot.type,
    });
    title.value = slot.title;
    const { resetFields } = getForm();
    resetFields();
    setPagination({ current: 1 });
    reload();
  });
</script>
