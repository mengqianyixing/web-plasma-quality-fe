<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts" setup>
  import { onMounted, ref, Ref } from 'vue';
  import { useECharts } from '@/hooks/web/useECharts';
  import { basicProps } from './props';

  defineProps({
    ...basicProps,
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  onMounted(() => {
    setOptions({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            width: 1,
            color: '#019680',
          },
        },
      },
      xAxis: {
        type: 'category',
        // gridId: 'collectAt',
        boundaryGap: true,
        data: [
          '2023-12-31',
          '2024-01-31',
          '2024-02-29',
          '2024-03-31',
          '2024-04-30',
          '2024-05-31',
          '2024-06-30',
          '2024-07-31',
          '2024-08-31',
          '2024-09-30',
          '2024-10-31',
          '2024-11-30',
          '2024-12-31',
        ],
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            type: 'solid',
            color: 'rgba(226,226,226,0.5)',
          },
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: [
        {
          type: 'value',
          // gridId: 'titer',
          max: 80000,
          splitNumber: 4,
          axisTick: {
            show: false,
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
            },
          },
        },
      ],
      grid: { left: '1%', right: '1%', top: '2  %', bottom: 0, containLabel: true },
      series: [
        {
          smooth: true,
          // label:'破免',
          data: [
            111, 222, 4000, 18000, 33333, 55555, 66666, 33333, 14000, 36000, 66666, 44444, 22222,
            11111, 4000, 2000, 500, 333, 222, 111,
          ],
          type: 'line',
          areaStyle: {},
          itemStyle: {
            color: '#5ab1ef',
          },
        },
        {
          smooth: true,
          // label:'乙免',
          data: [
            33, 66, 88, 333, 3333, 5000, 18000, 3000, 1200, 13000, 22000, 11000, 2221, 1201, 390,
            198, 60, 30, 22, 11,
          ],
          type: 'line',
          areaStyle: {},
          itemStyle: {
            color: '#019680',
          },
        },
      ],
    });
  });
</script>
