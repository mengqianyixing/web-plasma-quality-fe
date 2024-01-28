<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2024-01-23 15:56:07
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-26 16:01:26
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="下列血浆需挑出及入不合格库后才可进行新增放行！"
    width="800px"
    :minHeight="520"
    :showOkBtn="false"
    cancelText="关闭"
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
  import { useModalInner, BasicModal } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { nonconformityColumns } from './batch-release.data';

  const [registerModal] = useModalInner((tableData) => {
    setTableData(tableData);
  });
  const [registerTable, { redoHeight, setTableData }] = useTable({
    size: 'small',
    pagination: false,
    isCanResizeParent: true,
    inset: true,
    columns: nonconformityColumns,
    bordered: true,
  });
</script>
