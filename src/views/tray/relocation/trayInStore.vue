<template>
  <BasicForm
    @register="registerForm"
    submitOnReset
    @submit="submit"
    :labelWidth="100"
    :showSubmitButton="true"
    :submitButtonOptions="submitButtonOptions"
    :schemas="
      trayInStoreFormSchemas({
        changeFn: handleChange,
        searchFn: handleSelect,
      })
    "
  />
  <AreaOrLoactionModel @register="register" />
</template>
<script setup lang="ts">
  import type { ButtonProps } from 'ant-design-vue';
  import { message } from 'ant-design-vue';
  import { trayInStoreFormSchemas } from './relocation.data';
  import { BasicForm, useForm } from '@/components/Form';
  import { useDrawer } from '@/components/Drawer';
  import AreaOrLoactionModel from './areaOrLoactionModel.vue';

  const submitButtonOptions = { text: '入库' } as ButtonProps;
  const [register, { openDrawer }] = useDrawer();
  const [registerForm, { getFieldsValue }] = useForm();
  function handleChange() {}
  function handleSelect() {
    const { house } = getFieldsValue();
    if (!house) return message.warning('请选择库房');
    openDrawer(true, {});
  }
  function submit() {}
</script>
