<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-30 16:07:39
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-13 18:33:00
-->
<template>
  <Modal
    v-bind="$attrs"
    v-on="$attrs"
    :open="props.open"
    @cancel="cancel"
    @ok="confirm"
    :confirmLoading="confirmLoading"
    okText="登录"
    width="400px"
    title="复核人登录"
  >
    <div class="m-20px">
      <BasicForm @register="registerForm" />
    </div>
  </Modal>
</template>
<script setup lang="ts">
  import { Modal } from 'ant-design-vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { reCheckLogin } from '@/api/sys/login';
  import { ref } from 'vue';

  const emit = defineEmits(['cancel', 'login']);
  const props = defineProps({
    open: { type: Boolean, default: false },
  });
  const confirmLoading = ref(false);

  const [registerForm, { resetFields, clearValidate, validate }] = useForm({
    labelWidth: 60,
    baseColProps: { span: 24 },
    schemas: [
      {
        field: 'account',
        component: 'Input',
        label: '账号',
        required: true,
      },
      {
        field: 'password',
        component: 'InputPassword',
        label: '密码',
        required: true,
      },
    ],
    showActionButtonGroup: false,
  });
  async function confirm() {
    const values = await validate();
    try {
      confirmLoading.value = true;
      const userInfo = await reCheckLogin(values);
      resetFields();
      clearValidate();
      emit('login', userInfo);
    } finally {
      confirmLoading.value = false;
    }
  }
  function cancel() {
    resetFields();
    clearValidate();
    emit('cancel');
  }
</script>
<style></style>
