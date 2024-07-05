<template>
  <div>
    <BasicTable @register="registerTable">
      <template #stationNo="{ record }">
        {{ getStationNameById(record?.stationNo) }}
      </template>
      <template
        v-for="col in slots"
        #[col.slots?.customRender]="data"
        :key="col.slots?.customRender"
      >
        <span
          class="text-blue-500 underline cursor-pointer empty-value"
          @click.stop.self="handleDetailClick(data.record, col.slots?.customRender, col.title)"
        >
          {{ get(data.record, ((col.dataIndex as any) || []).join('.')) }}
        </span>
      </template>

      <template #toolbar>
        <a-button
          type="primary"
          @click="handleCreate"
          v-auth="QuarantineButtonEnum.CreateQuarantine"
          >新增
        </a-button>
        <a-button
          type="primary"
          @click="handleDelete"
          v-auth="QuarantineButtonEnum.ResetQuarantine"
        >
          撤销
        </a-button>
        <a-button
          type="primary"
          @click="handleOption('R', '复核')"
          v-auth="QuarantineButtonEnum.ReCheckQuarantine"
        >
          复核
        </a-button>
        <a-button
          type="primary"
          @click="handlePrint"
          :loading="reportLoading"
          v-auth="QuarantineButtonEnum.PrintQuarantine"
        >
          打印
        </a-button>
        <a-button
          type="primary"
          @click="handleExport"
          :loading="loading"
          v-auth="QuarantineButtonEnum.ExportQuarantine"
        >
          导出
        </a-button>
      </template>
    </BasicTable>
    <PlasmaBatchDetailModal @register="registerDetailModal" />
    <PlasmaBatchModal @register="registerModal" @success="handleSuccess" />
    <ReportModal @register="registerReportModal" />
    <DeleteModal @register="registerDeleteModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { getPlasmaBatchReleases, setPlasmaBatchRelease } from '@/api/quarantine/plasma-batch';
  import { message } from 'ant-design-vue';

  import { useModal } from '@/components/Modal';
  import PlasmaBatchModal from './PlasmaBatchModal.vue';
  import PlasmaBatchDetailModal from './PlasmaBatchDetailModal.vue';
  import DeleteModal from './DeleteModal.vue';

  import { columns, searchFormSchema } from './plasma-batch.data';
  import { useStation } from '@/hooks/common/useStation';
  import { onMounted, ref, watchEffect } from 'vue';
  import { QuarantineButtonEnum } from '@/enums/authCodeEnum';
  import { get } from 'lodash-es';
  import ReportModal from '@/components/ReportModal/index.vue';
  import { getReportApi } from '@/api/report';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
  import { jsonToSheetXlsx, formatData, getHeader } from '@/components/Excel/src/Export2Excel';
  import { useRouter } from 'vue-router';

  defineOptions({ name: 'PlasmaBatchReport' });

  const reportLoading = ref(false);
  const loading = ref(false);
  const { currentRoute } = useRouter();
  const globalApiStore = useGlobalApiStoreWithOut();
  const { stationOptions, getStationNameById } = useStation();
  const slots = columns.filter((col) => col.slots);

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

  const [registerDetailModal, { openModal: openDetailModal }] = useModal();
  const [registerModal, { openModal }] = useModal();
  const [registerReportModal, { openModal: openReportModal }] = useModal();
  const [registerDeleteModal, { openModal: openDeleteModal }] = useModal();

  const [registerTable, { reload, getForm, clearSelectedRowKeys, getSelectRows }] = useTable({
    api: getPlasmaBatchReleases,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    rowSelection: {
      fixed: true,
      type: 'radio',
    },
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
    useSearchForm: true,

    bordered: true,
    showIndexColumn: false,

    canResize: true,
  });

  function getSelections(onlyOne: boolean, fn?: (rows: Recordable[]) => void) {
    const rows = getSelectRows();
    if (rows.length === 0) {
      message.warning('请选择一条数据');
      return [];
    } else if (rows.length > 1 && onlyOne) {
      message.warning('只能选择一条数据');
      return [];
    }
    fn?.(rows);
    return rows;
  }
  function handleDetailClick(record: Recordable, type: string, title: any) {
    openDetailModal(true, {
      record,
      type,
      title,
    });
  }

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  const { createConfirm } = useMessage();

  function handleOption(state: string, title: string) {
    getSelections(true, ([row]) => {
      createConfirm({
        iconType: 'warning',
        content: '确认' + title + '?',
        onOk: async () => {
          setPlasmaBatchRelease({
            brNo: row.brNo,
            state,
          })
            .then(() => {
              clearSelectedRowKeys();
              reload();
            })
            .catch(() => {
              reload();
            });
        },
      });
    });
  }

  function handleDelete() {
    getSelections(true, ([row]) => {
      openDeleteModal(true, {
        record: row,
      });
    });
  }

  function handlePrint() {
    getSelections(true, async ([row]) => {
      try {
        reportLoading.value = true;
        const res = await getReportApi({
          reportKey: 'BATCH_RELEASE',
          contentKey: row.brNo,
        });
        openReportModal(true, window.URL.createObjectURL(res));
        clearSelectedRowKeys();
      } finally {
        reportLoading.value = false;
      }
    });
  }

  function handleSuccess() {
    reload();
  }
  async function handleExport() {
    try {
      loading.value = true;
      const { getFieldsValue } = getForm();
      const pageSize = (await globalApiStore.getSysParamsValue('maxPageSize')) as string;

      const data = await getPlasmaBatchReleases({
        ...getFieldsValue(),
        currPage: 1,
        pageSize,
      } as any);
      if ((data.totalCount || 0) > Number(pageSize))
        return message.warning('最多只能导出【' + pageSize + '】条数据');

      const { rows, merges: headerMerge, lastLevelCols } = getHeader(columns);
      const { result, merge: bodyMerge } = formatData(
        lastLevelCols,
        data.result || [],
        rows.length,
      );
      jsonToSheetXlsx({
        data: [...rows, ...result],
        json2sheetOpts: { skipHeader: true },
        merges: [...headerMerge, ...bodyMerge],
        filename: currentRoute.value.meta.title + '.xlsx',
      });
    } finally {
      loading.value = false;
    }
  }
</script>
