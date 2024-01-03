<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2024-01-02 13:43:33
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-03 09:40:39
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="未检测"
    width="400px"
    okText="提交&关闭"
    cancelText="关闭"
    @close="emit('close')"
    @ok="handleSubmit(true)"
  >
    <template #appendFooter>
      <a-button type="primary" @click="handleSubmit(false)" :loading="loading">提交&继续</a-button>
    </template>
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
  import { message } from 'ant-design-vue';

  const emit = defineEmits(['confirm', 'close']);

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
  const loading = ref(false);
  const [registerDrawer, { setDrawerProps }] = useDrawerInner(
    async ({ projectIds, bsNo, options }) => {
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
    },
  );
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
  async function handleSubmit(close: boolean) {
    const { sampleId, projectIds } = await validate();
    try {
      setDrawerProps({ confirmLoading: true });
      loading.value = true;
      await submitNotCheckApi({ sampleId, bsNo: unref(bsno), projectIds });
      message.success(sampleId + '登记成功');
      emit('confirm');
      if (close === false) {
        setFieldsValue({ sampleId: '' });
        clearValidate();
      } else {
        emit('confirm');
      }
    } finally {
      setDrawerProps({ confirmLoading: false });
      loading.value = false;
    }
  }
</script>
