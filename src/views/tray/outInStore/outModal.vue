<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-18 15:55:20
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-12 16:38:44
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="托盘出库"
    width="500px"
    :minHeight="400"
    @ok="handleSubmit"
    @fullscreen="redoHeight"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <BasicForm @register="registerForm" />
        <div class="flex-1 shrink-1" style="height: calc(100% - 56px)">
          <BasicTable @register="registerTable" />
        </div>
      </div>
    </div>
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
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
  const [registerTable, { reload, redoHeight }] = useTable({
    inset: true,
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
  const [registerModal, { setModalProps, closeModal }] = useModalInner(({ data, showSite }) => {
    setModalProps({ confirmLoading: false });
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
      setModalProps({ confirmLoading: true });
      const params = {
        dlvInfo: state.data.map((_: Recordable) => _.trayNo),
        siteId: values.siteId,
      };
      await submitOutHouseApi(params);
      emit('success');
      setModalProps({ confirmLoading: false });
      closeModal();
    } catch {
      setModalProps({ confirmLoading: false });
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
