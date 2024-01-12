<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-21 17:19:22
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-12 16:31:45
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="货位选择"
    width="800px"
    :minHeight="520"
    @fullscreen="redoHeight"
    @ok="handleSubmit"
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
  import { message } from 'ant-design-vue';
  import { reactive } from 'vue';
  import { locationListApi } from '@/api/plasmaStore/setting';

  const emit = defineEmits(['confim', 'register']);
  const state = reactive<{
    disabledKeys: string[];
    params: Recordable;
  }>({ disabledKeys: [] as string[], params: {} });
  const [
    registerTable,
    { reload, getSelectRows, setPagination, clearSelectedRowKeys, redoHeight },
  ] = useTable({
    api: locationListApi,
    isCanResizeParent: true,
    fetchSetting: {
      listField: 'result',
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
    },
    immediate: false,
    rowKey: 'locationNo',
    columns: [{ title: '货位号', dataIndex: 'locationNo' }],
    useSearchForm: true,
    bordered: true,
    formConfig: {
      baseColProps: {
        span: 16,
      },
      schemas: [{ field: 'locationNo', component: 'Input', label: '货位号' }],
    },
    beforeFetch: (params) => {
      return { ...params, ...state.params };
    },
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
    rowSelection: {
      type: 'radio',
      getCheckboxProps: (record: { locationNo: string }) => ({
        disabled: state.disabledKeys.includes(record.locationNo),
      }),
    },
    rowClassName: (record: Recordable) => {
      return state.disabledKeys.includes(record.locationNo) ? 'pointer-events-none' : '';
    },
  });
  const [registerModal] = useModalInner(({ disabledKeys, params }) => {
    state.disabledKeys = disabledKeys || [];
    state.params = params;
    setPagination({ current: 1 });
    clearSelectedRowKeys();
    reload();
  });

  function handleSubmit() {
    const rows = getSelectRows();
    if (!rows.length) return message.warning('请选择货位');
    emit('confim', rows);
  }
</script>
<style></style>
