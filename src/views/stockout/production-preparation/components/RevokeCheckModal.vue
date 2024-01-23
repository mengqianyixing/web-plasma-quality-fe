<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="撤销复核"
    @ok="handleSubmit"
    @close="resetFields"
    width="450px"
  >
    <BasicForm @register="registerForm">
      <!-- <template #check="{ model, field }">
        <a-input
          disabled
          placeholder="请点击登录"
          v-model:value="model[field]"
          style="width: calc(100% - 80px)"
        />
        <a-button type="primary" @click="handleLogin" class="ml-3">登录</a-button>
      </template> -->
    </BasicForm>
  </BasicModal>
  <!-- <LoginModal @register="registerLoginModal" @success="handleSuccess" /> -->
</template>
<script lang="ts" setup>
  import { FormSchema, BasicForm, useForm } from '@/components/Form';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';
  import { revokeCheckPrepare } from '@/api/stockout/production-preparation.js';
  // import LoginModal from '@/__components/ReviewLoginModal/index.vue';

  const { createMessage } = useMessage();
  const { success } = createMessage;

  const emit = defineEmits(['success']);

  const formSchema: FormSchema[] = [
    {
      field: 'prepareNo',
      label: '投产准备号',
      component: 'Input',
      colProps: { span: 24 },
      componentProps: { disabled: true },
    },
    // {
    //   field: 'checker',
    //   component: 'InputGroup',
    //   slot: 'check',
    //   label: '复核人',
    //   colProps: { span: 24 },
    //   required: true,
    // },
    {
      field: 'remark',
      component: 'InputTextArea',
      label: '原因',
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
    setFieldsValue({
      ...data.record,
    });
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      await revokeCheckPrepare(values);
      success('撤销成功!');
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

  // const [registerLoginModal, { openModal }] = useModal();

  // // 点击登录按钮
  // function handleLogin() {
  //   openModal(true);
  // }

  // // 登录成功事件
  // function handleSuccess(nickname: string) {
  //   setFieldsValue({
  //     checker: nickname,
  //   });
  // }
</script>
