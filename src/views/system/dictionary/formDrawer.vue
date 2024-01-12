<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-21 18:22:50
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-09 19:10:30
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="state.isUpdate ? '编辑' : '新增'"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './dictionary.data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { getDictDtApi, addDictApi, updateDictApi } from '@/api/dictionary';
  import { PostApiSysDictRequest, PutApiSysDictRequest } from '@/api/type/dictionary';
  import { reactive } from 'vue';

  const emit = defineEmits(['success', 'register']);

  defineOptions({ name: 'FormModel' });

  const state = reactive({
    isUpdate: false,
    dictId: '',
  });

  const [registerForm, { validate, setFieldsValue, clearValidate, resetFields, updateSchema }] =
    useForm({
      labelWidth: 90,
      baseColProps: { span: 24 },
      schemas: formSchema,
      showActionButtonGroup: false,
    });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(
    async ({ isUpdate, data }) => {
      setModalProps({ confirmLoading: false });
      state.isUpdate = isUpdate;
      state.dictId = data.dictId;
      updateSchema({ field: 'dictNo', componentProps: { disabled: !!isUpdate } });
      if (isUpdate) {
        const res = await getDictDtApi({ dictId: data.dictId });
        setFieldsValue(res);
      } else {
        resetFields();
      }
      clearValidate();
    },
  );

  async function handleSubmit() {
    try {
      const value = await validate();
      setModalProps({ confirmLoading: true });
      if (state.isUpdate) {
        await updateDictApi({ ...value, dictId: state.dictId } as PutApiSysDictRequest);
      } else {
        await addDictApi(value as PostApiSysDictRequest);
      }
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
