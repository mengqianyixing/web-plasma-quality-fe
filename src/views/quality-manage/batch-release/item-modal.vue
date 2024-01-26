<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2024-01-19 14:20:15
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-24 19:59:52
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="title + '审核项'"
    width="400px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '@/components/Form';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { itemFormSchema } from './batch-release.data';
  import { message } from 'ant-design-vue';
  import { ref } from 'vue';

  const emit = defineEmits(['success', 'register', 'close']);

  let saveRow: Recordable | void;
  let saveAppNames: string[] = [];
  const title = ref('');
  const [registerForm, { validate, clearValidate, resetFields, setFieldsValue }] = useForm({
    labelWidth: 120,
    baseColProps: { span: 24 },
    schemas: itemFormSchema,
    showActionButtonGroup: false,
  });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(
    ({ row, isUpdate, appNames }) => {
      saveAppNames = appNames;
      if (isUpdate) {
        title.value = '编辑';
        setFieldsValue(row);
      } else {
        resetFields();
        title.value = '新增';
      }
      saveRow = row;
      clearValidate();
    },
  );
  async function handleSubmit() {
    const values = await validate();
    console.log(saveAppNames, values.appName);
    if (saveAppNames.some((_) => _ === values.appName)) return message.warning('检测项目已存在');
    setModalProps({ confirmLoading: true });
    setModalProps({ confirmLoading: false });
    closeModal();
    if (saveRow) {
      for (const key in values) {
        saveRow[key] = values[key];
      }
      emit('close', saveRow);
    } else {
      emit('success', values);
    }
  }
</script>
