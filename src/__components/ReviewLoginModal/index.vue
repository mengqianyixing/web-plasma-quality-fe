<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="复核人登录"
    @ok="handleSubmit"
    ok-text="登录"
    cancel-text="关闭"
    width="500px"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './modal.data';
  import { reCheckLogin } from '@/api/sys/login';
  import { PostApiSysReviewerCasdoorLoginRequest } from '@/api/type/login';
  import { ReCheckButtonEnum } from '@/enums/authCodeEnum';

  defineOptions({ name: 'LoginModal' });
  const props = withDefaults(
    defineProps<{
      authCode: ReCheckButtonEnum;
    }>(),
    {
      authCode: ReCheckButtonEnum.ResultRegistrationCheck,
    },
  );

  const emit = defineEmits(['success', 'register']);

  const [registerForm, { resetFields, validate, clearValidate }] = useForm({
    labelWidth: 100,
    layout: 'horizontal',
    size: 'large',
    baseColProps: { span: 48 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async () => {
    await resetFields();
    await clearValidate();
    setModalProps({ confirmLoading: false });
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      const loginRes = await reCheckLogin({
        ...values,
        buttonId: props.authCode,
      } as PostApiSysReviewerCasdoorLoginRequest);
      setModalProps({ confirmLoading: true });
      closeModal();
      emit('success', loginRes.username, loginRes);
      await resetFields();
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
