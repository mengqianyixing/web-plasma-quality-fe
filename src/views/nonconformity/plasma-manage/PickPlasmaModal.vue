<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="挑浆"
    @ok="_handleSubmit"
    @cancel="handelCancel"
    width="550px"
    :min-height="200"
  >
    <BasicForm @register="registerForm" />
    <div class="form mb-15px">
      <div class="form-item">
        <span class="form-label">不合格血浆编号</span>
        <ScanInput
          :value="formData.bagNo"
          @enter="_handleSubmit"
          @keyup="handleKeyUp"
          size="lg"
          ref="boxRef"
          @scan-change="(code) => (formData.bagNo = code)"
        />
      </div>
    </div>
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
  import { watch, reactive } from 'vue';
  import { RemoveEventFn } from '@/hooks/event/useEventListener';
  import { debounce } from 'lodash-es';
  import ScanInput from '@/components/Form/src/components/ScanInput.vue';

  const { createMessage } = useMessage();

  defineOptions({ name: 'PickPlasmaModal' });
  const formData = reactive({
    bagNo: '',
  });
  const { barCode, enterFlag, startEvent } = useScanHelper();

  watch(
    () => [barCode.value, enterFlag.value],
    (val) => {
      if (val[0] && val[1]) {
        formData.bagNo = val[0] as string;
      }
    },
  );

  const emit = defineEmits(['success', 'register']);

  const [registerLoginModal, { openModal }] = useModal();

  const _handleSubmit = debounce(handleSubmit, 300) as () => Promise<void>;
  const [registerForm, { resetFields, validate, setFieldsValue, updateSchema }] = useForm({
    size: 'large',
    labelWidth: 130,
    baseColProps: { span: 48 },
    schemas: pickSchema,
    submitFunc: _handleSubmit,
    showActionButtonGroup: false,
    autoSubmitOnEnter: true,
    transformDateFunc(date) {
      return date ? date.format('YYYY-MM-DD') : '';
    },
  });

  let _removeEvent: RemoveEventFn = () => {};
  const [registerModal, { setModalProps }] = useModalInner(() => {
    const { removeEvent } = startEvent();
    _removeEvent = removeEvent;
    updateSchema([{ field: 'reviewer', componentProps: { onSearch: handleLogin } }]);
    resetFields();
    formData.bagNo = '';
    setModalProps({ confirmLoading: false, maskClosable: false });
  });

  function handleKeyUp(e) {
    if (e.key === 'Enter') {
      _handleSubmit();
    }
  }
  async function handleSubmit() {
    try {
      const values = await validate();
      const { bagNo } = formData;
      if (!bagNo) return createMessage.warning('请扫描');
      setModalProps({ confirmLoading: true });
      await nonconformityPick({ ...values, bagNo } as PostApiCoreBagUnqualifiedPickRequest);
      createMessage.success('挑浆成功');
      formData.bagNo = '';
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
<style scoped lang="scss">
  .form-item {
    display: flex;
    align-items: center;
    width: 444px;
    margin-bottom: 15px;

    .form-label {
      width: 170px;
      margin-right: 10px;
      color: #666;
      font-size: 16px;
      text-align: right;
    }
  }
</style>
