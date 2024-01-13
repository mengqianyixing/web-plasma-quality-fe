<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-26 17:41:03
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-09 16:14:44
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

  const emit = defineEmits(['success', 'register']);

  defineOptions({ name: 'FormModel' });
  const state = reactive({ dictItemId: '', type: '', isRequest: false });

  const [registerForm, { validate, setFieldsValue, clearValidate, resetFields, updateSchema }] =
    useForm({
      labelWidth: 120,
      baseColProps: { span: 12 },
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
      clearValidate();
    },
  );
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
    updateSchema({ field: 'result', componentProps: { options: res.dictImtes } });
  }
</script>
