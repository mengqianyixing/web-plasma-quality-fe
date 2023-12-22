<template>
  <div class="h-full">
    <div style="box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%)" class="flex pt-12px m-24px mt-8px">
      <BasicForm @register="registerForm" class="flex-1" />
      <div class="w-100px text-[20px] text-red-400">箱数：30</div>
    </div>
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

  const [registerForm] = useForm({
    labelWidth: 90,
    baseColProps: { span: 8 },
    schemas: plasmaBoxScanFormSchema,
    showActionButtonGroup: false,
    showResetButton: false,
  });
  const props = defineProps({
    isBinding: {
      type: Boolean,
    },
  });
  const columns = plasmaBoxScanColumns(props.isBinding);
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
      schemas: plasmaBoxScanSearchFormSchema,
    },
    rowKey: 'houseNo',
    columns: columns,
    useSearchForm: true,
    bordered: true,
    size: 'small',
  });
</script>
