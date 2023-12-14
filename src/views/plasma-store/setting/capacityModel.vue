<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="扩容"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '@/components/Form';
  import { capacitySchema } from './setting.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { addCapacityApi } from '@/api/plasmaStore/setting';
  import { reactive } from 'vue';

  const emit = defineEmits(['success', 'register']);
  defineOptions({ name: 'CapacityModel' });
  const state = reactive({
    houseNo: '',
  });

  const [registerForm, { resetFields, validate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: [capacitySchema],
    showActionButtonGroup: false,
  });

  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(({ houseNo }) => {
    state.houseNo = houseNo;
    resetFields();
    setDrawerProps({ confirmLoading: false });
  });

  async function handleSubmit() {
    try {
      const { capacity } = await validate();
      setDrawerProps({ confirmLoading: true });
      await addCapacityApi({ expansion: capacity, houseNo: state.houseNo });
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
