<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-12 15:49:25
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-13 10:37:59
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="(state.isUpdate ? '编辑' : '新增') + getNodeType"
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
  import { addHouseApi, updateHouseApi } from '@/api/plasmaStore/setting';
  import { noop } from '@/utils/index';

  const emit = defineEmits(['success', 'register']);

  defineOptions({ name: 'FormModel' });
  const state = reactive({
    parentHouseNo: '',
    isUpdate: false,
    houseNo: '',
  });

  const getNodeType = computed(() => (state.parentHouseNo === 'ROOT' ? '库房' : '区域'));

  const formSchema = initFormSchema({
    name: '',
    houseType: '',
    updateSchema: noop,
    setFieldsValue: noop,
    isUpdate: false,
  });

  const [registerForm, { validate, updateSchema, setFieldsValue, clearValidate }] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(
    ({ parentHouseType, parentHouseNo, isUpdate, row = {} }) => {
      state.parentHouseNo = parentHouseNo || 'ROOT';
      state.isUpdate = isUpdate;
      state.houseNo = row.houseNo;
      const formSchema = initFormSchema({
        name: getNodeType.value,
        houseType: parentHouseType || '',
        updateSchema,
        setFieldsValue,
        isUpdate: !!isUpdate,
      });
      setModalProps({ confirmLoading: false });
      updateSchema(formSchema);
      const defaultValues = formSchema.reduce((t, c) => {
        t[c.field] = c.defaultValue;
        return t;
      }, {});
      setFieldsValue({ ...defaultValues, ...row });
      clearValidate();
    },
  );

  async function handleSubmit() {
    try {
      const { houseName, typeFlag, storeFlag, autoFlag, capacity, remark, closed } =
        await validate();
      setModalProps({ confirmLoading: true });
      if (state.isUpdate) {
        await updateHouseApi({ houseName, remark, houseNo: state.houseNo });
      } else {
        await addHouseApi({
          closed,
          houseName,
          capacity,
          parentHouseNo: state.parentHouseNo,
          houseType: typeFlag + storeFlag + autoFlag,
          remark,
        });
      }
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
