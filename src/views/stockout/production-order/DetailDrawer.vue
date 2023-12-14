<template>
  <BasicDrawer v-bind="$attrs" @register="register" title="Drawer Title" width="50%">
    <PageWrapper>
      <Description :column="2" :data="detailData" :schema="schema" />
      <a-timeline class="ml-3 mt-[40px]">
        <a-timeline-item color="red">
          <template #dot><ClockCircleOutlined style="font-size: 16px" /></template>
          <p>卢伟桐于2023年12月14号撤销审核</p>
        </a-timeline-item>
        <a-timeline-item color="red">
          <template #dot><ClockCircleOutlined style="font-size: 16px" /></template>
          <p>卢伟桐于2023年12月14号复核不通过</p>
        </a-timeline-item>
        <a-timeline-item color="red">
          <template #dot><ClockCircleOutlined style="font-size: 16px" /></template>
          <p>卢伟桐于2023年12月14号审核不通过</p>
        </a-timeline-item>
        <a-timeline-item color="green">
          <template #dot><ClockCircleOutlined style="font-size: 16px" /></template>
          <p>卢伟桐于2023年12月14号审核通过</p>
        </a-timeline-item>
      </a-timeline>
    </PageWrapper>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { PageWrapper } from '@/components/Page';
  import { DescItem, Description } from '@/components/Description';
  import { ref, watch } from 'vue';
  import { getProOrderDetail } from '@/api/stockout/production-order';
  import { expirationMap, operationMap } from '@/enums/stockoutEnum';
  import { Timeline, TimelineItem } from 'ant-design-vue';
  import dayjs from 'dayjs';
  import { ClockCircleOutlined } from '@ant-design/icons-vue';

  const ATimeline = Timeline;
  const ATimelineItem = TimelineItem;

  const detailData = ref({});
  const orderNo = ref('');

  watch(
    () => orderNo.value,
    async (newVal) => {
      if (newVal) {
        detailData.value = await getProOrderDetail(orderNo.value);
      }
    },
  );

  const [register] = useDrawerInner((data) => {
    orderNo.value = data.orderNo;
  });

  const schema: DescItem[] = [
    {
      field: 'mesId',
      label: '制造批号',
    },
    {
      field: 'orderType',
      label: '投产类型',
      render: (curVal) => {
        return `${operationMap.get(curVal)}`;
      },
    },
    {
      field: 'orderWeight',
      label: '投产重量（t)',
    },
    {
      field: 'expiration',
      label: '血浆效期',
      render: (curVal) => {
        return `${expirationMap.get(curVal)}`;
      },
    },
    {
      field: 'planOut',
      label: '计划出库日期',
      render: (curVal) => {
        return dayjs(curVal).format('YYYY-MM-DD');
      },
    },
    {
      field: 'planTask',
      label: '计划投产日期',
      render: (curVal) => {
        return dayjs(curVal).format('YYYY-MM-DD');
      },
    },
  ];
</script>
