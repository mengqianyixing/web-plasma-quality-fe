<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
    width="500px"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { checkFormSchema } from './po.data';

  import { checkProOrder, reCheckProOrder } from '@/api/stockout/production-order';

  import {
    PostApiProductOrderCheckRequest,
    PostApiProductOrderReviewRequest,
  } from '@/api/type/productionOrder';

  defineOptions({ name: 'CheckModal' });

  const emit = defineEmits(['success', 'register']);

  const isReCheck = ref(true);
  const orderNo = ref('');

  const [registerForm, { resetFields, validate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 48 },
    schemas: checkFormSchema,
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields();
    setModalProps({ confirmLoading: false });
    isReCheck.value = !!data?.isReCheck;
    orderNo.value = data?.record?.orderNo;
  });

  const getTitle = computed(() => (!unref(isReCheck) ? '审核' : '复核'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      if (isReCheck.value) {
        await reCheckProOrder({
          ...values,
          orderNo: orderNo.value,
        } as PostApiProductOrderReviewRequest);
      } else {
        await checkProOrder({
          ...values,
          orderNo: orderNo.value,
        } as PostApiProductOrderCheckRequest);
      }
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
