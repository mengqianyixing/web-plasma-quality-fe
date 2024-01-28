import { BasicColumn, FormSchema } from '@/components/Table';
import dayjs from 'dayjs';

export const columns: BasicColumn[] = [
  {
    title: '浆站名称',
    dataIndex: 'stationNo',
    slots: { customRender: 'stationNo' },
    width: 200,
  },
  {
    title: '回访批次',
    dataIndex: 'batchNo',
  },
  {
    title: '生成日期',
    dataIndex: 'generateDate',
    format: (text) => {
      return text ? dayjs(text).format('YYYY-MM-DD') : '';
    },
  },
  {
    title: '需回访数量',
    dataIndex: 'totalCount',
  },
  {
    title: '恢复采浆量',
    dataIndex: 'recoverNum',
  },
  {
    title: '回访样本数量',
    dataIndex: 'sampleNum',
  },
  {
    title: '超期未回访数量',
    dataIndex: 'overDateNum',
  },
  {
    title: '回访失败量',
    dataIndex: 'failedNum',
  },
  {
    title: '样本接收日期',
    dataIndex: 'receiveDate',
    format: (text) => {
      return text ? dayjs(text).format('YYYY-MM-DD') : '';
    },
  },
  {
    title: '样本准备日期',
    dataIndex: 'readyDate',
    format: (text) => {
      return text ? dayjs(text).format('YYYY-MM-DD') : '';
    },
  },
  {
    title: '完成率',
    dataIndex: 'completionRate',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'stationNo',
    label: '采浆公司',
    component: 'Select',
  },
  {
    field: '[createStartDate, createEndDate]',
    label: '生成日期',
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
    },
  },
  {
    field: '[receiveStartDate, receiveEndDate]',
    label: '样本接收日期',
    component: 'RangePicker',
  },
];
