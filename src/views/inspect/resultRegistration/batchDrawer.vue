<!--
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-29 16:24:20
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-13 16:51:13
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="选择批次"
    width="1140px"
    cancelText="关闭"
    @ok="handleSubmit"
    :minHeight="600"
    @fullscreen="redoHeight"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <BasicTable @register="registerTable" />
      </div>
    </div>
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { batchColumns, batchSearchScheam } from './resultRegistration.data';
  import { getBatchListApi, submitItemDtApi } from '@/api/inspect/resultRegistration';
  import { message } from 'ant-design-vue';

  defineOptions({ name: 'LocationModel' });
  const emit = defineEmits(['confirm', 'register']);

  const [
    registerTable,
    { clearSelectedRowKeys, reload, setPagination, getSelectRows, redoHeight },
  ] = useTable({
    api: getBatchListApi,
    immediate: false,
    size: 'small',
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    formConfig: {
      schemas: batchSearchScheam,
    },
    rowKey: 'bsNo',
    columns: batchColumns,
    useSearchForm: true,
    showIndexColumn: false,
    bordered: true,
    isCanResizeParent: true,
    rowSelection: { type: 'radio' },
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
  });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async () => {
    setPagination({ current: 1 });
    reload();
  });

  async function handleSubmit() {
    const rows = getSelectRows();
    if (rows.length === 0) return message.warning('请选择一条数据');
    const [row] = rows;
    if (row.status === '未登记') {
      try {
        setModalProps({ confirmLoading: true });
        await submitItemDtApi({ bsNo: row.bsNo });
        emit('confirm', row);
        closeModal();
      } finally {
        setModalProps({ confirmLoading: false });
      }
    } else {
      emit('confirm', row);
      closeModal();
    }
  }
</script>
