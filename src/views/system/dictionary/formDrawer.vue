<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-21 18:22:50
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-09 19:10:30
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="state.isUpdate ? '编辑' : '新增'"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './dictionary.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
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
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(
    async ({ isUpdate, data }) => {
      setDrawerProps({ confirmLoading: false });
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
      setDrawerProps({ confirmLoading: true });
      if (state.isUpdate) {
        await updateDictApi({ ...value, dictId: state.dictId } as PutApiSysDictRequest);
      } else {
        await addDictApi(value as PostApiSysDictRequest);
      }
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
