<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #mesId="{ record }">
        <span class="text-blue-500 underline cursor-pointer" @click.stop.self="handleMesClick()">
          {{ record?.dlvNo }}
        </span>
      </template>
      <template #toolbar>
        <div class="flex gap-2">
          <a-button type="primary" @click="handleAdd"> 新增 </a-button>
          <a-button type="primary" @click="handleEdit"> 编辑 </a-button>
          <a-button type="primary" @click="handleCancel"> 撤销 </a-button>
          <a-button type="primary" @click="handleCompletePrepare"> 完成准备 </a-button>
          <a-button type="primary" @click="handleCancelPrepare"> 撤销准备 </a-button>
          <a-button type="primary" @click="handleReCheck"> 复核 </a-button>
          <a-button type="primary" @click="handleCancelReCheck"> 撤销复核 </a-button>
          <a-button type="primary" @click="handleCheck"> 审核 </a-button>
          <a-button type="primary" @click="handleCancelCheck"> 撤销审核 </a-button>
          <a-button type="primary" @click="handleScan"> 扫描出库 </a-button>
        </div>
      </template>
    </BasicTable>

    <OperateModal @register="registerOperateModal" @success="handleSuccess" />
    <RevokeDlvModal @register="registerRevokeDlvModal" @success="handleSuccess" />
    <PlasmaOutModal @register="registerPlasmaOutModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { useMessage } from '@/hooks/web/useMessage';
  import { createVNode, ref } from 'vue';
  import { useModal } from '@/components/Modal';

  import { columns, searchSchema } from './non.data';
  import OperateModal from '@/views/stockout/non-production-put-into/operateModal.vue';
  import RevokeDlvModal from '@/views/stockout/non-production-put-into/RevokeDlvModal.vue';
  import PlasmaOutModal from '@/views/stockout/non-production-put-into/plasmaOutModal.vue';

  import { PageWrapper } from '@/components/Page';
  import {
    checkDeliverNonProductive,
    completeDeliverNonProductive,
    getCoreBankDelivers,
    reviewDeliverNonProductive,
    revokeCheckDeliverNonProductive,
    revokeDeliverNonProductive,
    revokeReviewDeliverNonProductive,
  } from '@/api/stockout/non-productin-put-into';

  defineOptions({ name: 'NonProductionPutInto' });

  const [registerOperateModal, { openModal: openOperateModal }] = useModal();
  const [registerRevokeDlvModal, { openModal: openRevokeDlvModal }] = useModal();
  const [registerPlasmaOutModal, { openModal: openPlasmaOutModal }] = useModal();

  const selectedRow = ref<Recordable>([]);
  const { createMessage, createConfirm } = useMessage();

  const [registerTable, { reload }] = useTable({
    api: getCoreBankDelivers,
    columns,
    formConfig: {
      schemas: searchSchema,
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : '';
      },
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    clickToRowSelect: true,
    rowSelection: {
      type: 'radio',
      onChange: (_, selectedRows: any) => {
        selectedRow.value = selectedRows;
      },
    },
    size: 'small',
    striped: false,
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    canResize: true,
  });

  function selectRowsCheck() {
    if (selectedRow.value.length === 0) {
      createMessage.warning('请先选择一条数据');
      return false;
    } else {
      return true;
    }
  }

  function handleMesClick() {
    openOperateModal(true, {
      isPreview: true,
    });
  }

  function handleAdd() {
    openOperateModal(true, {
      isUpdate: false,
    });
  }

  function handleEdit() {
    if (!selectRowsCheck()) return;

    openOperateModal(true, {
      isUpdate: true,
      record: selectedRow.value[0],
    });
  }

  function handleCancel() {
    if (!selectRowsCheck()) return;

    openRevokeDlvModal(true, {
      record: selectedRow.value[0],
    });
  }

  function handleCompletePrepare() {
    createConfirm({
      title: '确认',
      content: `确认完成准备？`,
      iconType: 'warning',
      onOk: async () => {
        await completeDeliverNonProductive(selectedRow.value[0]?.dlvNo);

        createMessage.success('操作成功');
        handleSuccess();
      },
    });
  }

  function handleCancelPrepare() {
    createConfirm({
      title: '确认',
      content: `是否撤销准备？`,
      iconType: 'warning',
      onOk: async () => {
        await revokeDeliverNonProductive(selectedRow.value[0]?.dlvNo);

        createMessage.success('操作成功');
        handleSuccess();
      },
    });
  }

  function handleReCheck() {
    createConfirm({
      iconType: 'warning',
      title: '确定要通过复核吗？',
      content: () =>
        createVNode('span', { style: 'color: red;' }, [
          '申请单号：  ',
          createVNode(
            'span',
            { style: 'color: red; font-size: 20px;' },
            `${selectedRow.value[0]?.dlvNo}`,
          ),
        ]),
      onOk: async () => {
        await reviewDeliverNonProductive(selectedRow.value[0]?.dlvNo);

        createMessage.success('操作成功');
        handleSuccess();
      },
    });
  }

  function handleCancelReCheck() {
    createConfirm({
      iconType: 'warning',
      title: '是否撤销复核吗？',
      content: () =>
        createVNode('span', { style: 'color: red;' }, [
          '申请单号：  ',
          createVNode(
            'span',
            { style: 'color: red; font-size: 20px;' },
            `${selectedRow.value[0]?.dlvNo}`,
          ),
        ]),
      onOk: async () => {
        await revokeReviewDeliverNonProductive(selectedRow.value[0]?.dlvNo);

        createMessage.success('操作成功');
        handleSuccess();
      },
    });
  }

  function handleCheck() {
    createConfirm({
      iconType: 'warning',
      title: '确定要通过审核吗？',
      content: () =>
        createVNode('span', { style: 'color: red;' }, [
          '申请单号：  ',
          createVNode(
            'span',
            { style: 'color: red; font-size: 20px;' },
            `${selectedRow.value[0]?.dlvNo}`,
          ),
        ]),
      onOk: async () => {
        await checkDeliverNonProductive(selectedRow.value[0]?.dlvNo);

        createMessage.success('操作成功');
        handleSuccess();
      },
    });
  }

  function handleCancelCheck() {
    createConfirm({
      iconType: 'warning',
      title: '是否撤销审核吗？',
      content: () =>
        createVNode('span', { style: 'color: red;' }, [
          '申请单号：  ',
          createVNode(
            'span',
            { style: 'color: red; font-size: 20px;' },
            `${selectedRow.value[0]?.dlvNo}`,
          ),
        ]),
      onOk: async () => {
        await revokeCheckDeliverNonProductive(selectedRow.value[0]?.dlvNo);

        createMessage.success('操作成功');
        handleSuccess();
      },
    });
  }

  function handleScan() {
    if (!selectRowsCheck()) return;

    openPlasmaOutModal(true, {
      record: {
        dlvNo: selectedRow.value[0]?.dlvNo,
      },
    });
  }

  function handleSuccess() {
    reload();
    selectedRow.value = [];
  }
</script>
