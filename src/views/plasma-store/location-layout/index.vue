<template>
  <PageWrapper dense contentFullHeight fixedHeight content-class="flex flex-col">
    <div>
      <BasicTable @register="registerTable" style="padding-bottom: 0" />
    </div>
    <div class="flex-1 mb-10px" :style="{ 'overflow-x': 'auto' }">
      <div
        class="h-full"
        ref="chartRef"
        :style="{ width: xAxisCount ? xAxisCount * 40 + 'px' : '100%', minWidth: '100%' }"
      >
      </div>
    </div>
    <SampleModal @register="registerSampleModal" />
    <PlasmaModal @register="registerPlasmaModal" />
  </PageWrapper>
</template>
<script setup lang="tsx">
  import { useECharts } from '@/hooks/web/useECharts';
  import { PageWrapper } from '@/components/Page';
  import { ref, Ref, onMounted, nextTick } from 'vue';
  import { BasicTable, useTable } from '@/components/Table';
  import { settingListApi } from '@/api/plasmaStore/setting';
  import { getLayoutApi } from '@/api/plasmaStore/locationLayout/index';
  import { STORE_FLAG, CLOSED } from '@/enums/plasmaStoreEnum';
  import { GetApiCoreBankLocationLayoutResponse } from '@/api/type/plasmaStoreManage';
  import SampleModal from './sample/index.vue';
  import PlasmaModal from './plasma/index.vue';
  import { useModal } from '@/components/Modal';

  defineOptions({ name: 'LocationLayout' });

  const dataMap = new Map<string, null | { color: string; locationNo: string; desc: string }>();
  const locationMap = {
    LOCATION_NULL: '00FF00',
    TRAY_NULL: 'FFFF00',
    PLASMA: 'FFA500',
    SAMPLE: '0000FF',
    HEIGH: '80FFFF',
  };
  const colorMap = {
    [locationMap.LOCATION_NULL]: { color: '#00FF00', gt: 1, value: 2, lte: 3, title: '货位空载' },
    [locationMap.TRAY_NULL]: { color: '#FFF000', gt: 4, value: 5, lte: 6, title: '托盘空载' },
    [locationMap.PLASMA]: { color: '#FFA500', gt: 7, value: 8, lte: 9, title: '装载血浆' },
    [locationMap.SAMPLE]: { color: '#0000FF', gt: 10, value: 11, lte: 12, title: '装载样本' },
    [locationMap.HEIGH]: { color: '#80FFFF', gt: 13, value: 14, lte: 15, title: '搜索命中' },
  };
  const colorMapValues = Object.values(colorMap);
  const xAxisCount = ref(0);
  const [registerSampleModal, { openModal: openSampleModal }] = useModal();
  const [registerPlasmaModal, { openModal: openPlasmaModal }] = useModal();
  const [registerTable] = useTable({
    immediate: false,
    api: getLayoutApi,
    emptyDataIsShowTable: false,
    formConfig: {
      schemas: [
        {
          field: 'houseNo',
          component: 'ApiSelect',
          label: '库房',
          required: true,
          componentProps: {
            api: settingListApi,
            params: {
              warehouseType: STORE_FLAG.S,
              currPage: '1',
              pageSize: '1000',
              closed: CLOSED.NORMAL,
            },
            valueField: 'houseNo',
            labelField: 'houseName',
            resultField: 'result',
          },
        },
        {
          field: 'shelfNo',
          component: 'Select',
          label: '货架',
          required: true,
          componentProps: {
            options: Array.from({ length: 4 }, (_, i) => {
              return {
                label: '第' + (i + 1) + '排',
                value: i + 1,
              };
            }),
          },
        },
        { field: 'batchNo', component: 'Input', label: '血浆批号' },
        { field: 'sampleBatchNo', component: 'Input', label: '样本批号' },
      ],
    },
    size: 'small',
    useSearchForm: true,
    afterFetch: (data: GetApiCoreBankLocationLayoutResponse) => {
      const initData: Array<Array<string | number>> = [];
      const xAxisData = Array.from({ length: data?.[0]?.length }, (_, i) => i + 1 + '列');
      const yAxisData = Array.from({ length: data?.length }, (_, i) => i + 1 + '层');
      dataMap.clear();
      const seriesData = data?.reduce((per, cur, rindex) => {
        cur.forEach((it, cindex) => {
          per.push([cindex, rindex, colorMap[it?.color]?.value || '-']);
          dataMap.set(cindex + '.' + rindex, it);
        });
        return per;
      }, initData);
      setOptions(
        {
          xAxis: { data: xAxisData },
          yAxis: { data: yAxisData },
          series: { data: seriesData },
        },
        false,
      );
      xAxisCount.value = data?.[0]?.length;
      nextTick(resize);

      return [];
    },
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const { getInstance, setOptions, resize } = useECharts(chartRef as Ref<HTMLDivElement>);
  const xAxisFill = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const yAxisFill = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  onMounted(async () => {
    setOptions({
      tooltip: {
        formatter: (p) => {
          const { data } = p;
          const cellData = dataMap.get(data[0] + '.' + data[1]);
          return `<div>
          位置：${data[1] + 1}层${data[0] + 1}列<br/>
          货位编号：${cellData?.locationNo}<br/>
          存放说明：${cellData?.desc}</div>`;
        },
      },
      grid: {
        top: 30,
        left: 6,
        bottom: 10,
        right: 6,
      },
      xAxis: {
        type: 'category',
        data: xAxisFill,
        splitArea: {
          show: true,
        },
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: '#eee',
            type: 'solid',
          },
        },
      },
      yAxis: {
        type: 'category',
        data: yAxisFill,
        splitArea: {
          show: true,
        },
        axisLabel: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
        },
      },
      visualMap: {
        min: 0,
        max: 15,
        calculable: true,
        orient: 'horizontal',
        left: 6,
        top: 0,
        show: true,
        type: 'piecewise',
        formatter: (gt) => {
          const item = colorMapValues.find((it) => it.gt === gt);
          return item?.title as string;
        },
        pieces: colorMapValues.map((it) => ({ gt: it.gt, lte: it.lte, color: it.color })),
      },
      series: {
        name: 'Punch Card',
        type: 'heatmap',
        data: [],
        label: {
          show: true,
          formatter: ({ data }) => {
            return dataMap.get(data[0] + '.' + data[1])?.locationNo || '';
          },
        },
        itemStyle: {
          borderColor: '#666',
          borderWidth: 0.5,
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            borderColor: '#000',
          },
        },
      },
    });
    nextTick(() => {
      const echart = getInstance();
      echart?.on('click', (p) => {
        const { data } = p;
        const cellData = dataMap.get(data[0] + '.' + data[1]);
        if (cellData?.desc.includes('样本')) {
          openSampleModal(true, cellData?.locationNo);
        } else if (cellData?.desc.includes('血浆')) {
          openPlasmaModal(true, cellData?.locationNo);
        }
      });
    });
  });
</script>
