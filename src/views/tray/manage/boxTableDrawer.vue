<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-23 16:49:51
 * @LastEditors: zcc
 * @LastEditTime: 2023-12-23 20:56:21
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="托盘浆箱列表"
    width="600px"
  >
    <BasicTable @register="registerTable" />
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { BasicTable, useTable } from '@/components/Table';
  import { trayBoxListApi } from '@/api/tray/list';
  import { trayBoxColumns } from './manage.data';
  import { reactive } from 'vue';

  defineOptions({ name: 'BoxTableDrawer' });
  const state = reactive({
    trayNo: '',
  });
  const [registerTable, { reload }] = useTable({
    title: '',
    immediate: false,
    size: 'small',
    api: getData,
    fetchSetting: {
      listField: 'result',
    },
    pagination: false,
    rowKey: 'boxNo',
    columns: trayBoxColumns,
    useSearchForm: false,
    bordered: true,
    isCanResizeParent: true,
    beforeFetch: (params) => {
      return { ...params, trayNo: state.trayNo };
    },
  });
  const [registerDrawer] = useDrawerInner(({ trayNo }) => {
    state.trayNo = trayNo;
    reload();
  });
  function getData({ trayNo }) {
    return new Promise((rs, rj) => {
      trayBoxListApi({ trayNo })
        .then((res) => {
          rs({ result: res });
        })
        .catch(rj);
    });
  }
</script>
