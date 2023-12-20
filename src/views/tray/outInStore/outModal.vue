<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-18 15:55:20
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-20 15:37:43
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
  import { outFormSchema, siteNoSchema } from './outInStore.data';

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
  });
  const [
    registerForm,
    { resetFields, validate, updateSchema, appendSchemaByField, removeSchemaByField },
  ] = useForm({
    labelWidth: 100,
    baseColProps: { span: 24 },
    schemas: outFormSchema,
    showActionButtonGroup: false,
  });
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(({ data, showSite }) => {
    setDrawerProps({ confirmLoading: false });
    if (showSite) {
      appendSchemaByField(siteNoSchema as FormSchemaInner, void 0);
      getSiteList();
    } else {
      removeSchemaByField(siteNoSchema.field);
    }
    resetFields();
    state.data = data;
    reload();
  });
  async function handleSubmit() {
    await validate();
    setDrawerProps({ confirmLoading: true });
    setDrawerProps({ confirmLoading: false });
    closeDrawer();
  }
  function getSiteList() {
    updateSchema({
      field: 'siteNo',
      componentProps: { options: [{ label: '站点1', value: 1 }] },
    });
  }
  function getData() {
    return new Promise((rs) => rs({ result: state.data }));
  }
</script>
