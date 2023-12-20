<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handlePrint">打印</a-button>
        <a-button type="primary" @click="handlePrint">补打</a-button>
        <a-button type="primary" @click="handleDiscard">报废</a-button>
      </template>
    </BasicTable>
    <BasicDrawer @register="registerDrawer" @ok="submit" showFooter title="托盘打印">
      <BasicForm @register="registerForm" />
    </BasicDrawer>
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { columns, searchFormSchema } from './manage.data';
  import { BasicDrawer, useDrawer } from '@/components/Drawer';
  import { BasicForm, useForm } from '@/components/Form';

  const [registerDrawer, { openDrawer, closeDrawer, setDrawerProps }] = useDrawer();
  const [registerForm, { validate }] = useForm({
    labelWidth: 90,
    baseColProps: { span: 24 },
    schemas: [
      {
        component: 'InputNumber',
        field: '',
        label: '托盘数量',
        defaultValue: 1,
        required: true,
        componentProps: {
          min: 1,
        },
      },
    ],
    showActionButtonGroup: false,
  });
  const [registerTable] = useTable({
    api: () => Promise.resolve(),
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    rowKey: 'siteNo',
    columns: columns,
    size: 'small',
    useSearchForm: true,
    bordered: true,
    rowSelection: { type: 'checkbox' },
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
  });
  function handlePrint() {
    setDrawerProps({ confirmLoading: false });
    openDrawer(true);
  }
  function handleDiscard() {}

  async function submit() {
    setDrawerProps({ confirmLoading: true });
    await validate();
    setDrawerProps({ confirmLoading: false });
    closeDrawer();
  }
</script>
