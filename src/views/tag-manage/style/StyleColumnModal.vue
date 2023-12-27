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
  import { editStyleFormSchema } from './style.data';
  import dayjs from 'dayjs';

  defineOptions({ name: 'StyleColumnModal' });

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(false);

  const [registerForm, { resetFields, validate, setFieldsValue }] = useForm({
    labelWidth: 170,
    baseColProps: { span: 48 },
    schemas: editStyleFormSchema,
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

  const getTitle = computed(() => (unref(isUpdate) ? '编辑样式' : '新增样式'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      if (!isUpdate.value) {
        values.key = dayjs().valueOf();
        emit('success', values, true);
      } else {
        emit('success', values, false);
      }
      closeModal();
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
