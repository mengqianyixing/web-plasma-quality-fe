<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #auditId="{ record }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handlePreview(record)"
        >
          {{ record?.auditId }}
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
        <a-button type="primary" @click="handlePrint" v-auth="QualityButtonEnum.PlasmaCheckPrint">
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
  import { getBindBoxListApi } from '@/api/quality/plasma-restriction';
  import { useStation } from '@/hooks/common/useStation';
  import { PlasmaCheckStateValueEnum } from '@/enums/plasmaEnum';

  import { QualityButtonEnum } from '@/enums/authCodeEnum';

  const { stationOptions } = useStation();
  const { createMessage, createConfirm } = useMessage();

  onMounted(() => {
    watchEffect(() => {
      getForm().updateSchema({
        field: 'stationNo',
        componentProps: {
          options: stationOptions.value,
        },
      });
    });
  });

  defineOptions({ name: 'PlasmaCheck' });

  const [registerPlasmaCheckModal, { openModal: openPlasmaCheckModal }] = useModal();
  const [registerPlasmaLimitModal, { openModal: openPlasmaLimitModal }] = useModal();
  const [registerRevokeCheckModal, { openModal: openPlasmaRevokeModal }] = useModal();

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
          isPreview: false,
          isUpdate: false,
          record: selectedRowsRef.value[0],
        });
        break;
      case 'edit':
        openPlasmaCheckModal(true, {
          isPreview: false,
          isUpdate: true,
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
      isPreview: false,
      isUpdate: false,
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
      isPreview: false,
      isUpdate: true,
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

  function handlePrint() {}

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
      isPreview: true,
      isUpdate: true,
      record: record,
    });
  }

  function handleSuccess() {
    clearSelectedRowKeys();
    reload();
  }
</script>
