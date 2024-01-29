<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="血浆明细"
    :footer="null"
    width="100%"
    :draggable="false"
    defaultFullscreen
    :destroyOnClose="true"
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
  import { getSortBags, getSortingBatch } from '@/api/stockout/production-preparation.js';

  let prepareNo = ''; // 准备号
  const [registerModal] = useModalInner(async (data) => {
    console.log('血浆明细看看data',data);
    prepareNo = data.record.prepareNo;
    await getForm().updateSchema([
      {
        field: 'prepareNo',
        defaultValue: prepareNo,
      },
      {
        field: 'batchNo',
        componentProps: {
          params: { prepareNo },
        }
      }
    ])
    // 准备投产默认值
    if(data.prepareProduce) {
      await getForm().updateSchema({
        field: 'prepareProduce',
        defaultValue: true,
      });
    }
    reload();
  });

  const columns: BasicColumn[] = [
    {
      title: '采浆公司',
      dataIndex: 'stationName',
    },
    {
      dataIndex: 'batchNo',
      title: '血浆批号',
    },
    {
      title: '血浆箱号',
      dataIndex: 'boxNo',
    },
    {
      title: '血浆编号',
      dataIndex: 'bagNo',
    },
    {
      title: '采浆日期',
      dataIndex: 'collectAt',
      format(text) {
        return text ? dayjs(text).format('YYYY-MM-DD') : '-';
      },
    },
    {
      title: '浆员编号',
      dataIndex: 'donorNo',
    },
    {
      title: '效价类型',
      dataIndex: 'immType',
    },
    {
      title: '效价值',
      dataIndex: 'titer',
    },
    {
      title: '准备投产',
      dataIndex: 'prepareProduce',
    },
    {
      title: '分拣状态',
      dataIndex: 'sorting',
      width: 100,
    },
    {
      title: '分拣人',
      dataIndex: 'operator',
      width: 100,
    },
    {
      title: '分拣时间',
      dataIndex: 'opearteAt',
      format(text) {
        return text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-';
      },
    },
  ];

  // 表单搜索列
  const searchFormSchema: FormSchema[] = [
    {
      field: 'prepareNo',
      label: '准备号',
      component: 'Input',
      colProps: { span: 4 },
    },
    {
      field: 'batchNo',
      label: '血浆批号',
      component: 'ApiSelect',
      colProps: { span: 4 },
      componentProps: {
        api: getSortingBatch,
        // alwaysLoad: true,
        // params: { prepareNo },
        labelField: 'batchNo',
        valueField: 'batchNo',
        immediate: false,
      },
    },
    {
      field: 'boxNo',
      label: '血浆箱号',
      component: 'Input',
      colProps: { span: 4 },
    },
    {
      field: 'prepareProduce',
      label: '准备投产',
      component: 'Select',
      colProps: { span: 4 },
      componentProps: {
        options: [
          {
            label: '是',
            value: true,
          },
          {
            label: '否',
            value: false,
          },
        ],
      },
    },
    {
      field: 'sorting',
      label: '分拣状态',
      component: 'Select',
      colProps: { span: 4 },
      componentProps: {
        options: [
          {
            label: '待分拣',
            value: false,
          },
          {
            label: '已分拣',
            value: true,
          },
        ],
      },
    },
  ];
  const [registerTable, { getForm, reload }] = useTable({
    api: getSortBags,
    columns: columns,
    useSearchForm: true,
    formConfig: {
      labelWidth: 80,
      schemas: searchFormSchema,
    },
    // beforeFetch: (p) => {
    //   return { ...p, prepareNo };
    // },
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
