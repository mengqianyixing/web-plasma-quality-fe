<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-21 09:52:52
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-22 17:13:29
-->
<template>
  <div class="h-full">
    <div style="box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%)" class="pt-12px m-24px mt-8px">
      <BasicForm @register="registerForm" @ok="inStoreConfim" />
    </div>
    <BasicTable @register="registerTable" />
    <TrayModel @register="registerTrayDrawer" @confim="trayConfim" />
    <LocationDrawer @register="registerLocationDrawer" @confim="locationConfim" />
  </div>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { BasicForm, useForm } from '@/components/Form';
  import {
    taryRelocationColumns,
    trayRelocationFormSchema,
    siteSchema,
    locationSchema,
    areaSchema,
  } from './relocation.data';
  import TrayModel from './component/trayModal.vue';
  import { useDrawer } from '@/components/Drawer';
  import { settingListApi, areaListApi } from '@/api/plasmaStore/setting';
  import { STORE_FLAG } from '@/enums/plasmaStoreEnum';
  import { reactive } from 'vue';
  import { submitInHouseApi } from '@/api/tray/relocation';
  import LocationDrawer from '@/components/BusinessDrawer/locationDrawer/index.vue';

  const houseAreaMap: Map<string, Recordable<any>> = new Map();
  const state = reactive<{
    houseList: Recordable[];
  }>({ houseList: [] });

  const [registerTrayDrawer, { openDrawer: openTrayDrawer }] = useDrawer();
  const [registerLocationDrawer, { openDrawer: openLocationDrawer }] = useDrawer();

  const [
    registerForm,
    {
      validate,
      setFieldsValue,
      updateSchema,
      appendSchemaByField,
      removeSchemaByField,
      getFieldsValue,
      resetFields,
      clearValidate,
    },
  ] = useForm({
    labelWidth: 90,
    baseColProps: { span: 11 },
    schemas: trayRelocationFormSchema(handleTraySelect, houseChange),
    showActionButtonGroup: true,
    showResetButton: false,
    submitButtonOptions: { text: '确认入库' },
    actionColOptions: { span: 2 },
  });

  const [registerTable] = useTable({
    title: '',
    api: () => Promise.resolve({ result: [{}] }),
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    formConfig: {
      labelWidth: 60,
      schemas: [{ label: '托盘编号', component: 'Input', field: 'trayNo', colProps: { span: 6 } }],
    },
    rowKey: 'houseNo',
    columns: taryRelocationColumns,
    useSearchForm: true,
    bordered: true,
    size: 'small',
  });
  async function handleLoacationSelect(value: string, event: MouseEvent) {
    if (value && event.type !== 'click') return;
    const { houseNo } = getFieldsValue();
    openLocationDrawer(true, { params: { houseNo } });
  }
  function locationConfim([{ locationNo }]) {
    setFieldsValue({ [locationSchema.field]: locationNo });
    openLocationDrawer(false);
  }
  async function handleTraySelect(value: string, event: MouseEvent) {
    const { houseNo } = getFieldsValue();
    if (value && event.type !== 'click') {
      searchTrayInfo(value);
    } else {
      openTrayDrawer(true, { params: { houseNo } });
    }
  }
  function trayConfim([{ trayNo }]) {
    setFieldsValue({ trayNo });
    searchTrayInfo(trayNo);
    openTrayDrawer(false);
  }
  async function searchTrayInfo(trayNo: string) {
    const values = getFieldsValue();
    removeSchemaByField(siteSchema.field);
    if (!values.houseNo || !trayNo) return;
    const f = () =>
      new Promise((rs) => {
        rs({
          houseType: trayNo === '10086' ? 'NFA' : 'NSA',
          houseNo: trayNo === '10086' ? '16250387' : '16250388',
        });
      });
    const { houseType, houseNo } = (await f()) as any;
    // todo  接口返回为空。。。
    if (!houseNo) return;
    // 高架库
    if (houseType[1] === STORE_FLAG.S && values.houseNo !== houseNo) {
      appendSchemaByField(siteSchema, 'houseNo');
    }
  }
  async function houseChange() {
    const values = getFieldsValue();
    searchTrayInfo(values.trayNo);
    const { houseType } = state.houseList.find((_) => _.value === values.houseNo) as Recordable;
    removeSchemaByField(areaSchema.field);
    removeSchemaByField(locationSchema.field);
    if (houseType[1] === STORE_FLAG.S) {
      const componentProps = { 'enter-button': '选择', onSearch: handleLoacationSelect };
      appendSchemaByField({ ...locationSchema, componentProps: componentProps }, void 0);
    } else {
      getAreaListFn(values.houseNo);
    }
  }
  async function inStoreConfim() {
    try {
      const { houseNo, subWareHouseNo, siteId, locationNo, trayNo } = await validate();
      const params = {
        recInfo: [
          {
            locationNo,
            siteId,
            wareHouseNo: houseNo || subWareHouseNo,
            trayNo,
          },
        ],
      };
      await submitInHouseApi(params);
      resetFields();
      clearValidate();
    } catch (e) {
      console.log(e);
    }
  }
  async function getAreaListFn(houseNo: string) {
    let list = houseAreaMap.get(houseNo);
    if (!list) {
      const res = await areaListApi({ houseNo });
      const data = (res.subHouseList || []).map((_) => ({ value: _.houseNo, label: _.houseName }));
      houseAreaMap.set(houseNo, data);
      list = data;
    }
    if (list.length > 0) {
      const componentProps = { options: list };
      appendSchemaByField({ ...areaSchema, componentProps }, void 0);
    }
  }
  async function getHouseList() {
    try {
      const res = await settingListApi({ pageSize: '9999', currPage: '1' });
      const data = res.result || [];
      const options = data.map((_) => ({
        value: _.houseNo,
        label: _.houseName,
        houseType: _.houseType,
      }));
      state.houseList = options;
      updateSchema([{ field: 'houseNo', componentProps: { options } }]);
    } catch (e) {
      console.error(e);
    }
  }
  function getSiteList() {}

  getHouseList();
  getSiteList();
</script>
