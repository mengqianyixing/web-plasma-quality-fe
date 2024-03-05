<template>
  <div>
    <BasicTable @register="registerTable">
      <template #stationNo="{ record }">
        {{ getStationNameById(record?.stationNo) }}
      </template>
      <template #unProductionCount="{ record }">
        <span
          class="empty-value text-blue-500 underline cursor-pointer"
          @click.stop.self="handleDetailClick(record, 'unProductionCount')"
        >
          {{ record?.summary?.unProductionCount }}
        </span>
      </template>
      <template #failedCount="{ record }">
        <span
          class="empty-value text-blue-500 underline cursor-pointer"
          @click.stop.self="handleDetailClick(record, 'failedCount')"
        >
          {{ record?.summary?.failedCount }}
        </span>
      </template>
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增</a-button>
        <a-button :disabled="!selectedRow.length" type="primary" @click="handleOption('C')"
          >撤销</a-button
        >
        <a-button :disabled="!selectedRow.length" type="primary" @click="handleOption('R')"
          >复核</a-button
        >
        <a-button type="primary" @click="handlePrint">打印</a-button>
      </template>
    </BasicTable>
    <PlasmaBatchDetailModal @register="registerDetailModal" />
    <PlasmaBatchModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import {
    getPlasmaBatchReleases,
    setPlasmaBatchRelease,
    getPlasmaBatchRelease,
  } from '@/api/quarantine/plasma-batch';

  import { useModal } from '@/components/Modal';
  import PlasmaBatchModal from './PlasmaBatchModal.vue';
  import PlasmaBatchDetailModal from './PlasmaBatchDetailModal.vue';

  import { columns, searchFormSchema } from './plasma-batch.data';
  import { useStation } from '@/hooks/common/useStation';
  import { onMounted, ref, watchEffect } from 'vue';

  defineOptions({ name: 'PlasmaBatchReport' });

  const selectedRow = ref<Recordable>([]);
  const { isLoading, stationOptions, getStationNameById } = useStation();

  onMounted(() => {
    watchEffect(() => {
      if (!isLoading) {
        getForm().updateSchema({
          field: 'stationNo',
          componentProps: {
            options: stationOptions.value,
          },
        });
      }
    });
  });

  const [registerDetailModal, { openModal: openDetailModal }] = useModal();
  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload, getForm, clearSelectedRowKeys }] = useTable({
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
    clickToRowSelect: false,
    rowSelection: {
      fixed: true,
      type: 'radio',
      onChange: (_, selectedRows: any) => {
        selectedRow.value = selectedRows;
      },
      // getCheckboxProps: (record: any) => ({
      //   disabled: record.state != 'W', // 仅未复核状态可以操作
      // }),
    },
    useSearchForm: true,

    bordered: true,
    showIndexColumn: false,

    canResize: true,
  });

  function handleDetailClick(record, type) {
    getPlasmaBatchRelease({ batchNo: record?.fkBpNo }).then((res) => {
      openDetailModal(true, {
        record,
        ...res,
        type,
      });
    });
  }

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleOption(state) {
    setPlasmaBatchRelease({
      brNo: selectedRow.value[0].brNo,
      state,
    })
      .then(() => {
        clearSelectedRowKeys();
        reload();
      })
      .catch(() => {
        reload();
      });
  }

  function handlePrint() {
    clearSelectedRowKeys();
  }

  function handleSuccess() {
    reload();
  }
</script>
