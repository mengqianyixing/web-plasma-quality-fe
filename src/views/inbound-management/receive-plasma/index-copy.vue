<template>
  <PageWrapper contentFullHeight fixedHeight>
    <Description @register="register" :data="FilterForm" />
  </PageWrapper>
</template>
<script setup lang="tsx">
  import { ref } from 'vue';
  import { debounce } from 'lodash-es';
  import PageWrapper from '@/components/Page/src/PageWrapper.vue';
  import Description from '@/components/Description/src/Description.vue';
  import { useDescription } from '@/components/Description';

  const FilterForm = ref<any>({});
  const trayNo = ref('');
  const boxNo = ref('');
  const batchNo = ref('');

  const schema: any[] = [
    {
      field: 'batchNo',
      label: '血浆批号',
      contentMinWidth: 100,
      render() {
        return (
          <div class="flex items-center justify-center gap-2 w-[300px] -mt-1">
            <a-input placeholder="请输入" value={batchNo} />
            <a-button type="primary">选择</a-button>
          </div>
        );
      },
    },
    {
      field: 'trayNo',
      label: '托盘编号',
      contentMinWidth: 100,
      render() {
        return (
          <div class="flex items-center justify-center gap-2 w-[300px] -mt-1">
            <a-input placeholder="请输入" value={trayNo} />
          </div>
        );
      },
    },
    {
      field: 'boxNo',
      label: '箱号',
      contentMinWidth: 100,
      render() {
        return (
          <div class="flex items-center justify-center gap-2 w-[300px] -mt-1">
            <a-input
              placeholder="请扫描"
              value={boxNo}
              onPressEnter={debounce(handlePressEnter, 500)}
            />
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
        return <span>{text}</span>;
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
    bordered: false,
    column: 4,
    contentStyle: {
      width: '80px',
    },
    title: '血浆接收信息',
    schema: schema,
  });

  async function handlePressEnter() {
    // boxNo.value = await getSampleReceiveDetail(inputValue.value);
  }
</script>
