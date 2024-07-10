<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate" v-auth="SampleManageButtonEnum.TestPlanAdd"
          >新增</a-button
        >
        <a-button
          type="primary"
          :loading="loading"
          @click="handleUpdate"
          v-auth="SampleManageButtonEnum.TestPlanUpdate"
          >编辑</a-button
        >
      </template>
      <template #batchNoes="{ record }: { record: Recordable }">
        <span
          v-for="batchNo in record.batchNoes.split('；')"
          :key="batchNo"
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="openArrangeModel(true, { batchNo })"
        >
          {{ batchNo }}；
        </span>
      </template>
      <template #sampleCount="{ record }: { record: Recordable }">
        <span
          class="text-blue-500 underline cursor-pointer"
          @click.stop.self="openMixModel(true, record)"
        >
          {{ record.sampleCount }}
        </span>
      </template>
    </BasicTable>
    <FormModal @register="registerModal" @success="success" />
    <ArrangeModel @register="registerArrangeModel" />
    <MixListModal @register="registerMixModel" />
  </PageWrapper>
</template>
<script setup lang="ts">
  import { BasicTable, useTable } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { useModal } from '@/components/Modal';
  import { columns, searchFormschema } from './data';
  import { message } from 'ant-design-vue';
  import FormModal from './formModal.vue';
  import { getListApi, getFormDtApi } from '@/api/sample-manage/test-plan';
  import { SampleManageButtonEnum } from '@/enums/authCodeEnum';
  import ArrangeModel from '@/views/inbound-management/components/arrange/index.vue';
  import MixListModal from './mixListModal.vue';
  import { ref } from 'vue';

  defineOptions({ name: 'TestPlan' });

  const loading = ref(false);
  const [registerModal, { openModal }] = useModal();
  const [registerArrangeModel, { openModal: openArrangeModel }] = useModal();
  const [registerMixModel, { openModal: openMixModel }] = useModal();

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
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
    formConfig: {
      schemas: searchFormschema,
    },
  });
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
  function handleCreate() {
    openModal(true, {});
  }
  async function handleUpdate() {
    const [row] = getSelections(true);
    if (!row) return;
    loading.value = true;
    try {
      const res = await getFormDtApi({ planNo: row.planNo });
      openModal(true, res);
    } finally {
      loading.value = false;
    }
  }
  function success() {
    clearSelectedRowKeys();
    reload();
  }
</script>
