import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';

export const trayInStoreColumns: BasicColumn[] = [
  {
    title: '托盘编号',
    dataIndex: '',
  },
  {
    title: '箱数',
    dataIndex: '',
  },
  {
    title: '血浆数量',
    dataIndex: '',
  },
  {
    title: '状态',
    dataIndex: '',
  },
  {
    title: '存放位置',
    dataIndex: '',
  },
];

export const trayInStoreFormSchema: FormSchema[] = [
  {
    label: '托盘编号',
    field: '',
    component: 'Input',
  },
  {
    label: '血浆箱号',
    field: '',
    component: 'Input',
  },
];

export const trayOutStoreColumns: BasicColumn[] = [
  {
    title: '托盘编号',
    dataIndex: '',
  },
  {
    title: '血浆批号',
    dataIndex: '',
  },
  {
    title: '存放血浆箱数',
    dataIndex: '',
    slots: { customRender: 'box' },
  },
  {
    title: '待分拣血浆箱数',
    dataIndex: '',
  },
  {
    title: '是否全分拣',
    dataIndex: '',
  },
  {
    title: '状态',
    dataIndex: '',
  },
  {
    title: '存放位置',
    dataIndex: '',
  },
];
export const trayOutStoreFormSchema: FormSchema[] = [
  {
    label: '托盘编号',
    field: '',
    component: 'Input',
  },
  {
    label: '血浆批号',
    field: '',
    component: 'Input',
  },
  {
    label: '血浆箱号',
    field: '',
    component: 'Input',
  },
  {
    label: '状态',
    field: '',
    component: 'Input',
  },
  {
    label: '是否全分拣',
    field: '',
    component: 'Input',
  },
];
export const boxBindColumns: BasicColumn[] = [
  {
    title: '血浆批号',
    dataIndex: '',
  },
  {
    title: '血浆箱号',
    dataIndex: '',
  },
  {
    title: '血浆数量',
    dataIndex: '',
  },
  {
    title: '是否待分拣',
    dataIndex: '',
  },
];
