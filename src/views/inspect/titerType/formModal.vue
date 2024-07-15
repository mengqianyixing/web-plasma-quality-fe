<!--
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-26 17:41:03
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-22 16:08:14
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="state.type"
    width="800px"
    :showOkBtn="state.type !== '查看'"
    cancelText="关闭"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formListSchema } from './titerType.data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import {
    getTitlerTypeDtApi,
    addTitlerTypeApi,
    updateTitlerTypeApi,
    getDecimalPlacesApi,
  } from '@/api/inspect/titerType';
  import { isNumber } from '@/utils/is';

  const emit = defineEmits(['success', 'register']);

  defineOptions({ name: 'FormModel' });
  const state = reactive({ dictItemId: '', type: '', isRequest: false, decimalPlaces: 1 });

  const [
    registerForm,
    {
      validate,
      setFieldsValue,
      clearValidate,
      resetFields,
      updateSchema,
      getFieldsValue,
      validateFields,
    },
  ] = useForm({
    labelWidth: 200,
    baseColProps: { flex: '0 1 440px' },
    actionColOptions: { flex: '0 1 300px' },
    schemas: formListSchema,
    showActionButtonGroup: false,
  });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(
    async ({ data, disabled }) => {
      state.dictItemId = data.dictItemId;

      const disabledOptions = formListSchema.map((_) => ({
        field: _.field,
        componentProps: { disabled: false },
      }));
      if (data.dictItemId) {
        const res = await getTitlerTypeDtApi({ dictItemId: data.dictItemId });
        setFieldsValue(res);
        state.type = '编辑';
        disabledOptions.slice(0, 3).forEach((_) => (_.componentProps.disabled = true));
        handlePlasmaTypeChange(res.plasmaType);
      } else {
        state.type = '新增';
        resetFields();
      }
      if (disabled) {
        state.type = '查看';
        disabledOptions.forEach((_) => (_.componentProps.disabled = true));
      }
      updateSchema(disabledOptions);
      updateSchema([
        {
          field: 'maxShow',
          rules: [{ validator: maxValidator }],
          componentProps: { onChange: () => validateFields(['minShow']) },
        },
        {
          field: 'minShow',
          rules: [{ validator: minValidator }],
          componentProps: { onChange: () => validateFields(['maxShow']) },
        },
        {
          field: 'plasmaType',
          componentProps: { onChange: handlePlasmaTypeChange },
        },
        {
          field: 'priority',
          componentProps: {
            step: 1,
            precision: 0,
          },
        },
      ]);
      clearValidate();
    },
  );
  function isValidNumber(input: string) {
    const regex = /^-?\d+(\.\d+)?$/;
    return regex.test(input);
  }
  function maxValidator(_, value: string) {
    const { minShow } = getFieldsValue();
    if (!value) return Promise.resolve();
    if (!isValidNumber(value)) return Promise.reject('请输入正确的数值');
    if (parseFloat(value) < 0) return Promise.reject('不能输入负数');
    if ((value.split('.')[1] || '').length !== state.decimalPlaces)
      return Promise.reject('请保留' + state.decimalPlaces + '位小数');
    if (!isValidNumber(minShow)) return Promise.resolve();
    if (parseFloat(minShow) > parseFloat(value)) return Promise.reject('最大值不能小于最小值');
    return Promise.resolve();
  }
  function minValidator(_, value: string) {
    const { maxShow } = getFieldsValue();
    if (!value) return Promise.resolve();
    if (!isValidNumber(value)) return Promise.reject('请输入正确的数值');
    if (parseFloat(value) < 0) return Promise.reject('不能输入负数');
    if ((value.split('.')[1] || '').length !== state.decimalPlaces)
      return Promise.reject('请保留' + state.decimalPlaces + '位小数');
    if (!isNumber(maxShow) || !isNumber(value)) return Promise.resolve();
    if (parseFloat(maxShow) < parseFloat(value)) return Promise.reject('最小值不能大于最大值');
    return Promise.resolve();
  }
  function handlePlasmaTypeChange(plasmaType) {
    getDecimalPlacesApi({ plasmaType }).then((res) => {
      console.log(res);
      state.decimalPlaces = res === null ? 1 : res;
    });
  }
  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      if (state.dictItemId) {
        await updateTitlerTypeApi({ ...values, dictItemId: state.dictItemId });
      } else {
        await addTitlerTypeApi({ ...values } as any);
      }
      setModalProps({ confirmLoading: false });
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
