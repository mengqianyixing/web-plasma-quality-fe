<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="不合格血浆登记"
    width="500px"
    :maskClosable="false"
    @ok="handleOk"
  >
    <Basic-form @register="registerForm">
      <template #check="{ model, field }">
        <a-input
          disabled
          placeholder="请点击登录按钮"
          v-model:value="model[field]"
          style="width: calc(100% - 80px)"
        />
        <a-button type="primary" @click="handleLogin" size="large" class="ml-3">登录</a-button>
      </template>
    </Basic-form>
  </BasicModal>

  <LoginModal @register="registerLogin" @success="handleLoginSuccess" />
</template>
<script lang="ts" setup>
  import { BasicModal, useModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { useMessage } from '@/hooks/web/useMessage';
  import LoginModal from '@/__components/ReviewLoginModal/index.vue';
  import { nonconformityRegistration } from '@/api/nonconformity/box-manage';
  import { PostApiCoreBagUnqualifiedRequest } from '@/api/type/nonconformityManage';
  import { DictionaryEnum, getSysDictionary } from '@/api/_dictionary';

  const { createMessage } = useMessage();
  const emit = defineEmits(['success', 'register']);

  const [registerLogin, { openModal }] = useModal();
  const [registerForm, { setFieldsValue, validate }] = useForm({
    showActionButtonGroup: false,
    schemas: [
      {
        field: 'checker',
        label: '复核人',
        component: 'Input',
        slot: 'check',
        required: true,
      },
      {
        field: 'fkFailedCode',
        label: '不合格原因',
        component: 'ApiSelect',
        colProps: { span: 18 },
        componentProps: {
          api: getSysDictionary,
          params: [DictionaryEnum.PlasmaUnqualifiedReason],
          resultField: '[0].dictImtes',
          labelField: 'label',
          valueField: 'value',
        },
        required: true,
      },
      {
        field: 'fkBagNo',
        label: '血浆编号',
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
    ],
  });

  const [register, { closeModal, setModalProps }] = useModalInner();

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
      await nonconformityRegistration(values as PostApiCoreBagUnqualifiedRequest);

      createMessage.success('登记成功');
      emit('success');
      closeModal();
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
