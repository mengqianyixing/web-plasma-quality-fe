<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="state.type"
    width="400px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { formListSchema } from './requiredItem.data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { message } from 'ant-design-vue';
  import { addApi, getDtApi, updateApi } from '@/api/base-settings/requiredItem';

  const emit = defineEmits(['success', 'register']);
  defineOptions({ name: 'FormModel' });

  const state = reactive({ type: '', api: addApi });
  const NOR = 'NOR'; //血浆样本

  const [registerForm, { validate, setFieldsValue, clearValidate, resetFields, updateSchema }] =
    useForm({
      labelWidth: 120,
      baseColProps: { span: 24 },
      schemas: formListSchema,
      showActionButtonGroup: true,
    });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(
    async ({ sampleType, rawImmEnum, sampleTypeEnum }) => {
      resetFields();
      const disabledSchema = formListSchema
        .slice(0, 2)
        .map((it) => ({ ...it, componentProps: { disabled: !!sampleType } }));
      updateSchema(disabledSchema);
      const sampleTypeChangeSchema = {
        field: 'sampleType',
        componentProps: {
          onChange: (value: string) => {
            const isNor = value === NOR;
            updateSchema({ field: 'rawImm', ifShow: isNor, required: isNor });
          },
        },
      };
      updateSchema(sampleTypeChangeSchema);
      state.api = addApi;
      state.type = '新增';
      if (sampleType) {
        state.type = '编辑';
        const res = await getDtApi({ sampleType: sampleTypeEnum, rawImm: rawImmEnum });
        setFieldsValue(res);
        state.api = updateApi;
      }
      clearValidate();
    },
  );
  async function handleSubmit() {
    try {
      const values = await validate();
      setModalProps({ confirmLoading: true });
      await state.api({
        ...values,
        rawImm: values.sampleType === NOR ? values.rawImm : void 0,
      } as any);
      message.success(state.type + '成功');
      setModalProps({ confirmLoading: false });
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
