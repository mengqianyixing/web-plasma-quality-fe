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
  import { hasKey, isDecimal, isInteger, isJSON, isStr, textTransferCase } from 'js-xxx';
  import { useMessage } from '@/hooks/web/useMessage';

  const { createMessage } = useMessage();

  const getTitle = computed(() => (unref(isUpdate) ? '编辑' : '新增'));

  const emit = defineEmits(['success']);

  const isUpdate = ref(false);
  const paramsId = ref('');
  const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
    setModalProps({
      maskClosable: false,
    });

    isUpdate.value = !!data?.isUpdate;
    updateSchema({
      field: 'paramKey',
      componentProps: {
        disabled: unref(isUpdate),
      },
    });

    if (unref(isUpdate)) {
      paramsId.value = data.record.id;
      setFieldsValue(data.record);
    }
  });

  const [registerForm, { validate, resetFields, setFieldsValue, updateSchema }] = useForm({
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
        field: 'valueType',
        slot: 'valueType',
        show: false,
      },
      {
        label: '参数值提示',
        field: 'valueContext',
        component: 'InputTextArea',
        componentProps: {
          placeholder: '-',
          readonly: true,
        },
        colProps: { span: 20 },
      },
      {
        label: '备注',
        field: 'remark',
        component: 'InputTextArea',
        componentProps: {
          rows: 4,
        },
        colProps: { span: 20 },
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

  function _checkParamsValue(values: any) {
    const value: any = values.paramValue;
    const rules = JSON.parse(values?.valueContext ?? '{}');
    switch (textTransferCase(values.valueType, 'lower')) {
      case 'float':
        if (hasKey(rules, 'min') && hasKey(rules, 'max')) {
          return isDecimal(value) && value >= rules.min && value <= rules.max;
        }
        return isDecimal(value);
      case 'int':
        if (hasKey(rules, 'min') && hasKey(rules, 'max')) {
          return isInteger(value) && value >= rules.min && value <= rules.max;
        }
        return isInteger(value);
      case 'text':
        return isStr(value);
      case 'json':
        return isJSON(value);
      case 'select':
        return hasKey(rules, value);
      default:
        return true;
    }
  }

  async function handleSubmit() {
    try {
      const values: any = await validate<PostApiSysParamRequest & PutApiSysParamRequest>();
      if (!_checkParamsValue(values)) {
        createMessage.warning(
          `参数值不符合要求 【${values?.valueType ?? '-'}】 ${values?.valueContext ?? ''}！`,
        );
        return;
      }
      setModalProps({
        confirmLoading: true,
      });
      if (!unref(isUpdate)) {
        await addSysParams(values);
      } else {
        await editSysParams({
          ...values,
          id: paramsId.value,
        });
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
