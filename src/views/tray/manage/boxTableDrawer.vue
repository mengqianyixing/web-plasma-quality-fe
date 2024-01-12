<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-23 16:49:51
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-12 17:08:12
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="托盘浆箱列表"
    width="600px"
    :minHeight="400"
    @fullscreen="redoHeight"
  >
    <div class="flex h-inherit max-h-inherit min-h-inherit">
      <div class="flex-1 w-full">
        <BasicTable @register="registerTable" />
      </div>
    </div>
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { trayBoxListApi } from '@/api/tray/list';
  import { trayBoxColumns } from './manage.data';
  import { reactive } from 'vue';

  defineOptions({ name: 'BoxTableModal' });
  const state = reactive({
    trayNo: '',
  });
  const [registerTable, { reload, redoHeight }] = useTable({
    title: '',
    immediate: false,
    isCanResizeParent: true,
    size: 'small',
    api: getData,
    inset: true,
    fetchSetting: {
      listField: 'result',
    },
    pagination: false,
    rowKey: 'boxNo',
    columns: trayBoxColumns,
    useSearchForm: false,
    bordered: true,
    beforeFetch: (params) => {
      return { ...params, trayNo: state.trayNo };
    },
  });
  const [registerModal] = useModalInner(({ trayNo }) => {
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
