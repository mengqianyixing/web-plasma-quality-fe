import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import dayjs from 'dayjs';

export const columns: BasicColumn[] = [
  {
    title: '执行时长',
    dataIndex: 'processTime',
    width: 80,
    align: 'left',
  },
  {
    title: '第三方请求方式',
    dataIndex: 'requestType',
    width: 120,
    align: 'left',
  },

  {
    title: '第三方系统模块',
    dataIndex: 'sysType',
    width: 120,
    align: 'left',
  },
  {
    title: '操作描述',
    dataIndex: 'operationDesc',
    width: 180,
    ellipsis: false,
    align: 'left',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD HH:MM:ss') : '-';
    },
    width: 160,
  },
  {
    title: '请求参数',
    dataIndex: 'reqData',
    width: 800,
    align: 'left',
    ellipsis: false,
  },
  {
    title: '响应数据',
    dataIndex: 'respData',
    width: 300,
    align: 'left',
    ellipsis: false,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'sysType',
    component: 'Input',
    label: '第三方系统模块',
  },
  {
    field: '[createStartDate, createEndDate]',
    component: 'RangePicker',
    label: '创建日期',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
];
