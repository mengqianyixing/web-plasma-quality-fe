<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-20 10:01:47
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-10 15:30:26
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="state.siteNo ? '编辑' : '新增'"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { formListSchema } from './site.data';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { addSiteApi, updateSiteApi, getSiteDtApi } from '@/api/plasmaStore/site';
  import { settingListApi } from '@/api/plasmaStore/setting';
  import { STORE_FLAG, CLOSED } from '@/enums/plasmaStoreEnum';

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
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async ({ data }) => {
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
      closed: CLOSED.NORMAL,
    });
    const options = res.result.map((_) => ({ value: _.houseNo, label: _.houseName }));
    updateSchema([{ field: 'fkHouseNo', componentProps: { options: options } }]);
  }

  async function handleSubmit() {
    try {
      const { siteNo, siteName, fkHouseNo, closed } = await validate();
      setModalProps({ confirmLoading: true });
      if (state.siteNo) {
        await updateSiteApi({ siteNo, siteName, fkHouseNo, closed, siteNoOld: state.siteNo });
      } else {
        await addSiteApi({ siteNo, siteName, fkHouseNo, closed });
      }
      setModalProps({ confirmLoading: false });
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
