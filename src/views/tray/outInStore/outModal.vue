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
  import { BasicForm, useForm } from '@/components/Form';
  import { BasicTable, useTable } from '/@/components/Table';
  import { reactive } from 'vue';

  const state = reactive({
    data: [],
  });
  const [registerTable, { reload }] = useTable({
    api: getData,
    fetchSetting: {
      listField: 'result',
    },
    rowKey: 'trayNo',
    columns: [{ title: '托盘编号', dataIndex: 'trayNo' }],
    useSearchForm: false,
    bordered: true,
    pagination: false,
  });
  const [registerForm, { resetFields, validate }] = useForm({
    labelWidth: 60,
    baseColProps: { span: 24 },
    schemas: [
      {
        field: 'dlvType',
        component: 'Select',
        label: '出库类型',
        componentProps: {
          options: [
            { label: '投产出库', value: '0' },
            { label: '不合格出库', value: '1' },
            { label: '科研出库', value: '2' },
            { label: '其他', value: '3' },
          ],
        },
      },
    ],
    showActionButtonGroup: false,
  });
  const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(({ data }) => {
    setDrawerProps({ confirmLoading: false });
    resetFields();
    state.data = data;
    reload();
  });
  async function handleSubmit() {
    setDrawerProps({ confirmLoading: true });
    await validate();
    setDrawerProps({ confirmLoading: false });
    closeDrawer();
  }
  function getData() {
    return new Promise((rs) => rs({ result: state.data }));
  }
</script>
