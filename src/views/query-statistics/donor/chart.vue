<template>
  <div class="h-full">
    <div ref="chartRef" :style="{ height: '100%', width }"></div>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, Ref, watch, nextTick } from 'vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import { basicProps } from './props';
  import { donorChartApi } from '@/api/query-statistics/donor';
  import { SERVER_ENUM } from '@/enums/serverEnum';
  import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
  const serverEnumStore = useServerEnumStoreWithOut();

  const PlasmaType = serverEnumStore.getServerEnumText(SERVER_ENUM.PlasmaType);
  const props = defineProps({
    ...basicProps,
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  watch(
    () => props.donorNo,
    async (v) => {
      if (!v) return;
      await nextTick();
      getData();
    },
    {
      immediate: true,
    },
  );
  async function getData() {
    const res = await donorChartApi(props.donorNo as string);
    const allXAxisData = res.reduce((dates, it) => {
      it.line.forEach((l) => {
        dates.push(l.collectAt.slice(0, 10));
      });
      return dates;
    }, [] as string[]);
    const xAxisData = [...new Set(allXAxisData)].sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    );
    const seriesData = res.reduce((data, it) => {
      const l = {
        name: PlasmaType(it.immunity),
        type: 'line',
        data: xAxisData.map(
          (date) => (it.line.find((l) => l.collectAt.slice(0, 10) === date) || {}).titer || 0,
        ),
      };
      return [...data, l];
    }, <Recordable[]>[]);
    const legendData = res.map((it) => PlasmaType(it.immunity));
    const showDataZoomCount = 10;
    const showDataZoom = xAxisData.length >= showDataZoomCount;
    const dataZoomEnd = showDataZoom
      ? Math.ceil((showDataZoomCount / xAxisData.length) * 100)
      : 100;
    setOptions(
      {
        xAxis: { data: xAxisData },
        series: seriesData,
        legend: { data: legendData },
        grid: { bottom: showDataZoom ? 40 : 30 },
        dataZoom: {
          show: showDataZoom,
          type: 'slider',
          showDetail: false,
          bottom: 0,
          height: 20,
          start: 0,
          end: dataZoomEnd,
          brushSelect: false,
        },
      },
      false,
    );
  }

  onMounted(() => {
    setOptions({
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: [],
      },
      toolbox: {
        show: true,
      },
      grid: { left: '1%', right: 120, top: '10%', bottom: 0, containLabel: true },
      xAxis: {
        type: 'category',
        data: [],
        name: '采集日期',
        nameTextStyle: { color: '#000', fontSize: 14 },
      },
      yAxis: [
        {
          type: 'value',
          name: '效价',
          axisLine: { show: true },
          nameTextStyle: { color: '#000', fontSize: 14 },
        },
      ],
      series: [],
    });
  });
</script>
