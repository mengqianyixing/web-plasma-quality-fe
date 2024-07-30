<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="保留样本单个出库申请"
    width="80%"
    :min-height="650"
    :showOkBtn="false"
    @cancel="handleCancel"
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
              <span>已挑样本数量: {{ sampleNumTotal }}</span>
            </div>
            <div class="h-40px bg-#ffffff mt-2 flex items-center gap-2">
              <a-button type="primary" @click="handlePick"> 挑选 </a-button>
              <a-button type="primary" @click="handleDelete"> 移除 </a-button>
            </div>
          </div>
        </template>
      </vxe-grid>

      <a-pagination
        class="float-right"
        @change="handlePageChange"
        @show-size-change="handleSizeChange"
        size="small"
        show-size-changer
        show-quick-jumper
        v-model:current="pager.current"
        v-model:pageSize="pager.pageSize"
        :total="pager.total"
      />
    </div>

    <PickSingleModal @register="registerSingleModal" @success="handlePickSuccess" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicForm, useForm } from '@/components/Form';
  import { BasicModal, useModal, useModalInner } from '@/components/Modal';
  import { computed, reactive, ref, unref } from 'vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import {
    deleteDeliverSingleSample,
    getDeliverSampleSingleDetail,
  } from '@/api/sample-manage/reserve-sample-destory-single';
  import {
    saveDeliverSample,
    updateDeliverSample,
  } from '@/api/sample-manage/reserve-sample-destory';
  import { VxeGridProps, VxeTableInstance } from 'vxe-table';
  import {
    GetApiCoreBankDeliverSampleDetailSingleResponse,
    PostApiCoreBankDeliverSampleRequest,
  } from '@/api/type/sampleManage';
  import { Pagination as APagination } from 'ant-design-vue';

  import { requisitionColumns } from '@/views/sample-manage/reserve-sample-destroy-outbound-single/reserve-single.data';
  import PickSingleModal from './PickSingleModal.vue';

  const emit = defineEmits(['success', 'register']);
  const vxeRef =
    ref<
      VxeTableInstance<
        NonNullable<GetApiCoreBankDeliverSampleDetailSingleResponse['result']>[number]
      >
    >();

  const pager = reactive({
    current: 1,
    pageSize: 30,
    total: 0,
  });

  const { createMessage, createConfirm } = useMessage();
  const { warning, success } = createMessage;

  const [registerSingleModal, { openModal }] = useModal();

  const [registerForm, { validate, getFieldsValue, resetFields, setFieldsValue, updateSchema }] =
    useForm({
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
        {
          label: '类型',
          field: 'dlvType',
          defaultValue: 'RSD',
          component: 'Input',
          show: false,
        },
      ],
    });

  const tableLoading = ref(false);

  const tableData = ref<GetApiCoreBankDeliverSampleDetailSingleResponse['result'] | []>([]);
  const sampleNumTotal = computed(() => tableData.value!.length);

  const gridOptions = reactive<VxeGridProps<any>>({
    height: 600,
    border: true,
    showOverflow: true,
    align: 'center',
    rowConfig: {
      isHover: true,
    },
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
    autoResize: true,
  });

  const isAdd = ref(false);
  const [register, { closeModal, setModalProps }] = useModalInner(async (data) => {
    tableData.value = [];

    setModalProps({
      maskClosable: false,
      destroyOnClose: true,
    });
    isAdd.value = data.isAdd;
    await updateSchema({
      field: 'dlvNo',
      componentProps: {
        disabled: !data.isAdd,
      },
    });

    if (data.isAdd) {
      await resetFields();
    } else {
      await setFieldsValue({
        ...data.record,
      });
      await initTableData();
    }
  });

  const loading = ref(false);
  async function handleSaveRequisition() {
    loading.value = true;
    try {
      const values = await validate();
      if (unref(isAdd)) {
        await saveDeliverSample(values as PostApiCoreBankDeliverSampleRequest);
      } else {
        await updateDeliverSample(values as PostApiCoreBankDeliverSampleRequest);
      }
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
      content: `共有${vxeRef.value?.getCheckboxRecords().length}个样本，确认删除吗？`,
      iconType: 'warning',
      onOk: async () => {
        await deleteDeliverSingleSample({
          dlvNo: getFieldsValue()?.dlvNo,
          sampleIds: vxeRef.value!.getCheckboxRecords().map((it) => it?.sampleId)! as string[],
        });

        await initTableData();
      },
    });
  }

  async function initTableData() {
    try {
      tableLoading.value = true;
      const res = await getDeliverSampleSingleDetail({
        dlvNo: getFieldsValue()?.dlvNo,
        currPage: String(pager.current),
        pageSize: String(pager.pageSize),
      });

      tableData.value = res.result;
      pager.current = res.currPage!;
      pager.pageSize = res.pageSize!;
      pager.total = res.totalCount!;

      setTimeout(() => {
        vxeRef.value?.clearScroll();
      }, 100);
    } finally {
      tableLoading.value = false;
    }
  }

  async function handlePickSuccess() {
    await initTableData();
  }

  function handleCancel() {
    emit('success');
    closeModal();
  }

  async function handlePageChange(e) {
    pager.current = e;

    await initTableData();
  }

  async function handleSizeChange(_, size) {
    pager.pageSize = size;

    await initTableData();
  }
</script>
