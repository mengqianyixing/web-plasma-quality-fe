<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="样本袋详情"
    width="80%"
    :min-height="650"
    showFooter
    :showOkBtn="false"
    @fullscreen="redoHeight"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <BasicTable @register="registerBatchTable" />
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';

  import { ref } from 'vue';

  import { getDeliverSampleDetailBySampleNum } from '@/api/sample-manage/reserve-sample-destory';
  import dayjs from 'dayjs';

  defineEmits(['success', 'register']);

  const sampleBagNo = ref('');

  const [register, { setModalProps }] = useModalInner(async (data) => {
    sampleBagNo.value = data.record?.sampleBagNo;

    setModalProps({
      maskClosable: false,
      destroyOnClose: true,
    });
  });

  const [registerBatchTable, { redoHeight }] = useTable({
    api: getDeliverSampleDetailBySampleNum,
    columns: [
      {
        dataIndex: 'stationName',
        title: '采浆公司',
      },
      {
        dataIndex: 'sampleNo',
        title: '样本编号',
      },
      {
        dataIndex: 'batchNo',
        title: '样本批号',
      },
      {
        dataIndex: 'collectDate',
        title: '采集日期',
        format(text) {
          return text ? dayjs(text).format('YYYY-MM-DD') : '-';
        },
      },
      {
        dataIndex: 'donorName',
        title: '浆员姓名',
      },
      {
        dataIndex: 'cardNo',
        title: '浆员编号',
      },
      {
        dataIndex: 'keepBy',
        title: '类别',
      },
      {
        dataIndex: 'bloodType',
        title: '血型',
      },
    ],
    beforeFetch: (params) => {
      return {
        ...params,
        sampleBagNo: sampleBagNo.value,
      };
    },
    size: 'small',
    useSearchForm: false,
    showTableSetting: false,
    bordered: true,
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
