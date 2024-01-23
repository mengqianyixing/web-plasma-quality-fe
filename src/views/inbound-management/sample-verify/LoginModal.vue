<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="登录"
    @ok="handleSubmit"
    width="500px"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { reCheckLogin } from '@/api/sys/login';
  import { PostApiSysReviewerLoginRequest } from '@/api/type/login';

  defineOptions({ name: 'LoginModal' });

  const emit = defineEmits(['success', 'register']);

  const [registerForm, { resetFields, validate }] = useForm({
    labelWidth: 100,
    layout: 'horizontal',
    size: 'small',
    baseColProps: { span: 48 },
    schemas: [
      {
        field: 'account',
        component: 'Input',
        label: '账号',
        colProps: {
          span: 20,
        },
        required: true,
      },
      {
        field: 'password',
        component: 'InputPassword',
        label: '密码',
        colProps: {
          span: 20,
        },
        required: true,
      },
    ],
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async () => {
    await resetFields();
    setModalProps({ confirmLoading: false });
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      const loginRes = await reCheckLogin(values as PostApiSysReviewerLoginRequest);
      setModalProps({ confirmLoading: true });
      closeModal();
      emit('success', loginRes.username);
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
