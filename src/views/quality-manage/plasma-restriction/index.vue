<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-25 14:30:13
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-19 16:39:07
-->
<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增</a-button>
        <a-button type="primary" @click="handleCancel">撤销</a-button>
        <a-button type="primary" @click="handleReview">复核</a-button>
      </template>
      <template #boxCount="{ record }: { record: Recordable }">
        <span class="text-blue-500 underline cursor-pointer" @click.stop.self="handleDt(record)">
          {{ record.boxCount }}
        </span>
      </template>
    </BasicTable>
    <FormModal @register="registerModal" @success="success" />
    <BasicModal
      @register="registerBindModal"
      showFooter
      :title="`批次【${batchNo}】限制血浆箱列表`"
      width="800px"
      :minHeight="520"
      @fullscreen="redoHeight"
    >
      <div class="relative h-inherit max-h-inherit min-h-inherit">
        <div class="absolute w-full h-full">
          <div class="flex-1 shrink-1" style="height: calc(100% - 0px)">
            <BasicTable @register="registerBindTable" />
          </div>
        </div>
      </div>
    </BasicModal>
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { useModal, BasicModal } from '@/components/Modal';
  import { columns, searchFormschema, boxColumns } from './plasma-restriction.data';
  import { message, Modal } from 'ant-design-vue';
  import FormModal from './formModal.vue';
  import {
    getListApi,
    submitCancelApi,
    submitReviewApi,
    getBindBoxListApi,
  } from '@/api/quality/plasma-restriction';
  import { ref, nextTick } from 'vue';

  const batchNo = ref('');
  const [registerModal, { openModal }] = useModal();
  const [registerBindModal, { openModal: openBindModal }] = useModal();

  const [registerTable, { reload, getSelectRows, clearSelectedRowKeys }] = useTable({
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
    beforeFetch: (p) => ({
      ...p,
      beginTime: p.beginTime?.slice(0, 10),
      endTime: p.endTime?.slice(0, 10),
    }),
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
    formConfig: {
      schemas: searchFormschema,
    },
  });
  const [registerBindTable, { reload: reloadBind, redoHeight, setPagination }] = useTable({
    api: getBindBoxListApi,
    immediate: false,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    isCanResizeParent: true,
    inset: true,
    columns: boxColumns.slice(1),
    size: 'small',
    beforeFetch: (p) => ({ ...p, batchNo: batchNo.value }),
    bordered: true,
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
  async function handleDt(row: Recordable) {
    batchNo.value = row.batchNo;
    openBindModal(true);
    await nextTick();
    setPagination({ current: 1 });
    reloadBind();
  }
  function handleCreate() {
    openModal(true, {});
  }
  function handleCancel() {
    const [row] = getSelections(true);
    if (!row) return;
    Modal.confirm({
      content: '确认撤销批号' + row.batchNo + '血浆限制?',
      onOk: async () => {
        await submitCancelApi({ bfNo: row.bfNo });
        success();
      },
      onCancel: () => Modal.destroyAll(),
    });
  }
  function success() {
    clearSelectedRowKeys();
    reload();
  }
  function handleReview() {
    const [row] = getSelections(true);
    if (!row) return;
    Modal.confirm({
      content: '确认复核批号' + row.batchNo + '血浆限制?',
      onOk: async () => {
        await submitReviewApi({ bfNo: row.bfNo });
        success();
      },
      onCancel: () => Modal.destroyAll(),
    });
  }
</script>
