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
  import { addBox, editBoxDetail, getBankName } from '@/api/nonconformity/manage';
  import {
    PostApiCoreBankUnqualifiedBoxRequest,
    PutApiCoreBankUnqualifiedBoxRequest,
  } from '@/api/type/nonconformityManage';
  import { geSampleUnqualifiedReasonDictionary, DictionaryEnum } from '@/api/_dictionary';
  import { HoseType } from '@/enums/nonconforityEnum';

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
        label: '不合格原因',
        field: 'unqReason',
        component: 'ApiSelect',
        componentProps: {
          api: geSampleUnqualifiedReasonDictionary,
          params: [DictionaryEnum.SampleUnqualifiedReason],
          resultField: '[0].dictImtes',
          labelField: 'label',
          valueField: 'value',
        },
        colProps: { span: 20 },
        required: true,
      },
      {
        label: '容量',
        field: 'capacity',
        component: 'InputNumber',
        colProps: { span: 20 },
        required: true,
      },
      {
        label: '不合格库房',
        field: 'houseNo',
        component: 'ApiSelect',
        componentProps: {
          api: getBankName,
          params: {
            houseType: HoseType.Nonconformity,
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

  async function handleSubmit() {
    try {
      const values = await validate<
        PostApiCoreBankUnqualifiedBoxRequest & PutApiCoreBankUnqualifiedBoxRequest
      >();

      setModalProps({
        confirmLoading: true,
      });
      if (!unref(isUpdate)) {
        await addBox(values);
      } else {
        await editBoxDetail(values);
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
