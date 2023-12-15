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
  import { computed, ref, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { checkFormSchema } from './po.data';

  import { cancelCheckProOrder, cancelReCheckProOrder } from '@/api/stockout/production-order';

  import {
    PutApiProductOrderCheckRequest,
    PutApiProductOrderReviewRequest,
  } from '@/api/type/productionOrder';
  import { auditResultValueEnum } from '@/enums/stockoutEnum';

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

  const getTitle = computed(() => (!unref(isReCheck) ? '取消审核' : '取消复核'));

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      if (isReCheck.value) {
        await cancelReCheckProOrder({
          ...values,
          orderNo: orderNo.value,
          result: auditResultValueEnum.PA,
        } as PutApiProductOrderReviewRequest);
      } else {
        await cancelCheckProOrder({
          ...values,
          orderNo: orderNo.value,
          result: auditResultValueEnum.PA,
        } as PutApiProductOrderCheckRequest);
      }
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
