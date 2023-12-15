<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-12 15:49:25
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-14 17:59:45
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="'新增' + getNodeType"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { computed, reactive } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { initFormSchema } from './setting.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { addHouseApi } from '@/api/plasmaStore/setting';

  const emit = defineEmits(['success', 'register']);

  defineOptions({ name: 'FormModel' });
  const state = reactive({
    parentHouseNo: '',
  });

  const getNodeType = computed(() => (state.parentHouseNo === 'ROOT' ? '库房' : '区域'));

  const formSchema = initFormSchema({ name: '', houseType: '', updateSchema: () => ({}) });

  const [registerForm, { resetFields, validate, updateSchema }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: formSchema,
    showActionButtonGroup: false,
  });
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(
    ({ parentHouseType, parentHouseNo }) => {
      resetFields();
      state.parentHouseNo = parentHouseNo || 'ROOT';
      const formSchema = initFormSchema({
        name: getNodeType.value,
        houseType: parentHouseType || '',
        updateSchema,
      });
      setDrawerProps({ confirmLoading: false });
      updateSchema(formSchema);
    },
  );

  async function handleSubmit() {
    try {
      const { houseName, typeFlag, storeFlag, autoFlag, capacity, remark, closed } =
        await validate();
      setDrawerProps({ confirmLoading: true });
      await addHouseApi({
        closed,
        houseName,
        capacity,
        parentHouseNo: state.parentHouseNo,
        houseType: typeFlag + storeFlag + autoFlag,
        remark,
      });
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
