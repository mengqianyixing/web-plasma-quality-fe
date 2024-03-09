<!--
 * @Author: chiyifan chiyf@stpass.com
 * @Date: 2024-03-09 15:56:23
 * @LastEditors: chiyifan chiyf@stpass.com
 * @LastEditTime: 2024-03-09 16:58:25
 * @FilePath: \psms-fe\src\views\stockout\production-sorting\components\unqualified-modal.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
    <LoginModal
      @register="registerLoginModal"
      @success="handleLoginSuccess"
      :auth-code="ReCheckButtonEnum.ProductionSortingReCheck"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import LoginModal from '@/__components/ReviewLoginModal/index.vue';
  import { ReCheckButtonEnum } from '@/enums/authCodeEnum';

  const emit = defineEmits(['success', 'register']);

  defineOptions({ name: 'NonconformityModal' });

  let prepareDetail = {
    bagNo: '',
    unqReason: '',
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
      title: `${prepareDetail.bagNo}为${prepareDetail.unqReason}血浆，请进行复核确认!`,
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
