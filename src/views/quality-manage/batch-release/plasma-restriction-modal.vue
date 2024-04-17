<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2024-01-23 15:56:07
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-24 18:41:56
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="血浆限制明细"
    width="1000px"
    :minHeight="520"
    cancelText="关闭"
    @ok="okFun"
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
  import { plasmaRestrictionColumns } from './batch-release.data';
  import { getPlasmaRestrictionListApi } from '@/api/quality/batch-release';
  import { ref } from 'vue';

  const orderNo = ref('');
  const emit = defineEmits(['ok', 'register']);
  const [registerModal, { closeModal }] = useModalInner((data) => {
    orderNo.value = data.orderNo;
    setPagination({ current: 1 });
    reload();
  });
  const [registerTable, { redoHeight, reload, setPagination }] = useTable({
    immediate: false,
    api: getPlasmaRestrictionListApi,
    size: 'small',
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    isCanResizeParent: true,
    inset: true,
    columns: plasmaRestrictionColumns,
    bordered: true,
    beforeFetch: (p) => ({ ...p, orderNo: orderNo.value }),
  });
  function okFun() {
    closeModal();
    emit('ok');
  }
</script>
