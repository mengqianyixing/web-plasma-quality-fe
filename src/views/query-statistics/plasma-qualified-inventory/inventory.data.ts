import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import dayjs from 'dayjs';

const format = (v) => (v || 0).toFixed(3);

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
    format: format,
  },
  {
    title: '最早采集日期',
    dataIndex: 'minCollectAt',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'queryDate',
    label: '库存汇总日期',
    defaultValue: dayjs().subtract(1, 'day'),
    component: 'DatePicker',
  },
];
