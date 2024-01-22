<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="血浆明细"
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
  import { FormSchema } from '@/components/Form';
  import dayjs from 'dayjs';

  const [registerModal] = useModalInner();

  const columns: BasicColumn[] = [
    {
      title: '采浆公司',
      dataIndex: 'batchNo',
      align: 'left',
    },
    {
      dataIndex: 'batchPickCount',
      title: '血浆批号',
    },
    {
      title: '血浆箱号',
      dataIndex: 'pickBagCount',
    },
    {
      title: '血浆编号',
      dataIndex: 'pickBagCount',
    },
    {
      title: '采浆日期',
      dataIndex: 'netWeightRatio',
      format(text) {
        return text ? dayjs(text).format('YYYY-MM-DD') : '-';
      },
    },
    {
      title: '浆员编号',
      dataIndex: 'pickBagCount',
    },
    {
      title: '效价类型',
      dataIndex: 'pickBagCount',
    },
    {
      title: '效价值',
      dataIndex: 'pickBagCount',
    },
    {
      title: '准备投产',
      dataIndex: 'pickBagCount',
    },
    {
      title: '分拣状态',
      dataIndex: 'prepareState',
      width: 100,
    },
    {
      title: '分拣人',
      dataIndex: 'prepareState',
      width: 100,
    },
    {
      title: '分拣时间',
      dataIndex: 'createAt',
      format(text) {
        return text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-';
      },
    },
  ];

  // 表单搜索列
  const searchFormSchema: FormSchema[] = [
    {
      field: 'stationNo',
      label: '准备号',
      component: 'Select',
      colProps: { span: 4 },
      componentProps: {
        options: [],
      },
    },
    {
      field: 'batchNo',
      label: '血浆批号',
      component: 'Input',
      colProps: { span: 4 },
    },
    {
      field: 'batchNo',
      label: '血浆箱号',
      component: 'Input',
      colProps: { span: 4 },
    },
    {
      field: 'stationNo',
      label: '准备投产',
      component: 'Select',
      colProps: { span: 4 },
      componentProps: {
        options: [],
      },
    },
    {
      field: 'stationNo',
      label: '分拣状态',
      component: 'Select',
      colProps: { span: 4 },
      componentProps: {
        options: [],
      },
    },
  ];
  const [registerTable] = useTable({
    // api: getImmunityList,
    columns: columns,
    useSearchForm: true,
    formConfig: {
      labelWidth: 75,
      schemas: searchFormSchema,
    },
    // beforeFetch: (p) => {
    //   return { ...p, prepareNo: prepareDetail.value.prepareNo };
    // },
    // pagination: false,
    clickToRowSelect: false,
    // maxHeight: 600,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    size: 'small',
    striped: false,
    immediate: false,
    bordered: true,
    showIndexColumn: false,
    // canResize: false,
  });
</script>
