<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-25 14:30:13
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-19 10:59:13
-->
<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handlePick">挑选血浆</a-button>
        <a-button type="primary" @click="handleComplate">完成计划</a-button>
        <a-button type="primary" @click="handleCancelComplate">撤销计划</a-button>
        <a-button type="primary" @click="handleReview()">复核</a-button>
        <a-button type="primary" @click="handleCancelReview()">撤销复核</a-button>
        <a-button type="primary" @click="handleCheck()">审核</a-button>
        <a-button type="primary" @click="handleCancelCheck()">撤销审核</a-button>
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

  const [registerModal, { openModal }] = useModal();

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
      return message.warning('投产计划状态为' + STATUS_TEXT.get(row.state) + '不能挑选血浆');
    }
    openModal(true, row);
  }

  function success() {
    clearSelectedRowKeys();
    reload();
  }
  function handleComplate() {
    const [row] = getSelections(true);
    if (!row) return;
    handleConfirm({ api: submitComplateApi, text: '完成计划', row });
  }
  function handleCancelComplate() {
    const [row] = getSelections(true);
    if (!row) return;
    handleConfirm({ api: submitComplateCancelApi, text: '撤销计划', row });
  }

  function handleReview() {
    const [row] = getSelections(true);
    if (!row) return;
    handleConfirm({ api: submitReviewlApi, text: '复核', row });
  }
  function handleCancelReview() {
    const [row] = getSelections(true);
    if (!row) return;
    handleConfirm({ api: submitReviewCancelApi, text: '撤销复核', row });
  }
  function handleCheck() {
    const [row] = getSelections(true);
    if (!row) return;
    handleConfirm({ api: submitChecklApi, text: '审批', row });
  }
  function handleCancelCheck() {
    const [row] = getSelections(true);
    if (!row) return;
    handleConfirm({ api: submitCheckCancelApi, text: '撤销审批', row });
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

  function handleDetails(record: Recordable) {
    openModal(true, { ...record, disabled: true });
  }
</script>
