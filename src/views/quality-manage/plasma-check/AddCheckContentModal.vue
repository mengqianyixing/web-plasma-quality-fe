<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="getTitle"
    showFooter
    width="25%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { computed, ref, unref } from 'vue';
  import dayjs from 'dayjs';

  const isUpdate = ref(false);
  const emit = defineEmits(['success', 'register']);

  const [registerForm, { validate, setFieldsValue, resetFields }] = useForm({
    labelWidth: 120,
    schemas: [
      {
        field: 'auditItem',
        label: '审核项目',
        component: 'Input',
      },
      {
        field: 'auditContent',
        label: '审核内容',
        component: 'Input',
      },
      {
        field: 'auditResult',
        label: '审核结果',
        component: 'Input',
      },
    ],
    showActionButtonGroup: false,
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '编辑'));
  const [register, { setModalProps, closeModal }] = useModalInner((data) => {
    isUpdate.value = !!data.isUpdate;

    setModalProps({
      maskClosable: false,
    });

    if (unref(isUpdate)) {
      setFieldsValue(data.record);
    }
  });

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      const values = await validate();

      if (!isUpdate.value) {
        values.key = dayjs().valueOf();
      }
      emit('success', values, !unref(isUpdate));

      closeModal();
      await resetFields();
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
