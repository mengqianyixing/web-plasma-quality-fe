<template>
  <BasicModal
    v-bind="$attrs"
    title="撤销登记"
    @register="registerModal"
    showFooter
    width="500px"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <BasicForm @register="registerForm" />

    <LoginModal
      @register="registerLoginModal"
      @success="handleLoginSuccess"
      :auth-code="ReCheckButtonEnum.NonconformitySampleRevokeRegisterCheck"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { useMessage } from '@/hooks/web/useMessage';

  import LoginModal from '@/__components/ReviewLoginModal/index.vue';
  import { revokeSampleVerify } from '@/api/inbound-management/sample-verify';
  import { PutApiCoreBatchSampleVerifyRevokeRequest } from '@/api/type/batchManage';
  import { ref } from 'vue';
  import { ReCheckButtonEnum } from '@/enums/authCodeEnum';

  const emit = defineEmits(['success', 'register']);
  const { createMessage } = useMessage();

  defineOptions({ name: 'FormModel' });

  const [registerLoginModal, { openModal: openLoginModal }] = useModal();
  const [registerForm, { setFieldsValue, validate, resetFields, clearValidate }] = useForm({
    layout: 'horizontal',
    labelWidth: 120,
    wrapperCol: {
      span: 15,
    },
    rowProps: {
      justify: 'center',
    },
    actionColOptions: { span: 30 },
    showActionButtonGroup: false,
    schemas: [
      {
        field: 'sampleNo',
        label: '样本编号',
        component: 'Input',
        colProps: { span: 20 },
        componentProps: {
          disabled: true,
        },
        required: true,
      },
      {
        field: 'checker',
        component: 'InputSearch',
        label: '复核人',
        componentProps: {
          'enter-button': '登录',
          placeholder: '请点击登录按钮',
          readonly: true,
          onSearch: handleLogin,
        },
        colProps: { span: 20 },
        required: true,
      },
      {
        field: 'revokeReason',
        label: '撤销原因',
        component: 'InputTextArea',
        colProps: { span: 20 },
        required: true,
      },
    ],
  });

  const batchSampleNo = ref('');
  const [registerModal, { closeModal, setModalProps }] = useModalInner((data) => {
    setModalProps({
      maskClosable: false,
    });
    batchSampleNo.value = data.record.batchSampleNo;
    setFieldsValue({
      sampleNo: data.record.sampleNo,
    });
  });
  function handleCancel() {
    resetFields();
    clearValidate();
  }
  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      await revokeSampleVerify({
        ...values,
        batchSampleNo: batchSampleNo.value,
      } as PutApiCoreBatchSampleVerifyRevokeRequest);

      createMessage.success('撤销成功');

      closeModal();
      resetFields();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

  function handleLogin() {
    openLoginModal(true);
  }

  function handleLoginSuccess(username: string) {
    setFieldsValue({ checker: username });
  }
</script>
