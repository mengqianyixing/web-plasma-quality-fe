<template>
  <PageWrapper contentFullHeight fixedHeight>
    <Description @register="register" :data="sampleBatchData">
      <template #action>
        <a-button type="primary" @click="handleAcceptSample">接收</a-button>
      </template>
    </Description>
    <SelectSampleBatchDrawer
      @register="registerSelectDrawer"
      @success="handleSelectSampleBatchSuccess"
    />

    <div class="flex gap-1 mt-1">
      <BasicTable @register="registerUnAcceptTable" class="w-2/5" :title="unAcceptTitle" />
      <BasicTable @register="registerAcceptedTable" class="w-3/5" :title="acceptedTitle" />
    </div>
  </PageWrapper>
</template>

<script setup lang="tsx">
  import { computed, onMounted, ref } from 'vue';
  import { debounce } from 'lodash-es';

  import PageWrapper from '@/components/Page/src/PageWrapper.vue';
  import Description from '@/components/Description/src/Description.vue';
  import { DescItem, useDescription } from '@/components/Description';
  import { useDrawer } from '@/components/Drawer';
  import { BasicTable, useTable } from '@/components/Table';

  import SelectSampleBatchDrawer from './SelectSampleBatchDrawer.vue';
  import {
    receiveSample,
    getSampleReceiveDetail,
    getSampleDictionary,
  } from '@/api/inbound-management/sample-receive';
  import { GetApiCoreBatchSampleAcceptBatchSampleNoResponse } from '@/api/type/batchManage';
  import { useMessage } from '@/hooks/web/useMessage';
  import dayjs from 'dayjs';
  import { sampleDictionary } from '@/enums/sampleEnum';

  const sampleBatchData = ref<GetApiCoreBatchSampleAcceptBatchSampleNoResponse>({});
  const inputValue = ref('');
  const sampleTypeDictionary = ref<Recordable[] | undefined>([]);

  onMounted(async () => {
    const dictionaryArr = await getSampleDictionary([sampleDictionary.SampleType]);
    if (!dictionaryArr) return;

    sampleTypeDictionary.value = dictionaryArr.find(
      (it) => it.dictNo === sampleDictionary.SampleType,
    )?.dictImtes;
  });

  const { createConfirm } = useMessage();

  const schema: DescItem[] = [
    {
      field: 'batchSampleNo',
      label: '样本批号',
      render() {
        return (
          <div class="flex items-center gap-2 w-[300px]">
            <a-input
              placeholder="请选择批号或输入批号回车"
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
      field: 'outWarehouseDate',
      label: '出库日期',
    },
    {
      field: 'sampleType',
      label: '样本类型',
      render(text) {
        const label = sampleTypeDictionary.value!.find((it) => it.value === text)?.label;
        return <span>{label}</span>;
      },
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
    bordered: true,
    column: 6,
    contentStyle: {
      width: '100px',
      padding: '10px',
    },
    title: '样本批次信息',
    schema: schema,
  });

  const [registerUnAcceptTable, { setTableData: setUnAcceptedTableData }] = useTable({
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
    canResize: true,
  });

  const [registerAcceptedTable, { setTableData: setAcceptedTableData }] = useTable({
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
        format(text) {
          return text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '';
        },
      },
    ],
    size: 'small',
    striped: false,
    bordered: true,
    showIndexColumn: false,
    pagination: false,
    canResize: true,
  });

  const [registerSelectDrawer, { openDrawer: openSelectSampleBatchDrawer }] = useDrawer();

  function handleSelectSampleBatch() {
    openSelectSampleBatchDrawer(true, {
      reload: true,
      record: {
        sampleType: sampleTypeDictionary.value,
      },
    });
  }

  const unAcceptTitle = computed(
    () => `未接收袋数：${sampleBatchData.value?.unAcceptList?.length ?? 0}`,
  );

  const acceptedTitle = computed(
    () => `已接收袋数：${sampleBatchData.value?.acceptedList?.length ?? 0}`,
  );

  async function handleSelectSampleBatchSuccess(record: Recordable) {
    sampleBatchData.value = await getSampleReceiveDetail(record.batchSampleNo);
    updateTableData();
    inputValue.value = record.batchSampleNo;
  }

  function updateTableData() {
    setUnAcceptedTableData(sampleBatchData.value?.unAcceptList ?? []);
    setAcceptedTableData(sampleBatchData.value?.acceptedList ?? []);
  }

  function handleSampleBatchChange(e: ChangeEvent) {
    inputValue.value = e.target.value;
  }

  async function handlePressEnter() {
    sampleBatchData.value = await getSampleReceiveDetail(inputValue.value);
  }

  async function handleAcceptSample() {
    createConfirm({
      title: '确认',
      content: '确认接收样本',
      iconType: 'warning',
      onOk: async () => {
        await receiveSample({
          batchSampleNo: inputValue.value,
        });
        sampleBatchData.value = await getSampleReceiveDetail(inputValue.value);
        updateTableData();
      },
    });
  }
</script>
