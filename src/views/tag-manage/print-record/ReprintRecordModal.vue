<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="打印标签"
    width="500"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { ReprintRecordFormSchema } from './record.data';

  defineOptions({ name: 'ReprintRecordModal' });

  const emit = defineEmits(['success', 'register']);

  const [registerForm, { updateSchema, setFieldsValue, validate }] = useForm({
    labelWidth: 170,
    baseColProps: { span: 32 },
    schemas: ReprintRecordFormSchema,
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });
    updateSchema({
      field: 'reason',
      componentProps: {
        options: data.record.reasonOptions,
      },
    });

    setFieldsValue({
      prtNo: data.record.prtNo,
    });
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      emit('success', values);
    } finally {
      setModalProps({ confirmLoading: false });
      closeModal();
    }
  }
</script>
