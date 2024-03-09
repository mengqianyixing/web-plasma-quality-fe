<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #planNo="{ record }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="handlePlanNoClick(record)"
        >
          {{ record?.planNo }}
        </span>
      </template>
      <template #toolbar>
        <div class="flex gap-2">
          <a-button type="primary" @click="handleAdd" v-auth="CallbackButtonEnum.ListGeneAdd">
            新增
          </a-button>
          <a-button type="primary" @click="handleEdit" v-auth="CallbackButtonEnum.ListGeneEdit">
            编辑
          </a-button>
          <a-button type="primary" @click="handleDelete" v-auth="CallbackButtonEnum.ListGeneDelete">
            撤销
          </a-button>
          <a-button type="primary" @click="handleEnter" v-auth="CallbackButtonEnum.ListGeneEnter">
            确认
          </a-button>
          <a-button
            type="primary"
            @click="handleExport"
            v-auth="CallbackButtonEnum.ListGeneExport"
            :loading="exportLoading"
          >
            导出
          </a-button>
        </div>
      </template>
    </BasicTable>

    <SelectStationNameModal @register="registerSelectModal" @success="handleSelectSuccess" />
    <CallbackGenerationModal @register="registerGenerationModal" @success="handleSuccess" />
    <CallbackDetailModal @register="registerCallbackDetailModal" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { useModal } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';
  import { jsonToSheetXlsx } from '@/components/Excel';

  import CallbackGenerationModal from '@/views/callback/list-generation/CallbackGenerationModal.vue';
  import CallbackDetailModal from '@/views/callback/list-generation/CallbackDetailModal.vue';
  import SelectStationNameModal from '@/views/callback/list-generation/SelectStationNameModal.vue';

  import { ref, onMounted } from 'vue';

  import { columns, searchFormSchema } from './generation.data';

  import { PageWrapper } from '@/components/Page';
  import {
    createCallbackBatch,
    deleteCallback,
    getCallbackDetail,
    getCallbackListApi,
    stationNameList,
  } from '@/api/callback/list-generation';
  import {
    CallbackStateMap,
    CallbackStateValueEnum,
    donorStatusMap,
    donorStatusValueEnum,
  } from '@/enums/callbackEnum';
  import dayjs from 'dayjs';
  import { callbackConfirm } from '@/api/callback/list-confirm';
  import { CallbackButtonEnum } from '@/enums/authCodeEnum';

  defineOptions({ name: 'CallbackGeneration' });

  const selectedRow = ref<Recordable>([]);
  const stationNames = ref<Recordable>({});

  const { createConfirm, createMessage } = useMessage();

  onMounted(async () => {
    stationNames.value = await stationNameList();
    await getForm().updateSchema({
      field: 'stationNo',
      componentProps: {
        options: stationNames.value.map((it) => ({
          label: it.stationName,
          value: it.stationNo,
        })),
      },
    });
  });

  const [registerSelectModal, { openModal }] = useModal();

  const [registerGenerationModal, { openModal: openGenerationModal }] = useModal();
  const [registerCallbackDetailModal, { openModal: openCallbackDetailModal }] = useModal();

  const [registerTable, { getForm, reload, clearSelectedRowKeys }] = useTable({
    api: getCallbackListApi,
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

  function handleAdd() {
    openModal(true, {
      record: {
        options: stationNames.value.map((it) => ({
          label: it.stationName,
          value: it.stationNo,
        })),
      },
    });
  }

  function handleEdit() {
    if (selectedRow.value.length === 0) {
      createMessage.warn('请选择要编辑的名单');
      return;
    }

    if (selectedRow.value[0].state !== CallbackStateValueEnum.WIT) {
      createMessage.warn('该状态不允许编辑');
      return;
    }

    openGenerationModal(true, {
      isUpdate: true,
      record: {
        batchNo: selectedRow.value[0].planNo,
        stationNo: selectedRow.value[0].stationNo,
      },
    });

    clearSelectedRowKeys();
  }

  async function handleDelete() {
    if (selectedRow.value.length === 0) {
      createMessage.warn('请选择要撤销的名单');
      return;
    }

    if (selectedRow.value[0].state !== CallbackStateValueEnum.WIT) {
      createMessage.warn('该状态不允许撤销');
      return;
    }

    createConfirm({
      title: '确认',
      content: '确认撤消名单吗？',
      iconType: 'warning',
      onOk: async () => {
        await deleteCallback({
          callbackBatchNoes: selectedRow.value.map((it) => it.planNo),
        });

        clearSelectedRowKeys();
        await reload();
      },
    });
  }

  const exportLoading = ref(false);
  async function handleExport() {
    if (!selectedRow.value.length) {
      createMessage.warn('请选择要导出的名单');
      return;
    }

    exportLoading.value = true;
    try {
      const exportData = await getCallbackDetail({
        batchNo: selectedRow.value[0].planNo,
      });

      const _exportData = exportData!.map((it) => {
        return {
          donorNo: it.donorNo,
          donorName: it.donorName,
          gender: it.gender,
          idcardId: it.idcardId,
          donatorStatus: donorStatusMap.get(it.donatorStatus as donorStatusValueEnum),
          refuseDate: it.refuseDate ? dayjs(it.refuseDate).format('YYYY-MM-DD') : '',
          refuseReason: it.refuseReason,
          minPlasmaNo: it.minPlasmaNo,
          minCollTime: it.minCollTime ? dayjs(it.minCollTime).format('YYYY-MM-DD') : '',
          plasmaCount: it.plasmaCount,
          maxCollectTime: it.maxCollectTime ? dayjs(it.maxCollectTime).format('YYYY-MM-DD') : '',
        };
      });

      jsonToSheetXlsx<any>({
        header: {
          donorNo: '浆员编号',
          donorName: '浆员姓名',
          gender: '性别',
          idcardId: '身份证号',
          donatorStatus: '浆员状态',
          refuseDate: '拒绝日期',
          refuseReason: '拒绝原因',
          minPlasmaNo: '最早采浆血浆编号',
          minCollTime: '最早待回访采浆日期',
          plasmaCount: '待追踪袋数',
          maxCollectTime: '最后采浆日期',
        },
        filename: `${selectedRow.value[0].planNo}-回访名单.xlsx`,
        data: _exportData,
      });

      createMessage.success('导出成功');
      clearSelectedRowKeys();
    } catch (e) {
      createMessage.error('导出失败，请重试 :(');
    } finally {
      exportLoading.value = false;
    }
  }

  function handleSuccess() {
    reload();
  }

  function formatStationNo(record: Recordable) {
    return stationNames.value.find((it) => it.stationNo === record.stationNo)?.stationName;
  }

  const batchNo = ref('');
  async function handleSelectSuccess(id: string) {
    batchNo.value = await createCallbackBatch({
      stationNo: id,
    });

    openGenerationModal(true, {
      isUpdate: false,
      reload: true,
      record: {
        options: stationNames.value.map((it) => ({
          label: it.stationName,
          value: it.stationNo,
        })),
        stationNo: id,
        batchNo: batchNo.value,
      },
    });
  }

  function handlePlanNoClick(record: Recordable) {
    openCallbackDetailModal(true, {
      ...record,
      stationName: formatStationNo(record),
      state: CallbackStateMap.get(record.state),
    });
  }

  async function handleEnter() {
    if (selectedRow.value.length === 0) {
      createMessage.warn('请选择要确认的名单');
      return;
    }
    createConfirm({
      title: '确认',
      content: '名单确认后，会实时下发到各采浆公司，确认操作吗？',
      iconType: 'warning',
      onOk: async () => {
        await callbackConfirm({
          callbackBatchNoes: selectedRow.value.map((it) => it.planNo),
        });
        await reload();
      },
    });
  }
</script>
