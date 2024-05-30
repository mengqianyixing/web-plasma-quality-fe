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
  import { trayBoxListApi } from '@/api/tray/list';
  import { message, Modal } from 'ant-design-vue';
  import { bindVerifyBoxApi } from '@/api/tray/relocation';

  const emit = defineEmits(['register', 'close']);

  const [registerForm, { validate, setFieldsValue, getFieldsValue }] = useForm({
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
  });

  async function okFunction() {
    const values = await validate();
    const list = await trayBoxListApi({ trayNo: values.trayNo });

    if (list.length >= 24) {
      Modal.confirm({
        content: '托盘绑定已满24箱，继续绑定?',
        onOk: async () => {
          await submit();
        },
        onCancel: () => {
          Modal.destroyAll();
        },
      });
    } else {
      await submit();
    }
  }

  async function submit() {
    const { boxId, trayNo } = getFieldsValue();
    await bindVerifyBoxApi({ boxes: [boxId], trayNo, type: 'bind' });
    await setFieldsValue({ boxId: '', trayNo: '' });
    message.success('操作成功');
  }
</script>

<style scoped lang="less"></style>
