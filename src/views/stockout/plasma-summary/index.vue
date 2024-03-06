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

  import { stationNameSearchApi } from '@/api/plasmaStore/entryPlasma';

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
      dataIndex: 'boxCount',
      slots: { customRender: 'boxCount' },
    },
    {
      title: '投产出库数量袋',
      dataIndex: 'bagCount',
    },
    {
      title: '非投产出库数量袋',
      dataIndex: 'bagCount',
    },
    {
      title: '不合格数量',
      dataIndex: 'remark',
    },
    {
      title: '不满足检疫期',
      dataIndex: 'creator',
    },
    {
      title: '记录人',
      dataIndex: 'reviewer',
    },
    {
      title: '记录日期',
      dataIndex: 'createAt',
    },
    {
      title: '打印人',
      dataIndex: 'reviewer',
    },
    {
      title: '打印日期信息',
      dataIndex: 'reviewAt',
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
      field: '[beginTime,endTime]',
      component: 'RangePicker',
      label: '打印日期',
    },
    {
      field: 'prepareStates',
      label: '状态',
      component: 'Select',
      componentProps: {
        options: [
          {
            value: '0',
            name: '待打印',
          },
          {
            value: '1',
            name: '已打印',
          },
          {
            value: '2',
            name: '全部',
          },
        ],
      },
    },
  ];

  const [registerTable] = useTable({
    // api: getListApi,
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
