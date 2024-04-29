<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="登记使用截止日期"
    width="400px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
    <Login
      @register="registerLoginModal"
      @success="login"
      :auth-code="ReCheckButtonEnum.MaterialPreRegistrationUpdateDateCheck"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  import { getDtApi, updateDateApi } from '@/api/inspect/materialPreRegistration';
  import { message } from 'ant-design-vue';
  import dayjs from 'dayjs';
  import Login from '@/__components/ReviewLoginModal/index.vue';
  import { ReCheckButtonEnum } from '@/enums/authCodeEnum';

  const emit = defineEmits(['success', 'register']);

  defineOptions({ name: 'DateFormModel' });
  const state = reactive({ id: '', expireDate: '' });

  const [registerLoginModal, { openModal: openLoginModal }] = useModal();
  const [registerForm, { validate, setFieldsValue, clearValidate, resetFields, updateSchema }] =
    useForm({
      labelWidth: 120,
      baseColProps: { span: 24 },
      schemas: [
        {
          field: 'deadline',
          component: 'DatePicker',
          label: '使用截至日期',
          defaultValue: dayjs().format('YYYY-MM-DD'),
          required: true,
          componentProps: {
            class: 'w-full',
            disabled: true,
          },
        },
        {
          field: 'deadlineReviewer',
          component: 'InputSearch',
          label: '复核人',
          required: true,
          componentProps: {
            'enter-button': '登录',
            placeholder: '请点击登录按钮',
            readonly: true,
            onSearch: () => {
              openLoginModal(true, {});
            },
          },
        },
      ],
      showActionButtonGroup: false,
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : '';
      },
    });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async ({ data }) => {
    resetFields();
    state.id = data.id;
    const res = await getDtApi({ id: data.id });
    setFieldsValue(res);
    state.expireDate = res.expireDate;
    updateSchema({ field: 'deadline', rules: [{ validator: validator }] });
    clearValidate();
  });
  function validator(rule, value) {
    const { expireDate } = state;
    if (!value || !expireDate) return Promise.resolve();
    if (dayjs(dayjs(value).format('YYYY-MM-DD')) > dayjs(expireDate)) {
      return Promise.reject('使用截止日期不能大于试剂有效期');
    }
    return Promise.resolve();
  }
  async function handleSubmit() {
    try {
      const { deadline, deadlineReviewer } = await validate();
      setModalProps({ confirmLoading: true });
      await updateDateApi({ deadline, id: state.id, deadlineReviewer });
      message.success('编辑成功');
      setModalProps({ confirmLoading: false });
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
  function login(userName, data) {
    setFieldsValue({ deadlineReviewer: data.username });
  }
</script>
