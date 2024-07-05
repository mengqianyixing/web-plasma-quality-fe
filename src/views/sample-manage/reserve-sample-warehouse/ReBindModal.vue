<template>
  <BasicModal
    @register="registerReBindModal"
    showFooter
    :title="'托盘重绑'"
    width="360px"
    @ok="okFunction"
    @cancel="emit('close')"
  >
    <BasicForm @register="registerForm" @submit="okFunction" />
  </BasicModal>
</template>

<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { message } from 'ant-design-vue';
  import { bindVerifyBoxApi } from '@/api/tray/relocation';

  const emit = defineEmits(['register', 'close']);

  const [registerForm, { setFieldsValue, getFieldsValue, resetFields }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: [
      { label: '托盘编号', component: 'Input', field: 'trayNo', required: true },
      { label: '箱号', component: 'Input', field: 'boxId', required: true },
    ],
    showActionButtonGroup: false,
    autoSubmitOnEnter: true,
  });

  const [registerReBindModal, { setModalProps }] = useModalInner(() => {
    setModalProps({ confirmLoading: false });
    resetFields();
  });

  async function okFunction() {
    await submit();
  }

  async function submit() {
    const { boxId, trayNo } = getFieldsValue();
    await bindVerifyBoxApi({ boxes: [boxId], trayNo, type: 'bind' });
    await setFieldsValue({ boxId: '', trayNo: '' });
    message.success('操作成功');
    await resetFields();
  }
</script>

<style scoped lang="less"></style>
