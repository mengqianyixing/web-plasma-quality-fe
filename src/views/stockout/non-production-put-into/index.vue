<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #dlvNo="{ record }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handleDlvNoClick(record)"
        >
          {{ record?.dlvNo }}
        </span>
      </template>
      <template #toolbar>
        <div class="flex gap-2">
          <a-button type="primary" @click="handleAdd" v-auth="StockOutButtonEnum.NonPutIntoAdd">
            新增
          </a-button>
          <a-button type="primary" @click="handleEdit" v-auth="StockOutButtonEnum.NonPutIntoEdit">
            编辑
          </a-button>
          <a-button
            type="primary"
            @click="handleCancel"
            v-auth="StockOutButtonEnum.NonPutIntoCancel"
          >
            撤销
          </a-button>
          <a-button
            type="primary"
            @click="handleCompletePrepare"
            v-auth="StockOutButtonEnum.NonPutIntoCompletePrepare"
          >
            完成准备
          </a-button>
          <a-button
            type="primary"
            @click="handleCancelPrepare"
            v-auth="StockOutButtonEnum.NonPutIntoCancelPrepare"
          >
            撤销准备
          </a-button>
          <a-button
            type="primary"
            @click="handleReCheck"
            v-auth="StockOutButtonEnum.NonPutIntoReCheck"
          >
            复核
          </a-button>
          <a-button
            type="primary"
            @click="handleCancelReCheck"
            v-auth="StockOutButtonEnum.NonPutIntoCancelReCheck"
          >
            撤销复核
          </a-button>
          <a-button type="primary" @click="handleCheck" v-auth="StockOutButtonEnum.NonPutIntoCheck">
            审核
          </a-button>
          <a-button
            type="primary"
            @click="handleCancelCheck"
            v-auth="StockOutButtonEnum.NonPutIntoCancelCheck"
          >
            撤销审核
          </a-button>
          <a-button type="primary"> 挑浆系统 </a-button>
          <a-button type="primary" @click="handleScan" v-auth="StockOutButtonEnum.NonPutIntoScan">
            扫描出库
          </a-button>
          <a-dropdown
            v-auth="[
              NonconformityButtonEnum.PlasmaOutTransferPrint,
              NonconformityButtonEnum.PlasmaOutPlasmaPrint,
              NonconformityButtonEnum.PlasmaOutDestructionPrint,
            ]"
          >
            <a-button type="primary" :reportLoading="reportLoading"> 打印 </a-button>
            <template #overlay>
              <Menu>
                <MenuItem>
                  <a-button
                    type="link"
                    @click="handlePrint(PrintServerEnum.NON_PLASMA_TRANSFER_RECORD)"
                  >
                    非生产用血浆转移记录
                  </a-button>
                </MenuItem>
                <MenuItem>
                  <a-button type="link" @click="handlePrint(PrintServerEnum.RAW_PLASMA_TRANSFER)">
                    原料血浆转移记录
                  </a-button>
                </MenuItem>
              </Menu>
            </template>
          </a-dropdown>
        </div>
      </template>
    </BasicTable>

    <OperateModal @register="registerOperateModal" @success="handleSuccess" />
    <RevokeDlvModal @register="registerRevokeDlvModal" @success="handleSuccess" />
    <PlasmaOutModal @register="registerPlasmaOutModal" @success="handleSuccess" />
    <ReportModal @register="registerReportModal" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { useMessage } from '@/hooks/web/useMessage';
  import { createVNode, ref } from 'vue';
  import { useModal } from '@/components/Modal';

  import { columns, searchSchema } from './non.data';
  import ReportModal from '@/components/ReportModal/index.vue';
  import OperateModal from '@/views/stockout/non-production-put-into/operateModal.vue';
  import RevokeDlvModal from '@/views/stockout/non-production-put-into/RevokeDlvModal.vue';
  import PlasmaOutModal from '@/views/stockout/non-production-put-into/PlasmaOutModal.vue';

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
  import { NonconformityButtonEnum, StockOutButtonEnum } from '@/enums/authCodeEnum';
  import { PrintServerEnum } from '@/enums/printServerEnum';
  import { Menu, MenuItem, Dropdown as ADropdown } from 'ant-design-vue';
  import { getReportApi } from '@/api/report';

  defineOptions({ name: 'NonProductionPutInto' });

  const [registerOperateModal, { openModal: openOperateModal }] = useModal();
  const [registerRevokeDlvModal, { openModal: openRevokeDlvModal }] = useModal();
  const [registerPlasmaOutModal, { openModal: openPlasmaOutModal }] = useModal();
  const [registerReportModal, { openModal: openReportModal }] = useModal();

  const selectedRow = ref<Recordable>([]);
  const { createMessage, createConfirm } = useMessage();

  const [registerTable, { reload, clearSelectedRowKeys }] = useTable({
    api: getCoreBankDelivers,
    columns,
    formConfig: {
      schemas: searchSchema,
      fieldMapToTime: [['fieldTime', ['applicationStartDate', 'applicationEndDate'], 'YYYY-MM-DD']],
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

  function handleDlvNoClick(record) {
    openOperateModal(true, {
      isPreview: true,
      isUpdate: false,
      record,
    });
  }

  function handleAdd() {
    openOperateModal(true, {
      isPreview: false,
      isUpdate: false,
    });
  }

  function handleEdit() {
    if (!selectRowsCheck()) return;

    if (selectedRow.value[0].status !== '待准备') {
      createMessage.warn('该状态不支持编辑');
      return;
    }

    openOperateModal(true, {
      isPreview: false,
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

  const reportLoading = ref(false);
  async function handlePrint(field: PrintServerEnum) {
    if (!selectRowsCheck()) return;

    try {
      reportLoading.value = true;
      const res = await getReportApi({ reportKey: field, contentKey: selectedRow.value[0].dlvNo });
      openReportModal(true, window.URL.createObjectURL(res));
      clearSelectedRowKeys();
    } finally {
      reportLoading.value = false;
    }
  }
</script>
