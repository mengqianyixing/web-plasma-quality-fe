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
  import { inStoreSchema } from './manage.data';

  import LoginModal from '@/__components/ReviewLoginModal/index.vue';
  import { nonconformityInStore } from '@/api/nonconformity/plasma-manage';
  import { PostApiCoreBagUnqualifiedInStoreRequest } from '@/api/type/nonconformityManage';

  defineOptions({ name: 'PickPlasmaModal' });

  const { createMessage } = useMessage();
  const emit = defineEmits(['success', 'register']);

  const [registerLoginModal, { openModal }] = useModal();

  const [registerForm, { resetFields, validate, setFieldsValue }] = useForm({
    labelWidth: 120,
    baseColProps: { span: 48 },
    schemas: inStoreSchema,
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
      await nonconformityInStore(values as PostApiCoreBagUnqualifiedInStoreRequest);

      createMessage.success('入库成功');
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
