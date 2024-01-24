<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-21 17:00:48
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-13 18:02:36
-->
<template>
  <div class="h-full">
    <div style="box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%)" class="flex pt-12px m-24px mt-8px">
      <BasicForm @register="registerForm" class="flex-1" @submit="handleSubmit" />
      <div class="flex w-200px">
        <div class="w-100px text-[20px] text-red-400">箱数：{{ count }}</div>
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
  import { message, Modal } from 'ant-design-vue';
  import { trayBoxListApi } from '@/api/tray/list';

  import { ref } from 'vue';

  const count = ref(0);

  const [registerForm, { getFieldsValue, setFieldsValue }] = useForm({
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
    api: () => Promise.resolve({ result: [] }),
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    formConfig: {
      schemas: sampleBoxScanSearchFormSchema,
    },
    rowKey: 'houseNo',
    columns: columns,
    useSearchForm: true,
    bordered: true,
    size: 'small',
  });
  async function submit() {
    const { boxId, trayNo } = getFieldsValue();
    await bindBoxApi({ trayNo: trayNo, type: props.isBinding ? 'bind' : 'unbind', boxes: [boxId] });
    setFieldsValue({ boxId: '' });
    message.success('操作成功');
  }
  async function handleSubmit() {
    const { boxId, trayNo } = getFieldsValue();
    if (trayNo) {
      const list = await trayBoxListApi({ trayNo });
      count.value = list.length;
    }
    if (!boxId || !trayNo) return;
    if (count.value >= 24 && props.isBinding) {
      Modal.confirm({
        content: '托盘绑定已满24箱，继续绑定?',
        onOk: async () => {
          submit();
        },
        onCancel: () => {
          Modal.destroyAll();
        },
      });
    } else {
      submit();
    }
  }
</script>
