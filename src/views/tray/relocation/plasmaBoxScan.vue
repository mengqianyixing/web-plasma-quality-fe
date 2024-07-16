<!--
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-21 17:19:22
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-31 17:05:41
-->
<template>
  <div class="h-full">
    <Spin :spinning="spinning">
      <div style="box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%)" class="flex pt-12px m-24px mt-8px">
        <BasicForm @register="registerForm" class="flex-1" @submit="handleSubmit" />
        <div class="w-100px text-[20px] text-red-400">箱数：{{ count }}</div>
      </div>
    </Spin>
    <BasicTable @register="registerTable" />
  </div>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { BasicForm, useForm } from '@/components/Form';
  import {
    plasmaBoxScanFormSchema,
    plasmaBoxScanSearchFormSchema,
    plasmaBoxScanColumns,
  } from './relocation.data';
  import { bindBoxApi } from '@/api/tray/relocation';
  import { message, Spin } from 'ant-design-vue';
  import { trayBoxListApi } from '@/api/tray/list';
  import { ref, nextTick } from 'vue';

  const count = ref(0);
  const spinning = ref(false);
  const [registerForm, { getFieldsValue, setFieldsValue }] = useForm({
    labelWidth: 90,
    baseColProps: { flex: '0 0 370px' },
    schemas: plasmaBoxScanFormSchema,
    showActionButtonGroup: false,
    showResetButton: false,
    autoSubmitOnEnter: true,
  });
  const props = defineProps({
    isBinding: {
      type: Boolean,
    },
  });
  const columns = plasmaBoxScanColumns(props.isBinding);
  const [registerTable] = useTable({
    api: () => Promise.resolve({ result: [] }),
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    formConfig: {
      schemas: plasmaBoxScanSearchFormSchema,
    },
    rowKey: 'houseNo',
    columns: columns,
    useSearchForm: true,
    bordered: true,
    size: 'small',
  });
  async function submit() {
    const { boxId, trayNo } = getFieldsValue();
    const focusedElement = document.activeElement as HTMLElement;
    focusedElement.blur();
    try {
      await bindBoxApi({
        trayNo: trayNo,
        type: props.isBinding ? 'bind' : 'unbind',
        boxes: [boxId],
      });
      await setFieldsValue({ boxId: '' });
    } finally {
      await nextTick();
      focusedElement.focus();
    }
    message.success('操作成功');
    trayBoxListApi({ trayNo }).then((res) => {
      count.value = res.length;
    });
  }

  async function handleSubmit() {
    const { boxId, trayNo } = getFieldsValue();
    if (boxId && !trayNo) message.warning('请扫描托盘编号');
    if (!boxId || !trayNo) return;
    try {
      spinning.value = true;
      await submit();
    } finally {
      spinning.value = false;
    }
  }
</script>
