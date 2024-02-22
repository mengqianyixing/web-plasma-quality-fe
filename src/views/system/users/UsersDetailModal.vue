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
  import { ref, computed } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { userDetailFormSchema } from './users.data';
  import { BasicModal, useModalInner } from '@/components/Modal';

  // const emit = defineEmits(['success', 'register']);
  const userId = ref('');

  const [registerForm, { resetFields, setFieldsValue }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: userDetailFormSchema,
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    userId.value = data.record.name;
    console.log({ data });
    setFieldsValue({
      ...data.record,
      forbidden: data.record.isForbidden,
      oldName: data.record.name,
      userName: data.record.name,
    });
  });

  const getTitle = computed(() => '用户详情');

  async function handleSubmit() {
    // loading
    closeModal();
  }
</script>
