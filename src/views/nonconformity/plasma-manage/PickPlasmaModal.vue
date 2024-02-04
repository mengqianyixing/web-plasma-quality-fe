<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="挑浆"
    @ok="handleSubmit"
    width="430px"
  >
    <BasicForm @register="registerForm" />

    <LoginModal
      @register="registerLoginModal"
      @success="handleSuccess"
      :auth-code="ReCheckButtonEnum.NonconformityPickCheck"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { useMessage } from '@/hooks/web/useMessage';

  import { pickSchema } from './manage.data';
  import LoginModal from '@/__components/ReviewLoginModal/index.vue';
  import { nonconformityPick } from '@/api/nonconformity/plasma-manage';
  import { PostApiCoreBagUnqualifiedPickRequest } from '@/api/type/nonconformityManage';
  import { ReCheckButtonEnum } from '@/enums/authCodeEnum';

  const { createMessage } = useMessage();
  defineOptions({ name: 'PickPlasmaModal' });

  const emit = defineEmits(['success', 'register']);

  const [registerLoginModal, { openModal }] = useModal();

  const [registerForm, { resetFields, validate, setFieldsValue, updateSchema }] = useForm({
    labelWidth: 120,
    baseColProps: { span: 48 },
    schemas: pickSchema,
    showActionButtonGroup: false,
    transformDateFunc(date) {
      return date ? date.format('YYYY-MM-DD') : '';
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(() => {
    updateSchema({ field: 'reviewer', componentProps: { onSearch: handleLogin } });
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
