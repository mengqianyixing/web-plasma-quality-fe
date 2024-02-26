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
    title: '数量',
    dataIndex: 'stationBoxNo',
  },
  {
    title: '重量(g)',
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
    label: '血浆类型',
  },
  {
    field: '',
    component: 'Input',
    label: '血浆批号',
  },
];
