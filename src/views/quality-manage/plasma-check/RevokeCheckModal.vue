<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="撤销审核"
    showFooter
    width="25%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { ref } from 'vue';
  import { recheckCancelPlasmaCheck, revokePlasmaCheck } from '@/api/qualify-manage/plasma-check';
  import {
    PutApiCoreBatchPlasmaAuditRecheckCancelRequest,
    PutApiCoreBatchPlasmaAuditRevokeRequest,
  } from '@/api/type/plasmaCheckManage';
  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();
  const emit = defineEmits(['success', 'register']);

  const flag = ref('');

  const [registerForm, { validate, setFieldsValue, resetFields }] = useForm({
    labelWidth: 120,
    schemas: [
      {
        field: 'auditId',
        label: '审核单号',
        component: 'Input',
        componentProps: {
          disabled: true,
        },
      },
      {
        field: 'remark',
        label: '撤销原因',
        component: 'InputTextArea',
        componentProps: {
          rows: 4,
        },
      },
    ],
    showActionButtonGroup: false,
  });

  const [register, { setModalProps, closeModal }] = useModalInner((data) => {
    flag.value = data.flag;
    setModalProps({
      maskClosable: false,
    });

    setFieldsValue({
      auditId: data.record.auditId,
    });
  });

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      const values = await validate();

      console.log(flag.value);
      if (flag.value === 'check') {
        await revokePlasmaCheck(values as PutApiCoreBatchPlasmaAuditRevokeRequest);
        createMessage.success('撤销审核成功');
      } else if (flag.value === 'recheck') {
        await recheckCancelPlasmaCheck(values as PutApiCoreBatchPlasmaAuditRecheckCancelRequest);
        createMessage.success('撤销复核成功');
      }

      emit('success');

      closeModal();
      await resetFields();
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
