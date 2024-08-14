<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-23 16:49:51
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-12 17:08:12
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="样本袋号明细"
    width="1000px"
    :minHeight="400"
    @fullscreen="redoHeight"
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
  import { traySampleBoxListApi } from '@/api/tray/list';
  import { traySampleBoxColumns } from './manage.data';
  import { reactive } from 'vue';

  const state = reactive({
    trayNo: '',
  });
  const [registerTable, { redoHeight, setPagination, getForm }] = useTable({
    immediate: false,
    isCanResizeParent: true,
    size: 'small',
    api: traySampleBoxListApi,
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
      ],
    },
    columns: traySampleBoxColumns,
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
