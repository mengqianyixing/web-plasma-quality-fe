<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-21 18:22:50
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-27 16:59:17
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
  import { itemFormSchema } from './dictionary.data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { reactive } from 'vue';
  import { getDictItemDtApi, addDictItemApi, updateDictItemApi } from '@/api/dictionary';
  import { PostApiSysDictItemRequest, PutApiSysDictItemRequest } from '@/api/type/dictionary';

  const emit = defineEmits(['success', 'register']);

  defineOptions({ name: 'FormModel' });

  const state = reactive({
    isUpdate: false,
    dictItemId: '',
    dictId: '',
  });

  const [registerForm, { validate, setFieldsValue, clearValidate, resetFields }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: itemFormSchema,
    showActionButtonGroup: false,
  });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(
    async ({ isUpdate, data }) => {
      setModalProps({ confirmLoading: false });
      state.isUpdate = isUpdate;
      state.dictItemId = data.dictItemId;
      state.dictId = data.dictId;
      if (isUpdate) {
        const res = await getDictItemDtApi({ dictItemId: data.dictItemId });
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
        await updateDictItemApi({
          ...value,
          dictItemId: state.dictItemId,
          dataDictId: state.dictId,
        } as PutApiSysDictItemRequest);
      } else {
        await addDictItemApi({ ...value, dataDictId: state.dictId } as PostApiSysDictItemRequest);
      }
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
