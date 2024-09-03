<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="不合格血浆明细"
    showFooter
    width="80%"
    :min-height="600"
    :showOkBtn="false"
    @fullscreen="redoHeight"
  >
    <div class="relative h-inherit max-h-inherit min-h-inherit">
      <div class="absolute w-full h-full">
        <div class="flex-1 shrink-1" style="height: calc(100% - 0px)">
          <BasicTable @register="registerTable" />
        </div>
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable } from '@/components/Table';
  import dayjs from 'dayjs';
  import { getUnqualifiedDetail } from '@/api/qualify-manage/plasma-check';
  import { ref } from 'vue';

  const [registerTable, { reload, redoHeight }] = useTable({
    api: getUnqualifiedDetail,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    beforeFetch(params) {
      return {
        ...params,
        batchNo: batchNo.value,
      };
    },
    columns: [
      {
        title: '血浆编号',
        dataIndex: 'bagNo',
        width: 120,
      },
      {
        title: '浆员编号',
        dataIndex: 'donorNo',
        width: 100,
      },
      {
        title: '浆员姓名',
        dataIndex: 'donorName',
        width: 80,
      },
      {
        title: '采集日期',
        dataIndex: 'collectDate',
        width: 100,
        format(text) {
          return text ? dayjs(text).format('YYYY-MM-DD') : '-';
        },
      },
      {
        title: '不合格日期',
        dataIndex: 'unqualifiedDate',
        width: 100,
        format(text) {
          return text ? dayjs(text).format('YYYY-MM-DD') : '-';
        },
      },
      {
        title: '不合格原因',
        dataIndex: 'unqualifiedReason',
      },
    ],
    size: 'small',
    striped: false,
    useSearchForm: false,
    bordered: true,
    showIndexColumn: true,
    indexColumnProps: {
      width: 80,
    },
    immediate: false,
    isCanResizeParent: true,
    inset: true,
  });

  const batchNo = ref('');
  const [register, { setModalProps }] = useModalInner((data) => {
    setModalProps({
      maskClosable: false,
    });

    batchNo.value = data.record?.batchNo;

    reload();
  });
</script>
