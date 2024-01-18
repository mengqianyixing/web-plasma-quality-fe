<template>
  <div>
    <BasicTable @register="registerTable" :rowSelection="{ type: 'checkbox' }">
      <template #stationNo="{ record }">
        {{ getStationNameById(record?.stationNo) }}
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
    <PlasmaBatchModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { getPlasmaBatchReleases, setPlasmaBatchRelease } from '@/api/quarantine/plasma-batch';

  import { useModal } from '@/components/Modal';
  import PlasmaBatchModal from './PlasmaBatchModal.vue';

  import { columns, searchFormSchema } from './plasma-batch.data';
  import { useStation } from '@/hooks/common/useStation';
  import { onMounted, ref, watchEffect } from 'vue';

  defineOptions({ name: 'UsersAuthManagement' });

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

  const [registerModal, { openModal }] = useModal();
  const [registerTable, { reload, getForm, clearSelectedRowKeys }] = useTable({
    title: '血浆批检疫期报告列表',
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
    clickToRowSelect: true,
    rowKey: 'fkBpNo',
    rowSelection: {
      fixed: true,
      type: 'radio',
      onChange: (_, selectedRows: any) => {
        selectedRow.value = selectedRows;
      },
      getCheckboxProps: (record: any) => ({
        disabled: record.state != 'W', // 仅未复核状态可以操作
      }),
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    tableSetting: {
      size: false,
      redo: false,
      setting: false,
    },
    canResize: true,
  });

  function handleCreate() {
    console.log(selectedRow.value);
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
    console.log(selectedRow.value);
    clearSelectedRowKeys();
  }

  function handleSuccess() {
    reload();
  }
</script>
