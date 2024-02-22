<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-26 17:41:03
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-28 11:14:30
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="state.type"
    width="800px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formListSchema } from './materialPreRegistration.data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { addFormApi, updateFormApi, getDtApi } from '@/api/inspect/materialPreRegistration';
  import { message } from 'ant-design-vue';

  const emit = defineEmits(['success', 'register']);

  defineOptions({ name: 'FormModel' });
  const state = reactive({ id: '', type: '' });

  const [registerForm, { validate, setFieldsValue, clearValidate, resetFields, updateSchema }] =
    useForm({
      labelWidth: 120,
      baseColProps: { span: 12 },
      schemas: formListSchema,
      showActionButtonGroup: false,
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : '';
      },
    });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async ({ data }) => {
    resetFields();
    clearValidate();
    state.type = '新增';
    state.id = data.id;
    if (data.id) {
      const res = await getDtApi({ id: data.id });
      setFieldsValue(res);
      state.type = '编辑';
    }
    updateSchema({ field: 'fkProjectId', componentProps: { disabled: !!data.id } });
  });
  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      if (state.id) {
        await updateFormApi({ ...values, id: state.id });
        message.success('编辑成功');
      } else {
        message.success('新增成功');
        await addFormApi({ ...values } as any);
      }
      setModalProps({ confirmLoading: false });
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
