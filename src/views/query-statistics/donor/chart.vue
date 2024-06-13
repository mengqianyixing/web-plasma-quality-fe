<template>
  <div class="h-full">
    <div ref="chartRef" :style="{ height: '100%', width: '100%' }"></div>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, Ref, defineExpose } from 'vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import { SERVER_ENUM } from '@/enums/serverEnum';
  import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
  import { GetApiCoreDonorChartCardNoResponse } from '@/api/type/donorQuery';

  const serverEnumStore = useServerEnumStoreWithOut();

  const PlasmaType = serverEnumStore.getServerEnumText(SERVER_ENUM.PlasmaType);
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions, resize } = useECharts(chartRef as Ref<HTMLDivElement>);

  async function setData(data: GetApiCoreDonorChartCardNoResponse) {
    const allXAxisData: string[] = data.reduce((dates, it) => {
      it.line.forEach((l) => {
        dates.push(l.collectAt.slice(0, 10));
      });
      return dates;
    }, [] as string[]);

    const xAxisData = [...new Set(allXAxisData)].sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    );
    const seriesData = data.reduce((data, it) => {
      const l = {
        name: PlasmaType(it.immunity),
        type: 'line',
        data: xAxisData.map(
          (date) => (it.line.find((l) => l.collectAt.slice(0, 10) === date) || {}).titer || 0,
        ),
      };
      return [...data, l];
    }, [] as Recordable[]);
    const legendData = data.map((it) => PlasmaType(it.immunity));
    const showDataZoomCount = 10;
    const showDataZoom = xAxisData.length > showDataZoomCount;
    const dataZoomEnd = showDataZoom
      ? Math.ceil((showDataZoomCount / xAxisData.length) * 100)
      : 100;
    setOptions(
      {
        xAxis: {
          data: xAxisData,
          name: '采集日期',
          nameTextStyle: { color: '#000', fontSize: 14 },
        },
        series: seriesData,
        legend: { data: legendData },
        grid: {
          bottom: showDataZoom ? 60 : 30,
          left: '1%',
          right: 120,
          top: '10%',
          containLabel: true,
        },
        dataZoom: {
          show: showDataZoom,
          type: 'slider',
          showDetail: false,
          bottom: 30,
          height: 20,
          start: 0,
          end: dataZoomEnd,
          brushSelect: false,
        },
        yAxis: {
          type: 'value',
          name: '效价',
          axisLine: { show: true },
          nameTextStyle: { color: '#000', fontSize: 14 },
        },
      },
      false,
    );
  }
  defineExpose({ setData, resize });

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
      grid: { left: '1%', right: 120, top: '10%', bottom: 30, containLabel: true },
      xAxis: {
        data: [],
        name: '采集日期',
        nameTextStyle: { color: '#000', fontSize: 14 },
      },
      yAxis: {
        type: 'value',
        name: '效价',
        axisLine: { show: true },
        nameTextStyle: { color: '#000', fontSize: 14 },
      },
      series: [],
    });
  });
</script>
