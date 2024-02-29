import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { stationNameList } from '@/api/callback/list-generation';

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    title: '样本批号',
    dataIndex: 'sampleBatchNo',
  },

  {
    title: '回访样本数量',
    dataIndex: 'sampleNum',
  },
  {
    title: '检测结果审核人',
    dataIndex: 'reviewer',
  },
  {
    title: '接收日期',
    dataIndex: 'receiveDate',
  },
  {
    title: '采集日期起止',
    dataIndex: 'collectDateString',
    width: 200,
  },
  {
    title: '检测结果发布人',
    dataIndex: 'issueBy',
  },
  {
    title: '检测结果发布日期',
    dataIndex: 'issueDate',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'stationNo',
    component: 'ApiSelect',
    label: '采浆公司',
    componentProps: {
      api: stationNameList,
      labelField: 'stationName',
      valueField: 'stationNo',
    },
  },
  {
    field: 'sampleBatchNo',
    component: 'Input',
    label: '样本批号',
  },
  {
    field: '[sampleReceiveStartDate, sampleReceiveEndDate]',
    component: 'RangePicker',
    label: '样本接收日期',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
];
