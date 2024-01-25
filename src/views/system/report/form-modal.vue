<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    cancelText="关闭"
    :title="state.title"
    width="400px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicForm, useForm } from '@/components/Form';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { formSchema } from './report.data';
  import { reactive } from 'vue';

  const emit = defineEmits(['success', 'register']);

  const state = reactive<{
    title: string;
  }>({ title: '' });
  const [registerForm, { validate, clearValidate, resetFields, setFieldsValue, updateSchema }] =
    useForm({
      labelWidth: 120,
      baseColProps: { span: 24 },
      schemas: formSchema,
      showActionButtonGroup: false,
    });
  const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    if (data.isUpdate) {
      state.title = '编辑';
      formSchema.slice(0, 1).forEach((schema) => {
        updateSchema({ ...schema, componentProps: { disabled: true } });
      });
      setFieldsValue({});
    } else {
      state.title = '新增';
      resetFields();
    }
    clearValidate();
    setModalProps({ confirmLoading: false });
  });

  async function handleSubmit() {
    const values = await validate();
    console.log(values);
    closeModal();
    emit('success');
  }
</script>
