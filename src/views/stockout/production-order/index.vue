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

    <DetailModal @register="registerDetailModal" />
    <CreateModal @register="registerModal" @success="handleSuccess" />
    <CheckModal @register="registerCheckModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';

  import { useModal } from '@/components/Modal';

  import { columns, searchFormSchema } from './po.data';

  import CreateModal from './CreateModal.vue';
  import CheckModal from './CheckModal.vue';

  import {
    getProOrders,
    delProOrder,
    reCheckProOrder,
    checkProOrder,
  } from '@/api/stockout/production-order';
  import { createVNode, ref } from 'vue';

  import DetailModal from './DetailModal.vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { statusValueEnum } from '@/enums/stockoutEnum';
  import { PageWrapper } from '@/components/Page';

  defineOptions({ name: 'ProductionOrder' });

  const [registerModal, { openModal }] = useModal();
  const [registerCheckModal, { openModal: openCheckModal }] = useModal();
  const [registerDetailModal, { openModal: openDetailModal }] = useModal();

  const selectedRow = ref<Recordable>([]);

  const { createMessage, createConfirm } = useMessage();
  const { warning } = createMessage;

  const [registerTable, { reload }] = useTable({
    api: getProOrders,
    columns,
    formConfig: {
      schemas: searchFormSchema,
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

  function handleAdd() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleEdit() {
    if (!selectRowsCheck()) return;

    if (selectedRow.value[0]?.state !== statusValueEnum.TBR) {
      warning('该生产指令不是待复核状态，不可编辑');
      return;
    }

    openModal(true, {
      record: selectedRow.value[0],
      isUpdate: true,
    });
  }

  async function handleDelete() {
    if (!selectRowsCheck()) return;

    if (selectedRow.value[0]?.state !== statusValueEnum.TBR) {
      warning('该生产指令不是待复核状态，不可撤销');
      return;
    }

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

    createConfirm({
      iconType: 'warning',
      title: '复核',
      content: () =>
        createVNode('span', null, [
          '是否复核该指令  ',
          createVNode(
            'span',
            { style: 'color: red; font-size: 20px;' },
            `${selectedRow.value[0]?.mesId}`,
          ),
        ]),
      onOk: async () => {
        await reCheckProOrder(selectedRow.value[0]?.orderNo);
        await reload();
      },
    });
  }

  function handleCancelRecheck() {
    if (!selectRowsCheck()) return;

    if (selectedRow.value[0]?.state !== statusValueEnum.RVD) {
      warning('该指令不是已复核的状态');
      return;
    }

    openCheckModal(true, {
      isReCheck: true,
      record: selectedRow.value[0],
    });
  }

  function handleExamine() {
    if (!selectRowsCheck()) return;

    if (selectedRow.value[0]?.state !== statusValueEnum.RVD) {
      warning('该指令不是待审核的状态');
      return;
    }

    createConfirm({
      iconType: 'warning',
      title: '审核',
      content: () =>
        createVNode('span', null, [
          '是否审核该指令  ',
          createVNode(
            'span',
            { style: 'color: red; font-size: 20px;' },
            `${selectedRow.value[0]?.mesId}`,
          ),
        ]),
      onOk: async () => {
        await checkProOrder(selectedRow.value[0]?.orderNo);
        await reload();
      },
    });
  }

  function handleCancelExamine() {
    if (!selectRowsCheck()) return;

    if (selectedRow.value[0]?.state !== statusValueEnum.TBP) {
      warning('该指令不是待计划的状态，不可取消审核');
      return;
    }

    openCheckModal(true, {
      isReCheck: false,
      record: selectedRow.value[0],
    });
  }

  function handleSuccess() {
    reload();
    selectedRow.value = [];
  }
</script>
