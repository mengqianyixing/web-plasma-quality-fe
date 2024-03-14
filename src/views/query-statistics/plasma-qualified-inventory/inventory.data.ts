import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import dayjs from 'dayjs';

export const columns: BasicColumn[] = [
  {
    title: '效价类型',
    dataIndex: 'immType',
  },
  {
    title: '库存数量（袋）',
    dataIndex: 'immTypeCount',
  },
  {
    title: '重量（吨）',
    dataIndex: 'immTypeWeight',
  },
  {
    title: '最早采集日期',
    dataIndex: 'minCollectAt',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'queryDate',
    label: '采浆公司',
    defaultValue: dayjs().subtract(1, 'day'),
    component: 'DatePicker',
  },
];
