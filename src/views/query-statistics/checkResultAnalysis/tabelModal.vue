<template>
  <BasicModal
    v-bind="$attrs"
    :minHeight="520"
    @register="registerModal"
    title="厂家检测样本数详情"
    width="1200px"
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
  import { dtColumns, dtSearchFormSchema } from './data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { getDtApi } from '@/api/query-statistics/checkResultAnalysis';

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
    inset: false,
    size: 'small',
    bordered: true,
    isCanResizeParent: true,
    useSearchForm: true,
    formConfig: {
      schemas: dtSearchFormSchema,
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : '';
      },
    },
    beforeFetch: (p) => {
      return { ...p };
    },
  });
  const [registerModal] = useModalInner(async (data) => {
    setPagination({ current: 1 });
    const { setFieldsValue } = getForm();
    setFieldsValue(data);
    console.log(data);
    setTimeout(reload, 200);
  });
</script>
