<!--
 * @Descripttion: 
 * @version: 
 * @Author: zcc
 * @Date: 2023-12-26 15:27:18
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-13 16:41:19
-->
<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="openImportModal(true, {})">新增</a-button>
        <a-button type="primary" @click="handleRemove">删除</a-button>
      </template>
      <template #sampleBatchNo="{ record }: { record: Recordable }">
        <span class="text-blue-500 underline cursor-pointer" @click.stop.self="handleDt(record)">
          {{ record.sampleBatchNo }}
        </span>
      </template>
      <template #stationName="{ record }: { record: Recordable }">
        {{ stationMap.get(record.stationNo) }}
      </template>
    </BasicTable>
    <DtModal @register="registerDtModal" />
    <ImportModal @register="registerImportModal" @close="success" />
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { useModal } from '@/components/Modal';
  import { columns, searchFormschema } from './titer.data';
  import { message, Modal } from 'ant-design-vue';
  import DtModal from './dtDrawer.vue';
  import ImportModal from './importDrawer.vue';
  import { getListApi, deleteTiterApi } from '@/api/inspect/titerImport';
  import { onMounted, ref } from 'vue';
  import { stationNameSearchApi } from '@/api/plasmaStore/entryPlasma';

  const stationMap = ref(new Map());

  const [registerDtModal, { openModal: openDtModal }] = useModal();
  const [registerImportModal, { openModal: openImportModal }] = useModal();

  const [registerTable, { getSelectRows, clearSelectedRowKeys, reload }] = useTable({
    api: getListApi,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: columns,
    size: 'small',
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    rowSelection: { type: 'radio' },
    beforeFetch: (p) => ({
      ...p,
      recordStartDate: p.recordStartDate?.slice(0, 10),
      recordEndDate: p.recordEndDate?.slice(0, 10),
    }),
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
    formConfig: {
      showAdvancedButton: false,
      schemas: searchFormschema,
    },
  });
  function handleDt(record: Recordable) {
    openDtModal(true, record);
  }
  function getSelections(onlyOne: boolean) {
    const rows = getSelectRows();
    if (rows.length === 0) {
      message.warning('请选择一条数据');
      return [];
    } else if (rows.length > 1 && onlyOne) {
      message.warning('只能选择一条数据');
      return [];
    }
    return rows;
  }

  function success() {
    clearSelectedRowKeys();
    reload();
  }
  function handleRemove() {
    const [row] = getSelections(true);
    if (!row) return;
    const { bsNo, type } = row;
    Modal.confirm({
      content: '确认删除' + bsNo + '?',
      onOk: async () => {
        await deleteTiterApi({ bsNo, type });
        clearSelectedRowKeys();
        reload();
      },
      onCancel: () => Modal.destroyAll(),
    });
  }
  onMounted(async () => {
    const res = await stationNameSearchApi();
    res.forEach((_) => {
      stationMap.value.set(_.stationNo, _.stationName);
    });
  });
</script>
