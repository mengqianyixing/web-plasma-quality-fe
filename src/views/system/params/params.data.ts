import { BasicColumn, FormSchema } from '@/components/Table';
import dayjs from 'dayjs';

export const columns: BasicColumn[] = [
  {
    title: '参数名称',
    dataIndex: 'paramName',
  },
  {
    title: '参数键名',
    dataIndex: 'paramKey',
  },
  {
    title: '参数键值',
    dataIndex: 'paramValue',
  },
  {
    title: '参数说明',
    dataIndex: 'remark',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'paramName',
    label: '参数名称',
    component: 'Input',
  },
];
