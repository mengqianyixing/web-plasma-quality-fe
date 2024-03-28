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
  import dayjs from 'dayjs';

  const emit = defineEmits(['success', 'register']);

  const state = reactive<{
    title: string;
    id: string;
  }>({ title: '', id: '' });
  const [
    registerForm,
    { validate, clearValidate, resetFields, setFieldsValue, updateSchema, getFieldsValue },
  ] = useForm({
    labelWidth: 120,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });
  const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    if (data.isUpdate) {
      state.title = '编辑';
      state.id = data.id;
      setFieldsValue(data);
    } else {
      state.title = '新增';
      resetFields();
    }
    clearValidate();
    updateSchema({ field: 'expiredDate', rules: [{ validator: validator }] });
    setModalProps({ confirmLoading: false });
  });
  function validator(rule, value) {
    const { effectiveDate } = getFieldsValue();
    if (!value || !effectiveDate) return Promise.resolve();
    if (dayjs(value) <= dayjs(effectiveDate)) {
      return Promise.reject('有效期需要大于生效日期');
    }
    return Promise.resolve();
  }

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      await updateReportApi({
        ...values,
        id: state.id,
      });
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
