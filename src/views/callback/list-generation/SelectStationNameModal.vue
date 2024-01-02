<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="选择公司"
    @ok="handleSubmit"
    width="400px"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';

  const emit = defineEmits(['success', 'register']);

  const [registerForm, { resetFields, validate, updateSchema }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 48 },
    rowProps: {
      justify: 'center',
    },
    schemas: [
      {
        field: 'stationNo',
        label: '采浆公司',
        colProps: { span: 24 },
        component: 'Select',
        required: true,
      },
    ],
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    updateSchema({
      field: 'stationNo',
      componentProps: {
        options: data.record.options,
      },
    });
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      closeModal();
      emit('success', values.stationNo);
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
