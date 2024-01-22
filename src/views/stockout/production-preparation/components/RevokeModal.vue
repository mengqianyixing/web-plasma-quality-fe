<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
    @close="resetFields"
    width="450px"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { FormSchema, BasicForm, useForm } from '@/components/Form';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';
  import { revokePick, revokeUnpick } from '@/api/stockout/production-preparation.js';

  const { createMessage } = useMessage();
  const { success } = createMessage;

  const emit = defineEmits(['success', 'register']);

  const isPicked = ref(true); // 是否已挑选
  const formSchema: FormSchema[] = [
    {
      field: 'prepareNo',
      label: '投产准备号',
      component: 'Input',
      colProps: { span: 24 },
      componentProps: { disabled: true },
    },
    {
      field: 'remark',
      component: 'InputTextArea',
      label: '取消原因',
      colProps: { span: 24 },
      required: true,
    },
  ];
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    labelWidth: 80,
    baseColProps: { span: 48 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isPicked.value = !!data?.isPicked;
    setFieldsValue({
      ...data.record,
    });
  });

  const getTitle = computed(() => (unref(isPicked) ? '撤销准备' : '撤销'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      if (isPicked.value) {
        await revokePick(values);
        success('撤销成功!');
      } else {
        await revokeUnpick(values);
        success('撤销成功!');
      }
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
