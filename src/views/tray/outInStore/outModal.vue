<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-18 15:55:20
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-26 10:04:29
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="托盘出库"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
    <BasicTable @register="registerTable" />
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { BasicForm, FormSchemaInner, useForm } from '@/components/Form';
  import { BasicTable, useTable } from '@/components/Table';
  import { reactive } from 'vue';
  import { siteNoSchema } from './outInStore.data';
  import { submitOutHouseApi } from '@/api/tray/relocation';
  import { getHouseSiteApi } from '@/api/plasmaStore/site';

  const emit = defineEmits(['success']);
  const state = reactive({
    data: [],
    siteList: [],
  });
  const [registerTable, { reload }] = useTable({
    api: getData,
    fetchSetting: { listField: 'result' },
    rowKey: 'trayNo',
    columns: [{ title: '托盘编号', dataIndex: 'trayNo' }],
    useSearchForm: false,
    bordered: true,
    pagination: false,
    isCanResizeParent: true,
  });
  const [
    registerForm,
    { resetFields, validate, updateSchema, appendSchemaByField, removeSchemaByField },
  ] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: [],
    showActionButtonGroup: false,
  });
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(({ data, showSite }) => {
    setDrawerProps({ confirmLoading: false });
    if (showSite) {
      appendSchemaByField(siteNoSchema as FormSchemaInner, void 0);
      getSiteList(data[0]['houseNo']);
    } else {
      removeSchemaByField(siteNoSchema.field);
    }
    resetFields();
    state.data = data;
    reload();
  });
  async function handleSubmit() {
    try {
      const values = await validate();
      setDrawerProps({ confirmLoading: true });
      const params = {
        dlvInfo: state.data.map((_: Recordable) => _.trayNo),
        siteId: values.siteId,
      };
      await submitOutHouseApi(params);
      emit('success');
      setDrawerProps({ confirmLoading: false });
      closeDrawer();
    } catch {
      setDrawerProps({ confirmLoading: false });
    }
  }
  async function getSiteList(houseNo: string) {
    const res = await getHouseSiteApi({ houseNo: houseNo });
    updateSchema({
      field: 'siteId',
      componentProps: { options: res || [] },
    });
  }
  function getData() {
    return new Promise((rs) => rs({ result: state.data }));
  }
</script>
