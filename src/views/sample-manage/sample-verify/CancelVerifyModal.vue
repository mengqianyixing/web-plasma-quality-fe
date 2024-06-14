<template>
  <BasicModal v-bind="$attrs" @register="registerModal" showFooter width="500px" @ok="handleSubmit">
    <BasicForm @register="registerForm" @submit="handleSubmit" />

    <LoginModal
      @register="registerLoginModal"
      @success="handleLoginSuccess"
      :auth-code="ReCheckButtonEnum.NonconformitySampleCheck"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { useMessage } from '@/hooks/web/useMessage';

  import LoginModal from '@/__components/ReviewLoginModal/index.vue';
  import { cancelVerifyByBatch } from '@/api/inbound-management/sample-verify';
  import { PutApiCoreBatchSampleVerifyRevokeAllRequest } from '@/api/type/batchManage';
  import { ReCheckButtonEnum } from '@/enums/authCodeEnum';

  const emit = defineEmits(['success', 'register']);
  const { createMessage } = useMessage();

  defineOptions({ name: 'NonconformityModal' });

  const [registerForm, { setFieldsValue, validate, resetFields }] = useForm({
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
        field: 'batchNo',
        label: '样本批号',
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
        componentProps: {
          rows: 6,
        },
      },
    ],
  });

  const [registerModal, { closeModal, setModalProps }] = useModalInner((data) => {
    setModalProps({
      maskClosable: false,
    });

    setFieldsValue({
      batchNo: data.record.batchNo,
    });
  });
  const [registerLoginModal, { openModal: openLoginModal }] = useModal();
  async function handleSubmit() {
    try {
      const values = await validate();

      await cancelVerifyByBatch({
        ...values,
      } as PutApiCoreBatchSampleVerifyRevokeAllRequest);

      createMessage.success('登记成功');
      emit('success');
      await resetFields();
      closeModal();
    } catch (e) {
      console.log(e);
    }
  }

  function handleLogin() {
    openLoginModal(true);
  }

  function handleLoginSuccess(username) {
    setFieldsValue({ checker: username });
  }
</script>
