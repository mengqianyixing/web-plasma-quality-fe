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
  import { formSchema } from './modal.data';
  import { reCheckLogin } from '@/api/sys/login';
  import { PostApiSysReviewerLoginRequest } from '@/api/type/login';

  defineOptions({ name: 'LoginModal' });

  const emit = defineEmits(['success', 'register']);

  const [registerForm, { resetFields, validate }] = useForm({
    labelWidth: 100,
    layout: 'horizontal',
    size: 'large',
    baseColProps: { span: 48 },
    schemas: formSchema,
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
      await resetFields();
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
