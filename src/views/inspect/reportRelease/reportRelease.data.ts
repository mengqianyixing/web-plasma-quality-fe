import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'methodAbbr',
  },
  {
    title: '样品批号',
    dataIndex: 'itemKey',
  },
  {
    title: '样品类型',
    dataIndex: 'intervalDays',
  },
  {
    title: '合格样品总数',
    dataIndex: 'sort',
  },
  {
    title: '不合格样品总数',
    dataIndex: 'detectionMode',
  },
  {
    title: '高效价总数',
    dataIndex: 'enable',
  },
  {
    title: '低效价总数',
    dataIndex: 'creater',
  },
  {
    title: '无效价总数',
    dataIndex: 'createAt',
  },
  {
    title: '当前状态',
    dataIndex: 'createAt',
  },
  {
    title: '生成人',
    dataIndex: 'createAt',
  },
  {
    title: '生成时间',
    dataIndex: 'createAt',
  },
  {
    title: '复核人',
    dataIndex: 'createAt',
  },
  {
    title: '复核日期',
    dataIndex: 'createAt',
  },
  {
    title: '发布人',
    dataIndex: 'createAt',
  },
  {
    title: '发布日期',
    dataIndex: 'createAt',
  },
];

export const searchFormschema: FormSchema[] = [
  {
    field: 'methodAbbr',
    component: 'Select',
    label: '采浆公司',
  },
  {
    field: 'itemKey',
    component: 'Input',
    label: '样品批号',
  },
  {
    field: 'itemKey',
    component: 'Select',
    label: '样品类型',
  },
  {
    field: 'itemKey',
    component: 'Select',
    label: '样品状态',
  },
  {
    field: '[createStartDate, createEndDate]',
    component: 'RangePicker',
    label: '发布时间',
    componentProps: {
      class: 'w-full',
    },
  },
];
