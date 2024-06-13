<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="混样列表"
    width="960px"
    :minHeight="480"
    @fullscreen="redoHeight"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <div class="flex-1 h-full shrink-1">
          <BasicTable @register="registerTable">
            <template #mixTubeNo="{ record }: { record: Recordable }">
              <span
                class="text-blue-500 underline cursor-pointer"
                @click.stop.self="openDtModal(true, { ...record, ...state })"
              >
                {{ record.mixTubeNo }}
              </span>
            </template>
            <template #toolbar>
              <a-button type="primary" @click="printClick" :loading="labelLoading"
                >打印管签</a-button
              >
            </template>
          </BasicTable>
        </div>
      </div>
    </div>
    <MixDetailsModal @register="registerDtModal" />
  </BasicModal>
</template>
<script setup lang="tsx">
  import { BasicTable, useTable } from '@/components/Table';
  import { BasicModal, useModal, useModalInner } from '@/components/Modal';
  import { reactive, ref } from 'vue';
  import { mixColumns, mixSearchForm } from './data';
  import { getMixListApi, printPipeLabelApi } from '@/api/sample-manage/test-plan';
  import MixDetailsModal from './mixDetailsModal.vue';
  import { message } from 'ant-design-vue';
  import { printRecord } from '@/api/tag/printRecord';

  const state = reactive({ batchNo: '', planDate: '', mixType: '' });
  const labelLoading = ref(false);
  const [
    registerTable,
    { clearSelectedRowKeys, setPagination, reload, redoHeight, getSelectRows },
  ] = useTable({
    immediate: false,
    api: getMixListApi,
    pagination: false,
    columns: mixColumns,
    size: 'small',
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    isCanResizeParent: true,
    inset: true,
    rowSelection: { type: 'checkbox' },
    beforeFetch: (p) => ({ ...p, ...state }),
    afterFetch: (res) => {
      clearSelectedRowKeys();
      return res;
    },
    formConfig: {
      schemas: mixSearchForm,
    },
  });
  const [registerModal] = useModalInner((data) => {
    state.batchNo = data.batchNo;
    state.planDate = data.planDate;
    state.mixType = data.mixType;
    setPagination({ current: 1 });
    reload();
  });
  async function printClick() {
    const rows = getSelectRows();
    if (rows.length === 0) {
      message.warning('请选择一条数据');
      return false;
    } else if (rows.length !== 0) {
      message.warning('等待接口开发！！！');
      return;
    }
    labelLoading.value = true;
    const res = await printPipeLabelApi(rows);
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
  const [registerDtModal, { openModal: openDtModal }] = useModal();
</script>
