<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
    width="500px"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { computed, ref, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { encodingSchemas } from './encoding.data';

  defineOptions({ name: 'StyleColumnModal' });

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(false);

  const [registerForm, { resetFields, validate, setFieldsValue }] = useForm({
    labelWidth: 120,
    baseColProps: { span: 48 },
    schemas: encodingSchemas,
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });

    isUpdate.value = !!data.isUpdate;

    setFieldsValue({
      ...data.record,
    });
  });

  const getTitle = computed(() => (unref(isUpdate) ? '' : '新增'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      emit('success', values);
      closeModal();
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
