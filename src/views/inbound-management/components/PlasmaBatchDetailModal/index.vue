<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="验收详情"
    width="1400px"
    :minHeight="600"
    @cancel="handleClose"
  >
    <template #footer>
      <div class="absolute text-right">血浆总袋数：{{ verifyCount }}</div>
      <a-button @click="handleClose">关闭</a-button>
    </template>
    <BasicForm
      @register="registerForm"
      @submit="handleSubmit"
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
  const tableLoading = ref(false);
  const record = ref<Recordable>({});
  const tableData = ref<GetApiCoreBatchPlasmaVerifyBagResponse>([]);
  const emit = defineEmits(['close', 'register']);

  const [register, { closeModal }] = useModalInner(async (data) => {
    record.value = data.record;
    updateSchema([
      { field: 'batchNo', rules: [{ validator }] },
      { field: 'bagNo', rules: [{ validator }] },
      { field: 'nowBoxNo', rules: [{ validator }] },
      { field: 'stationBoxNo', rules: [{ validator }] },
    ]);
    await setFieldsValue({
      stationName: data.record.stationName,
      batchNo: data.record.batchNo,
      stationBoxNo: data.record.boxNo,
      verifyResult: data.record?.field ?? '',
    });
    await _getPlasmaBag({ ...getFieldsValue() });
  });
  function validator() {
    const obj = getFieldsValue();
    if (!obj.batchNo && !obj.bagNo && !obj.nowBoxNo && !obj.stationBoxNo) {
      return Promise.reject('请最少填入一项！');
    }
    return Promise.resolve();
  }

  const gridOptions = reactive<VxeGridProps<any>>({
    border: true,
    height: '500px',
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

  const [registerForm, { setFieldsValue, getFieldsValue, resetFields, updateSchema }] = useForm({
    labelWidth: 100,
    baseColProps: { flex: '0 1 285px' },
    actionColOptions: { flex: '0 1 200px' },
    schemas: searchFormSchema,
    showResetButton: false,
  });

  async function _getPlasmaBag(data) {
    try {
      tableLoading.value = true;
      const res = await getPlasmaBag(data);
      tableData.value = res;
      verifyCount.value = res.length;
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
