<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-26 17:41:03
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-28 11:14:30
-->
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
  </BasicModal>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formListSchema } from './materialPreRegistration.data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { getDtApi, updateDateApi } from '@/api/inspect/materialPreRegistration';
  import { message } from 'ant-design-vue';
  import dayjs from 'dayjs';

  const emit = defineEmits(['success', 'register']);

  defineOptions({ name: 'DateFormModel' });
  const state = reactive({ id: '', expireDate: '' });

  const [registerForm, { validate, setFieldsValue, clearValidate, resetFields, updateSchema }] =
    useForm({
      labelWidth: 120,
      baseColProps: { span: 24 },
      schemas: formListSchema.slice(-1).map((schema) => ({ ...schema, required: true })),
      showActionButtonGroup: false,
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : '';
      },
    });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async ({ data }) => {
    resetFields();
    clearValidate();
    state.id = data.id;
    const res = await getDtApi({ id: data.id });
    setFieldsValue(res);
    state.expireDate = res.expireDate;
    updateSchema({ field: 'deadline', rules: [{ validator: validator }] });
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
      const { deadline } = await validate();
      setModalProps({ confirmLoading: true });
      await updateDateApi({ deadline, id: state.id });
      message.success('编辑成功');
      setModalProps({ confirmLoading: false });
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
