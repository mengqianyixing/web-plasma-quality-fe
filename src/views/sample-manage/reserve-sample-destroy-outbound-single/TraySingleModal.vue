<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="托盘出库"
    width="80%"
    :min-height="650"
    showFooter
    :showOkBtn="false"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <BasicForm @register="registerForm" :submitButtonOptions="{ loading: tableLoading }" />

      <vxe-grid v-bind="gridOptions" ref="vxeRef" :loading="tableLoading" :data="tableData">
        <template #toolbar>
          <div class="flex items-center justify-end bg-[#ffffff]">
            <div>
              <a-button class="mb-8px" type="primary" @click="handleTrayOut"> 出库 </a-button>
            </div>
          </div>
        </template>
      </vxe-grid>
    </div>

    <outModal @register="registerOutModal" dlvType="RSD" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { reactive, ref } from 'vue';
  import { useMessage } from '@/hooks/web/useMessage';

  import { VxeGridProps, VxeTableInstance } from 'vxe-table';
  import { trayColumns } from '@/views/sample-manage/reserve-sample-destroy-outbound-single/reserve-single.data';
  import { keepPackOutBandTrayList } from '@/api/sample-manage/reserve-sample-destory-single';
  import {
    GetApiSearchBankSampleTraySingleResponse,
    GetApiSearchBankSampleTraySingleRequest,
  } from '@/api/type/sampleManage';
  import dayjs from 'dayjs';

  import outModal from '@/views/tray/outInStore/outModal.vue';

  defineEmits(['success', 'register']);

  const tableData = ref<GetApiSearchBankSampleTraySingleResponse[]>([]);
  const vxeRef = ref<VxeTableInstance<GetApiSearchBankSampleTraySingleResponse>>();

  const [registerOutModal, { openModal }] = useModal();
  const [registerForm, { getFieldsValue }] = useForm({
    showAdvancedButton: false,
    schemas: [
      {
        label: '托盘编号',
        field: 'trayNo',
        component: 'Input',
      },
      {
        label: '样本批号',
        field: 'batchNo',
        component: 'Input',
      },
      {
        label: '箱号',
        field: 'boxNo',
        component: 'Input',
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
    height: 580,
    align: 'center',
    size: 'small',
    rowConfig: {
      isHover: true,
    },
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
    columns: trayColumns,
    showFooter: false,
  });

  const dlvNo = ref('');
  const [register, { setModalProps }] = useModalInner(async (data) => {
    setModalProps({
      maskClosable: false,
    });
    dlvNo.value = data.dlvNo;

    await initTableData();
  });

  const { createMessage } = useMessage();

  const tableLoading = ref(false);
  async function initTableData() {
    try {
      tableLoading.value = true;
      const values = getFieldsValue();

      tableData.value = (await keepPackOutBandTrayList({
        dlvNo: dlvNo.value,
        ...values,
      } as GetApiSearchBankSampleTraySingleRequest)) as unknown as any;
    } finally {
      tableLoading.value = false;
    }
  }

  async function submitFunc() {
    await initTableData();
  }

  function handleTrayOut() {
    if (!vxeRef.value?.getCheckboxRecords().length) {
      createMessage.warn('请选择托盘');
      return;
    }

    openModal(true, {
      data: vxeRef.value?.getCheckboxRecords() ?? [],
      showSite: true,
    });
  }
</script>
