<template>
  <div>
    <BasicTable @register="registerTable">
      <template #stationNo="{ record }">
        {{ getStationNameById(record?.stationNo) }}
      </template>
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增</a-button>
        <a-button type="primary" @click="handleOption">撤销</a-button>
        <a-button type="primary" @click="handleOption">复核</a-button>
        <a-button type="primary" @click="handlePrint">打印</a-button>
      </template>
    </BasicTable>
    <PlasmaBatchModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '@/components/Table';
  import { getPlasmaBatchReleases } from '@/api/quarantine/plasma-batch';

  import { useModal } from '@/components/Modal';
  import PlasmaBatchModal from './PlasmaBatchModal.vue';

  import { columns, searchFormSchema } from './plasma-batch.data';
  import { useStation } from '@/hooks/common/useStation';
  import { onMounted, watchEffect } from 'vue';

  defineOptions({ name: 'UsersAuthManagement' });

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
  const [registerTable, { reload, getForm }] = useTable({
    title: '血浆批检疫期报告列表',
    // rowSelection: {
    //   type: 'checkbox',
    //   onChange: (_, selectedRows: any) => {
    //     selectedRow.value = selectedRows;
    //   },
    // },
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
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
  });

  function handleCreate() {
    openModal(true, {
      isUpdate: false,
    });
  }

  function handleOption() {}

  function handlePrint() {}

  function handleSuccess() {
    reload();
  }
</script>
