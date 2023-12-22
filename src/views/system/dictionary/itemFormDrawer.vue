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
  import { itemFormSchema } from './dictionary.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
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
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(
    async ({ isUpdate, data }) => {
      setDrawerProps({ confirmLoading: false });
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
      setDrawerProps({ confirmLoading: true });
      if (state.isUpdate) {
        await updateDictItemApi({
          ...value,
          dictItemId: state.dictItemId,
          dataDictId: state.dictId,
        } as PutApiSysDictItemRequest);
      } else {
        await addDictItemApi({ ...value, dataDictId: state.dictId } as PostApiSysDictItemRequest);
      }
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
