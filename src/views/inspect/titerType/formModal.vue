<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-26 17:41:03
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-27 11:20:46
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="state.type"
    width="800px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formListSchema } from './titerType.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
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
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async ({ data }) => {
    state.dictItemId = data.dictItemId;
    if (state.isRequest === false) {
      state.isRequest = true;
      getDict();
    }
    if (data.dictItemId) {
      const res = await getTitlerTypeDtApi({ dictItemId: data.dictItemId });
      setFieldsValue(res);
      state.type = '编辑';
    } else {
      state.type = '新增';
      resetFields();
    }
    clearValidate();
  });
  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      if (state.dictItemId) {
        await updateTitlerTypeApi({ ...values, dictItemId: state.dictItemId });
      } else {
        await addTitlerTypeApi({ ...values } as any);
      }
      setDrawerProps({ confirmLoading: false });
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
  async function getDict() {
    const [res] = await getDictItemListByNoApi(['titerResult']);
    updateSchema({ field: 'result', componentProps: { options: res.dictImtes } });
  }
</script>
