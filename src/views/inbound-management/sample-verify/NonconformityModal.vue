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
  import { reactive } from 'vue';
  import { BasicModal, useModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { useMessage } from '@/hooks/web/useMessage';

  import LoginModal from '@/__components/ReviewLoginModal/index.vue';
  import { registerNonconformity } from '@/api/inbound-management/sample-verify';
  import { PostApiCoreBatchSampleUnqualifiedRequest } from '@/api/type/batchManage';
  import {
    DictionaryItemKeyEnum,
    DictionaryReasonEnum,
    getSysSecondaryDictionary,
  } from '@/api/_dictionary';
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
        field: 'unqualifiedReasonCode',
        label: '不合格原因',
        component: 'ApiSelect',
        componentProps: {
          api: getSysSecondaryDictionary,
          params: {
            dataKey: DictionaryReasonEnum.PlasmaFailedReason,
            dictItemTypes: [DictionaryItemKeyEnum.PlasmaFailed],
          },
          valueField: 'dictItemId',
        },
        colProps: { span: 20 },
        required: true,
      },
      {
        field: 'sampleNo',
        label: '样本编号',
        component: 'Input',
        colProps: { span: 20 },
        required: true,
      },
    ],
  });

  const modalParams = reactive({
    verifyNo: '',
    batchSampleNo: '',
  });

  const [registerModal, { closeModal, setModalProps }] = useModalInner((data) => {
    setModalProps({
      maskClosable: false,
    });
    modalParams.verifyNo = data.record.verifyNo;
    modalParams.batchSampleNo = data.record.batchSampleNo;
  });
  const [registerLoginModal, { openModal: openLoginModal }] = useModal();
  async function handleSubmit() {
    try {
      const values = await validate();

      await registerNonconformity({
        ...values,
        verifyNo: modalParams.verifyNo,
        batchSampleNo: modalParams.batchSampleNo,
      } as PostApiCoreBatchSampleUnqualifiedRequest);

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
