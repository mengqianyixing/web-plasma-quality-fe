<template>
  <BasicModal v-bind="$attrs" @register="registerModal" showFooter width="500px" @ok="handleSubmit">
    <BasicForm @register="registerForm">
      <template #check="{ model, field }">
        <a-input
          disabled
          placeholder="请点击登录按钮"
          v-model:value="model[field]"
          style="width: calc(100% - 80px)"
        />
        <a-button type="primary" @click="handleLogin" class="ml-3">登录</a-button>
      </template>
    </BasicForm>

    <LoginModal @register="registerLoginModal" @success="handleLoginSuccess" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { useMessage } from '@/hooks/web/useMessage';

  import LoginModal from './LoginModal.vue';
  import { revokeSampleVerify } from '@/api/inbound-management/sample-verify';
  import { PutApiCoreBatchSampleVerifyRevokeRequest } from '@/api/type/batchManage';
  import { ref } from 'vue';

  const emit = defineEmits(['success', 'register']);
  const { createMessage } = useMessage();

  defineOptions({ name: 'FormModel' });

  const [registerLoginModal, { openModal: openLoginModal }] = useModal();
  const [registerForm, { setFieldsValue, validate }] = useForm({
    layout: 'horizontal',
    labelWidth: 120,
    wrapperCol: {
      span: 15,
    },
    rowProps: {
      justify: 'center',
    },
    size: 'large',
    actionColOptions: { span: 30 },
    showActionButtonGroup: false,
    schemas: [
      {
        field: 'sampleNo',
        label: '样本编号',
        component: 'Input',
        colProps: { span: 20 },
        componentProps: {
          disabled: true,
        },
        required: true,
      },
      {
        field: 'checker',
        component: 'InputGroup',
        slot: 'check',
        label: '复核人',
        colProps: { span: 20 },
        required: true,
      },
      {
        field: 'revokeReason',
        label: '撤销原因',
        component: 'InputTextArea',
        colProps: { span: 20 },
        required: true,
      },
    ],
  });

  const batchSampleNo = ref('');
  const [registerModal, { closeModal, setModalProps }] = useModalInner((data) => {
    setModalProps({
      maskClosable: false,
    });
    batchSampleNo.value = data.record.batchSampleNo;
    setFieldsValue({
      sampleNo: data.record.sampleNo,
    });
  });
  async function handleSubmit() {
    const values = await validate();

    await revokeSampleVerify({
      ...values,
      batchSampleNo: batchSampleNo.value,
    } as PutApiCoreBatchSampleVerifyRevokeRequest);

    createMessage.success('撤销成功');

    closeModal();
    emit('success');
  }

  function handleLogin() {
    openLoginModal(true);
  }

  function handleLoginSuccess(username: string) {
    setFieldsValue({ checker: username });
  }
</script>
