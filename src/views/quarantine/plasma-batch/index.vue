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
          @click="handleOption('C', '撤销')"
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
      </template>
    </BasicTable>
    <PlasmaBatchDetailModal @register="registerDetailModal" />
    <PlasmaBatchModal @register="registerModal" @success="handleSuccess" />
    <ReportModal @register="registerReportModal" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import {
    getPlasmaBatchReleases,
    setPlasmaBatchRelease,
    getPlasmaBatchRelease,
  } from '@/api/quarantine/plasma-batch';
  import { Modal, message } from 'ant-design-vue';

  import { useModal } from '@/components/Modal';
  import PlasmaBatchModal from './PlasmaBatchModal.vue';
  import PlasmaBatchDetailModal from './PlasmaBatchDetailModal.vue';

  import { columns, searchFormSchema } from './plasma-batch.data';
  import { useStation } from '@/hooks/common/useStation';
  import { onMounted, ref, watchEffect } from 'vue';
  import { QuarantineButtonEnum } from '@/enums/authCodeEnum';
  import { get } from 'lodash-es';
  import ReportModal from '@/components/ReportModal/index.vue';
  import { getReportApi } from '@/api/report';

  defineOptions({ name: 'PlasmaBatchReport' });

  const reportLoading = ref(false);
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
    getPlasmaBatchRelease({ batchNo: record?.fkBpNo }).then((res) => {
      openDetailModal(true, {
        record,
        ...res,
        type,
        title,
      });
    });
  }

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleOption(state: string, title: string) {
    getSelections(true, ([row]) => {
      Modal.confirm({
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
        onCancel: () => Modal.destroyAll(),
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
</script>
