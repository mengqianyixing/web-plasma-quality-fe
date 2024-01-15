<template>
  <BasicModal
    title="切换打印地址"
    v-bind="$attrs"
    @register="register"
    @ok="handelSubmit"
    @cancel="handelCancel"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { useAppStore } from '@/store/modules/app';
  import type { ApiAddress } from '#/store';

  const appStore = useAppStore();
  const [register, { closeModal }] = useModalInner(async () => {
    initData();
  });
  const [registerForm, { validateFields, setFieldsValue }] = useForm({
    showActionButtonGroup: false,
    schemas: [
      {
        field: 'printUrl',
        label: '打印地址',
        colProps: {
          span: 24,
        },
        required: true,
        component: 'Input',
      },
    ],
  });
  const handelSubmit = async () => {
    const values = await validateFields();
    appStore.setPrintApiAddress({
      key: values.printUrl,
      val: values.printUrl,
    });
    location.reload();
  };
  const handelCancel = () => {
    closeModal();
  };
  const initData = () => {
    const { key = '' } = appStore.getPrintApiAddress as ApiAddress;
    if (key) {
      setFieldsValue({
        printUrl: key,
      });
    }
  };
</script>
