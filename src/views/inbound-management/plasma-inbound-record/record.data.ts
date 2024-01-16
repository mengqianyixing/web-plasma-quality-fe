import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationNo',
    slots: { customRender: 'stationNo' },
  },
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
  },
  {
    title: '血浆箱数',
    dataIndex: 'boxNum',
  },
  {
    title: '接受箱数',
    dataIndex: 'receptNum',
  },
  {
    title: '血浆数量',
    dataIndex: 'bagNum',
  },
  {
    title: '验收数量',
    dataIndex: 'outNum',
  },
  {
    title: '合格血浆数量',
    dataIndex: 'passBagNum',
  },
  {
    title: '不合格血浆数量',
    dataIndex: 'noPassBagNum',
  },
  {
    title: '缺号数量',
    dataIndex: 'lackNoNum',
  },
  {
    title: '浆站重量',
    dataIndex: 'stationWeight',
  },
  {
    title: '验收重量',
    dataIndex: 'verifyWeight',
  },
  {
    title: '接收日期',
    dataIndex: 'acceptDate',
  },
  {
    title: '验收日期',
    dataIndex: 'verifyDate',
  },
  {
    title: '发布日期',
    dataIndex: 'pubDate',
  },
  {
    title: '发布人',
    dataIndex: 'publisher',
  },
  {
    title: '状态',
    dataIndex: 'state',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'stationNo',
    label: '采浆公司',
    component: 'Select',
  },
  {
    field: 'batchNo',
    label: '血浆批号',
    component: 'Input',
  },
  {
    field: 'state',
    label: '状态',
    component: 'Select',
  },
  {
    field: '[receiveStartDate,receiveEndDate]',
    label: '血浆接受日期',
    component: 'RangePicker',
  },
  {
    field: '[verifyStartDate,verifyEndDate]',
    label: '验收发布日期',
    component: 'RangePicker',
  },
];
