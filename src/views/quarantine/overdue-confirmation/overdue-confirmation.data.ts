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
    title: '血浆编号',
    dataIndex: '',
  },
  {
    title: '浆员编号',
    dataIndex: '',
  },
  {
    title: '浆员姓名',
    dataIndex: '',
  },
  {
    title: '浆员状态',
    dataIndex: '',
  },
  {
    title: '血浆类型',
    dataIndex: '',
  },
  {
    title: '采浆日期',
    dataIndex: '',
  },
  {
    title: '最后采浆日期',
    dataIndex: '',
  },
  {
    title: '最后回访日期',
    dataIndex: '',
  },
  {
    title: '计算人',
    dataIndex: '',
  },
  {
    title: '计算日期',
    dataIndex: '',
  },
  {
    title: '复核人',
    dataIndex: '',
  },
  {
    title: '复核日期',
    dataIndex: '',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '血浆批号',
    component: 'Input',
    field: '',
  },
  {
    label: '血浆编号',
    component: 'Input',
    field: '',
  },
  {
    label: '浆员编号',
    component: 'Input',
    field: '',
  },
  {
    label: '状态',
    component: 'Select',
    field: '',
    componentProps: {
      options: [],
    },
  },
];
