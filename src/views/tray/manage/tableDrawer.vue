<template>
  <BasicDrawer v-bind="$attrs" @register="registerDrawer" showFooter title="托盘详情" width="600px">
    <BasicTable @register="registerTable" v-show="false" />
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { BasicTable, useTable } from '@/components/Table';
  import { trayDtListApi } from '@/api/tray/list';
  import { trayDtColumns, trayDtSearchSchema } from './manage.data';
  import { reactive } from 'vue';

  defineOptions({ name: 'TableDrawer' });
  const state = reactive({
    trayNo: '',
  });
  const [registerTable, { reload, setPagination }] = useTable({
    title: '',
    immediate: false,
    size: 'small',
    api: trayDtListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    formConfig: {
      labelWidth: 60,
      schemas: trayDtSearchSchema,
    },
    rowKey: 'locationNo',
    columns: trayDtColumns,
    useSearchForm: true,
    bordered: true,
    isCanResizeParent: true,
    beforeFetch: (params) => {
      return { ...params, trayNo: state.trayNo };
    },
  });
  const [registerDrawer] = useDrawerInner(({ trayNo }) => {
    state.trayNo = trayNo;
    setPagination({ current: 1 });
    reload();
  });
</script>
