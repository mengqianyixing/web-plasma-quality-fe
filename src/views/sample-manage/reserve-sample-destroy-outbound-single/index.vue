<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          type="primary"
          @click="handleAddRequisition"
          v-auth="SampleManageButtonEnum.SampleWarehouseAdd"
          >新增
        </a-button>
        <a-button
          type="primary"
          @click="handleEditRequisition"
          v-auth="SampleManageButtonEnum.SampleWarehouseEdit"
          >编辑
        </a-button>
        <a-button
          type="primary"
          @click="handleSubmitApplication"
          v-auth="SampleManageButtonEnum.SampleWarehouseSubmit"
          >提交申请
        </a-button>
        <a-button
          type="primary"
          @click="handleCancelApplication"
          v-auth="SampleManageButtonEnum.SampleWarehouseCancelApply"
          >撤销申请
        </a-button>
        <a-button
          type="primary"
          @click="handleCheck"
          v-auth="SampleManageButtonEnum.SampleWarehouseCheck"
          >审核
        </a-button>
        <a-button
          type="primary"
          @click="handleCancelCheck"
          v-auth="SampleManageButtonEnum.SampleWarehouseCancelCheck"
          >撤销审核
        </a-button>
        <a-button
          type="primary"
          @click="handleOutBound"
          v-auth="SampleManageButtonEnum.SampleWarehouseOutBand"
          >出库
        </a-button>
        <a-button
          type="primary"
          @click="handleOutBoundWMS"
          v-auth="SampleManageButtonEnum.SampleWarehouseOutBandWMS"
          >WMS出库
        </a-button>
        <a-button
          type="primary"
          @click="handleExport"
          :loading="loading"
          v-auth="SampleManageButtonEnum.SampleWarehouseExport"
          >导出
        </a-button>
      </template>
      <template #dlvNo="{ record }">
        <span
          :class="!record?.dlvNo ? 'pointer-events-none' : 'text-blue-500 underline cursor-pointer'"
          @click.stop.self="handleOpenDlvDetail(record)"
        >
          {{ record?.dlvNo }}
        </span>
      </template>
    </BasicTable>

    <RequisitionSingleModal @register="registerRequisitionSingleModal" @success="handleSuccess" />
    <DlvDetailSingleModal @register="registerDlvDetailSingleModal" />
    <OutBandSingleModal @register="registerOutBandSingleModal" />
  </PageWrapper>
</template>

