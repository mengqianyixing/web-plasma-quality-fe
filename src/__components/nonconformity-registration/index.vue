<template>
  <BasicForm @register="register" @submit="handleSubmit">
    <template #check="{ model, field }">
      <a-input
        disabled
        placeholder="请点击登录按钮"
        v-model:value="model[field]"
        style="width: calc(100% - 80px)"
      />
      <a-button type="primary" @click="handleLogin" size="large" class="ml-3">登录</a-button>
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
  import { useMessage } from '@/hooks/web/useMessage';
  import { nonconformityRegistration } from '@/api/nonconformity/box-manage';

  const { createMessage } = useMessage();

  async function handleSubmit(values) {
    await nonconformityRegistration(values);
    await resetFields();

    createMessage.success('登记成功');
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
    labelCol: {
      offset: 3,
    },
    rowProps: {
      justify: 'center',
    },
    wrapperCol: {
      span: 9,
    },
    schemas,
    size: 'large',
    actionColOptions: { span: 24, offset: 6 },
    showActionButtonGroup: true,
    submitButtonOptions: {
      text: '确定',
    },
  });
</script>
