<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #mesId="{ record }">
        <span class="text-blue-500 underline cursor-pointer" @click.stop.self="handleMesClick()">
          {{ record?.mesId }}
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

    <OperateModal @register="registerOperateModal" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { ref } from 'vue';
  import { useModal } from '@/components/Modal';

  import { columns, searchSchema } from './non.data';
  import OperateModal from '@/views/stockout/non-production-put-into/operateModal.vue';

  import { PageWrapper } from '@/components/Page';
  import { getProOrders } from '@/api/stockout/production-order';

  defineOptions({ name: 'NonProductionPutInto' });

  const [registerOperateModal, { openModal: openOperateModal }] = useModal();

  const selectedRow = ref<Recordable>([]);

  const [registerTable] = useTable({
    api: getProOrders,
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
      type: 'checkbox',
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

  // function selectRowsCheck() {
  //   if (selectedRow.value.length > 1) {
  //     warning('只能选择一条数据');
  //     return false;
  //   } else if (selectedRow.value.length === 0) {
  //     warning('请先选择一条数据');
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  function handleMesClick() {}

  function handleAdd() {
    openOperateModal(true, {
      type: 'add',
    });
  }

  function handleEdit() {
    openOperateModal(true, {
      type: 'edit',
    });
  }

  function handleCancel() {}

  function handleCompletePrepare() {}

  function handleCancelPrepare() {}

  function handleReCheck() {}

  function handleCancelReCheck() {}

  function handleCheck() {}

  function handleCancelCheck() {}

  function handleScan() {}

  // function handleSuccess() {
  //   reload();
  //   selectedRow.value = [];
  // }
</script>
