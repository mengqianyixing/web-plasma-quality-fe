<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-12 15:49:25
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-10 15:20:40
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="'新增' + getNodeType"
    width="600px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { computed, reactive } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { initFormSchema } from './setting.data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { addHouseApi } from '@/api/plasmaStore/setting';

  const emit = defineEmits(['success', 'register']);

  defineOptions({ name: 'FormModel' });
  const state = reactive({
    parentHouseNo: '',
  });

  const getNodeType = computed(() => (state.parentHouseNo === 'ROOT' ? '库房' : '区域'));

  const formSchema = initFormSchema({ name: '', houseType: '', updateSchema: () => ({}) });

  const [registerForm, { validate, updateSchema, setFieldsValue, clearValidate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(
    ({ parentHouseType, parentHouseNo }) => {
      state.parentHouseNo = parentHouseNo || 'ROOT';
      const formSchema = initFormSchema({
        name: getNodeType.value,
        houseType: parentHouseType || '',
        updateSchema,
      });
      setModalProps({ confirmLoading: false });
      updateSchema(formSchema);
      setFieldsValue(
        formSchema.reduce((t, c) => {
          t[c.field] = c.defaultValue;
          return t;
        }, {}),
      );
      clearValidate();
    },
  );

  async function handleSubmit() {
    try {
      const { houseName, typeFlag, storeFlag, autoFlag, capacity, remark, closed } =
        await validate();
      setModalProps({ confirmLoading: true });
      await addHouseApi({
        closed,
        houseName,
        capacity,
        parentHouseNo: state.parentHouseNo,
        houseType: typeFlag + storeFlag + autoFlag,
        remark,
      });
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
