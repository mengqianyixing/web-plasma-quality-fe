<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="不合格样本登记"
    width="500px"
    :maskClosable="false"
    @ok="handleOk"
    @cancel="resetFields"
  >
    <Basic-form @register="registerForm" />
  </BasicModal>

  <LoginModal @register="registerLogin" @success="handleLoginSuccess" />
</template>
<script lang="ts" setup>
  import { BasicModal, useModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { useMessage } from '@/hooks/web/useMessage';
  import LoginModal from '@/__components/ReviewLoginModal/index.vue';
  import {
    DictionaryEnum,
    DictionaryItemKeyEnum,
    getSysSecondaryDictionary,
  } from '@/api/_dictionary';
  import { PostApiCoreBatchSampleUnqualifiedPlasmaRequest } from '@/api/type/batchManage';
  import { nonconformityPlasmaReceiveSampleRegister } from '@/api/nonconformity/sample-manage';

  const { createMessage } = useMessage();

  const emit = defineEmits(['success', 'register']);

  const [registerLogin, { openModal }] = useModal();
  const [registerForm, { setFieldsValue, validate, resetFields }] = useForm({
    showActionButtonGroup: false,
    schemas: [
      {
        field: 'checker',
        label: '复核人',
        colProps: { span: 18 },
        component: 'InputSearch',
        componentProps: {
          'enter-button': '登录',
          placeholder: '请点击登录按钮',
          readonly: true,
          onSearch: handleLogin,
        },
        required: true,
      },
      {
        field: 'unqualifiedReasonCode',
        label: '不合格原因',
        component: 'ApiSelect',
        colProps: { span: 18 },
        componentProps: {
          api: getSysSecondaryDictionary,
          params: {
            dataKey: DictionaryEnum.PlasmaFailedItem,
            dictNos: [DictionaryItemKeyEnum.Sample],
          },
          valueField: 'dictItemId',
        },
        required: true,
      },
      {
        field: 'sampleNo',
        label: '样本编号',
        component: 'Input',
        colProps: { span: 18 },
        required: true,
      },
      {
        field: 'batchSampleNo',
        component: 'Input',
        show: false,
      },
    ],
  });

  const [register, { closeModal, setModalProps }] = useModalInner(async (data) => {
    await setFieldsValue({
      batchSampleNo: data.record.batchSampleNo,
    });
  });

  function handleLogin() {
    openModal(true);
  }

  function handleLoginSuccess(name: string) {
    setFieldsValue({
      checker: name,
    });
  }

  async function handleOk() {
    try {
      setModalProps({ confirmLoading: true });
      const values = await validate();
      await nonconformityPlasmaReceiveSampleRegister(
        values as PostApiCoreBatchSampleUnqualifiedPlasmaRequest,
      );

      createMessage.success('登记成功');
      emit('success');
      await resetFields();
      closeModal();
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