<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { columns, requisitionDetail, searchFormSchema } from './reserve-single.data';

  import { useModal } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';
  import {
    cancelApplication,
    cancelCheckApplication,
    checkApplication,
    submitApplication,
    getReserveSampleList,
    outBoundWMSApi,
  } from '@/api/sample-manage/reserve-sample-destory';

  import RequisitionSingleModal from '@/views/sample-manage/reserve-sample-destroy-outbound-single/RequisitionSingleModal.vue';
  import DlvDetailSingleModal from '@/views/sample-manage/reserve-sample-destroy-outbound-single/DlvDetailSingleModal.vue';
  import OutBandSingleModal from '@/views/sample-manage/reserve-sample-destroy-outbound-single/OutBandSingleModal.vue';
  import { ref } from 'vue';
  import { message } from 'ant-design-vue';
  import { formatData, getHeader, jsonToSheetXlsx } from '@/components/Excel/src/Export2Excel';
  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
  import { getDeliverSampleSingleDetail } from '@/api/sample-manage/reserve-sample-destory-single';
  import { GetApiCoreBankDeliverSampleDetailSingleRequest } from '@/api/type/sampleManage';
  import { SampleManageButtonEnum } from '@/enums/authCodeEnum';

  const { createConfirm, createMessage } = useMessage();
  defineOptions({ name: 'ReserveSampleDestroyOutbound' });

  const globalApiStore = useGlobalApiStoreWithOut();

  const [registerRequisitionSingleModal, { openModal: openRequisitionSingleModal }] = useModal();
  const [registerDlvDetailSingleModal, { openModal: openDlvDetailSingleModal }] = useModal();
  const [registerOutBandSingleModal, { openModal: openOutBandSingleModal }] = useModal();

  const [registerTable, { reload, getSelectRows, clearSelectedRowKeys }] = useTable({
    api: getReserveSampleList,
    columns: columns,
    size: 'small',
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
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
    rowSelection: { type: 'radio' },
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
  });

  function handleAddRequisition() {
    openRequisitionSingleModal(true, {
      isAdd: true,
    });
  }

  function handleEditRequisition() {
    const rows = getSelectRows();
    const [row] = rows;
    if (rows.length === 0) {
      createMessage.warn('请选择审核申请单号');
      return;
    }
    if (row.state !== '未提交') {
      return createMessage.warn('已提交的不可修改');
    }

    openRequisitionSingleModal(true, {
      isAdd: false,
      record: getSelectRows()[0],
    });
  }

  async function handleSubmitApplication() {
    if (getSelectRows().length === 0) {
      createMessage.warn('请选择提交申请单号');
      return;
    }

    createConfirm({
      title: '确认',
      content: '是否提交申请？',
      iconType: 'warning',
      onOk: async () => {
        await submitApplication(getSelectRows()[0]?.dlvNo);

        createMessage.success('提交成功');
        await reload();
      },
    });
  }

  function handleCancelApplication() {
    if (getSelectRows().length === 0) {
      createMessage.warn('请选择撤销申请单号');
      return;
    }

    createConfirm({
      title: '确认',
      content: '是否撤销申请？',
      iconType: 'warning',
      onOk: async () => {
        await cancelApplication(getSelectRows()[0]?.dlvNo);

        createMessage.success('撤销成功');
        await reload();
      },
    });
  }

  function handleCheck() {
    if (getSelectRows().length === 0) {
      createMessage.warn('请选择审核申请单号');
      return;
    }

    createConfirm({
      title: '确认',
      content: '是否提交审核？',
      iconType: 'warning',
      onOk: async () => {
        await checkApplication(getSelectRows()[0]?.dlvNo);

        createMessage.success('审核成功');
        await reload();
      },
    });
  }

  function handleCancelCheck() {
    if (getSelectRows().length === 0) {
      createMessage.warn('请选择撤销审核申请单号');
      return;
    }

    createConfirm({
      title: '确认',
      content: '是否撤销？',
      iconType: 'warning',
      onOk: async () => {
        await cancelCheckApplication(getSelectRows()[0]?.dlvNo);

        createMessage.success('撤销成功');
        await reload();
      },
    });
  }

  function handleOutBound() {
    if (getSelectRows().length === 0) {
      createMessage.warn('请选择出库申请单号');
      return;
    }

    openOutBandSingleModal(true, {
      ...getSelectRows()[0],
    });
  }
  function handleOutBoundWMS() {
    const rows = getSelectRows();
    const [row] = rows;
    if (!row) return createMessage.warn('请选择出库申请单号');
    if (row.state !== '待出库') return createMessage.warn('请选择待出库的数据');
    createConfirm({
      title: '确认',
      content: '确认WMS出库？',
      iconType: 'warning',
      onOk: async () => {
        await outBoundWMSApi({ dlvNo: row.dlvNo });
        createMessage.success('出库成功');
        await reload();
      },
    });
  }
  const loading = ref(false);
  async function handleExport() {
    if (getSelectRows().length === 0) {
      createMessage.warn('请选择出库申请单号');
      return;
    }

    try {
      loading.value = true;
      const pageSize = (await globalApiStore.getSysParamsValue('maxPageSize')) as string;

      const data = await getDeliverSampleSingleDetail({
        currPage: '1',
        pageSize,
        dlvNo: getSelectRows()[0]?.dlvNo as string,
      } as GetApiCoreBankDeliverSampleDetailSingleRequest);
      console.log(data, 'data');
      if ((data.totalCount || 0) > Number(pageSize))
        return message.warning('最多只能导出【' + pageSize + '】条数据');

      const { rows, merges: headerMerge, lastLevelCols } = getHeader(requisitionDetail);
      const { result, merge: bodyMerge } = formatData(
        lastLevelCols,
        data.result || [],
        rows.length,
      );
      jsonToSheetXlsx({
        data: [...rows, ...result],
        json2sheetOpts: { skipHeader: true },
        merges: [...headerMerge, ...bodyMerge],
        filename: `申请单号-${getSelectRows()[0]?.dlvNo}` + '.xlsx',
      });
    } finally {
      loading.value = false;
    }
  }

  function handleOpenDlvDetail(record) {
    openDlvDetailSingleModal(true, {
      ...record,
    });
  }

  async function handleSuccess() {
    await reload();
  }
</script>
