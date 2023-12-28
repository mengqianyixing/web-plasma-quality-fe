<template>
  <PageWrapper>
    <Description @register="register">
      <template #action>
        <a-button type="primary" @click="handleAcceptSample">接收</a-button>
      </template>
    </Description>
    <SelectSampleBatchDrawer
      @register="registerSelectDrawer"
      @success="handleSelectSampleBatchSuccess"
    />

    <div class="flex items-center gap-1 mt-1">
      <BasicTable @register="registerUnAcceptTable" class="w-2/5" />
      <BasicTable @register="registerAcceptedTable" class="w-3/5" />
    </div>
  </PageWrapper>
</template>

<script setup lang="tsx">
  import { ref } from 'vue';
  import { debounce } from 'lodash-es';

  import PageWrapper from '@/components/Page/src/PageWrapper.vue';
  import Description from '@/components/Description/src/Description.vue';
  import { DescItem, useDescription } from '@/components/Description';
  import { useDrawer } from '@/components/Drawer';
  import { BasicTable, useTable } from '@/components/Table';

  import SelectSampleBatchDrawer from './SelectSampleBatchDrawer.vue';
  import { acceptSample, getSampleAcceptDetail } from '@/api/inbound-management/sample-accept';
  import { GetApiCoreBatchSampleAcceptBatchSampleNoResponse } from '@/api/type/batchManage';
  import { useMessage } from '@/hooks/web/useMessage';

  const sampleBatchData = ref<GetApiCoreBatchSampleAcceptBatchSampleNoResponse>();
  const inputValue = ref('');

  const { createConfirm } = useMessage();

  const schema: DescItem[] = [
    {
      field: 'batchSampleNo',
      label: '样本批次',
      render() {
        return (
          <div class="flex items-center gap-2 w-[300px]">
            <a-input
              placeholder="请选择批次或输入批次编号回车"
              value={inputValue}
              onChange={handleSampleBatchChange}
              onPressEnter={debounce(handlePressEnter, 500)}
            />
            <a-button type="primary" onClick={handleSelectSampleBatch}>
              选择
            </a-button>
          </div>
        );
      },
    },
    {
      field: 'stationName',
      label: '采浆公司',
    },
    {
      field: 'email',
      label: '出库日期',
    },
    {
      field: 'sampleType',
      label: '样本类型',
    },
    {
      field: 'bagCount',
      label: '样本袋数',
    },
    {
      field: 'totalCount',
      label: '样本数量',
    },
  ];
  const [register] = useDescription({
    contentStyle: {
      width: '25%',
    },
    title: '样本批次信息',
    data: sampleBatchData.value ?? {},
    schema: schema,
  });

  const [registerUnAcceptTable] = useTable({
    title: '未接收样本列表',
    dataSource: sampleBatchData.value?.unAcceptedList ?? [],
    columns: [
      {
        title: '样本袋号',
        dataIndex: 'sampleBagNo',
      },
      {
        title: '样本数量',
        dataIndex: 'sampleCount',
      },
    ],
    size: 'small',
    striped: false,
    bordered: true,
    showIndexColumn: false,
    pagination: false,
    canResize: false,
  });

  const [registerAcceptedTable] = useTable({
    title: '接收样本列表',
    dataSource: sampleBatchData.value?.acceptedList ?? [],
    columns: [
      {
        title: '样本袋号',
        dataIndex: 'sampleBagNo',
      },
      {
        title: '样本数量',
        dataIndex: 'sampleCount',
      },
      {
        title: '接收人',
        dataIndex: 'acceptor',
      },
      {
        title: '接收日期',
        dataIndex: 'acceptAt',
      },
    ],
    size: 'small',
    striped: false,
    bordered: true,
    showIndexColumn: false,
    pagination: false,
    canResize: false,
  });

  const [registerSelectDrawer, { openDrawer: openSelectSampleBatchDrawer }] = useDrawer();

  function handleSelectSampleBatch() {
    openSelectSampleBatchDrawer(true);
  }

  async function handleSelectSampleBatchSuccess(record: Recordable) {
    sampleBatchData.value = await getSampleAcceptDetail(record.batchSampleNo);
    inputValue.value = record.batchSampleNo;
  }

  function handleSampleBatchChange(e: ChangeEvent) {
    inputValue.value = e.target.value;
  }

  async function handlePressEnter() {
    sampleBatchData.value = await getSampleAcceptDetail(inputValue.value);
  }

  async function handleAcceptSample() {
    createConfirm({
      title: '确认接收样本？',
      content: '接收后样本将进入库存',
      iconType: 'warning',
      onOk: async () => {
        await acceptSample(sampleBatchData.value?.batchSampleNo ?? '');
      },
    });

    sampleBatchData.value = await getSampleAcceptDetail(inputValue.value);
  }
</script>
