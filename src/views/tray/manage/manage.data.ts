import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '托盘编号',
    dataIndex: '',
    fixed: 'left',
  },
  {
    title: '使用状态',
    dataIndex: '',
  },
  {
    title: '负载状态',
    dataIndex: '',
  },
  {
    title: '已存放容量(袋)',
    dataIndex: '',
  },
  {
    title: '已存放容量(箱)',
    dataIndex: '',
  },
  {
    title: '打印人',
    dataIndex: '',
  },
  {
    title: '打印时间',
    dataIndex: '',
  },
  {
    title: '存放类型',
    dataIndex: '',
  },
  {
    title: '存放位置',
    dataIndex: '',
  },
  {
    title: '立体库状态',
    dataIndex: '',
  },
  {
    title: '备注',
    dataIndex: '',
  },
];
export const searchFormSchema: FormSchema[] = [
  {
    component: 'Input',
    field: '',
    label: '托盘编号',
    colProps: { span: 6 },
  },
  {
    component: 'Input',
    field: '',
    label: '血浆/样品批号',
    colProps: { span: 6 },
  },
  {
    component: 'Input',
    field: '',
    label: '血浆/样品袋号',
    colProps: { span: 6 },
  },
  {
    component: 'Input',
    field: '',
    label: '血浆/样品编号',
    colProps: { span: 6 },
  },
  {
    component: 'Input',
    field: '',
    label: '投产准备号',
    colProps: { span: 6 },
  },
  {
    component: 'Input',
    field: '',
    label: '使用状态',
    colProps: { span: 6 },
  },
  {
    component: 'Input',
    field: '',
    label: '负载状态',
    colProps: { span: 6 },
  },
  {
    component: 'Input',
    field: '',
    label: '存放位置',
    colProps: { span: 6 },
  },
  {
    component: 'Input',
    field: '',
    label: '存放类型',
    colProps: { span: 6 },
  },
];
