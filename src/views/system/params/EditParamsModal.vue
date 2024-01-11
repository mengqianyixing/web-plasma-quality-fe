<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
    @cancel="resetFields"
    :maskClosable="false"
    width="25%"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script setup lang="ts">
  import { useModalInner } from '@/components/Modal';
  import { ref, computed, unref } from 'vue';

  import BasicModal from '@/components/Modal/src/BasicModal.vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { addSysParams, editSysParams } from '@/api/systemServer/params';
  import { PostApiSysParamRequest, PutApiSysParamRequest } from '@/api/type/systemParamsManage';

  const getTitle = computed(() => (unref(isUpdate) ? '编辑' : '新增'));

  const emit = defineEmits(['success']);

  const isUpdate = ref(false);
  const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    setModalProps({
      maskClosable: false,
    });

    isUpdate.value = !!data?.isUpdate;
    updateSchema([
      {
        field: 'unqReason',
        componentProps: {
          disabled: isUpdate.value,
        },
      },
      {
        field: 'houseNo',
        componentProps: {
          disabled: isUpdate.value,
        },
      },
    ]);

    if (unref(isUpdate)) {
      appendSchemaByField(
        {
          label: '箱号',
          field: 'boxNo',
          component: 'Input',
          colProps: { span: 20 },
          componentProps: {
            disabled: true,
          },
          required: true,
        },
        void 0,
        true,
      );

      setFieldsValue({
        ...data.record,
      });
    } else {
      removeSchemaByField('boxNo');
    }
  });

  const [
    registerForm,
    {
      setFieldsValue,
      updateSchema,
      appendSchemaByField,
      validate,
      resetFields,
      removeSchemaByField,
    },
  ] = useForm({
    labelWidth: 120,
    baseColProps: { span: 24 },
    schemas: [
      {
        label: '参数名称',
        field: 'paramName',
        component: 'Input',
        colProps: { span: 20 },
        required: true,
      },
      {
        label: '参数健名',
        field: 'paramKey',
        component: 'Input',
        colProps: { span: 20 },
        required: true,
      },
      {
        label: '参数键值',
        field: 'paramValue',
        component: 'Input',
        colProps: { span: 20 },
        required: true,
      },
      {
        label: '备注',
        field: 'remark',
        component: 'InputTextArea',
        colProps: { span: 20 },
        required: true,
      },
      {
        label: '状态',
        field: 'status',
        component: 'RadioGroup',
        defaultValue: 1,
        required: true,
        ifShow: false,
      },
    ],
    showActionButtonGroup: false,
    transformDateFunc(date) {
      return date ? date.format('YYYY-MM-DD') : '';
    },
  });

  async function handleSubmit() {
    try {
      const values = await validate<PostApiSysParamRequest & PutApiSysParamRequest>();
      setModalProps({
        confirmLoading: true,
      });
      if (!unref(isUpdate)) {
        await addSysParams(values);
      } else {
        await editSysParams(values);
      }

      await resetFields();
      closeModal();
      emit('success');
    } finally {
      setModalProps({
        confirmLoading: false,
      });
    }
  }
</script>
