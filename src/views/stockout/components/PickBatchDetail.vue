<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="分拣批次信息"
    :footer="null"
    width="100%"
    :draggable="false"
    defaultFullscreen
    :canFullscreen="false"
  >
    <BasicTable @register="registerTable" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicTable, useTable, BasicColumn } from '@/components/Table';
  import dayjs from 'dayjs';

  const [registerModal] = useModalInner();

  const columnsImmunity: BasicColumn[] = [
    {
      title: '血浆批号',
      dataIndex: 'batchNo',
      align: 'left',
    },
    {
      dataIndex: 'batchPickCount',
      title: '挑浆次数',
    },
    {
      title: '分拣血浆数量',
      dataIndex: 'pickBagCount',
    },
    {
      title: '待分拣血浆数量',
      dataIndex: 'pickBagCount',
    },
    {
      title: '分拣人',
      dataIndex: 'netWeightRatio',
    },
    {
      title: '开始时间',
      dataIndex: 'createAt',
      format(text) {
        return text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-';
      },
    },
    {
      title: '结束时间',
      dataIndex: 'createAt',
      format(text) {
        return text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-';
      },
    },
    {
      title: '状态',
      dataIndex: 'prepareState',
      width: 100,
    },
  ];

  const [registerTable] = useTable({
    // api: getImmunityList,
    columns: columnsImmunity,
    useSearchForm: false,
    // beforeFetch: (p) => {
    //   return { ...p, prepareNo: prepareDetail.value.prepareNo };
    // },
    // pagination: false,
    clickToRowSelect: false,
    // maxHeight: 600,
    size: 'small',
    striped: false,
    immediate: false,
    bordered: true,
    showIndexColumn: false,
    // canResize: false,
  });
</script>
