<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2024-01-17 16:06:29
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-19 10:15:22
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="pick[activeKey].title"
    width="1170px"
    cancelText="关闭"
    :min-height="520"
    @ok="handleSubmit"
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
  import { ref } from 'vue';
  import { pick, pickingColumns, pickingSearchForm, TAB, boxScheam } from './production-plan.data';
  import { BasicTable, useTable } from '@/components/Table';
  import { message } from 'ant-design-vue';
  import { submitBoxSelectApi, submitPrepareSelectApi } from '@/api/stockout/production-plan';

  const emit = defineEmits(['confim']);
  const activeKey = ref(TAB.PREPARE);
  const orderNo = ref('');
  const [
    registerTable,
    { clearSelectedRowKeys, setColumns, setPagination, getForm, getSelectRows, redoHeight },
  ] = useTable({
    immediate: false,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    isCanResizeParent: true,
    inset: true,
    api: (p) => pick[activeKey.value].api(p),
    columns: pickingColumns[TAB.PREPARE],
    rowSelection: { type: 'checkbox' },
    size: 'small',
    useSearchForm: true,
    bordered: true,
    beforeFetch: (p) => ({ ...p, orderNo: orderNo.value }),
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
    formConfig: { schemas: pickingSearchForm },
  });
  const [registerModal, { setModalProps }] = useModalInner(async (data) => {
    const { removeSchemaByField, appendSchemaByField, resetFields } = getForm();
    activeKey.value = data.type;
    orderNo.value = data.orderNo;
    removeSchemaByField(boxScheam.field);
    if (data.type === TAB.BOX) {
      appendSchemaByField(boxScheam, void 0);
    }
    setColumns(pickingColumns[data.type]);
    setPagination({ current: 1 });
    resetFields();
  });

  async function handleSubmit() {
    const rows = getSelectRows();
    if (rows.length === 0) return message.warning('请选择数据');
    const prodPrepares = rows.map((_) => _.ppNo);
    const boxNos = rows.map((_) => _.boxNo);
    try {
      setModalProps({ confirmLoading: true });
      if (activeKey.value === TAB.PREPARE) {
        await submitPrepareSelectApi({
          orderNo: orderNo.value,
          prodPrepares,
          bagCount: rows.reduce((t, c) => ((t += c.prodBagCount), t), 0),
        });
      } else {
        await submitBoxSelectApi({
          orderNo: orderNo.value,
          boxNos,
          bagCount: rows.reduce((t, c) => ((t += c.prodBagCount), t), 0),
        });
      }
      message.success('添加成功');
      emit('confim');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
