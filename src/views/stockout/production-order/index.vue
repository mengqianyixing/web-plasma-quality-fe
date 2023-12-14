<template>
  <div>
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #mesId="{ record }">
        <div class="z-999">
          <a-button type="link" @click="handleMesClick(record)">
            {{ record?.mesId }}
          </a-button>
        </div>
      </template>
      <template #headerTop>
        <div class="flex gap-2">
          <a-button type="primary" @click="handleAdd"> 新增 </a-button>
          <a-button type="primary" @click="handleEdit"> 编辑 </a-button>
          <a-button type="primary" @click="handleDelete"> 撤销 </a-button>
          <a-button type="primary" @click="handleRecheck"> 复核 </a-button>
          <a-button type="primary" @click="handleCancelRecheck"> 取消复核 </a-button>
          <a-button type="primary" @click="handleExamine"> 审核 </a-button>
          <a-button type="primary" @click="handleCancelExamine"> 取消审核 </a-button>
        </div>
      </template>
    </BasicTable>

    <DetailDrawer @register="registerDetailDrawer" />
    <CreateModal @register="registerModal" @success="handleSuccess" />
    <CheckModal @register="registerCheckModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';

  import { useModal } from '@/components/Modal';
  import { useDrawer } from '@/components/Drawer';

  import { columns, searchFormSchema } from './po.data';

  import CreateModal from './CreateModal.vue';
  import CheckModal from './CheckModal.vue';

  import {
    getProOrders,
    delProOrder,
    cancelReCheckProOrder,
    cancelCheckProOrder,
  } from '@/api/stockout/production-order';
  import { createVNode, ref } from 'vue';

  import DetailDrawer from './DetailDrawer.vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { statusValueEnum } from '@/enums/stockoutEnum';

  defineOptions({ name: 'DeptManagement' });

  const [registerModal, { openModal }] = useModal();
  const [registerCheckModal, { openModal: openCheckModal }] = useModal();
  const [registerDetailDrawer, { openDrawer: openDetailDrawer, setDrawerProps }] = useDrawer();

  const searchInfo = ref<Recordable>({});
  const selectedRow = ref<Recordable>([]);

  const { createMessage, createConfirm } = useMessage();
  const { warning } = createMessage;

  const [registerTable, { reload }] = useTable({
    api: getProOrders,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    clickToRowSelect: false,
    rowSelection: {
      type: 'checkbox',
      onChange: (_, selectedRows: any) => {
        selectedRow.value = selectedRows;
      },
    },
    size: 'small',
    striped: false,
    useSearchForm: true,
    showTableSetting: true,
    tableSetting: {
      size: true,
      redo: false,
      setting: false,
    },
    handleSearchInfoFn(info) {
      console.log('handleSearchInfoFn', info);
      return info;
    },
    bordered: true,
    showIndexColumn: false,
    canResize: false,
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
    openDetailDrawer(true, {
      orderNo: record?.orderNo,
    });
    setDrawerProps({
      title: '生产指令详情',
    });
  }

  function handleAdd() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleEdit() {
    if (!selectRowsCheck()) return;
    openModal(true, {
      record: selectedRow.value[0],
      isUpdate: true,
    });
  }

  async function handleDelete() {
    if (!selectRowsCheck()) return;

    createConfirm({
      iconType: 'warning',
      title: '撤销',
      content: () =>
        createVNode('span', null, [
          '是否撤销该指令  ',
          createVNode(
            'span',
            { style: 'color: red; font-size: 20px;' },
            `${selectedRow.value[0]?.mesId}`,
          ),
        ]),
      onOk: async () => {
        await delProOrder(selectedRow.value[0]?.orderNo);
        await reload();
      },
    });
  }

  async function handleRecheck() {
    if (!selectRowsCheck()) return;

    if (selectedRow.value[0]?.state !== statusValueEnum.TBR) {
      warning('该指令不是待复核的状态');
      return;
    }
    openCheckModal(true, {
      isReCheck: true,
      record: selectedRow.value[0],
    });
  }

  function handleCancelRecheck() {
    if (!selectRowsCheck()) return;

    if (selectedRow.value[0]?.state !== statusValueEnum.RVD) {
      warning('该指令不是已复核的状态');
      return;
    }

    createConfirm({
      iconType: 'warning',
      title: '取消复核',
      content: () =>
        createVNode('span', null, [
          '是否取消复核该指令  ',
          createVNode(
            'span',
            { style: 'color: red; font-size: 20px;' },
            `${selectedRow.value[0]?.mesId}`,
          ),
        ]),
      onOk: async () => {
        await cancelReCheckProOrder(selectedRow.value[0]?.orderNo);
        await reload();
      },
    });
  }

  function handleExamine() {
    if (!selectRowsCheck()) return;

    if (selectedRow.value[0]?.state !== statusValueEnum.RVD) {
      warning('该指令不是已复核的状态');
      return;
    }

    if (selectedRow.value[0]?.state === statusValueEnum.AED) {
      warning('该指令已审核');
      return;
    }

    openCheckModal(true, {
      isReCheck: false,
      record: selectedRow.value[0],
    });
  }

  function handleCancelExamine() {
    if (!selectRowsCheck()) return;

    if (selectedRow.value[0]?.state !== statusValueEnum.AED) {
      warning('该指令不是已审核的状态');
      return;
    }

    createConfirm({
      iconType: 'warning',
      title: '取消审核',
      content: () =>
        createVNode('span', null, [
          '是否取消审核该指令  ',
          createVNode(
            'span',
            { style: 'color: red; font-size: 20px;' },
            `${selectedRow.value[0]?.mesId}`,
          ),
        ]),
      onOk: async () => {
        await cancelCheckProOrder(selectedRow.value[0]?.orderNo);
        await reload();
      },
    });
  }

  function handleSuccess() {
    reload();
    selectedRow.value = [];
  }
</script>
