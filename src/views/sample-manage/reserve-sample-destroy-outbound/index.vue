<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button
          type="primary"
          @click="handleAddRequisition"
          v-auth="SampleManageButtonEnum.SampleDestroyAdd"
          >新增
        </a-button>
        <a-button
          type="primary"
          @click="handleEditRequisition"
          v-auth="SampleManageButtonEnum.SampleDestroyEdit"
          >编辑
        </a-button>
        <a-button
          type="primary"
          @click="handleSubmitApplication"
          v-auth="SampleManageButtonEnum.SampleDestroySubmit"
          >提交申请
        </a-button>
        <a-button
          type="primary"
          @click="handleCancelApplication"
          v-auth="SampleManageButtonEnum.SampleDestroyCancelApply"
          >撤销申请
        </a-button>
        <a-button
          type="primary"
          @click="handleCheck"
          v-auth="SampleManageButtonEnum.SampleDestroyCheck"
          >审核
        </a-button>
        <a-button
          type="primary"
          @click="handleCancelCheck"
          v-auth="SampleManageButtonEnum.SampleDestroyCancelCheck"
          >撤销审核
        </a-button>
        <a-button
          type="primary"
          @click="handleOutBound"
          v-auth="SampleManageButtonEnum.SampleDestroyOutBand"
          >出库
        </a-button>
        <a-button type="primary" @click="handlePrint" :loading="reportLoading">打印 </a-button>
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

    <RequisitionModal @register="registerRequisitionModal" @success="handleSuccess" />
    <DlvDetailModal @register="registerDlvDetailModal" />
    <OutBandModal @register="registerOutBandModal" />
    <ReportModal @register="registerReportModal" />
  </PageWrapper>
</template>

<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { columns, searchFormSchema } from './reserve.data';
  import { ref } from 'vue';

  import { useModal } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';
  import {
    cancelApplication,
    cancelCheckApplication,
    checkApplication,
    getReserveSampleList,
    submitApplication,
  } from '@/api/sample-manage/reserve-sample-destory';

  import RequisitionModal from '@/views/sample-manage/reserve-sample-destroy-outbound/RequisitionModal.vue';
  import DlvDetailModal from '@/views/sample-manage/reserve-sample-destroy-outbound/DlvDetailModal.vue';
  import OutBandModal from '@/views/sample-manage/reserve-sample-destroy-outbound/OutBandModal.vue';
  import { getReportApi } from '@/api/report';
  import ReportModal from '@/components/ReportModal/index.vue';
  import { PrintServerEnum } from '@/enums/printServerEnum';
  import { SampleManageButtonEnum } from '@/enums/authCodeEnum';

  const { createConfirm, createMessage } = useMessage();
  defineOptions({ name: 'ReserveSampleDestroyOutbound' });

  const [registerRequisitionModal, { openModal: openRequisitionModal }] = useModal();
  const [registerDlvDetailModal, { openModal: openDlvDetailModal }] = useModal();
  const [registerOutBandModal, { openModal: openOutBandModal }] = useModal();
  const [registerReportModal, { openModal: openReportModal }] = useModal();

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
    openRequisitionModal(true, {
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

    openRequisitionModal(true, {
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

    openOutBandModal(true, {
      ...getSelectRows()[0],
    });
  }

  const reportLoading = ref(false);
  async function handlePrint() {
    if (getSelectRows().length === 0) {
      createMessage.warn('请选择出库申请单号');
      return;
    }

    try {
      reportLoading.value = true;
      const res = await getReportApi({
        reportKey: PrintServerEnum.RETAIN_SAMPLE_DESTROYED,
        contentKey: getSelectRows()[0]?.dlvNo,
      });
      openReportModal(true, window.URL.createObjectURL(res));
      clearSelectedRowKeys();
    } finally {
      reportLoading.value = false;
    }
  }

  function handleOpenDlvDetail(record) {
    openDlvDetailModal(true, {
      ...record,
    });
  }

  async function handleSuccess() {
    await reload();
  }
</script>
