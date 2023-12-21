<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="state.isUpdate ? '新增' : '编辑'"
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
  import { addHouseApi } from '@/api/plasmaStore/setting';
  import { reactive } from 'vue';

  const emit = defineEmits(['success', 'register']);

  defineOptions({ name: 'FormModel' });

  const state = reactive({
    isUpdate: false,
  });

  const [registerForm, { validate, setFieldsValue, clearValidate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: itemFormSchema,
    showActionButtonGroup: false,
  });
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(({ isUpdate }) => {
    state.isUpdate = isUpdate;
    setDrawerProps({ confirmLoading: false });
    setFieldsValue({});
    clearValidate();
  });

  async function handleSubmit() {
    try {
      const value = await validate();
      setDrawerProps({ confirmLoading: true });
      await addHouseApi(value);
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
