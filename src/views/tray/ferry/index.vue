<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="p-4">
    <div class="flex items-center justify-center h-full bg-white">
      <div class="w-600px">
        <BasicForm @register="registerForm" @submit="submit" />
      </div>
    </div>
  </PageWrapper>
</template>
<script setup lang="tsx">
  import { PageWrapper } from '@/components/Page';
  import { BasicForm, useForm } from '@/components/Form';
  import { taryHouseApi } from '@/api/tray/relocation';
  import { submitFerryApi } from '@/api/tray/ferry';
  import { message } from 'ant-design-vue';
  import { nextTick } from 'vue';
  import { getHouseSiteApi } from '@/api/plasmaStore/site';
  import { STORE_FLAG, CLOSED } from '@/enums/plasmaStoreEnum';
  import { settingListApi } from '@/api/plasmaStore/setting';

  defineOptions({ name: 'Ferry' });
  const [
    registerForm,
    {
      getFieldsValue,
      updateSchema,
      resetFields,
      clearValidate,
      validate,
      setProps,
      setFieldsValue,
    },
  ] = useForm({
    labelWidth: 90,
    size: 'large',
    baseColProps: { span: 24 },
    schemas: [
      {
        field: 'trayNo',
        component: 'Input',
        label: '托盘编号',
        required: true,
      },
      {
        field: 'houseNo',
        component: 'Select',
        label: '库房',
        required: true,
        componentProps: {
          onChange: handleChange,
        },
      },
      {
        field: 'siteNo',
        component: 'Select',
        label: '站点',
        required: true,
        componentProps: {
          options: [],
        },
      },
    ],
    showActionButtonGroup: true,
    showResetButton: false,
    submitButtonOptions: { text: '越库' },
    actionColOptions: { span: 4 },
  });
  settingListApi({
    warehouseType: STORE_FLAG.S,
    currPage: '1',
    pageSize: '1000',
    closed: CLOSED.NORMAL,
  }).then((res) => {
    updateSchema({
      field: 'houseNo',
      componentProps: {
        options: res.result.map((it) => ({ value: it.houseNo, label: it.houseName })),
      },
    });
    setFieldsValue({ houseNo: res.result?.[0]?.houseNo, siteNo: void 0 });
    clearValidate();
  });
  async function handleChange(houseNo: string) {
    const res = await getHouseSiteApi({ houseNo: houseNo });
    updateSchema({ field: 'siteNo', componentProps: { options: res } });
  }

  async function submit() {
    const { siteNo, trayNo } = await validate();
    try {
      setProps({ submitButtonOptions: { loading: true } });
      await submitFerryApi({ siteNo, trayNo });
      setFieldsValue({ siteNo: void 0, trayNo: void 0 });
      clearValidate();
      message.success('提交成功');
    } finally {
      setProps({ submitButtonOptions: { loading: false } });
    }
  }
</script>
