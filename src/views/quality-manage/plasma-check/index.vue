<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #auditId="{ record }">
        <span
          :class="
            !record?.auditId ? 'pointer-events-none' : 'text-blue-500 underline cursor-pointer'
          "
          @click.stop.self="handlePreview(record)"
        >
          {{ record?.auditId }}
        </span>
      </template>
      <template #batchNo="{ record }">
        <span
          :class="
            !record?.batchNo ? 'pointer-events-none' : 'text-blue-500 underline cursor-pointer'
          "
          @click.stop.self="handleBatchClick(record)"
        >
          {{ record?.batchNo }}
        </span>
      </template>
      <template #verifyCount="{ record }">
        <span
          :class="
            !record?.verifyCount ? 'pointer-events-none' : 'text-blue-500 underline cursor-pointer'
          "
          @click.stop.self="handleVerifyCountClick(record)"
        >
          {{ record?.verifyCount }}
        </span>
      </template>
      <template #unqualifiedCount="{ record }">
        <span
          :class="
            !record?.unqualifiedCount
              ? 'pointer-events-none'
              : 'text-blue-500 underline cursor-pointer'
          "
          @click.stop.self="handleUnqualifiedDetail(record)"
        >
          {{ record?.unqualifiedCount }}
        </span>
      </template>
      <template #toolbar>
        <a-button type="primary" @click="handleAdd" v-auth="QualityButtonEnum.PlasmaCheckAdd">
          新增
        </a-button>
        <a-button type="primary" @click="handleEdit" v-auth="QualityButtonEnum.PlasmaCheckEdit">
          编辑
        </a-button>
        <a-button type="primary" @click="handleDelete" v-auth="QualityButtonEnum.PlasmaCheckDelete">
          撤销审核
        </a-button>
        <a-button
          type="primary"
          @click="handleReCheck"
          v-auth="QualityButtonEnum.PlasmaCheckReCheck"
        >
          复核
        </a-button>
        <a-button
          type="primary"
          @click="handleCancelReCheck"
          v-auth="QualityButtonEnum.PlasmaCheckCancelReCheck"
        >
          撤销复核
        </a-button>
        <a-button
          type="primary"
          @click="handlePrint(PrintServerEnum.PLASMA_INSPECTION_RECORDS)"
          :loading="reportLoading"
          v-auth="QualityButtonEnum.PlasmaCheckPrint"
        >
          打印
        </a-button>
        <a-button
          type="primary"
          @click="handlePrint(PrintServerEnum.PLASMA_INSPECTION_RECORDS)"
          :loading="reportLoading"
          v-auth="QualityButtonEnum.PlasmaKMCheckPrint"
        >
          打印
        </a-button>
        <a-button
          type="primary"
          @click="handleApproval"
          v-auth="QualityButtonEnum.PlasmaCheckApproval"
        >
          批准
        </a-button>
      </template>
    </BasicTable>

    <PlasmaCheckModal @register="registerPlasmaCheckModal" @success="handleSuccess" />
    <PlasmaLimitDetailModal
      @register="registerPlasmaLimitModal"
      @success="handleLimitModalSuccess"
    />
    <RevokeCheckModal @register="registerRevokeCheckModal" @success="handleSuccess" />
    <ReportModal @register="registerReportModal" />
    <UnqualifiedDetailModal @register="registerUnqualifiedDetailModal" />
    <ResultRegistrationModal @register="registerResultRegistrationModal" />
    <PlasmaBatchDetailModal @register="registerPlasmaBatchDetailModal" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchFormSchema } from './check.data';
  import { useModal } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';

  import { onMounted, ref, watchEffect } from 'vue';
  import { PageWrapper } from '@/components/Page';
  import {
    approvalPlasmaCheck,
    getPlasmaCheckList,
    recheckPlasmaCheck,
  } from '@/api/qualify-manage/plasma-check';

  import PlasmaCheckModal from '@/views/quality-manage/plasma-check/PlasmaCheckModal.vue';
  import PlasmaLimitDetailModal from '@/views/quality-manage/plasma-check/PlasmaLimitDetailModal.vue';
  import RevokeCheckModal from '@/views/quality-manage/plasma-check/RevokeCheckModal.vue';
  import UnqualifiedDetailModal from '@/views/quality-manage/plasma-check/UnqualifiedDetailModal.vue';
  import ResultRegistrationModal from '@/views/inspect/reportRelease/resultRegistration/index.vue';
  import PlasmaBatchDetailModal from '@/views/inbound-management/components/PlasmaBatchDetailModal/index.vue';
  import { getBindBoxListApi } from '@/api/quality/plasma-restriction';
  import { useStation } from '@/hooks/common/useStation';
  import { PlasmaCheckStateValueEnum } from '@/enums/plasmaEnum';
  import ReportModal from '@/components/ReportModal/index.vue';
  import { getReportApi } from '@/api/report';
  import { QualityButtonEnum } from '@/enums/authCodeEnum';
  import { PrintServerEnum } from '@/enums/printServerEnum';
  import dayJs from 'dayjs';
  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';

  const globalApiStore = useGlobalApiStoreWithOut();
  const reportLoading = ref(false);

  const { stationOptions } = useStation();
  const { createMessage, createConfirm } = useMessage();

  onMounted(() => {
    watchEffect(() => {
      getForm().updateSchema({
        field: 'stationNo',
        componentProps: {
          options: stationOptions,
        },
      });
    });
  });

  defineOptions({ name: 'PlasmaCheck' });

  const [registerReportModal, { openModal: openReportModal }] = useModal();
  const [registerPlasmaCheckModal, { openModal: openPlasmaCheckModal }] = useModal();
  const [registerPlasmaLimitModal, { openModal: openPlasmaLimitModal }] = useModal();
  const [registerRevokeCheckModal, { openModal: openPlasmaRevokeModal }] = useModal();
  const [registerUnqualifiedDetailModal, { openModal: openUnqualifiedDetailModal }] = useModal();
  const [registerResultRegistrationModal, { openModal: openResultRegistrationModal }] = useModal();
  const [registerPlasmaBatchDetailModal, { openModal: openPlasmaBatchDetailModal }] = useModal();

  const selectedRowsRef = ref<Recordable>([]);
  const [registerTable, { reload, clearSelectedRowKeys, getForm }] = useTable({
    api: getPlasmaCheckList,
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
    afterFetch: (data) => {
      clearSelectedRowKeys();
      return data;
    },
    rowSelection: {
      type: 'radio',
      onChange(_, selectedRows) {
        selectedRowsRef.value = selectedRows;
      },
    },
    size: 'small',
    striped: false,
    useSearchForm: true,
    bordered: true,
    showIndexColumn: false,
    canResize: true,
  });

  function checkSelectedRows() {
    if (!selectedRowsRef.value.length) {
      createMessage.warn('请选择一条记录');
      return false;
    }

    return true;
  }

  type ModalFlagTuple = ['add', 'edit', 'recheck', 'approval'];

  function handleLimitModalSuccess(flag: ModalFlagTuple[number]) {
    switch (flag) {
      case 'add':
        openPlasmaCheckModal(true, {
          flag,
          record: selectedRowsRef.value[0],
        });
        break;
      case 'edit':
        openPlasmaCheckModal(true, {
          flag,
          record: selectedRowsRef.value[0],
        });
        break;
      case 'recheck':
        createConfirm({
          title: '确认',
          content: '确认复核血浆批次吗？',
          iconType: 'warning',
          onOk: async () => {
            await recheckPlasmaCheck({
              auditId: selectedRowsRef.value[0]?.auditId,
            });

            createMessage.success('复核成功');
            clearSelectedRowKeys();
            await reload();
          },
        });
        break;
      case 'approval':
        createConfirm({
          title: '确认',
          content: '确认批准血浆批次吗？',
          iconType: 'warning',
          onOk: async () => {
            await approvalPlasmaCheck({
              auditId: selectedRowsRef.value[0]?.auditId,
            });

            createMessage.success('批准成功');
            clearSelectedRowKeys();
            await reload();
          },
        });
        break;
      default:
        break;
    }
  }

  async function checkPlasmaLimit(flag: ModalFlagTuple[number]) {
    const res = await getBindBoxListApi({
      batchNo: selectedRowsRef.value[0]?.batchNo,
      currPage: 1,
      pageSize: 10,
    });

    if (!res.totalCount) {
      return true;
    } else {
      openPlasmaLimitModal(true, {
        flag,
        record: selectedRowsRef.value[0],
      });
      return false;
    }
  }

  async function handleAdd() {
    if (!checkSelectedRows()) return;

    if (selectedRowsRef.value[0].auditId) {
      createMessage.warn('已审核不支持新增');
      return;
    }

    const flag = await checkPlasmaLimit('add');

    if (!flag) return;

    openPlasmaCheckModal(true, {
      flag: 'add',
      record: selectedRowsRef.value[0],
    });
  }

  async function handleEdit() {
    if (!checkSelectedRows()) return;
    if (selectedRowsRef.value[0].auditState !== PlasmaCheckStateValueEnum.WV) {
      createMessage.warn('只有待复核状态下的血浆批审核单才允许编辑');
      return;
    }

    const flag = await checkPlasmaLimit('edit');

    if (!flag) return;

    openPlasmaCheckModal(true, {
      flag: 'edit',
      record: selectedRowsRef.value[0],
    });
  }

  async function handleDelete() {
    if (!checkSelectedRows()) return;
    if (selectedRowsRef.value[0].auditState !== PlasmaCheckStateValueEnum.WV) {
      createMessage.warn('只有待复核状态下的血浆批审核单才允许撤销审核');
      return;
    }

    openPlasmaRevokeModal(true, {
      flag: 'check',
      record: selectedRowsRef.value[0],
    });
  }

  async function handleReCheck() {
    if (!checkSelectedRows()) return;
    if (selectedRowsRef.value[0].auditState !== PlasmaCheckStateValueEnum.WV) {
      createMessage.warn('只有待复核状态下的血浆批审核单才允许复核');
      return;
    }
    const flag = await checkPlasmaLimit('recheck');

    if (!flag) return;

    createConfirm({
      title: '确认',
      content: '确认复核血浆批次吗？',
      iconType: 'warning',
      onOk: async () => {
        await recheckPlasmaCheck({
          auditId: selectedRowsRef.value[0]?.auditId,
        });

        createMessage.success('复核成功');
        clearSelectedRowKeys();
        await reload();
      },
    });
  }

  function handleCancelReCheck() {
    if (!checkSelectedRows()) return;
    if (selectedRowsRef.value[0].auditState !== PlasmaCheckStateValueEnum.WA) {
      createMessage.warn('只有待批准状态下的血浆批审核单才允许撤销复核');
      return;
    }

    openPlasmaRevokeModal(true, {
      flag: 'recheck',
      record: selectedRowsRef.value[0],
    });
  }

  async function handlePrint(reportKey: PrintServerEnum) {
    if (selectedRowsRef.value.length === 0) createMessage.warn('请选择数据');
    const row = selectedRowsRef.value[0];
    const date = (await globalApiStore.getSysParamsValue('historyReportDate')) as string;
    if (row.auditAt && dayJs(date).isAfter(row.auditAt)) {
      return createMessage.warn('历史报表请查阅纸质文档');
    }
    if (row.auditState === PlasmaCheckStateValueEnum.WC)
      return createMessage.warn('待审核不允许打印');
    try {
      reportLoading.value = true;
      const res = await getReportApi({
        reportKey,
        contentKey: row.batchNo,
      });
      openReportModal(true, window.URL.createObjectURL(res));
      clearSelectedRowKeys();
    } finally {
      reportLoading.value = false;
    }
  }

  async function handleApproval() {
    if (!checkSelectedRows()) return;
    if (selectedRowsRef.value[0].auditState !== PlasmaCheckStateValueEnum.WA) {
      createMessage.warn('只有待批准状态下的血浆批审核单才允许批准');
      return;
    }
    const flag = await checkPlasmaLimit('approval');

    if (!flag) return;

    createConfirm({
      title: '确认',
      content: '确认批准血浆批次吗？',
      iconType: 'warning',
      onOk: async () => {
        await approvalPlasmaCheck({
          auditId: selectedRowsRef.value[0]?.auditId,
        });

        createMessage.success('批准成功');
        clearSelectedRowKeys();
        await reload();
      },
    });
  }

  function handlePreview(record) {
    openPlasmaCheckModal(true, {
      flag: 'preview',
      record: record,
    });
  }

  function handleSuccess() {
    clearSelectedRowKeys();
    reload();
  }

  function handleUnqualifiedDetail(record) {
    openUnqualifiedDetailModal(true, {
      record,
    });
  }

  function handleBatchClick(record) {
    openResultRegistrationModal(true, {
      bsNo: record?.batchNo,
    });
  }

  function handleVerifyCountClick(record) {
    openPlasmaBatchDetailModal(true, {
      record,
    });
  }
</script>

<style scoped>
  :deep(.ant-table th) {
    white-space: wrap;
  }
</style>
