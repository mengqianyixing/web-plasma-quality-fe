<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-26 17:41:03
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-22 15:44:38
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="state.type"
    width="800px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formListSchema } from './titerType.data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import {
    getTitlerTypeDtApi,
    addTitlerTypeApi,
    updateTitlerTypeApi,
  } from '@/api/inspect/titerType';
  import { getDictItemListByNoApi } from '@/api/dictionary';
  import { isNumber } from '@/utils/is';

  const emit = defineEmits(['success', 'register']);

  defineOptions({ name: 'FormModel' });
  const state = reactive({ dictItemId: '', type: '', isRequest: false });

  const [
    registerForm,
    { validate, setFieldsValue, clearValidate, resetFields, updateSchema, getFieldsValue },
  ] = useForm({
    labelWidth: 200,
    baseColProps: { flex: '0 1 440px' },
    actionColOptions: { flex: '0 1 300px' },
    schemas: formListSchema,
    showActionButtonGroup: false,
  });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(
    async ({ data, disabled }) => {
      state.dictItemId = data.dictItemId;
      if (state.isRequest === false) {
        state.isRequest = true;
        getDict();
      }
      const disabledOptions = formListSchema.map((_) => ({
        field: _.field,
        componentProps: { disabled: false },
      }));
      if (data.dictItemId) {
        const res = await getTitlerTypeDtApi({ dictItemId: data.dictItemId });
        setFieldsValue(res);
        state.type = '编辑';
        disabledOptions.slice(0, 3).forEach((_) => (_.componentProps.disabled = true));
      } else {
        state.type = '新增';
        resetFields();
      }
      if (disabled) {
        state.type = '查看';
        disabledOptions.forEach((_) => (_.componentProps.disabled = true));
      }
      updateSchema(disabledOptions);
      updateSchema([
        { field: 'max', rules: [{ validator: maxValidator }] },
        { field: 'min', rules: [{ validator: minValidator }] },
      ]);
      clearValidate();
    },
  );
  function maxValidator(_, value: number | void) {
    const { min } = getFieldsValue();
    if (!isNumber(min) || !isNumber(value)) return Promise.resolve();
    if (min > value) return Promise.reject('最大值不能小于最小值');
    return Promise.resolve();
  }
  function minValidator(_, value: number | void) {
    const { max } = getFieldsValue();
    if (!isNumber(max) || !isNumber(value)) return Promise.resolve();
    if (max < value) return Promise.reject('最小值不能大于最大值');
    return Promise.resolve();
  }
  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      if (state.dictItemId) {
        await updateTitlerTypeApi({ ...values, dictItemId: state.dictItemId });
      } else {
        await addTitlerTypeApi({ ...values } as any);
      }
      setModalProps({ confirmLoading: false });
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
  async function getDict() {
    const [res] = await getDictItemListByNoApi(['titerResult']);
    updateSchema({ field: 'titerType', componentProps: { options: res.dictImtes } });
  }
</script>
