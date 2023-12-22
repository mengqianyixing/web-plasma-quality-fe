<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="state.id ? '编辑' : '新增'"
    width="300px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formListSchema } from './site.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { pushSiteForm } from '@/api/plasmaStore/site';

  const emit = defineEmits(['success', 'register']);

  defineOptions({ name: 'FormModel' });
  const state = reactive({ id: '' });

  const [registerForm, { validate, setFieldsValue, clearValidate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: formListSchema,
    showActionButtonGroup: false,
  });
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(({ data }) => {
    state.id = data.id;
    setFieldsValue(data);
    clearValidate();
  });

  async function handleSubmit() {
    try {
      const { siteNo, siteName, fkHouseNo, closed } = await validate();
      setDrawerProps({ confirmLoading: true });
      await pushSiteForm({ siteNo, siteName, fkHouseNo, closed, id: state.id });
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
