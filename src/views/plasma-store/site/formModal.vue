<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-20 10:01:47
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-23 14:08:24
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="state.siteNo ? '编辑' : '新增'"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formListSchema } from './site.data';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { addSiteApi, updateSiteApi, getSiteDtApi } from '@/api/plasmaStore/site';
  import { settingListApi } from '@/api/plasmaStore/setting';
  import { STORE_FLAG } from '@/enums/plasmaStoreEnum';

  const emit = defineEmits(['success', 'register']);

  defineOptions({ name: 'FormModel' });
  const state = reactive({ siteNo: '' });

  const [registerForm, { validate, setFieldsValue, clearValidate, resetFields, updateSchema }] =
    useForm({
      labelWidth: 90,
      baseColProps: { span: 24 },
      schemas: formListSchema,
      showActionButtonGroup: false,
    });
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async ({ data }) => {
    state.siteNo = data.siteNo;
    getHouseList();
    if (data.siteNo) {
      const res = await getSiteDtApi({ siteNo: data.siteNo });
      setFieldsValue(res);
    } else {
      resetFields();
    }
    clearValidate();
  });
  async function getHouseList() {
    const res = await settingListApi({
      warehouseType: STORE_FLAG.S,
      currPage: '1',
      pageSize: '1000',
    });
    const options = res.result.map((_) => ({ value: _.houseNo, label: _.houseName }));
    updateSchema([{ field: 'fkHouseNo', componentProps: { options: options } }]);
  }

  async function handleSubmit() {
    try {
      const { siteNo, siteName, fkHouseNo, closed } = await validate();
      setDrawerProps({ confirmLoading: true });
      if (state.siteNo) {
        await updateSiteApi({ siteNo, siteName, fkHouseNo, closed, siteNoOld: state.siteNo });
      } else {
        await addSiteApi({ siteNo, siteName, fkHouseNo, closed });
      }
      setDrawerProps({ confirmLoading: false });
      closeDrawer();
      emit('success');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
