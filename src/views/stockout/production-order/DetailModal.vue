<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="生产指令详情"
    width="65%"
    :showOkBtn="false"
    :cancelText="'关闭'"
  >
    <PageWrapper>
      <Description :column="2" :data="detailData" :schema="schema" />
      <a-timeline class="ml-3 mt-[40px]" v-if="timeLineData.length">
        <a-timeline-item v-for="(t, i) in timeLineData" :key="i">
          <template #dot><ClockCircleOutlined style="font-size: 16px" /></template>
          <p>{{ t.desc }}</p>
        </a-timeline-item>
      </a-timeline>
      <div v-else class="mt-5">暂无审批流</div>
    </PageWrapper>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { PageWrapper } from '@/components/Page';
  import { DescItem, Description } from '@/components/Description';
  import { ref } from 'vue';
  import { getProOrderDetail, getProOrderTasks } from '@/api/stockout/production-order';
  import { expirationMap } from '@/enums/stockoutEnum';
  import { Timeline, TimelineItem } from 'ant-design-vue';
  import dayjs from 'dayjs';
  import { ClockCircleOutlined } from '@ant-design/icons-vue';
  import { SERVER_ENUM } from '@/enums/serverEnum';
  import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
  import { GetApiSysSnakerTasksOrderIdResponse } from '@/api/type/productionOrder';

  const serverEnumStore = useServerEnumStoreWithOut();
  const PlasmaType = serverEnumStore.getServerEnumText(SERVER_ENUM.PlasmaType);

  const ATimeline = Timeline;
  const ATimelineItem = TimelineItem;

  const detailData = ref({});
  const timeLineData = ref<GetApiSysSnakerTasksOrderIdResponse>([]);
  const orderNo = ref('');
  const orderId = ref('');

  const [register, { setModalProps }] = useModalInner(async (data) => {
    setModalProps({
      maskClosable: false,
    });
    orderNo.value = data.orderNo;
    orderId.value = data.orderId;

    await reload();
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
        return `${PlasmaType(curVal)}`;
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

  async function reload() {
    setModalProps({
      loading: true,
    });
    try {
      detailData.value = await getProOrderDetail(orderNo.value);
      timeLineData.value = await getProOrderTasks(orderId.value);
    } finally {
      setModalProps({
        loading: false,
      });
    }
  }
</script>
