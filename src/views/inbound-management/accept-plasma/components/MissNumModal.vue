<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="缺浆登记"
    width="500px"
    :maskClosable="false"
    @ok="handleOk"
  >
    <Basic-form @register="registerForm" />
  </BasicModal>

  <LoginModal @register="registerLogin" @success="handleLoginSuccess" />
</template>
<script lang="ts" setup>
  import { BasicModal, useModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { useMessage } from '@/hooks/web/useMessage';
  import LoginModal from '@/__components/ReviewLoginModal/index.vue';
  import { nonconformityRegistration } from '@/api/nonconformity/box-manage';
  import { PostApiCoreBagUnqualifiedRequest } from '@/api/type/nonconformityManage';

  const { createMessage } = useMessage();

  const emit = defineEmits(['success', 'register']);

  const [registerLogin, { openModal }] = useModal();
  const [registerForm, { setFieldsValue, validate, resetFields }] = useForm({
    showActionButtonGroup: false,
    schemas: [
      {
        field: 'checker',
        label: '复核人',
        colProps: { span: 18 },
        component: 'InputSearch',
        componentProps: {
          'enter-button': '登录',
          placeholder: '请点击登录按钮',
          readonly: true,
          onSearch: handleLogin,
        },
        required: true,
      },
      {
        field: 'fkBagNo',
        label: '血浆编号',
        component: 'Input',
        colProps: { span: 18 },
        required: true,
      },
      {
        field: 'remark',
        label: '说明',
        component: 'InputTextArea',
        componentProps: {
          rows: 4,
        },
        colProps: { span: 18 },
      },
      {
        field: 'lack',
        label: '缺失数量',
        component: 'Input',
        defaultValue: 'lack',
        show: false,
      },
      {
        field: 'pageFlag',
        defaultValue: 'verify',
        component: 'Input',
        show: false,
      },
    ],
  });

  const [register, { closeModal, setModalProps }] = useModalInner();

  function handleLogin() {
    openModal(true);
  }

  function handleLoginSuccess(name: string) {
    setFieldsValue({
      checker: name,
    });
  }

  async function handleOk() {
    try {
      setModalProps({ confirmLoading: true });
      const values = await validate();
      await nonconformityRegistration(values as PostApiCoreBagUnqualifiedRequest);

      createMessage.success('缺浆登记成功');

      emit('success');

      await resetFields();
      closeModal();
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
