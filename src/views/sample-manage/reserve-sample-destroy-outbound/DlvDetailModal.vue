<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="批量挑选保留样本批次"
    width="80%"
    :min-height="650"
    showFooter
    :showOkBtn="false"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute flex flex-col w-full h-full">
        <Description :data="desData" @register="registerDescription" />

        <div class="flex-1 w-full">
          <a-tabs
            class="tabs h-full"
            default-active-key="batch"
            v-model:activeKey="currentKey"
            type="card"
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
  import { Description, useDescription } from '@/components/Description';
  import { BasicTable, useTable } from '@/components/Table';
  import { Tabs } from 'ant-design-vue';

  import { ref } from 'vue';
  import { getReserveSampleList } from '@/api/sample-manage/reserve-sample-destory';

  import {
    columns,
    searchFormSchema,
  } from '@/views/sample-manage/reserve-sample-destroy-outbound/reserve.data';

  defineEmits(['success', 'register']);

  const ATabs = Tabs;
  const ATabPane = Tabs.TabPane;

  const desData = ref([]);
  const currentKey = ref('batch');

  const [registerDescription] = useDescription({
    column: 3,
    labelStyle: {
      width: '10%',
    },
    schema: [
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
        field: '',
      },
      {
        label: '样本袋数',
        field: '',
      },
      {
        label: '样本数量',
        field: '',
      },
    ],
  });

  const [register, { setModalProps }] = useModalInner(async (data) => {
    setModalProps({
      maskClosable: false,
    });

    console.log(data, 'data');
  });

  const [registerBatchTable] = useTable({
    api: getReserveSampleList,
    columns: columns,
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

  const [registerBagTable] = useTable({
    api: getReserveSampleList,
    columns: columns,
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
</script>
<style scoped>
  .tabs :deep(.ant-tabs-content) {
    height: 100%;
  }
</style>
