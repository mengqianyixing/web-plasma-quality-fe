<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="入库"
    @ok="_handleSubmit"
    @cancel="handelCancel"
    width="550px"
    :min-height="200"
  >
    <BasicForm @register="registerForm" />
    <div class="form mb-15px">
      <div class="form-item">
        <span class="form-label">不合格箱号</span>
        <ScanInput
          :value="formData.boxNo"
          @enter="_handleSubmit"
          @keyup="handleKeyUp"
          size="lg"
          ref="boxRef"
          @scan-change="(code) => (formData.boxNo = code)"
        />
      </div>
      <div class="form-item">
        <span class="form-label">不合格血浆编号</span>
        <ScanInput
          :value="formData.bagNo"
          @enter="_handleSubmit"
          @keyup="handleKeyUp"
          size="lg"
          ref="bagRef"
          @scan-change="(code) => (formData.bagNo = code)"
        />
      </div>
    </div>
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
  import { RemoveEventFn } from '@/hooks/event/useEventListener';
  import { ref, reactive } from 'vue';
  import { debounce } from 'lodash-es';
  import ScanInput from '@/components/Form/src/components/ScanInput.vue';

  defineOptions({ name: 'PickPlasmaModal' });

  const { createMessage } = useMessage();
  const emit = defineEmits(['success', 'register']);
  const formData = reactive({
    boxNo: '',
    bagNo: '',
  });
  const boxRef = ref();
  const bagRef = ref();

  const [registerLoginModal, { openModal }] = useModal();

  function handleKeyUp(e) {
    if (e.key === 'Enter') {
      _handleSubmit();
    }
  }

  const _handleSubmit = debounce(handleSubmit, 300) as () => Promise<void>;
  const [registerForm, { resetFields, validate, setFieldsValue, updateSchema }] = useForm({
    size: 'large',
    labelWidth: 130,
    baseColProps: { span: 48 },
    schemas: inStoreSchema,
    showActionButtonGroup: false,
    submitFunc: _handleSubmit,
    autoSubmitOnEnter: true,
    transformDateFunc(date) {
      return date ? date.format('YYYY-MM-DD') : '';
    },
  });

  let _removeEvent: RemoveEventFn = () => {};
  const boxInputBlur = ref(false);
  const bagInputBlur = ref(false);
  const [registerModal, { setModalProps }] = useModalInner(() => {
    updateSchema([
      { field: 'reviewer', componentProps: { onSearch: handleLogin } },
      {
        field: 'boxNo',
        componentProps: {
          onBlur: () => {
            boxInputBlur.value = false;
          },
          onFocus: () => {
            boxInputBlur.value = true;
          },
        },
      },
      {
        field: 'bagNo',
        componentProps: {
          onBlur: () => {
            bagInputBlur.value = false;
          },
          onFocus: () => {
            bagInputBlur.value = true;
          },
        },
      },
    ]);
    resetFields();
    formData.bagNo = '';
    formData.boxNo = '';
    setModalProps({ confirmLoading: false, maskClosable: false });
  });

  async function handleSubmit() {
    try {
      const { bagNo, boxNo } = formData;
      if (boxNo) bagRef.value.$el.focus();
      const values = await validate();
      if (!bagNo || !boxNo) return createMessage.warning('请扫描');
      setModalProps({ confirmLoading: true });
      const focusedElement = document.activeElement as InputHTMLElement;
      await nonconformityInStore(
        {
          ...values,
          bagNo,
          boxNo,
        } as PostApiCoreBagUnqualifiedInStoreRequest,
        () => {
          setTimeout(() => {
            focusedElement.focus();
            focusedElement.select();
          }, 300);
        },
      );
      createMessage.success('入库成功');
      formData.bagNo = '';
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

  function handleLogin() {
    openModal(true);
  }

  function handleSuccess(nickname: string) {
    setFieldsValue({ reviewer: nickname });
    boxRef.value.$el.focus();
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
