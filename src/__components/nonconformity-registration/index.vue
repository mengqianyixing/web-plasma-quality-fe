<template>
  <BasicForm @register="register" @submit="handleSubmit">
    <template #check="{ model, field }">
      <a-input
        disabled
        placeholder="请点击登录按钮"
        v-model:value="model[field]"
        style="width: calc(100% - 80px)"
      />
      <a-button type="primary" @click="handleLogin" class="ml-3">登录</a-button>
    </template>
    <template #nonconformity="{ model, field }">
      <ApiSelect
        mode="multiple"
        @change="(value) => (model[field] = value)"
        resultField="result"
        labelField="roleName"
        valueField="roleId"
      />
    </template>
  </BasicForm>

  <LoginModal @register="registerLoginModal" @success="handleSuccess" />
</template>

<script setup lang="ts">
  import { ApiSelect, BasicForm, useForm } from '@/components/Form';
  import { schemas } from './registration.data';

  import LoginModal from './LoginModal.vue';
  import { useModal } from '@/components/Modal';
  import { nonconformityRegistration } from '@/api/nonconformity/box-manage';

  async function handleSubmit(values) {
    await nonconformityRegistration(values);
    resetFields();
  }

  function handleSuccess(nickname: string) {
    setFieldsValue({
      checker: nickname,
    });
  }

  function handleLogin() {
    openModal(true);
  }

  const [registerLoginModal, { openModal }] = useModal();
  const [register, { setFieldsValue, resetFields }] = useForm({
    layout: 'horizontal',
    labelWidth: 120,
    rowProps: {
      justify: 'center',
    },
    wrapperCol: {
      span: 12,
    },
    schemas,
    size: 'large',
    actionColOptions: { span: 24 },
    showActionButtonGroup: true,
    submitButtonOptions: {
      text: '确定',
    },
  });
</script>
