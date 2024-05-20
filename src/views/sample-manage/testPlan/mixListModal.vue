<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="混样列表"
    width="900px"
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
  import { reactive } from 'vue';
  import { mixColumns, mixSearchForm } from './data';
  import { getMixListApi } from '@/api/sample-manage/test-plan';
  import MixDetailsModal from './mixDetailsModal.vue';

  const state = reactive({ batchNo: '', planDate: '', mixType: '' });
  const [registerTable, { clearSelectedRowKeys, setPagination, reload, redoHeight }] = useTable({
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
  const [registerDtModal, { openModal: openDtModal }] = useModal();
</script>
