<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2024-01-19 14:20:15
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-19 16:22:47
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="新增血浆限制记录"
    width="800px"
    :minHeight="520"
    @fullscreen="redoHeight"
    @ok="handleSubmit"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <div class="flex-1 shrink-1" style="height: calc(100% - 78px)">
          <BasicTable @register="registerTable" />
        </div>
        <BasicForm @register="registerForm" />
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '@/components/Form';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { message } from 'ant-design-vue';
  import { boxColumns } from './plasma-restriction.data';
  import { submitMarkApi, getBoxListApi } from '@/api/quality/plasma-restriction';

  const emit = defineEmits(['success', 'register']);
  defineOptions({ name: 'FormModel' });

  const [
    registerTable,
    { getSelectRows, clearSelectedRowKeys, reload, setPagination, redoHeight },
  ] = useTable({
    api: getBoxListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    inset: true,
    isCanResizeParent: true,
    columns: boxColumns,
    size: 'small',
    useSearchForm: true,
    bordered: true,
    rowSelection: { type: 'checkbox' },
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
    formConfig: {
      schemas: [{ label: '血浆批次', component: 'Input', field: 'batchNo' }],
    },
  });
  const [registerForm, { validate, clearValidate, resetFields }] = useForm({
    labelWidth: 120,
    baseColProps: { span: 24 },
    schemas: [{ field: 'remark', component: 'InputTextArea', label: '备注', required: true }],
    showActionButtonGroup: false,
  });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(() => {
    clearValidate();
    resetFields();
    setPagination({ current: 1 });
    reload();
  });
  async function handleSubmit() {
    try {
      const values = await validate();
      const rows = getSelectRows();
      if (rows.length === 0) return message.warning('请选择数据');
      const notAlike = rows.some((_) => _.batchNo !== rows[0].batchNo);
      if (notAlike) return message.warning('只能选择同一批次的箱号');
      setModalProps({ confirmLoading: true });
      await submitMarkApi({ remark: values.remark, boxNos: rows.map((_) => _.boxNo) });
      setModalProps({ confirmLoading: false });
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
