<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="state.type"
    width="400px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { formListSchema } from './requiredItem.data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { message } from 'ant-design-vue';
  import { addApi, getDtApi, updateApi } from '@/api/base-settings/requiredItem';

  const emit = defineEmits(['success', 'register']);
  defineOptions({ name: 'FormModel' });

  const state = reactive({ type: '', api: addApi });

  const [registerForm, { validate, setFieldsValue, clearValidate, resetFields, updateSchema }] =
    useForm({
      labelWidth: 120,
      baseColProps: { span: 24 },
      schemas: formListSchema,
      showActionButtonGroup: false,
    });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(
    async ({ sampleType, rawImm }) => {
      resetFields();
      state.api = addApi;
      state.type = '新增';
      if (sampleType) {
        state.type = '编辑';
        const res = await getDtApi({ sampleType, rawImm });
        setFieldsValue(res);
        state.api = updateApi;
      }
      updateSchema(
        formListSchema
          .slice(0, 2)
          .map((it) => ({ ...it, componentProps: { disabled: !!sampleType } })),
      );
      clearValidate();
    },
  );
  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      await state.api(values as any);
      message.success(state.type + '成功');
      setModalProps({ confirmLoading: false });
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
