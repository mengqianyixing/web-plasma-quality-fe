<template>
  <BasicModal
    width="50%"
    :centered="false"
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { addFormSchema, updateFormSchema, passwordFormSchema } from './users.data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { addCasDoorUser, setCasDoorUserPwd, setCasDoorUser } from '@/api/oauth/users';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const isPassword = ref(false);
  const userId = ref('');

  const getFormSchema = computed(() =>
    unref(isPassword) ? passwordFormSchema : !unref(isUpdate) ? addFormSchema : updateFormSchema,
  );

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: getFormSchema,
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    isPassword.value = !!data?.isPassword;

    if (unref(isUpdate) || unref(isPassword)) {
      userId.value = data.record.name;
      // let res: any = [];
      // try {
      //   res = await getRoleDomainAuth({ name: data.record.name });
      // } catch (e) {
      //   res = [];
      // }
      setFieldsValue({
        // ...res,
        ...data.record,
        forbidden: data.record.isForbidden,
        oldName: data.record.name,
        userName: data.record.name,
      });
    }
  });

  const getTitle = computed(() =>
    unref(isPassword) ? '重置密码' : !unref(isUpdate) ? '新增用户' : '编辑用户',
  );

  async function handleSubmit() {
    try {
      const values = await validate();
      // loading
      setModalProps({ confirmLoading: true });
      try {
        if (unref(isPassword)) {
          await setCasDoorUserPwd({
            ...values,
          });
        } else if (unref(isUpdate)) {
          await setCasDoorUser({
            ...values,
            oldName: userId.value,
          });
        } else {
          await addCasDoorUser({
            ...values,
          });
        }
      } catch (e) {
        console.log(e);
      }
      setModalProps({ confirmLoading: false });
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
