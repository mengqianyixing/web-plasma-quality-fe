<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="入库"
    @ok="handleSubmit"
    @cancel="handelCancel"
    width="430px"
  >
    <BasicForm @register="registerForm" />

    <LoginModal
      @register="registerLoginModal"
      @success="handleSuccess"
      :auth-code="ReCheckButtonEnum.NonconformityInStoreCheck"
    />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { useMessage } from '@/hooks/web/useMessage';
  import { inStoreSchema } from './manage.data';

  import LoginModal from '@/__components/ReviewLoginModal/index.vue';
  import { nonconformityInStore } from '@/api/nonconformity/plasma-manage';
  import { PostApiCoreBagUnqualifiedInStoreRequest } from '@/api/type/nonconformityManage';
  import { ReCheckButtonEnum } from '@/enums/authCodeEnum';
  import { useScanHelper } from '@/hooks/common/useScanHelper';
  import { RemoveEventFn } from '@/hooks/event/useEventListener';
  import { watch, ref } from 'vue';

  defineOptions({ name: 'PickPlasmaModal' });

  const { createMessage } = useMessage();
  const emit = defineEmits(['success', 'register']);

  const { barCode, enterFlag, startEvent } = useScanHelper();

  watch(
    () => [barCode.value, enterFlag.value],
    (val) => {
      const { boxNo, bagNo } = getFieldsValue();

      if (val[0] && val[1]) {
        if (boxNo && !inputBlur.value) {
          setFieldsValue({ bagNo: val[0] });
        } else if (bagNo && !inputBlur.value) {
          setFieldsValue({ boxNo: val[0] });
        } else if (!boxNo && !bagNo && !inputBlur.value) {
          setFieldsValue({ boxNo: val[0] });
        }

        handleSubmit();
      }
    },
  );

  const [registerLoginModal, { openModal }] = useModal();

  const [registerForm, { resetFields, validate, setFieldsValue, updateSchema, getFieldsValue }] =
    useForm({
      labelWidth: 130,
      baseColProps: { span: 48 },
      schemas: inStoreSchema,
      showActionButtonGroup: false,
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : '';
      },
    });

  let _removeEvent: RemoveEventFn = () => {};
  const inputBlur = ref(false);
  const [registerModal, { setModalProps }] = useModalInner(() => {
    const { removeEvent } = startEvent();
    _removeEvent = removeEvent;
    updateSchema([
      { field: 'reviewer', componentProps: { onSearch: handleLogin } },
      {
        field: 'boxNo',
        componentProps: {
          onBlur: () => {
            inputBlur.value = false;
          },
          onFocus: () => {
            inputBlur.value = true;
          },
        },
      },
      {
        field: 'bagNo',
        componentProps: {
          onBlur: () => {
            inputBlur.value = false;
          },
          onFocus: () => {
            inputBlur.value = true;
          },
        },
      },
    ]);
    resetFields();
    setModalProps({ confirmLoading: false });
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      await nonconformityInStore(values as PostApiCoreBagUnqualifiedInStoreRequest);
      createMessage.success('入库成功');
      await setFieldsValue({ bagNo: '', boxNo: '' });
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
