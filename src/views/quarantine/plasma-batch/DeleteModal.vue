<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="撤销"
    @ok="handleSubmit"
    @close="resetFields"
    width="150"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';

  import { setPlasmaBatchRelease } from '@/api/quarantine/plasma-batch';

  defineOptions({ name: 'CancelModal' });

  const emit = defineEmits(['success', 'register']);

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 120,
    baseColProps: { span: 48 },
    schemas: [
      {
        field: 'brNo',
        label: '批次放行单',
        component: 'Input',
        componentProps: {
          disabled: true,
        },
        show: false,
      },
      {
        field: 'cancelReason',
        label: '原因',
        component: 'InputTextArea',
        colProps: {
          span: 20,
        },
        componentProps: {
          rows: 4,
        },
        required: true,
      },
      {
        field: 'state',
        label: '状态',
        defaultValue: 'C',
        component: 'Input',
        show: false,
      },
    ],
    showActionButtonGroup: false,
    transformDateFunc(date) {
      return date ? date.format('YYYY-MM-DD') : '';
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    resetFields();
    setModalProps({ confirmLoading: false });

    setFieldsValue({
      brNo: data.record?.brNo,
    });
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      await setPlasmaBatchRelease({
        ...values,
      });
      emit('success');
      closeModal();
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
