<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    :title="`${state.title}`"
    :minHeight="600"
    width="1000px"
    :showOkBtn="false"
    cancelText="关闭"
    @fullscreen="redoHeight"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <BasicTable @register="registerTable">
          <template #cardNo="{ value }">
            <span
              v-if="state.type === 3"
              class="text-blue-500 underline cursor-pointer"
              @click.stop.self="openModal(true, { cardNo: value })"
            >
              {{ value }}
            </span>
            <span v-else>
              {{ value }}
            </span>
          </template>
        </BasicTable>
      </div>
    </div>
    <DonorModel @register="registerDonorModal" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { nextTick, reactive, ref } from 'vue';
  import {
    totalUnqualifiedColumns,
    columnsMap,
    totalUnqualifiedSearch,
    titerType,
  } from './reportRelease.data';
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { getUnqualifiedApi } from '@/api/inspect/reportRelease';
  import { getDilutionTypeApi } from '@/api/plasmaStore/inventory';
  import DonorModel from '@/__components/donor/donorModel.vue';

  const state = reactive({ reportNo: '', type: 1, title: '' });
  const titerTypeOptions = ref<Recordable[]>([]);
  const [registerDonorModal, { openModal }] = useModal();

  const [registerTable, { redoHeight, setColumns, getForm }] = useTable({
    immediate: false,
    api: getUnqualifiedApi,
    columns: totalUnqualifiedColumns,
    formConfig: { schemas: totalUnqualifiedSearch },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    size: 'small',
    useSearchForm: true,
    bordered: true,
    isCanResizeParent: true,
    inset: false,
    beforeFetch: (p) => {
      return { ...p, ...state };
    },
  });
  getDilutionTypeApi().then((res) => {
    titerTypeOptions.value = res.map((it) => ({ value: it.value, label: it.key }));
  });
  const [registerModal] = useModalInner(async ({ reportNo, type, title }) => {
    await nextTick();
    const options: Recordable[] = [];
    if (titerType[type]) {
      options.push(...titerTypeOptions.value.filter((it) => it.value.includes(titerType[type])));
    }
    const { updateSchema, resetFields } = getForm();
    state.reportNo = reportNo;
    state.type = type;
    state.title = title;
    updateSchema({
      field: 'conclusion',
      ifShow: !(type === 3 || type === 4),
      componentProps: { options },
    });
    const columns = [...totalUnqualifiedColumns, ...(columnsMap[type] || [])];
    setColumns(columns);
    resetFields();
  });
</script>
