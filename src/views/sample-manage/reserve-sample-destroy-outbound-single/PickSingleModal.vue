<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="批量挑选保留样本"
    width="80%"
    :min-height="710"
    showFooter
    @ok="handleOk"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <BasicForm @register="registerForm" :submitButtonOptions="{ loading: tableLoading }" />

      <vxe-grid v-bind="gridOptions" ref="vxeRef" :loading="tableLoading" :data="tableData" />

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
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { reactive, ref } from 'vue';
  import { useMessage } from '@/hooks/web/useMessage';

  import { VxeGridProps, VxeTableInstance } from 'vxe-table';
  import { requisitionColumns } from '@/views/sample-manage/reserve-sample-destroy-outbound-single/reserve-single.data';
  import {
    getPickSampleSingleList,
    pickDeliverSingleSample,
  } from '@/api/sample-manage/reserve-sample-destory-single';
  import {
    GetApiCoreBankDeliverSamplePickSingleRequest,
    GetApiCoreBankDeliverSamplePickSingleResponse,
  } from '@/api/type/sampleManage';
  import dayjs from 'dayjs';
  import { Pagination as APagination } from 'ant-design-vue';
  import {
    DictionaryItemKeyEnum,
    DictionaryReasonEnum,
    getSysSecondaryDictionary,
  } from '@/api/_dictionary';

  const emit = defineEmits(['success', 'register']);

  const tableData = ref<GetApiCoreBankDeliverSamplePickSingleResponse['result']>([]);
  const vxeRef =
    ref<
      VxeTableInstance<NonNullable<GetApiCoreBankDeliverSamplePickSingleResponse['result']>[number]>
    >();
  const pager = reactive({
    current: 1,
    pageSize: 30,
    total: 0,
  });

  const [registerForm, { getFieldsValue }] = useForm({
    showAdvancedButton: false,
    baseColProps: { flex: '0 0 373px' },
    actionColOptions: { flex: '1 1 120px', style: 'max-width:unset; text-align:right;' },
    schemas: [
      {
        label: '样本批号',
        field: 'batchNo',
        component: 'Input',
        colProps: {
          span: 6,
        },
      },
      {
        label: '样本编号',
        field: 'sampleNo',
        component: 'Input',
        colProps: {
          span: 6,
        },
      },
      {
        label: '浆员编号',
        field: 'donorNo',
        component: 'Input',
        colProps: {
          span: 6,
        },
      },
      {
        label: '血浆状态',
        field: 'plasmaType',
        component: 'Select',
        componentProps: {
          options: [
            {
              label: '合格',
              value: 1,
            },
            {
              label: '不合格',
              value: 0,
            },
          ],
        },
        colProps: {
          span: 6,
        },
      },
      {
        label: '血浆不合格原因',
        field: 'unqReason',
        component: 'ApiSelect',
        componentProps: {
          api: getSysSecondaryDictionary,
          params: {
            dataKey: DictionaryReasonEnum.PlasmaFailedReason,
            dictItemTypes: [
              DictionaryItemKeyEnum.PlasmaAccept,
              DictionaryItemKeyEnum.SampleAccept,
              DictionaryItemKeyEnum.PlasmaFailed,
              DictionaryItemKeyEnum.SampleFailed,
              DictionaryItemKeyEnum.Sample,
              DictionaryItemKeyEnum.Track,
              DictionaryItemKeyEnum.Test,
              DictionaryItemKeyEnum.Quarantine,
              DictionaryItemKeyEnum.Other,
            ],
          },
          valueField: 'dictItemId',
        },
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
  });

  const dlvNo = ref('');
  let isFirst = true;
  const [register, { closeModal, setModalProps }] = useModalInner(async (data) => {
    if (isFirst === false) initTableData();
    setModalProps({
      maskClosable: false,
    });
    dlvNo.value = data.dlvNo;
  });

  const { createConfirm, createMessage } = useMessage();

  const tableLoading = ref(false);
  async function initTableData() {
    isFirst = false;
    try {
      tableLoading.value = true;
      const values = getFieldsValue();

      const originRes = await getPickSampleSingleList({
        ...values,
        currPage: String(pager.current),
        pageSize: String(pager.pageSize),
      } as GetApiCoreBankDeliverSamplePickSingleRequest);

      tableData.value = originRes?.result?.map((it, i) => ({
        ...it,
        index: i + 1 + (pager.current - 1) * pager.pageSize,
      }));
      pager.current = originRes.currPage!;
      pager.pageSize = originRes.pageSize!;
      pager.total = originRes.totalCount!;
      setTimeout(() => {
        vxeRef.value?.clearScroll();
      }, 100);
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
      content: `共有${vxeRef.value?.getCheckboxRecords().length}个，确认添加吗？`,
      iconType: 'warning',
      onOk: async () => {
        await pickDeliverSingleSample({
          dlvNo: dlvNo.value,
          sampleIds: vxeRef.value!.getCheckboxRecords().map((it) => it?.sampleId)!,
        });

        emit('success');
        closeModal();
      },
    });
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
