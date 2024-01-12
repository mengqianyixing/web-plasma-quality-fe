<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2024-01-05 16:45:55
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-12 17:27:16
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="新增"
    width="1000px"
    show-footer
    @ok="okFun"
    :minHeight="480"
    @fullscreen="redoHeight"
    @close="emit('close')"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <div class="flex-1 h-full shrink-1">
          <BasicTable @register="registerTable" />
        </div>
      </div>
    </div>
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { dtColumns, dtSearchFormSchema } from './plasmaOut.data';
  import { BasicTable, useTable } from '@/components/Table';
  import { message } from 'ant-design-vue';
  import { getPlasmaListApi, addTableApi } from '@/api/nonconformity/plasmaOut';
  import { reactive } from 'vue';

  const emit = defineEmits(['close', 'confirm']);

  const state = reactive({ dlvNo: '' });

  const [
    registerTable,
    { getSelectRows, clearSelectedRowKeys, reload, setPagination, redoHeight },
  ] = useTable({
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
  const [registerModal, { setModalProps }] = useModalInner(({ dlvNo }) => {
    state.dlvNo = dlvNo;
    setPagination({ current: 1 });
    reload();
  });
  async function okFun() {
    const rows = getSelectRows();
    if (rows.length < 1) return message.warning('请选择数据');
    try {
      setModalProps({ confirmLoading: true });
      await addTableApi({ dlvNo: state.dlvNo, plasmaNos: rows.map((_) => _.bagNo) });
      message.success('添加成功');
      emit('close');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
<style scoped lang="less"></style>
