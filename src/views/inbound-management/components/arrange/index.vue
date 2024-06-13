<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="排架列表"
    width="1000px"
    :minHeight="480"
    @fullscreen="redoHeight"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <div class="flex-1 h-full shrink-1">
          <BasicTable @register="registerTable">
            <template #toolbar>
              <a-button type="primary" @click="printClick" :loading="labelLoading"
                >打印架签</a-button
              >
              <a-button type="primary" @click="handlePrint" :loading="reportLoading"
                >打印移交记录</a-button
              >
            </template>
            <template #rackId="{ record }: { record: Recordable }">
              <span
                class="text-blue-500 underline cursor-pointer"
                @click.stop.self="handleDetails(record)"
              >
                {{ record.rackId }}
              </span>
            </template>
          </BasicTable>
        </div>
      </div>
    </div>
    <DetailsModel @register="registerDtModal" />
    <ReportModal @register="registerReportModal" />
  </BasicModal>
</template>
<script setup lang="tsx">
  import { BasicTable, useTable } from '@/components/Table';
  import { columns, searchForm } from './data';
  import { message } from 'ant-design-vue';
  import { getArrangeListApi, printArrangeLabelApi } from '@/api/inbound-management/sample-verify';
  import { BasicModal, useModal, useModalInner } from '@/components/Modal';
  import { reactive, ref } from 'vue';
  import DetailsModel from './details.vue';
  import { printRecord } from '@/api/tag/printRecord';
  import ReportModal from '@/components/ReportModal/index.vue';
  import { getReportApi } from '@/api/report';

  const state = reactive({ batchNo: '' });
  const reportLoading = ref(false);
  const labelLoading = ref(false);
  const [
    registerTable,
    { getSelectRows, clearSelectedRowKeys, setPagination, reload, redoHeight },
  ] = useTable({
    immediate: false,
    api: getArrangeListApi,
    pagination: false,
    columns: columns,
    size: 'small',
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    rowSelection: { type: 'checkbox' },
    showIndexColumn: false,
    isCanResizeParent: true,
    inset: true,
    beforeFetch: (p) => ({ ...p, ...state }),
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
    formConfig: {
      schemas: searchForm,
    },
  });
  const [registerModal] = useModalInner((data) => {
    state.batchNo = data.batchNo;
    setPagination({ current: 1 });
    reload();
  });
  const [registerReportModal, { openModal: openReportModal }] = useModal();
  const [registerDtModal, { openModal: openDtModal }] = useModal();

  async function printClick() {
    const rows = getSelectRows();
    if (rows.length === 0) {
      message.warning('请选择一条数据');
      return false;
    }
    labelLoading.value = true;
    const res = await printArrangeLabelApi({
      rackList: rows.map((it) => ({
        sampleNoRange: it.sampleNoRange,
        batchNo: it.batchNo,
        rackId: it.rackId,
      })),
    });
    let n = 0;
    try {
      for (const key in res) {
        const jsonData = JSON.parse(res[key]);
        await printRecord({
          ...jsonData,
          resolution: void 0,
          dpi: jsonData.resolution,
        });
        n++;
      }
      message.success('本次打印成功' + n + '个');
    } catch (e) {
      message.warning(`本次成功${n}个、失败${rows.length - n}个。请检查打印机状态！！！`);
    } finally {
      labelLoading.value = false;
    }
  }
  function handleDetails(record: Recordable) {
    openDtModal(true, record);
  }
  async function handlePrint() {
    try {
      reportLoading.value = true;
      const res = await getReportApi({
        reportKey: 'SAMPLE_PREPARE_AND_HANDOVER_RECORD',
        contentKey: state.batchNo,
      });
      openReportModal(true, window.URL.createObjectURL(res));
    } finally {
      reportLoading.value = false;
    }
  }
</script>
