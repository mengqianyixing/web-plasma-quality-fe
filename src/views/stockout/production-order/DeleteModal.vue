<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="撤销指令"
    @ok="handleSubmit"
    @close="resetFields"
    width="350px"
  >
    <BasicForm class="m-20px" @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';

  import { delProOrder } from '@/api/stockout/production-order';

  defineOptions({ name: 'DeptModal' });

  const emit = defineEmits(['success', 'register']);

  const orderNo = ref('');
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 80,
    baseColProps: { style: { width: '100%' } },
    schemas: [
      {
        field: 'mesId',
        label: '制造批号',
        component: 'Input',
        componentProps: {
          disabled: true,
        },
      },
      {
        field: 'cause',
        label: '原因',
        component: 'InputTextArea',
        required: true,
        componentProps: {
          rows: 1,
        },
      },
      {
        field: 'orderNo',
        component: 'Input',
        ifShow: false,
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
    orderNo.value = data?.record?.orderNo;

    setFieldsValue({
      ...data.record,
    });
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      await delProOrder({
        orderNo: orderNo.value,
        cause: values.cause,
      });
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
