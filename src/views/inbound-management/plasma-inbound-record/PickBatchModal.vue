<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="不合格暂存"
    width="23%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />

    <LoginModal @register="registerLoginModal" @success="handleSuccess" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { useMessage } from '@/hooks/web/useMessage';

  import { getBankName } from '@/api/nonconformity/box-manage';
  import { HoseType } from '@/enums/nonconforityEnum';
  import LoginModal from '@/__components/ReviewLoginModal/index.vue';
  import { nonconformityPlasmaPickByBatch } from '@/api/nonconformity/plasma-manage';
  import { ref } from 'vue';
  import { PostApiCoreBagUnqualifiedPickBatchRequest } from '@/api/type/nonconformityManage';

  const { createMessage } = useMessage();
  defineOptions({ name: 'PickPlasmaModal' });

  const emit = defineEmits(['success', 'register']);

  const [registerLoginModal, { openModal }] = useModal();

  const [registerForm, { resetFields, validate, setFieldsValue }] = useForm({
    schemas: [
      {
        field: 'reviewer',
        label: '复核人',
        component: 'InputSearch',
        colProps: { span: 20 },
        componentProps: {
          'enter-button': '登录',
          placeholder: '请点击登录按钮',
          readonly: true,
          onSearch: handleLogin,
        },
        required: true,
      },
      {
        field: 'bankNo',
        label: '暂存位置',
        component: 'ApiSelect',
        componentProps: {
          api: getBankName,
          params: {
            houseType: HoseType.Stage,
          },
          labelField: 'bankName',
          valueField: 'bankNo',
        },
        colProps: { span: 20 },
        required: true,
      },
    ],
    showActionButtonGroup: false,
    transformDateFunc(date) {
      return date ? date.format('YYYY-MM-DD') : '';
    },
  });

  const bagNos = ref<string[]>([]);
  const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    bagNos.value = data.record.bagNos;
  });

  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });

      await nonconformityPlasmaPickByBatch({
        ...values,
        bagNos: bagNos.value.map((it: any) => it.bagNo),
      } as PostApiCoreBagUnqualifiedPickBatchRequest);

      createMessage.success('不合格暂存成功');

      await resetFields();
      closeModal();
      emit('success');
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
</script>
