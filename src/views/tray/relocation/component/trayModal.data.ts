import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '托盘编号',
    dataIndex: 'trayNo',
  },
  {
    title: '货位号',
    dataIndex: '',
  },
  {
    title: '区域',
    dataIndex: '',
  },
  {
    title: '库房',
    dataIndex: '',
  },
  {
    title: '存放类型',
    dataIndex: '',
  },
  {
    title: '血浆批次范围',
    dataIndex: '',
  },
];

export const formSchema: FormSchema[] = [
  {
    field: '',
    component: 'Input',
    label: '托盘编号',
  },
  {
    field: '',
    component: 'Input',
    label: '库房',
  },
  {
    field: '',
    component: 'Input',
    label: '货位号',
  },
  {
    field: '',
    component: 'Input',
    label: '区域',
  },
  {
    field: '',
    component: 'Input',
    label: '血浆批次',
  },
];
