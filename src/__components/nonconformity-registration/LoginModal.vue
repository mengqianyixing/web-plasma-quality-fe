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
  import { formSchema } from './registration.data';

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
      console.log(values, 'values');
      setModalProps({ confirmLoading: true });
      closeModal();
      emit('success', 'Martin');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
