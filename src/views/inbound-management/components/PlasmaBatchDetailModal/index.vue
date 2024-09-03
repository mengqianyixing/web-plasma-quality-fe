<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="验收详情"
    width="1400px"
    :minHeight="600"
    defaultFullscreen
    :canFullscreen="false"
    @cancel="handleClose"
  >
    <template #footer>
      <div class="absolute flex gap-2">
        <div class="text-right">血浆总袋数：{{ verifyCount }}</div>
        <div class="text-right">总净重：{{ totalNetWeight }}g</div>
      </div>
      <a-button @click="handleClose">关闭</a-button>
    </template>
    <BasicForm
      @register="registerForm"
      @submit="handleSubmit"
      class="search-form"
      :submitButtonOptions="{ loading: tableLoading }"
    />
    <vxe-grid
      v-bind="gridOptions"
      :data="tableData"
      show-overflow
      class="inline-block w-100%"
      :loading="tableLoading"
    >
      <template #collectAt="{ row }">
        <span>{{ row.collectAt ? dayjs(row.collectAt).format('YYYY-MM-DD') : '-' }}</span>
      </template>
      <template #verifyAt="{ row }">
        <span>{{ row.verifyAt ? dayjs(row.verifyAt).format('YYYY-MM-DD HH:mm:ss') : '-' }}</span>
      </template>
      <template #gender="{ row }">
        <span>{{ row.gender === 'M' ? '男' : row.gender === 'F' ? '女' : '' }}</span>
      </template>
      <template #verifyState="{ row }">
        <span>{{ PlasmaStateMap.get(row?.verifyState) }}</span>
      </template>
    </vxe-grid>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { columns, searchFormSchema } from './batch.data';
  import { ref, reactive } from 'vue';
  import { getPlasmaBag } from '@/api/inbound-management/accept-plasma';
  import { VxeGridProps } from 'vxe-table';
  import dayjs from 'dayjs';
  import { GetApiCoreBatchPlasmaVerifyBagResponse } from '@/api/type/batchManage';

  import { PlasmaStateMap } from '@/enums/plasmaEnum';

  const verifyCount = ref(0);
  const totalNetWeight = ref(0);
  const tableLoading = ref(false);
  const record = ref<Recordable>({});
  const tableData = ref<GetApiCoreBatchPlasmaVerifyBagResponse>([]);
  const emit = defineEmits(['close', 'register']);

  const [register, { closeModal }] = useModalInner(async (data) => {
    record.value = data.record;
    await setFieldsValue({
      stationName: data.record.stationName,
      batchNo: data.record.batchNo,
      stationBoxNo: data.record.boxNo,
      verifyResult: data.record?.field ?? '',
    });
    await _getPlasmaBag({ ...getFieldsValue() });
  });

  const gridOptions = reactive<VxeGridProps<any>>({
    border: true,
    height: '650px',
    rowConfig: {
      isHover: true,
    },
    showOverflow: '',
    exportConfig: {},
    columnConfig: {
      resizable: true,
    },
    scrollY: {
      enabled: true,
      gt: 0,
    },
    pagerConfig: {
      enabled: false,
    },
    formConfig: {
      enabled: false,
    },
    toolbarConfig: {
      refresh: false,
      loading: false,
      export: false,
      custom: false,
    },
    columns,
    showFooter: false,
  });

  const [registerForm, { setFieldsValue, getFieldsValue, resetFields }] = useForm({
    labelWidth: 100,
    baseColProps: { flex: '0 0 373px' },
    actionColOptions: { flex: '1 1 150px', style: 'max-width:unset;' },
    schemas: searchFormSchema,
    showResetButton: false,
  });

  async function _getPlasmaBag(data) {
    try {
      tableLoading.value = true;
      const res = await getPlasmaBag(data);
      tableData.value = res;
      verifyCount.value = res.length;
      totalNetWeight.value = res.reduce((prev, next) => {
        return prev + next.netWeight!;
      }, 0);
    } finally {
      tableLoading.value = false;
    }
  }

  async function handleSubmit() {
    await _getPlasmaBag({ ...getFieldsValue() });
  }

  function handleClose() {
    resetFields();
    closeModal();
    if (getFieldsValue().boxNo) {
      emit('close', record.value);
    }
  }
</script>
<style scoped>
  /* 虚拟滚动不支持换行 最多两行  */
  ::v-deep(.no-ellipsis div) {
    overflow: unset !important;
    white-space: normal !important;
  }
</style>
