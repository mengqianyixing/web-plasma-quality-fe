<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-26 14:31:37
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-09 19:58:40
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="state.type + '检验项目'"
    width="800px"
    :showOkBtn="state.type !== '查看'"
    cancelText="关闭"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formListSchema } from './itemSetting.data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import {
    getItemSettingDtApi,
    addItemSettingApi,
    updateItemSettingApi,
  } from '@/api/inspect/itemSetting';

  const emit = defineEmits(['success', 'register']);

  defineOptions({ name: 'FormModel' });
  const state = reactive({ projectId: '', type: '', isRequest: false });

  const [registerForm, { validate, setFieldsValue, clearValidate, resetFields, updateSchema }] =
    useForm({
      labelWidth: 130,
      baseColProps: { span: 12 },
      schemas: formListSchema,
      showActionButtonGroup: false,
    });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(
    async ({ data, disabled }) => {
      state.projectId = data.projectId;

      const disabledOptions = formListSchema.map((_) => ({
        field: _.field,
        componentProps: { disabled: false },
      }));
      if (disabled) {
        const res = await getItemSettingDtApi({ id: data.projectId });
        setFieldsValue(res);
        state.type = '查看';
        disabledOptions.forEach((_) => (_.componentProps.disabled = true));
      } else if (data.projectId) {
        state.type = '编辑';
        disabledOptions.slice(0, 2).forEach((_) => (_.componentProps.disabled = true));
        const res = await getItemSettingDtApi({ id: data.projectId });
        setFieldsValue(res);
      } else {
        state.type = '新增';
        resetFields();
      }
      updateSchema(disabledOptions);
      clearValidate();
    },
  );
  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      if (state.projectId) {
        await updateItemSettingApi({ ...values, projectId: state.projectId });
      } else {
        await addItemSettingApi({ ...values } as any);
      }
      setModalProps({ confirmLoading: false });
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
