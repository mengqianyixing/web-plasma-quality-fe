<!--
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2024-01-17 10:27:50
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-25 14:44:59
-->
<!--
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2023-12-25 14:30:13
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-25 14:41:51
-->
<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handlePick" v-auth="StockOutButtonEnum.ProductionPlanPick"
          >挑选血浆</a-button
        >
        <a-button
          type="primary"
          @click="handleComplate"
          v-auth="StockOutButtonEnum.ProductionPlanComplate"
          >完成计划</a-button
        >
        <a-button
          type="primary"
          @click="handleCancelComplate"
          v-auth="StockOutButtonEnum.ProductionPlanReComplate"
          >撤销计划</a-button
        >
        <a-button
          type="primary"
          @click="handleReview()"
          v-auth="StockOutButtonEnum.ProductionPlanReview"
          >复核</a-button
        >
        <a-button
          type="primary"
          @click="handleCancelReview()"
          v-auth="StockOutButtonEnum.ProductionPlanReReview"
          >撤销复核</a-button
        >
        <a-button
          type="primary"
          @click="handleCheck()"
          v-auth="StockOutButtonEnum.ProductionPlanCheck"
          >审核</a-button
        >
        <a-button
          type="primary"
          @click="handleCancelCheck()"
          v-auth="StockOutButtonEnum.ProductionPlanReCheck"
          >撤销审核</a-button
        >
      </template>
      <template #mesId="{ record }: { record: Recordable }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleDetails(record)"
        >
          {{ record.mesId }}
        </span>
      </template>
    </BasicTable>
    <PickedModal @register="registerModal" @success="success" @close="reload" />
    <Modal
      :open="open"
      @cancel="open = false"
      @ok="confirmCancel"
      okText="提交"
      width="300px"
      :confirmLoading="confirmLoading"
      :title="cancelText + '原因'"
    >
      <div class="m-20px">
        <BasicForm @register="registerForm" />
      </div>
    </Modal>
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { useModal } from '@/components/Modal';
  import { columns, searchFormSchema } from './production-plan.data';
  import { message, Modal } from 'ant-design-vue';
  import PickedModal from './picked-modal.vue';
  import { STATUS, STATUS_TEXT } from '@/enums/productionPlanEnum';
  import {
    getListApi,
    submitComplateApi,
    submitComplateCancelApi,
    submitReviewCancelApi,
    submitReviewlApi,
    submitCheckCancelApi,
    submitChecklApi,
  } from '@/api/stockout/production-plan';
  import { nextTick, ref } from 'vue';
  import { BasicForm, useForm } from '@/components/Form';
  import { StockOutButtonEnum } from '@/enums/authCodeEnum';

  defineOptions({ name: 'ProductionPlan' });

  const [registerModal, { openModal }] = useModal();
  const confirmLoading = ref(false);
  const open = ref(false);
  const cancelText = ref('');
  let iterator: AsyncIterator<any>;

  const [registerForm, { resetFields, clearValidate, validate }] = useForm({
    labelWidth: 80,
    baseColProps: { span: 24 },
    schemas: [
      {
        field: 'cause',
        component: 'Input',
        label: '原因',
        required: true,
      },
    ],
    showActionButtonGroup: false,
  });
  const [registerTable, { getSelectRows, clearSelectedRowKeys, reload }] = useTable({
    api: getListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: columns,
    size: 'small',
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    rowSelection: { type: 'radio' },
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
    formConfig: {
      schemas: searchFormSchema,
    },
  });

  function getSelections(onlyOne: boolean) {
    const rows = getSelectRows();
    if (rows.length === 0) {
      message.warning('请选择一条数据');
      return [];
    } else if (rows.length > 1 && onlyOne) {
      message.warning('只能选择一条数据');
      return [];
    }
    return rows;
  }
  function handlePick() {
    const [row] = getSelections(true);
    if (!row) return;
    if (row.state !== STATUS.TBP && row.state !== STATUS.PLI) {
      return message.warning(`请选择【
      ${STATUS_TEXT.get(STATUS.TBP)} 或
      ${STATUS_TEXT.get(STATUS.PLI)}
      】的数据`);
    }
    openModal(true, row);
  }

  function success() {
    clearSelectedRowKeys();
    reload();
  }

  async function confirmCancel() {
    await validate();
    iterator.next();
  }
  function handleComplate() {
    const [row] = getSelections(true);
    if (!row) return;
    if (row.state !== STATUS.PLI) {
      return message.warning(`请选择【${STATUS_TEXT.get(STATUS.PLI)}】的数据`);
    }
    handleConfirm({ api: submitComplateApi, text: '完成计划', row });
  }
  function handleCancelComplate() {
    const [row] = getSelections(true);
    if (!row) return;
    if (row.state !== STATUS.PBR) {
      return message.warning(`请选择【${STATUS_TEXT.get(STATUS.PBR)}】的数据`);
    }
    cancelText.value = '撤销计划';
    iterator = handleNext(() => handleCancelConfirm({ api: submitComplateCancelApi, row }));
    iterator.next();
  }

  function handleReview() {
    const [row] = getSelections(true);
    if (!row) return;
    if (row.state !== STATUS.PBR) {
      return message.warning(`请选择【${STATUS_TEXT.get(STATUS.PBR)}】的数据`);
    }
    handleConfirm({ api: submitReviewlApi, text: '复核', row });
  }
  function handleCancelReview() {
    const [row] = getSelections(true);
    if (!row) return;
    if (row.state !== STATUS.PLD) {
      return message.warning(`请选择【${STATUS_TEXT.get(STATUS.PLD)}】的数据`);
    }
    cancelText.value = '撤销复核';
    iterator = handleNext(() => handleCancelConfirm({ api: submitReviewCancelApi, row }));
    iterator.next();
  }
  function handleCheck() {
    const [row] = getSelections(true);
    if (!row) return;
    if (row.state !== STATUS.PLD) {
      return message.warning(`请选择【${STATUS_TEXT.get(STATUS.PLD)}】的数据`);
    }
    handleConfirm({ api: submitChecklApi, text: '审批', row });
  }
  function handleCancelCheck() {
    const [row] = getSelections(true);
    if (!row) return;
    if (row.state !== STATUS.PVD) {
      return message.warning(`请选择【${STATUS_TEXT.get(STATUS.PVD)}】的数据`);
    }
    cancelText.value = '撤销审核';
    iterator = handleNext(() => handleCancelConfirm({ api: submitCheckCancelApi, row }));
    iterator.next();
  }
  async function* handleNext(fn: Function, ...arg: any) {
    open.value = true;
    await nextTick();
    resetFields();
    yield clearValidate();
    while (true) {
      yield fn(...arg);
    }
  }
  function handleConfirm({ api, text, row }) {
    Modal.confirm({
      content: '确认' + text + '制造批号' + row.mesId + '?',
      onOk: async () => {
        await api({ orderNo: row.orderNo, cause: '.' });
        clearSelectedRowKeys();
        reload();
        message.success(text + '成功');
      },
      onCancel: () => Modal.destroyAll(),
    });
  }
  async function handleCancelConfirm({ api, row }) {
    try {
      const values = await validate();
      confirmLoading.value = true;
      await api({ orderNo: row.orderNo, cause: values.cause });
      open.value = false;
      message.success(cancelText.value + '成功');
      reload();
      clearSelectedRowKeys();
    } finally {
      confirmLoading.value = false;
    }
  }

  function handleDetails(record: Recordable) {
    openModal(true, { ...record, disabled: true });
  }
</script>
