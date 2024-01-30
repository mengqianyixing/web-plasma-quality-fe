<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    width="550px"
    @ok="handleSubmit"
    :destroyOnClose="true"
    :body-style="{ height: '80px' }"
  >
    <BasicForm @register="registerForm" @submit="handleSubmit" />
    <LoginModal @register="registerLoginModal" @success="handleLoginSuccess" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import LoginModal from '@/__components/ReviewLoginModal/index.vue';
  import { BagTrackMap, BagTrackValueEnum } from '@/enums/stockoutEnum';

  const emit = defineEmits(['success', 'register']);

  defineOptions({ name: 'NonconformityModal' });

  let prepareDetail = {
    bagNo: '',
    track: '',
  };
  const [registerForm, { setFieldsValue, validate, resetFields }] = useForm({
    layout: 'horizontal',
    labelWidth: 100,
    wrapperCol: {
      span: 15,
    },
    // rowProps: {
    //   justify: 'center',
    // },
    actionColOptions: { span: 30 },
    showActionButtonGroup: false,
    schemas: [
      {
        field: 'checker',
        component: 'InputSearch',
        label: '复核人',
        componentProps: {
          'enter-button': '登录',
          placeholder: '请点击登录按钮',
          readonly: true,
          onSearch: handleLogin,
        },
        colProps: { span: 20 },
        required: true,
      },
    ],
  });

  const [registerModal, { closeModal, setModalProps }] = useModalInner((data) => {
    prepareDetail = { ...data };
    setModalProps({
      maskClosable: false,
      title: `${prepareDetail.bagNo}为${BagTrackMap.get(
        prepareDetail.track as BagTrackValueEnum,
      )}血浆，请进行复核确认!`,
    });
  });
  const [registerLoginModal, { openModal: openLoginModal }] = useModal();
  async function handleSubmit() {
    try {
      await validate();
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
