<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="state.type + '检验项目'"
    width="800px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { BasicForm, FormSchema, useForm } from '@/components/Form';
  import { formListSchema } from './itemSetting.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import {
    getItemSettingDtApi,
    addItemSettingApi,
    updateItemSettingApi,
  } from '@/api/inspect/itemSetting';
  import { getDictItemListByNoApi } from '@/api/dictionary';

  const emit = defineEmits(['success', 'register']);

  defineOptions({ name: 'FormModel' });
  const state = reactive({ projectId: '', type: '', isRequest: false });

  const [registerForm, { validate, setFieldsValue, clearValidate, resetFields, updateSchema }] =
    useForm({
      labelWidth: 120,
      baseColProps: { span: 12 },
      schemas: formListSchema,
      showActionButtonGroup: false,
    });
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(
    async ({ data, disabled }) => {
      state.projectId = data.projectId;
      if (state.isRequest === false) {
        state.isRequest = true;
        const list = formListSchema.filter((_: FormSchema & any) => {
          return (
            _.componentProps && _.componentProps.options && _.componentProps.options.length === 0
          );
        });
        getDict(list.map((_) => _.field));
      }
      formListSchema.forEach((_) => {
        updateSchema({ field: _.field, componentProps: { disabled: !!disabled } });
      });
      if (data.projectId) {
        const res = await getItemSettingDtApi({ id: data.projectId });
        setFieldsValue(res);
        state.type = '编辑';
      } else if (disabled) {
        state.type = '查看';
      } else {
        state.type = '新增';
        resetFields();
      }
      clearValidate();
    },
  );
  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      if (state.projectId) {
        await updateItemSettingApi({ ...values, projectId: state.projectId });
      } else {
        await addItemSettingApi({ ...values } as any);
      }
      setDrawerProps({ confirmLoading: false });
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
  async function getDict(dictNos: string[]) {
    const res = await getDictItemListByNoApi(dictNos);
    const list = res.map((_) => ({ field: _.dictNo, componentProps: { options: _.dictImtes } }));
    updateSchema(list);
    // updateSchema({ field: dictNo, componentProps: { options: res } })
  }
</script>
