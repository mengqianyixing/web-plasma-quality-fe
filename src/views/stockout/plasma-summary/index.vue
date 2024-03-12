<template>
  <PageWrapper dense contentFullHeight fixedHeight>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <!-- <a-button type="primary" @click="handleCreate">新增</a-button>
        <a-button type="primary" @click="handleCancel">撤销</a-button>
        <a-button type="primary" @click="handleReview">复核</a-button> -->
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '@/components/Page';
  import { BasicTable, useTable, BasicColumn, FormSchema } from '@/components/Table';
  import dayjs from 'dayjs';
  import { stationNameSearchApi } from '@/api/plasmaStore/entryPlasma';
  import { getPlasmaSummary } from '@/api/stockout/plasma-summary';

  defineOptions({ name: 'PlasmaSummary' });

  const columns: BasicColumn[] = [
    {
      title: '血浆批号',
      dataIndex: 'batchNo',
    },
    {
      title: '采浆公司',
      dataIndex: 'stationName',
    },
    {
      title: '血浆总数',
      dataIndex: 'bagCount',
      // slots: { customRender: 'boxCount' },
    },
    {
      title: '投产出库数量袋',
      dataIndex: 'ProOutCount',
    },
    {
      title: '非投产出库数量袋',
      dataIndex: 'unProOutCount',
    },
    {
      title: '不合格数量',
      dataIndex: 'unqualifiedCount',
    },
    {
      title: '状态',
      dataIndex: 'printState',
      customRender: ({ text }) => {
        if (text === true) {
          return '已打印';
        } else if (text === false) {
          return '未打印';
        }
        return '';
      },
    },
    {
      title: '打印人',
      dataIndex: 'printor',
    },
    {
      title: '打印时间',
      dataIndex: 'printAt',
      format: (text) => (text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-'),
    },
  ];

  const searchFormschema: FormSchema[] = [
    {
      label: '采浆公司',
      component: 'ApiSelect',
      field: 'stationNo',
      componentProps: {
        api: stationNameSearchApi,
        labelField: 'stationName',
        valueField: 'stationNo',
      },
    },
    {
      field: 'batchNo',
      component: 'Input',
      label: '血浆批号',
    },
    {
      field: '[printAtBegin,printAtEnd]',
      component: 'RangePicker',
      label: '打印日期',
    },
    {
      field: 'printState',
      label: '状态',
      component: 'Select',
      componentProps: {
        options: [
          {
            value: true,
            name: '已打印',
          },
          {
            value: false,
            name: '未打印',
          },
        ],
      },
    },
  ];

  const [registerTable] = useTable({
    api: getPlasmaSummary,
    fetchSetting: {
      pageField: 'currPage',
      sizeField: 'pageSize',
      totalField: 'totalCount',
      listField: 'result',
    },
    columns: columns,
    size: 'small',
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    rowSelection: { type: 'radio' },
    beforeFetch: (p) => ({
      ...p,
      beginTime: p.beginTime?.slice(0, 10),
      endTime: p.endTime?.slice(0, 10),
    }),
    formConfig: {
      schemas: searchFormschema,
    },
  });
</script>
