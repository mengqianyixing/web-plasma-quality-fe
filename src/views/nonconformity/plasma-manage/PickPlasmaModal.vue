<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="挑浆"
    @ok="handleSubmit"
    @cancel="handelCancel"
    width="430px"
  >
    <BasicForm @register="registerForm" />

    <LoginModal
      @register="registerLoginModal"
      @success="handleSuccess"
      :auth-code="ReCheckButtonEnum.NonconformityPickCheck"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { useMessage } from '@/hooks/web/useMessage';

  import { pickSchema } from './manage.data';
  import LoginModal from '@/__components/ReviewLoginModal/index.vue';
  import { nonconformityPick } from '@/api/nonconformity/plasma-manage';
  import { PostApiCoreBagUnqualifiedPickRequest } from '@/api/type/nonconformityManage';
  import { ReCheckButtonEnum } from '@/enums/authCodeEnum';
  import { useScanHelper } from '@/hooks/common/useScanHelper';
  import { watch } from 'vue';
  import { RemoveEventFn } from '@/hooks/event/useEventListener';

  const { createMessage } = useMessage();

  defineOptions({ name: 'PickPlasmaModal' });

  const { barCode, enterFlag, startEvent } = useScanHelper();

  watch(
    () => [barCode.value, enterFlag.value],
    (val) => {
      if (val[0] && val[1]) {
        setFieldsValue({ bagNo: val[0] });
        handleSubmit();
      }
    },
  );

  const emit = defineEmits(['success', 'register']);

  const [registerLoginModal, { openModal }] = useModal();

  const [registerForm, { resetFields, validate, setFieldsValue, updateSchema }] = useForm({
    labelWidth: 130,
    baseColProps: { span: 48 },
    schemas: pickSchema,
    showActionButtonGroup: false,
    transformDateFunc(date) {
      return date ? date.format('YYYY-MM-DD') : '';
    },
  });

  let _removeEvent: RemoveEventFn = () => {};
  const [registerModal, { setModalProps }] = useModalInner(() => {
    const { removeEvent } = startEvent();
    _removeEvent = removeEvent;
    updateSchema([
      { field: 'reviewer', componentProps: { onSearch: handleLogin } },
      { field: 'bagNo', componentProps: { onPressEnter: handleSubmit } },
    ]);
    resetFields();
    setModalProps({ confirmLoading: false });
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      await nonconformityPick(values as PostApiCoreBagUnqualifiedPickRequest);

      createMessage.success('挑浆成功');
      await setFieldsValue({ bagNo: '' });
    } catch (e) {
      enterFlag.value = false;
      throw e;
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

  function handleLogin() {
    openModal(true);
  }

  function handleSuccess(nickname: string) {
    setFieldsValue({ reviewer: nickname });
  }

  function handelCancel() {
    _removeEvent();
    emit('success');
  }
</script>
