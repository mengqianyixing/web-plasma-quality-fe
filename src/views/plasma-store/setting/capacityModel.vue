<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="扩容"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '@/components/Form';
  import { capacitySchema } from './setting.data';
  import { BasicModal, useModalInner } from '@/components/Modal';
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

  const [registerModal, { setModalProps, closeModal }] = useModalInner(({ houseNo }) => {
    state.houseNo = houseNo;
    resetFields();
    setModalProps({ confirmLoading: false });
  });

  async function handleSubmit() {
    try {
      const { capacity } = await validate();
      setModalProps({ confirmLoading: true });
      await addCapacityApi({ expansion: capacity, houseNo: state.houseNo });
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
