<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    showFooter
    title="箱明细"
    width="800px"
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
  import { getBoxDetail } from '@/api/sample-manage/reserve-sample-destory';
  import dayjs from 'dayjs';
  import { ref } from 'vue';

  defineEmits(['register']);

  const [registerTable, { reload, redoHeight }] = useTable({
    api: getBoxDetail,
    beforeFetch: (params) => {
      return {
        ...params,
        trayNo: trayNo.value,
      };
    },
    pagination: false,
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
        title: '样本袋数',
        dataIndex: 'packCount',
        width: 100,
        ellipsis: false,
      },
      {
        title: '封箱人',
        dataIndex: 'sealer',
        width: 100,
        ellipsis: false,
      },
      {
        title: '封箱时间',
        dataIndex: 'sealAt',
        format(text) {
          return text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '';
        },
        width: 160,
        ellipsis: false,
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
