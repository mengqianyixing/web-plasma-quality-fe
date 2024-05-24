<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="保留样本批量出库申请"
    width="80%"
    :min-height="650"
    @ok="handleOk"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <BasicForm @register="registerForm" />
      </div>
      <div class="flex justify-end">
        <a-button type="primary" @click="handleSaveRequisition" :loading="loading">
          保存申请单
        </a-button>
      </div>

      <vxe-grid v-bind="gridOptions" ref="vxeRef" :loading="tableLoading" :data="tableData">
        <template #toolbar>
          <div class="flex items-center justify-between mt-2 p-1">
            <div class="flex gap-5 text-17px">
              <span>批次数量: {{ 123 }}</span>
              <span>样本袋数: {{ 123 }}</span>
              <span>样本数量: {{ 123 }}</span>
            </div>
            <div class="h-40px bg-#ffffff mt-2 flex items-center gap-2">
              <a-button type="primary" @click="handlePick"> 挑选 </a-button>
              <a-button type="primary" @click="handleDelete"> 删除 </a-button>
            </div>
          </div>
        </template>
      </vxe-grid>
    </div>

    <PickModal @register="registerModal" @success="handlePickSuccess" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '@/components/Form';
  import { BasicModal, useModal, useModalInner } from '@/components/Modal';
  import { reactive, ref } from 'vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import {
    deleteDeliverSample,
    getDeliverSampleDetail,
    saveDeliverSample,
  } from '@/api/sample-manage/reserve-sample-destory';
  import { VxeGridProps, VxeTableInstance } from 'vxe-table';
  import {
    GetApiCoreBankDeliverSampleDetailResponse,
    PostApiCoreBankDeliverSampleRequest,
  } from '@/api/type/sampleManage';

  import { requisitionColumns } from '@/views/sample-manage/reserve-sample-destroy-outbound/reserve.data';
  import PickModal from './PickModal.vue';

  const emit = defineEmits(['success', 'register']);
  const vxeRef = ref<VxeTableInstance<GetApiCoreBankDeliverSampleDetailResponse[number]>>();

  const { createMessage, createConfirm } = useMessage();
  const { warning, success } = createMessage;

  const [registerModal, { openModal }] = useModal();

  const [registerForm, { validate, getFieldsValue, resetFields }] = useForm({
    showActionButtonGroup: false,
    labelWidth: 80,
    schemas: [
      {
        field: 'dlvNo',
        component: 'Input',
        label: '申请单号',
        required: true,
      },
      {
        label: '备注',
        field: 'remark',
        component: 'InputTextArea',
        componentProps: {
          rows: 1,
        },
        colProps: {
          span: 7,
        },
      },
    ],
  });

  const tableLoading = ref(false);
  const tableData = ref([]);
  const gridOptions = reactive<VxeGridProps<any>>({
    height: 600,
    border: true,
    showOverflow: true,
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
    showFooter: true,
    autoResize: true,
  });

  const [register, { closeModal, setModalProps }] = useModalInner((data) => {
    setModalProps({
      maskClosable: false,
    });

    if (data.isAdd) {
      resetFields();
    }
  });

  const loading = ref(false);
  async function handleSaveRequisition() {
    loading.value = true;
    try {
      const values = await validate();
      await saveDeliverSample(values as PostApiCoreBankDeliverSampleRequest);
      success('保存申请单成功');
    } finally {
      loading.value = false;
    }
  }

  function handlePick() {
    if (!getFieldsValue().dlvNo) {
      warning('请先填写申请单号');
      return;
    }

    openModal(true, {
      dlvNo: getFieldsValue().dlvNo,
    });
  }

  async function handleDelete() {
    if (!vxeRef.value?.getCheckboxRecords().length) {
      createMessage.warn('请选择要删除的批次');

      return;
    }

    createConfirm({
      title: '确认',
      content: `共有${vxeRef.value?.getCheckboxRecords().length}个批次，确认添加吗？`,
      iconType: 'warning',
      onOk: async () => {
        await deleteDeliverSample({
          dlvNo: getFieldsValue()?.dlvNo,
          batchNos: vxeRef.value!.getCheckboxRecords().map((it) => it?.batchNo)!,
        });

        await initTableData();
      },
    });
  }

  async function initTableData() {
    await getDeliverSampleDetail({
      dlvNo: getFieldsValue()?.dlvNo,
    });
  }

  async function handlePickSuccess() {
    await initTableData();
  }

  function handleOk() {
    emit('success');
    closeModal();
  }
</script>
