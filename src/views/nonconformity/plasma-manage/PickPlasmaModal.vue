<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="挑浆"
    @ok="handleSubmit"
    width="430px"
  >
    <BasicForm @register="registerForm">
      <template #check="{ model, field }">
        <a-input
          disabled
          placeholder="请点击登录按钮"
          v-model:value="model[field]"
          style="width: calc(100% - 80px)"
        />
        <a-button type="primary" @click="handleLogin" class="ml-3">登录</a-button>
      </template>
    </BasicForm>

    <LoginModal @register="registerLoginModal" @success="handleSuccess" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { useMessage } from '@/hooks/web/useMessage';

  import { pickSchema } from './manage.data';
  import LoginModal from '@/__components/ReviewLoginModal/index.vue';
  import { nonconformityPick } from '@/api/nonconformity/plasma-manage';
  import { PostApiCoreBagUnqualifiedPickRequest } from '@/api/type/nonconformityManage';

  const { createMessage } = useMessage();
  defineOptions({ name: 'PickPlasmaModal' });

  const emit = defineEmits(['success', 'register']);

  const [registerLoginModal, { openModal }] = useModal();

  const [registerForm, { resetFields, validate, setFieldsValue }] = useForm({
    labelWidth: 120,
    baseColProps: { span: 48 },
    schemas: pickSchema,
    showActionButtonGroup: false,
    transformDateFunc(date) {
      return date ? date.format('YYYY-MM-DD') : '';
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(() => {
    resetFields();
    setModalProps({ confirmLoading: false });
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      await nonconformityPick(values as PostApiCoreBagUnqualifiedPickRequest);

      createMessage.success('挑浆成功');
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

  function handleLogin() {
    openModal(true);
  }

  function handleSuccess(nickname: string) {
    setFieldsValue({ reviewer: nickname });
  }
</script>
