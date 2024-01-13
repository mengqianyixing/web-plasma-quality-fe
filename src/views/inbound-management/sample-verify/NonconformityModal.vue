<template>
  <BasicModal v-bind="$attrs" @register="registerModal" showFooter width="500px" @ok="handleSubmit">
    <BasicForm @register="registerForm" @submit="handleSubmit">
      <template #check="{ model, field }">
        <a-input
          disabled
          placeholder="请点击登录按钮"
          v-model:value="model[field]"
          style="width: calc(100% - 80px)"
        />
        <a-button type="primary" @click="handleLogin" class="ml-2">登录</a-button>
      </template>
    </BasicForm>

    <LoginModal @register="registerLoginModal" @success="handleLoginSuccess" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { useMessage } from '@/hooks/web/useMessage';

  import LoginModal from './LoginModal.vue';
  import { registerNonconformity } from '@/api/inbound-management/sample-verify';
  import { PostApiCoreBatchSampleUnqualifiedRequest } from '@/api/type/batchManage';
  import { nonconformityReasonEnum } from '@/enums/sampleEnum';

  const emit = defineEmits(['success', 'register']);
  const { createMessage } = useMessage();

  defineOptions({ name: 'NonconformityModal' });

  const [registerForm, { setFieldsValue, updateSchema, validate, resetFields }] = useForm({
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
        field: 'checker',
        component: 'InputGroup',
        slot: 'check',
        label: '复核人',
        colProps: { span: 20 },
        required: true,
      },
      {
        field: 'unqualifiedReasonCode',
        label: '不合格原因',
        component: 'Select',
        colProps: { span: 20 },
        required: true,
      },
      {
        field: 'sampleNo',
        label: '样本编号',
        component: 'Input',
        colProps: { span: 20 },
        required: true,
      },
    ],
  });

  const modalParams = reactive({
    verifyNo: '',
    batchSampleNo: '',
  });

  const [registerModal, { closeModal, setModalProps }] = useModalInner((data) => {
    setModalProps({
      maskClosable: false,
    });
    modalParams.verifyNo = data.record.verifyNo;
    modalParams.batchSampleNo = data.record.batchSampleNo;
    updateSchema({
      field: 'unqualifiedReasonCode',
      componentProps: {
        options: data.record.options.filter(
          (it) => it.label !== nonconformityReasonEnum.DonorNonConformance,
        ),
      },
    });
  });
  const [registerLoginModal, { openModal: openLoginModal }] = useModal();
  async function handleSubmit() {
    try {
      const values = await validate();

      await registerNonconformity({
        ...values,
        verifyNo: modalParams.verifyNo,
        batchSampleNo: modalParams.batchSampleNo,
      } as PostApiCoreBatchSampleUnqualifiedRequest);

      createMessage.success('登记成功');
      emit('success');
      await resetFields();
      closeModal();
    } catch (e) {
      console.log(e);
    }
  }

  function handleLogin() {
    openLoginModal(true);
  }

  function handleLoginSuccess(username) {
    setFieldsValue({ checker: username });
  }
</script>
