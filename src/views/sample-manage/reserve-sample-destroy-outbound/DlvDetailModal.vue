<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="申请详情"
    width="80%"
    :min-height="650"
    showFooter
    :showOkBtn="showOkBtn"
    @ok="handleOk"
    okText="出库"
    @fullscreen="redoHeight"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute flex flex-col w-full h-full">
        <Description :data="desData" @register="registerDescription" :schema="schema" />

        <div class="flex-1 w-full">
          <a-tabs
            class="h-full tabs"
            default-active-key="batch"
            v-model:activeKey="currentKey"
            type="card"
            @change="redoHeight"
          >
            <a-tab-pane key="batch" tab="样本批次">
              <BasicTable @register="registerBatchTable" />
            </a-tab-pane>
            <a-tab-pane key="bag" tab="样本袋">
              <BasicTable @register="registerBagTable" />
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { DescItem, Description, useDescription } from '@/components/Description';
  import { BasicTable, useTable } from '@/components/Table';
  import { Tabs } from 'ant-design-vue';

  import { ref, computed } from 'vue';
  import {
    getDeliverSampleDetail,
    getDeliverSampleDetailByBag,
    outBandByBatch,
  } from '@/api/sample-manage/reserve-sample-destory';

  import {
    requisitionDetailByBag,
    requisitionDetailByBatch,
    searchFormSchema,
  } from '@/views/sample-manage/reserve-sample-destroy-outbound/reserve.data';
  import { useMessage } from '@/hooks/web/useMessage';
  import { GetApiCoreBankDeliverSampleDetailResponse } from '@/api/type/sampleManage';
  import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
  import { SysParamsEnum } from '@/enums/sysParamsEnum';
  import { COMPANY } from '@/enums/company';

  const globalApiStore = useGlobalApiStoreWithOut();
  const iskm = globalApiStore.getSysParams(SysParamsEnum.BloodProductionCompany) === COMPANY.KM;
  const { createMessage, createConfirm } = useMessage();

  defineEmits(['success', 'register']);

  const ATabs = Tabs;
  const ATabPane = Tabs.TabPane;

  const desData = ref({});
  const currentKey = ref('batch');
  const schema: DescItem[] = [
    {
      label: '申请单号',
      field: 'dlvNo',
    },
    {
      label: '备注',
      field: 'remark',
    },
    {
      label: '批次数量',
      field: 'batchNum',
    },
    {
      label: '样本袋数',
      field: 'sampleNum',
    },
    {
      label: '样本数量',
      field: 'totalNum',
    },
  ];

  const [registerDescription] = useDescription({
    column: 3,
    labelStyle: {
      width: '10%',
    },
  });

  const dlvNo = ref('');

  const [register, { setModalProps }] = useModalInner(async (data) => {
    dlvNo.value = data.dlvNo;
    desData.value = data;

    setModalProps({
      maskClosable: false,
      destroyOnClose: true,
    });
  });

  const selectedRow = ref<GetApiCoreBankDeliverSampleDetailResponse>([]);
  const [registerBatchTable, { clearSelectedRowKeys, reload, redoHeight: batchRedo }] = useTable({
    api: getDeliverSampleDetail,
    columns: requisitionDetailByBatch,
    afterFetch: (data) => {
      clearSelectedRowKeys();
      return data;
    },
    beforeFetch: (params) => {
      return {
        ...params,
        dlvNo: dlvNo.value,
      };
    },
    size: 'small',
    clickToRowSelect: true,
    rowSelection: {
      type: 'checkbox',
      onChange: (_, selectedRows: any) => {
        selectedRow.value = selectedRows;
      },
      getCheckboxProps: (record) => {
        return {
          disabled: record.state !== '未出库',
        };
      },
    },
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    formConfig: {
      schemas: searchFormSchema,
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : '';
      },
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    inset: true,
    isCanResizeParent: true,
  });

  const [registerBagTable, { redoHeight: bagRedo }] = useTable({
    api: getDeliverSampleDetailByBag,
    columns: requisitionDetailByBag,
    beforeFetch: (params) => {
      return {
        ...params,
        dlvNo: dlvNo.value,
      };
    },
    size: 'small',
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
    formConfig: {
      schemas: searchFormSchema,
      transformDateFunc(date) {
        return date ? date.format('YYYY-MM-DD') : '';
      },
    },
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    inset: true,
    isCanResizeParent: true,
  });
  function redoHeight() {
    batchRedo();
    bagRedo();
  }

  const showOkBtn = computed(() => currentKey.value === 'batch' && !iskm);
  async function handleOk() {
    if (!selectedRow.value.length) {
      createMessage.warn('请选择要出库的批次');
      return;
    }

    createConfirm({
      title: '确认',
      content: '确定要出库？',
      iconType: 'warning',
      onOk: async () => {
        await outBandByBatch({
          dlvNo: dlvNo.value,
          sampleBatchNos: selectedRow.value.map((item) => item?.batchNo),
        });

        createMessage.success('出库成功');

        await reload();
      },
    });
  }
</script>
<style scoped>
  .tabs :deep(.ant-tabs-content) {
    height: 100%;
  }
</style>
