<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #mesId="{ record }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleMesClick(record)"
        >
          {{ record?.mesId }}
        </span>
      </template>
      <template #toolbar>
        <div class="flex gap-2">
          <a-button type="primary" @click="handleTrayStockOut"> 托盘出库 </a-button>
          <a-button type="primary" @click="handleBoxStockOut"> 逐箱出库 </a-button>
          <a-button type="primary" @click="handleBatchStockOut"> 整批出库 </a-button>
          <a-button type="primary" @click="handlePickPlasmaSystem"> 挑浆系统 </a-button>
          <a-button type="primary" @click="handleCancelStockOut"> 撤销出库 </a-button>
          <a-button type="primary" @click="handleBoxReceive"> 逐箱接收 </a-button>
          <a-button type="primary" @click="handleBatchReceive"> 整批接收 </a-button>
          <a-button type="primary" @click="handleCancelExamine"> 撤销接收 </a-button>
        </div>
      </template>
    </BasicTable>

    <DetailModal @register="registerDetailModal" />
    <BoxReceiveModal @register="registerReceiveModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';

  import { useModal } from '@/components/Modal';

  import { columns, searchFormSchema } from './production-put-into.data';

  import { ref } from 'vue';

  import DetailModal from './DetailModal.vue';
  import BoxReceiveModal from '@/views/stockout/production-put-into/BoxReceiveModal.vue';

  import { useMessage } from '@/hooks/web/useMessage';
  import { PageWrapper } from '@/components/Page';
  import { getListApi } from '@/api/stockout/production-plan';
  import {
    productionReceiveByBatch,
    productionReceiveRevokeByBatch,
    productionStockOutByBatch,
  } from '@/api/stockout/production-put-into';

  defineOptions({ name: 'DeptManagement' });

  const [registerDetailModal, { openModal: openDetailModal }] = useModal();
  const [registerReceiveModal, { openModal: openBoxReceiveModal }] = useModal();

  const selectedRow = ref<Recordable>([]);

  const { createMessage, createConfirm } = useMessage();
  const { warning } = createMessage;

  const [registerTable, { reload, clearSelectedRowKeys }] = useTable({
    title: '投产出库列表',
    api: getListApi,
    columns,
    formConfig: {
      schemas: searchFormSchema,
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
    size: 'large',
    striped: false,
    useSearchForm: true,
    showTableSetting: true,
    tableSetting: {
      size: false,
      redo: false,
      setting: false,
    },
    bordered: true,
    showIndexColumn: false,
    canResize: true,
  });

  function selectRowsCheck() {
    if (selectedRow.value.length > 1) {
      warning('只能选择一条数据');
      return false;
    } else if (selectedRow.value.length === 0) {
      warning('请先选择一条数据');
      return false;
    } else {
      return true;
    }
  }

  function handleMesClick(record: Recordable) {
    openDetailModal(true, {
      orderNo: record?.orderNo,
    });
  }

  function handleTrayStockOut() {}

  function handleBoxStockOut() {}

  function handleBatchStockOut() {
    if (!selectRowsCheck()) return;

    createConfirm({
      title: '确认',
      content: '请确认是否整批出库？',
      iconType: 'warning',
      onOk: async () => {
        await productionStockOutByBatch({
          orderNo: selectedRow.value[0]?.orderNo,
        });

        createMessage.success('整批出库成功');

        clearSelectedRowKeys();
        await reload();
      },
    });
  }

  function handlePickPlasmaSystem() {
    if (!selectRowsCheck()) return;

    createConfirm({
      title: '确认',
      content: '请确认是否下发出库指令到挑浆系统？此操作不可回退，请谨慎操作！',
      iconType: 'warning',
      onOk: async () => {
        createMessage.success('下发出库指令到挑浆系统成功');

        clearSelectedRowKeys();
        await reload();
      },
    });
  }

  function handleCancelStockOut() {
    if (!selectRowsCheck()) return;

    createConfirm({
      title: '确认',
      content: '请确认是否撤销出库？',
      iconType: 'warning',
      onOk: async () => {
        createMessage.success('撤销出库成功');

        clearSelectedRowKeys();
        await reload();
      },
    });
  }

  function handleBoxReceive() {
    if (!selectRowsCheck()) return;

    openBoxReceiveModal(true, {
      record: {
        orderNo: selectedRow.value[0]?.orderNo,
      },
    });
  }

  function handleBatchReceive() {
    if (!selectRowsCheck()) return;

    createConfirm({
      title: '确认',
      content: '请确认是否整批接收？',
      iconType: 'warning',
      onOk: async () => {
        await productionReceiveByBatch({
          orderNo: selectedRow.value[0]?.orderNo,
        });

        createMessage.success('整批接收成功');

        clearSelectedRowKeys();
        await reload();
      },
    });
  }

  function handleCancelExamine() {
    if (!selectRowsCheck()) return;

    createConfirm({
      title: '确认',
      content: '请确认是否撤销接收？',
      iconType: 'warning',
      onOk: async () => {
        await productionReceiveRevokeByBatch({
          orderNo: selectedRow.value[0]?.orderNo,
        });

        createMessage.success('撤销接收成功');

        clearSelectedRowKeys();
        await reload();
      },
    });
  }

  function handleSuccess() {
    reload();
    selectedRow.value = [];
  }
</script>
