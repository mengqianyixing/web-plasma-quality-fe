<template>
  <BasicForm @register="register" @submit="handleSubmit" />

  <LoginModal
    @register="registerLoginModal"
    @success="handleSuccess"
    :auth-code="ReCheckButtonEnum.NonconformityRegistrationCheck"
  />
</template>

<script setup lang="ts">
  import { BasicForm, useForm } from '@/components/Form';
  import { schemas } from './registration.data';

  import LoginModal from '@/__components/ReviewLoginModal/index.vue';
  import { useModal } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';
  import { nonconformityRegistration } from '@/api/nonconformity/box-manage';
  import { onMounted } from 'vue';
  import { ReCheckButtonEnum } from '@/enums/authCodeEnum';

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
  const [register, { setFieldsValue, resetFields, updateSchema }] = useForm({
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
  onMounted(() => [
    updateSchema({
      field: 'checker',
      componentProps: {
        'enter-button': '登录',
        placeholder: '请点击登录按钮',
        readonly: true,
        onSearch: handleLogin,
      },
    }),
  ]);
</script>
