<template>
  <BasicModal
    width="50%"
    :centered="false"
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './plasma-batch.data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { addPlasmaBatchRelease, setPlasmaBatchRelease } from '@/api/quarantine/plasma-batch';

  const emit = defineEmits(['success', 'register']);
  const isUpdate = ref(true);
  const userId = ref('');

  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;

    if (unref(isUpdate)) {
      userId.value = data.record.name;
      setFieldsValue({
        ...data.record,
      });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增' : '修改'));

  async function handleSubmit() {
    try {
      const values = await validate();
      // loading
      setModalProps({ confirmLoading: true });
      try {
        if (unref(isUpdate)) {
          await setPlasmaBatchRelease({
            ...values,
          });
        } else {
          await addPlasmaBatchRelease({
            ...values,
          });
        }
      } catch (e) {
        console.log(e);
      }
      setModalProps({ confirmLoading: false });
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
