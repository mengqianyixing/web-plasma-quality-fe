import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'batchNo',
  },
  {
    title: '血浆批号',
    dataIndex: 'stationName',
  },

  {
    title: '样品批号',
    dataIndex: 'stationBoxNo',
  },
  {
    title: '箱号',
    dataIndex: 'currBoxNo',
  },
  {
    title: '数量',
    dataIndex: 'currBoxNo',
  },
  {
    title: '托盘编号',
    dataIndex: 'currBoxNo',
  },
  {
    title: '存放库房',
    dataIndex: 'currBoxNo',
  },
  {
    title: '货位号',
    dataIndex: 'currBoxNo',
  },
  {
    title: '存放类型',
    dataIndex: 'currBoxNo',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: '',
    component: 'Input',
    label: '采浆公司',
  },
  {
    field: '',
    component: 'Input',
    label: '样品箱号',
  },
  {
    field: '',
    component: 'Input',
    label: '样本批号',
  },
  {
    field: '',
    component: 'Input',
    label: '样本编号',
  },
  {
    field: '',
    component: 'Input',
    label: '血浆箱号',
  },
  {
    field: '',
    component: 'Input',
    label: '血浆批号',
  },
  {
    field: '',
    component: 'Input',
    label: '血浆编号',
  },
  {
    field: '',
    component: 'Input',
    label: '血浆类型',
  },
  {
    field: '',
    component: 'Input',
    label: '托盘编号',
  },
  {
    field: '',
    component: 'Input',
    label: '存放类型',
  },
];
