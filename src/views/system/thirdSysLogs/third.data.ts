import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import dayjs from 'dayjs';

export const columns: BasicColumn[] = [
  {
    title: '执行时长',
    dataIndex: 'processTime',
  },
  {
    title: '第三方请求方式',
    dataIndex: 'requestType',
  },

  {
    title: '第三方系统模块',
    dataIndex: 'sysType',
  },
  {
    title: '操作描述',
    dataIndex: 'operationDesc',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD HH:MM:ss') : '-';
    },
  },
  {
    title: '请求参数',
    dataIndex: 'reqData',
  },
  {
    title: '响应数据',
    dataIndex: 'respData',
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
