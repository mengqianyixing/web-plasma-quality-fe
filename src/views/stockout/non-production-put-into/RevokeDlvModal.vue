<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="撤销申请单"
    showFooter
    width="30%"
    @ok="handleOk"
  >
    <BasicForm @register="registerForm" ref="table" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { useMessage } from '@/hooks/web/useMessage';
  import { deleteDeliverNonProductive } from '@/api/stockout/non-productin-put-into';

  const { createMessage } = useMessage();

  const [registerForm, { setFieldsValue, validate, resetFields }] = useForm({
    showActionButtonGroup: false,
    schemas: [
      {
        field: 'dlvNo',
        label: '单号',
        component: 'Input',
        componentProps: {
          disabled: true,
        },
        required: true,
      },
      {
        field: 'reason',
        label: '原因',
        component: 'InputTextArea',
        componentProps: {
          rows: 4,
        },
        required: true,
      },
    ],
  });

  const emit = defineEmits(['success', 'register']);
  const [register, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({
      maskClosable: false,
    });

    await setFieldsValue(data.record);
  });

  async function handleOk() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });

      await deleteDeliverNonProductive(values);
      createMessage.success('撤销成功');
      await resetFields();
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
