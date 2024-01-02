<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="未检测"
    width="400px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
    <CellWapper :data="donorData" cell-width="50%" :cell-list="cellList" :gap="0" />
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { BasicForm, useForm } from '@/components/Form';
  import { CellWapper } from '@/components/CellWapper';
  import { ref, unref } from 'vue';
  import { submitNotCheckApi, getDonorApi } from '@/api/inspect/resultRegistration';

  const emit = defineEmits(['confirm']);

  const cellList = [
    {
      field: 'name',
      label: '浆员姓名',
    },
    {
      field: 'donorNo',
      label: '浆员编号',
    },
    {
      field: 'collectAt',
      label: '采集日期',
    },
    {
      field: 'bloodType',
      label: '血型',
    },
  ];
  const bsno = ref('');
  const donorData = ref({});
  const [registerDrawer] = useDrawerInner(async ({ projectIds, bsNo, options }) => {
    bsno.value = bsNo;
    updateSchema({
      field: 'projectIds',
      componentProps: {
        options: options,
        mode: 'multiple',
      },
    });
    setFieldsValue({ projectIds });
    clearValidate();
  });
  const [registerForm, { updateSchema, setFieldsValue, clearValidate, validate }] = useForm({
    labelWidth: 80,
    baseColProps: { span: 24 },
    schemas: [
      {
        required: true,
        field: 'sampleId',
        component: 'Input',
        label: '样品编号',
        componentProps: {
          onBlur: (e) => {
            const { value } = e.target;
            if (!value) return;
            getDonorApi({ sampleId: value }).then((res) => {
              donorData.value = res;
            });
          },
        },
      },
      {
        required: true,
        field: 'projectIds',
        component: 'Select',
        label: '检测项目',
      },
    ],
    showActionButtonGroup: false,
  });
  async function handleSubmit() {
    const { sampleId } = await validate();
    await submitNotCheckApi({ sampleId, bsNo: unref(bsno) });
    emit('confirm');
  }
</script>
