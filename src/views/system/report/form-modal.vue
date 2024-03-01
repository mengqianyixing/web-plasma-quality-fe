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
  import { updateReportApi } from '@/api/report';

  const emit = defineEmits(['success', 'register']);

  const state = reactive<{
    title: string;
    id: string;
  }>({ title: '', id: '' });
  const [registerForm, { validate, clearValidate, resetFields, setFieldsValue }] = useForm({
    labelWidth: 120,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });
  const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    console.log('data--', data);
    if (data.isUpdate) {
      state.title = '编辑';
      state.id = data.id;
      // formSchema.slice(0, 1).forEach((schema) => {
      //   updateSchema({ ...schema, componentProps: { disabled: true } });
      // });
      setFieldsValue(data);
    } else {
      state.title = '新增';
      resetFields();
    }
    clearValidate();
    setModalProps({ confirmLoading: false });
  });

  async function handleSubmit() {
    const values = await validate();
    await updateReportApi({
      ...values,
      id: state.id,
    });
    closeModal();
    emit('success');
  }
</script>
