// import { FormProps, FormSchema, BasicColumn } from '@/components/Table';
import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: '',
  },
  {
    title: '血浆批号',
    dataIndex: '',
  },
  {
    title: '采集开始日期',
    dataIndex: '',
  },
  {
    title: '采集结束日期',
    dataIndex: '',
  },
  {
    title: '浆站出库日期',
    dataIndex: '',
  },
  {
    title: '出库数量(袋)',
    dataIndex: '',
  },
  {
    title: '出库重量(kg)',
    dataIndex: '',
  },
  {
    title: '接收日期',
    dataIndex: '',
  },
  {
    title: '验收发布人',
    dataIndex: '',
  },
  {
    title: '验收数量(袋)',
    dataIndex: '',
  },
  {
    title: '验收重量(kg)',
    dataIndex: '',
  },
  {
    title: '差异数量(袋)',
    dataIndex: '',
  },
  {
    title: '差异重量(kg)',
    dataIndex: '',
  },
  {
    title: '验收合格数量(袋)',
    dataIndex: '',
  },
  {
    title: '验收不合格数量(袋)',
    dataIndex: '',
  },
  {
    title: '不足量数量(袋)',
    dataIndex: '',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '采浆公司',
    field: '',
    component: 'Select',
    colProps: { span: 5 },
  },
  {
    label: '血浆批次',
    component: 'Input',
    field: '',
    colProps: { span: 5 },
  },
  {
    label: '接收日期',
    component: 'RangePicker',
    field: '',
    colProps: { span: 6 },
  },
  {
    label: '验收日期',
    component: 'RangePicker',
    field: '',
    colProps: { span: 6 },
  },
];
