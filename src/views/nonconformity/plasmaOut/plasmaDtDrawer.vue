<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2024-01-05 16:45:55
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-06 20:26:32
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    title="新增"
    width="1000px"
    show-footer
    @ok="okFun"
    @close="emit('close')"
  >
    <BasicTable @register="registerTable" />
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { dtColumns, dtSearchFormSchema } from './plasmaOut.data';
  import { BasicTable, useTable } from '@/components/Table';
  import { message } from 'ant-design-vue';
  import { getPlasmaListApi, addTableApi } from '@/api/nonconformity/plasmaOut';
  import { reactive } from 'vue';

  const emit = defineEmits(['close', 'confirm']);

  const state = reactive({ dlvNo: '' });

  const [registerTable, { getSelectRows, clearSelectedRowKeys, reload, setPagination }] = useTable({
    immediate: false,
    api: getPlasmaListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: dtColumns,
    size: 'small',
    useSearchForm: true,
    bordered: true,
    isCanResizeParent: true,
    rowSelection: { type: 'checkbox' },
    beforeFetch: (p) => ({
      ...p,
    }),
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
    formConfig: { schemas: dtSearchFormSchema, baseColProps: { span: 8 }, labelWidth: 90 },
  });
  const [registerDrawer, { setDrawerProps }] = useDrawerInner(({ dlvNo }) => {
    state.dlvNo = dlvNo;
    setPagination({ current: 1 });
    reload();
  });
  async function okFun() {
    const rows = getSelectRows();
    if (rows.length < 1) return message.warning('请选择数据');
    try {
      setDrawerProps({ confirmLoading: true });
      await addTableApi({ dlvNo: state.dlvNo, plasmaNos: rows.map((_) => _.bagNo) });
      message.success('添加成功');
      emit('close');
    } finally {
      setDrawerProps({ confirmLoading: false });
    }
  }
</script>
<style scoped lang="less"></style>
