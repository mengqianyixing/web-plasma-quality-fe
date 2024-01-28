<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-21 09:52:52
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-27 15:19:11
-->
<template>
  <div class="h-full">
    <div style="box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%)" class="pt-12px m-24px mt-8px">
      <BasicForm @register="registerForm" @submit="inStoreConfim" />
    </div>
    <BasicTable @register="registerTable" />
    <TrayModel @register="registerTrayModal" @confim="trayConfim" />
    <LocationModal @register="registerLocationModal" @confim="locationConfim" />
  </div>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { BasicForm, useForm } from '@/components/Form';
  import {
    taryRelocationColumns,
    trayRelocationFormSchema,
    locationSchema,
  } from './relocation.data';
  import TrayModel from './component/trayModal.vue';
  import { useModal } from '@/components/Modal';
  import { settingListApi } from '@/api/plasmaStore/setting';
  import { STORE_FLAG, CLOSED } from '@/enums/plasmaStoreEnum';
  import { reactive, onMounted } from 'vue';
  import { submitRelocationApi, taryHouseApi } from '@/api/tray/relocation';
  import LocationModal from '@/components/BusinessDrawer/locationDrawer/index.vue';
  import { message } from 'ant-design-vue';

  const state = reactive<{
    houseList: Recordable[];
  }>({ houseList: [] });

  const [registerTrayModal, { openModal: openTrayModal }] = useModal();
  const [registerLocationModal, { openModal: openLocationModal }] = useModal();

  const [
    registerForm,
    { validate, setFieldsValue, updateSchema, getFieldsValue, resetFields, clearValidate },
  ] = useForm({
    labelWidth: 90,
    baseColProps: { span: 10 },
    schemas: trayRelocationFormSchema,
    showActionButtonGroup: true,
    showResetButton: false,
    submitButtonOptions: { text: '确认移库' },
    actionColOptions: { span: 4 },
  });

  const [registerTable] = useTable({
    api: () => Promise.resolve({ result: [] }),
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    formConfig: {
      schemas: [{ label: '托盘编号', component: 'Input', field: 'trayNo' }],
    },
    rowKey: 'houseNo',
    columns: taryRelocationColumns,
    useSearchForm: true,
    bordered: true,
    size: 'small',
  });
  async function handleLoacationSelect(value: string, event: MouseEvent) {
    const { trayNo } = getFieldsValue();
    if (!trayNo) return message.warning('请先选择托盘');
    const res = await taryHouseApi({ trayNo });
    if (!res) return message.warning('未查询到托盘在库信息');
    if (res.houseType[1] !== STORE_FLAG.S) return message.warning('请选择或输入存放于高架库的托盘');
    if (value && event.type !== 'click') return;
    openLocationModal(true, { params: { houseNo: res.houseNo, locationStatus: 'IDLE' } });
  }
  function locationConfim([{ locationNo }]) {
    setFieldsValue({ [locationSchema.field]: locationNo });
    openLocationModal(false);
  }
  async function handleTraySelect(value: string, event: MouseEvent) {
    if (value && event.type !== 'click') {
      searchTrayInfo(value);
    } else {
      openTrayModal(true, { params: { closed: 0 } });
    }
  }
  function trayConfim([{ trayNo }]) {
    setFieldsValue({ trayNo });
    searchTrayInfo(trayNo);
    openTrayModal(false);
  }
  async function searchTrayInfo(trayNo: string) {
    const res = await taryHouseApi({ trayNo });
    if (!res) return message.warning('未查询到托盘在库信息');
    const { houseType } = res;
    if (houseType[1] !== STORE_FLAG.S) return message.warning('请选择或输入存放于高架库的托盘');
  }

  async function inStoreConfim() {
    try {
      const { locationNo, trayNo } = await validate();
      await submitRelocationApi({
        trayNo,
        targetLocatonNo: locationNo,
      });
      resetFields();
      clearValidate();
    } catch (e) {
      console.log(e);
    }
  }

  async function getHouseList() {
    try {
      const res = await settingListApi({ pageSize: '9999', currPage: '1', closed: CLOSED.NORMAL });
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
  onMounted(() => {
    updateSchema([
      {
        field: locationSchema.field,
        componentProps: { 'enter-button': '选择', onSearch: handleLoacationSelect },
      },
      {
        field: 'trayNo',
        componentProps: {
          onSearch: handleTraySelect,
        },
      },
    ]);
  });
</script>
