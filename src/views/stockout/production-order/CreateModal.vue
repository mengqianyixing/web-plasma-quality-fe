<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
    width="700px"
  >
    <BasicForm @register="registerForm">
      <template #orderWeight>
        <a-input-number :min="0" @change="handleNumberInput" :value="orderWeightValue" />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { formSchema } from './po.data';
  import { InputNumber } from 'ant-design-vue';

  import { addProOrder, editProOrder } from '@/api/stockout/production-order';
  import {
    PostApiProductOrderRequest,
    PutApiProductOrderRequest,
  } from '@/api/type/productionOrder';

  const AInputNumber = InputNumber;
  defineOptions({ name: 'DeptModal' });

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const orderNo = ref('');
  const [registerForm, { resetFields, setFieldsValue, validate, validateFields }] = useForm({
    labelWidth: 120,
    baseColProps: { span: 48 },
    schemas: formSchema,
    showActionButtonGroup: false,
    transformDateFunc(date) {
      return date ? date.format('YYYY-MM-DD') : '';
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    orderNo.value = data?.record?.orderNo;

    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record,
      });
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增生产指令' : '编辑生产指令'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      if (isUpdate.value) {
        await editProOrder({ ...values, orderNo: orderNo.value } as PutApiProductOrderRequest);
      } else {
        await addProOrder(values as PostApiProductOrderRequest);
      }
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

  const orderWeightValue = ref('');
  async function handleNumberInput(value: string | number) {
    if (!value) await validateFields(['orderWeight']);
    orderWeightValue.value = value ? Number(value).toFixed(2) : '';
    setFieldsValue({ orderWeight: orderWeightValue.value ? Number(orderWeightValue.value) : '' });
  }
</script>
