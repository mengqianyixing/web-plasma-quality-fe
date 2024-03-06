<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
    @cancel="handleCancel"
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
  import { addStation, editStation } from '@/api/base-settings/station';
  import { PostApiSysStationRequest, PutApiSysStationRequest } from '@/api/type/stationManage';
  import { DictionaryEnum, getSysDictionary } from '@/api/_dictionary';

  const getTitle = computed(() => (unref(isUpdate) ? '编辑' : '新增'));

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(false);
  const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    setModalProps({
      maskClosable: false,
    });

    isUpdate.value = !!data?.isUpdate;
    updateSchema([
      {
        field: 'stationNo',
        componentProps: {
          disabled: isUpdate.value,
        },
      },
    ]);

    if (isUpdate.value) {
      setFieldsValue(data?.record);

      appendSchemaByField(
        {
          label: '备注',
          field: 'remark',
          component: 'InputTextArea',
          colProps: { span: 20 },
          componentProps: {
            rows: 4,
          },
        },
        void 0,
      );
    }
  });

  const [
    registerForm,
    {
      updateSchema,
      validate,
      resetFields,
      setFieldsValue,
      appendSchemaByField,
      removeSchemaByField,
    },
  ] = useForm({
    labelWidth: 120,
    baseColProps: { span: 24 },
    schemas: [
      {
        label: '浆站编码',
        field: 'stationNo',
        component: 'Input',
        colProps: { span: 20 },
        required: true,
      },
      {
        label: 'ERP浆站编码',
        field: 'preERP',
        component: 'Input',
        colProps: { span: 20 },
        required: true,
      },
      {
        label: '全称',
        field: 'fullName',
        component: 'Input',
        colProps: { span: 20 },
        required: true,
      },
      {
        label: '简称',
        field: 'shortName',
        component: 'Input',
        colProps: { span: 20 },
        required: true,
      },
      {
        label: '浆站系统类型',
        field: 'systemType',
        component: 'Input',
        colProps: { span: 20 },
        required: true,
      },
      {
        label: '所在省份',
        field: 'provinceCode',
        component: 'ApiSelect',
        componentProps: {
          api: getSysDictionary,
          params: [DictionaryEnum.ProvinceCode],
          resultField: '[0].dictImtes',
        },
        colProps: { span: 20 },
        required: true,
      },
      {
        label: '血浆皮重（g）',
        field: 'tareWeight',
        component: 'Input',
        colProps: { span: 20 },
        required: true,
      },
    ],
    showActionButtonGroup: false,
  });

  async function handleSubmit() {
    try {
      const values = await validate<PostApiSysStationRequest & PutApiSysStationRequest>();

      setModalProps({
        confirmLoading: true,
      });
      if (!unref(isUpdate)) {
        await addStation({
          ...values,
        });
      } else {
        await editStation(values);
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

  function handleCancel() {
    resetFields();
    removeSchemaByField('remark');
  }
</script>
