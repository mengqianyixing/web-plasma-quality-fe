<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="样本袋明细"
    width="1000px"
    :minHeight="400"
    @fullscreen="redoHeight"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <BasicTable @register="registerTable" />
      </div>
    </div>
  </BasicModal>
</template>
<script setup lang="ts">
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import { getBagDetail } from '@/api/sample-manage/reserve-sample-destory';
  import dayjs from 'dayjs';
  import { ref } from 'vue';

  defineEmits(['register']);

  const [registerTable, { reload, redoHeight }] = useTable({
    api: getBagDetail,
    beforeFetch: (params) => {
      return {
        ...params,
        trayNo: trayNo.value,
      };
    },
    inset: true,
    isCanResizeParent: true,
    pagination: false,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: [
      {
        title: '托盘编号',
        dataIndex: 'trayNo',
        width: 100,
      },
      {
        title: '箱号',
        dataIndex: 'boxNo',
        width: 140,
        ellipsis: false,
      },
      {
        title: '样本袋号',
        dataIndex: 'packNo',
        width: 140,
        ellipsis: false,
      },
      {
        title: '样本数量',
        dataIndex: 'sampleCount',
        width: 100,
      },
      {
        title: '接收人',
        dataIndex: 'acceptor',
        width: 100,
        ellipsis: false,
      },
      {
        title: '接收时间',
        dataIndex: 'acceptAt',
        format(text) {
          return text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '';
        },
        width: 160,
      },
    ],
    useSearchForm: false,
    bordered: true,
  });

  const trayNo = ref('');
  const [registerModal, { setModalProps }] = useModalInner((data) => {
    trayNo.value = data.trayNo;
    setModalProps({ confirmLoading: false });

    reload();
  });
</script>
