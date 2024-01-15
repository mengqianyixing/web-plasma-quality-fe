<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2024-01-05 17:23:44
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-09 17:16:29
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="挑浆"
    width="1200px"
    @cancel="emit('close')"
  >
    <div class="flex flex-col">
      <BasicForm @register="registerForm" @submit="handleSubmit" />
      <div class="flex flex-1">
        <div class="w-600px">
          <BasicTable @register="registerLeftTable" />
        </div>
        <div class="w-600px">
          <BasicTable @register="registerRightTable" />
        </div>
      </div>
    </div>
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { outLeftColumns, outRightColumns } from './plasmaOut.data';
  import { BasicTable, useTable } from '@/components/Table';
  import { scanApi, scanedApi, notScanApi } from '@/api/nonconformity/plasmaOut';
  import { reactive } from 'vue';

  const emit = defineEmits(['close']);

  const state = reactive({ no: '' });

  const [registerForm, { clearValidate, resetFields, getFieldsValue }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 8 },
    schemas: [{ field: 'bagNo', component: 'Input', label: '血浆编号', required: true }],
    showActionButtonGroup: false,
    autoSubmitOnEnter: true,
  });
  const [registerLeftTable, { reload: reloadLeft, setPagination: setPaginationLeft }] = useTable({
    api: notScanApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: outLeftColumns,
    size: 'small',
    useSearchForm: false,
    bordered: true,
    rowSelection: { type: 'checkbox' },
    beforeFetch: (p) => ({
      ...p,
      dlvNo: state.no,
    }),
  });
  const [registerRightTable, { reload: reloadRight, setPagination: setPaginationRight }] = useTable(
    {
      api: scanedApi,
      fetchSetting: {
        pageField: 'currPage',
        sizeField: 'pageSize',
        totalField: 'totalCount',
        listField: 'result',
      },
      columns: outRightColumns,
      size: 'small',
      useSearchForm: false,
      bordered: true,
      beforeFetch: (p) => ({
        ...p,
        dlvNo: state.no,
      }),
    },
  );
  async function handleSubmit() {
    const { bagNo } = getFieldsValue();
    await scanApi({ bagNo, no: state.no });
    resetFields();
    reloadLeft();
    reloadRight();
  }
  const [registerModal] = useModalInner(({ dlvNo }) => {
    state.no = dlvNo;
    resetFields();
    clearValidate();
    setPaginationLeft({ current: 1 });
    setPaginationRight({ current: 1 });
    reloadLeft();
    reloadRight();
  });
</script>
