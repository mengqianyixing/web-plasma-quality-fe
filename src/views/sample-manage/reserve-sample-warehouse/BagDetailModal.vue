<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="样本袋明细"
    width="80%"
    :minHeight="400"
    @fullscreen="redoHeight"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <div class="flex-1 shrink-1" style="height: calc(100% - 56px)">
          <BasicTable @register="registerTable" />
        </div>
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
  import { useServerConfig } from '@/hooks/common/useServerConfig';

  defineEmits(['register']);
  const { boxText, trayText } = useServerConfig();

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
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: [
      {
        title: trayText + '编号',
        dataIndex: 'trayNo',
      },
      {
        title: boxText + '号',
        dataIndex: 'boxNo',
      },
      {
        title: '样本袋号',
        dataIndex: 'packNo',
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
        title: '接收时间',
        dataIndex: 'acceptAt',
        format(text) {
          return text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '';
        },
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
