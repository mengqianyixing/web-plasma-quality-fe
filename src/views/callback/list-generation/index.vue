<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable" :columns="columnsComputed">
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

  import { ref, onMounted, computed } from 'vue';

  import { columns, searchFormSchema, callbackDetailModalColumns } from './generation.data';

  import { PageWrapper } from '@/components/Page';
  import {
    createCallbackBatch,
    getCallbackDetail,
    getCallbackListApi,
  } from '@/api/callback/list-generation';
  import { callbackModalEnum, CallbackStateEnum } from '@/enums/callbackEnum';
  import { callbackConfirm } from '@/api/callback/list-confirm';
  import { CallbackButtonEnum } from '@/enums/authCodeEnum';
  import { useStation } from '@/hooks/common/useStation';
  import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
  import { SERVER_ENUM } from '@/enums/serverEnum';
  import { getSysParamsByParamKey } from '@/api/systemServer/params';
  import { SysParamsEnum } from '@/enums/sysParamsEnum';
  import { formatData, getHeader } from '@/components/Excel/src/Export2Excel';

  const { stationOptions, getStationNameById } = useStation();
  defineOptions({ name: 'CallbackGeneration' });

  const selectedRow = ref<Recordable>([]);
  const callbackModel = ref('');
  const isAModel = computed(() => callbackModel.value === callbackModalEnum.A);
  const columnsComputed = computed(() => {
    return isAModel.value
      ? columns
      : columns.filter((it) => !(it.title as string).includes('样本'));
  });

  const serverEnumStore = useServerEnumStoreWithOut();

  const { createConfirm, createMessage } = useMessage();

  onMounted(async () => {
    await getSysParamsByParamKey(SysParamsEnum.CallbackModel).then((res) => {
      callbackModel.value = res;
    });
    await getForm().updateSchema({
      field: 'stationNo',
      componentProps: {
        options: stationOptions,
      },
    });

    !isAModel.value &&
      (await getForm().removeSchemaByField('[sampleAcceptStartDate, sampleAcceptEndDate]'));
  });

  const [registerSelectModal, { openModal }] = useModal();

  const [registerGenerationModal, { openModal: openGenerationModal }] = useModal();
  const [registerCallbackDetailModal, { openModal: openCallbackDetailModal }] = useModal();

  const [registerTable, { getForm, reload, clearSelectedRowKeys }] = useTable({
    api: getCallbackListApi,
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
    scroll: {
      x: 0,
    },
    bordered: true,
    showIndexColumn: false,
    canResize: true,
  });

  function handleAdd() {
    openModal(true, {
      record: {
        options: stationOptions,
      },
    });
  }

  function handleEdit() {
    if (selectedRow.value.length === 0) {
      createMessage.warn('请选择要编辑的名单');
      return;
    }

    if (selectedRow.value[0].state !== CallbackStateEnum.WIT) {
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

  const exportLoading = ref(false);
  async function handleExport() {
    if (!selectedRow.value.length) {
      createMessage.warn('请选择要导出的名单');
      return;
    }

    exportLoading.value = true;
    try {
      const OriginData = await getCallbackDetail({
        batchNo: selectedRow.value[0]?.planNo,
      });
      exportLoading.value = false;
      const { rows, merges: headerMerge, lastLevelCols } = getHeader(callbackDetailModalColumns);
      const { result, merge: bodyMerge } = formatData(lastLevelCols, OriginData || [], rows.length);
      jsonToSheetXlsx({
        data: [...rows, ...result],
        json2sheetOpts: { skipHeader: true },
        merges: [...headerMerge, ...bodyMerge],
        filename: `${selectedRow.value[0]?.planNo}-回访名单.xlsx`,
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

  const batchNo = ref('');
  async function handleSelectSuccess(id: string) {
    batchNo.value = await createCallbackBatch({
      stationNo: id,
    });

    openGenerationModal(true, {
      isUpdate: false,
      reload: true,
      record: {
        options: stationOptions,
        stationNo: id,
        batchNo: batchNo.value,
      },
    });
  }

  function handlePlanNoClick(record: Recordable) {
    openCallbackDetailModal(true, {
      ...record,
      isPreview: true,
      stationName: getStationNameById(record.stationNo),
      state: serverEnumStore.getServerEnumText(SERVER_ENUM.CallbackPlanState)(record.state),
      model: callbackModel.value,
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
