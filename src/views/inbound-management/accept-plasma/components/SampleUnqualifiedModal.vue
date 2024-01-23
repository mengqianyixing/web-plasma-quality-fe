<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="不合格样本登记"
    width="500px"
    :maskClosable="false"
    @ok="handleOk"
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
  import { DictionaryEnum, getSysDictionary } from '@/api/_dictionary';
  import { registerNonconformity } from '@/api/inbound-management/sample-verify';
  import { PostApiCoreBatchSampleUnqualifiedRequest } from '@/api/type/batchManage';

  const { createMessage } = useMessage();

  const emit = defineEmits(['success', 'register']);

  const [registerLogin, { openModal }] = useModal();
  const [registerForm, { setFieldsValue, validate }] = useForm({
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
        field: 'fkFailedCode',
        label: '不合格原因',
        component: 'ApiSelect',
        colProps: { span: 18 },
        componentProps: {
          api: getSysDictionary,
          params: [DictionaryEnum.SampleUnqualifiedReason],
          resultField: '[0].dictImtes',
          labelField: 'label',
          valueField: 'value',
        },
        required: true,
      },
      {
        field: 'fkBagNo',
        label: '样本编号',
        component: 'Input',
        colProps: { span: 18 },
        required: true,
      },
      {
        field: 'pageFlag',
        defaultValue: 'verify',
        component: 'Input',
        show: false,
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
      await registerNonconformity(values as PostApiCoreBatchSampleUnqualifiedRequest);

      createMessage.success('登记成功');
      emit('success');
      closeModal();
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
