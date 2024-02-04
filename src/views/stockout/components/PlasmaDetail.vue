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
  import {
    getSortBags,
    getSortingBatch,
  } from '@/api/stockout/production-sorting/production-sorting-main';
  import {
    sortingMap,
    sortingValueEnum,
    prepareProduceMap,
    prepareProduceValueEnum,
    operationMap,
    operationValueEnum,
  } from '@/enums/stockoutEnum';

  let prepareNo = ''; // 准备号
  const [registerModal] = useModalInner(async (data) => {
    console.log('血浆明细看看data', data);
    prepareNo = data.record.prepareNo;
    const sort = data.record.sort; // 分拣/待分拣

    await getForm().updateSchema([
      {
        field: 'prepareNo',
        defaultValue: prepareNo,
      },
      {
        field: 'batchNo',
        componentProps: {
          params: { prepareNo },
        },
        defaultValue: data.record.batchNo,
      },
    ]);
    // 准备投产默认值
    if (data.prepareProduce) {
      await getForm().updateSchema({
        field: 'prepareProduce',
        defaultValue: 'true',
      });
    }
    if (sort) {
      await getForm().updateSchema({
        field: 'sorting',
        defaultValue: sort === 'sortCount' ? 'true' : 'false',
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
      format(text) {
        return `${operationMap.get(String(text) as operationValueEnum)}`;
      },
    },
    {
      title: '效价值',
      dataIndex: 'titer',
    },
    {
      title: '准备投产',
      dataIndex: 'prepareProduce',
      format(text) {
        return `${prepareProduceMap.get(String(text) as prepareProduceValueEnum)}`;
      },
    },
    {
      title: '分拣状态',
      dataIndex: 'sorting',
      width: 100,
      format(text) {
        return `${sortingMap.get(String(text) as sortingValueEnum)}`;
      },
    },
    {
      title: '分拣人',
      dataIndex: 'operator',
      width: 100,
    },
    {
      title: '分拣时间',
      dataIndex: 'operateAt',
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
      required: true,
      colProps: { span: 4 },
    },
    {
      field: 'batchNo',
      label: '血浆批号',
      component: 'ApiSelect',
      colProps: { span: 4 },
      componentProps: {
        api: getSortingBatch,
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
        options: [...prepareProduceMap.entries()].map(([key, value]) => ({
          value: key,
          label: `${value}`,
        })),
      },
    },
    {
      field: 'sorting',
      label: '分拣状态',
      component: 'Select',
      colProps: { span: 4 },
      componentProps: {
        options: [...sortingMap.entries()].map(([key, value]) => ({
          value: key,
          label: `${value}`,
        })),
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
    clickToRowSelect: false,
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
  });
</script>
