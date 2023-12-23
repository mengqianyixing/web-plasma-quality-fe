<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-21 17:00:48
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-23 18:38:08
-->
<template>
  <div class="h-full">
    <div style="box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%)" class="flex pt-12px m-24px mt-8px">
      <BasicForm @register="registerForm" class="flex-1" @submit="handleSubmit" />
      <div class="w-100px">
        <a-button class="mr-20px" type="warning" v-show="props.isBinding">封箱</a-button>
      </div>
    </div>
    <BasicTable @register="registerTable" />
  </div>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { BasicForm, useForm } from '@/components/Form';
  import {
    sampleBoxScanFormSchema,
    sampleBoxScanSearchFormSchema,
    sampleBoxScanColumns,
  } from './relocation.data';
  import { bindBoxApi } from '@/api/tray/relocation';
  import { message } from 'ant-design-vue';

  const [registerForm, { getFieldsValue, resetFields }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 8 },
    schemas: sampleBoxScanFormSchema,
    showActionButtonGroup: false,
    showResetButton: false,
    autoSubmitOnEnter: true,
  });
  const props = defineProps({
    isBinding: {
      type: Boolean,
    },
  });
  const columns = sampleBoxScanColumns(props.isBinding);
  const [registerTable] = useTable({
    title: '',
    api: () => Promise.resolve({ result: [] }),
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    formConfig: {
      labelWidth: 80,
      schemas: sampleBoxScanSearchFormSchema,
    },
    rowKey: 'houseNo',
    columns: columns,
    useSearchForm: true,
    bordered: true,
    size: 'small',
  });
  async function handleSubmit() {
    const { boxId, trayNo } = getFieldsValue();
    if (!boxId || !trayNo) return;
    await bindBoxApi({ trayNo: trayNo, type: props.isBinding ? 'bind' : 'unbind', boxes: [boxId] });
    message.success('操作成功');
    resetFields();
  }
</script>
