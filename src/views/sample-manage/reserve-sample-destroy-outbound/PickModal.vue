<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="批量挑选保留样本批次"
    width="80%"
    :min-height="650"
    showFooter
    @ok="handleOk"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <BasicForm @register="registerForm" :submitButtonOptions="{ loading: tableLoading }" />

      <vxe-grid v-bind="gridOptions" ref="vxeRef" :loading="tableLoading" :data="tableData" />
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { nextTick, reactive, ref } from 'vue';
  import { useMessage } from '@/hooks/web/useMessage';

  import { VxeGridProps, VxeTableInstance } from 'vxe-table';
  import { requisitionColumns } from '@/views/sample-manage/reserve-sample-destroy-outbound/reserve.data';
  import { getPickSampleList, pickDeliverSample } from '@/api/sample-manage/reserve-sample-destory';
  import {
    GetApiCoreBankDeliverSamplePickRequest,
    GetApiCoreBankDeliverSamplePickResponse,
  } from '@/api/type/sampleManage';
  import dayjs from 'dayjs';
  import { useStation } from '@/hooks/common/useStation';

  const emit = defineEmits(['success', 'register']);

  const tableData = ref<GetApiCoreBankDeliverSamplePickResponse>([]);
  const vxeRef = ref<VxeTableInstance<GetApiCoreBankDeliverSamplePickResponse[number]>>();
  const { stationOptions } = useStation();

  const [registerForm, { getFieldsValue }] = useForm({
    showAdvancedButton: false,
    schemas: [
      {
        label: '采浆公司',
        field: 'stationNo',
        component: 'Select',
        componentProps: {
          options: stationOptions,
        },
        colProps: {
          span: 6,
        },
      },
      {
        label: '样本批号',
        field: 'batchNo',
        component: 'Input',
        colProps: {
          span: 6,
        },
      },
    ],
    transformDateFunc(date) {
      return dayjs(date).format('YYYY-MM-DD');
    },
    submitFunc,
    submitOnReset: true,
  });

  const gridOptions = reactive<VxeGridProps<any>>({
    border: true,
    showOverflow: true,
    height: 600,
    align: 'center',
    size: 'small',
    exportConfig: {},
    columnConfig: {
      resizable: true,
    },
    scrollY: {
      enabled: true,
    },
    checkboxConfig: {
      highlight: true,
      trigger: 'row',
      range: true,
    },
    toolbarConfig: {
      refresh: false,
      loading: false,
      export: false,
      custom: false,
    },
    columns: requisitionColumns,
    showFooter: false,
  });

  const dlvNo = ref('');
  const [register, { closeModal, setModalProps }] = useModalInner(async (data) => {
    setModalProps({
      maskClosable: false,
    });
    dlvNo.value = data.dlvNo;

    await initTableData();
  });

  const { createConfirm, createMessage } = useMessage();

  const tableLoading = ref(false);
  async function initTableData() {
    try {
      tableLoading.value = true;
      const values = getFieldsValue();

      tableData.value = (await getPickSampleList({
        ...values,
      } as GetApiCoreBankDeliverSamplePickRequest)) as unknown as any;

      await nextTick(() => {
        vxeRef.value?.setAllCheckboxRow(true);
      });
    } finally {
      tableLoading.value = false;
    }
  }

  async function submitFunc() {
    await initTableData();
  }

  async function handleOk() {
    if (!vxeRef.value?.getCheckboxRecords().length) {
      createMessage.warn('请选择要挑选的批次');

      return;
    }

    createConfirm({
      title: '确认',
      content: `共有${vxeRef.value?.getCheckboxRecords().length}个批次，确认添加吗？`,
      iconType: 'warning',
      onOk: async () => {
        await pickDeliverSample({
          dlvNo: dlvNo.value,
          batchNos: vxeRef.value!.getCheckboxRecords().map((it) => it?.batchNo)!,
        });

        emit('success');
        closeModal();
      },
    });
  }
</script>
