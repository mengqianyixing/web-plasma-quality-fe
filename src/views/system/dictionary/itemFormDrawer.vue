<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-21 18:22:50
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-02-20 16:48:56
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
  import { FormSchema } from '@/components/Table';

  const emit = defineEmits(['success', 'register']);

  defineOptions({ name: 'FormModel' });

  const state = reactive({
    isUpdate: false,
    dictItemId: '',
    dictId: '',
  });
  let fields: string[] = [];

  const [
    registerForm,
    {
      validate,
      setFieldsValue,
      clearValidate,
      resetFields,
      appendSchemaByField,
      removeSchemaByField,
      updateSchema,
    },
  ] = useForm({
    labelWidth: 140,
    baseColProps: { span: 24 },
    schemas: itemFormSchema,
    showActionButtonGroup: false,
  });
  type Data = {
    isUpdate: boolean;
    data: Recordable;
    formSchema: FormSchema[];
  };
  const [registerModal, { setModalProps, closeModal }] = useModalInner(
    async ({ isUpdate, data, formSchema = [] }: Data) => {
      await removeSchemaByField(fields);
      fields = formSchema.map((_) => _.field);
      appendSchemaByField(formSchema, 'itemValue');
      setModalProps({ confirmLoading: false });
      state.isUpdate = isUpdate;
      state.dictItemId = data.dictItemId;
      state.dictId = data.dictId;
      updateSchema({ field: 'itemValue', componentProps: { disabled: !!isUpdate } });
      updateSchema({ field: 'enable' });
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
      const newFields = fields.reduce((t, c) => {
        t[c] = value[c];
        return t;
      }, Object.create(null));
      if (state.isUpdate) {
        await updateDictItemApi({
          ...value,
          dictItemId: state.dictItemId,
          dataDictId: state.dictId,
          newFields,
        } as PutApiSysDictItemRequest);
      } else {
        await addDictItemApi({
          ...value,
          dataDictId: state.dictId,
          newFields,
        } as PostApiSysDictItemRequest);
      }
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
