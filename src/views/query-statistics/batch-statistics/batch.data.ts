import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { stationNameList } from '@/api/callback/list-generation';

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
  },
  {
    title: '采集开始日期',
    dataIndex: 'collStartDate',
  },
  {
    title: '采集结束日期',
    dataIndex: 'collEndDate',
  },
  {
    title: '接收日期',
    dataIndex: 'acceptDate',
  },
  {
    title: '验收发布人',
    dataIndex: 'verifyPubBy',
  },
  {
    title: '验收发布日期',
    dataIndex: 'verifyPubDate',
  },
  {
    title: '验收数量袋',
    dataIndex: 'verifyNum',
  },
  {
    title: '验收验收净重（kg）',
    dataIndex: 'verifyWeight',
  },
  {
    title: '结果发布人',
    dataIndex: 'issueBy',
  },
  {
    title: '结果发布日期',
    dataIndex: 'issueDate',
  },
  {
    title: '合格数量袋',
    dataIndex: 'passNum',
  },
  {
    title: '不合格数量袋',
    dataIndex: 'noPassNum',
  },
  {
    title: '参考样本批号',
    dataIndex: 'referBatchNo',
  },
  {
    title: '样本检测发布人',
    dataIndex: 'samplePubBy',
  },
  {
    title: '样本检测发布日期',
    dataIndex: 'samplePubDate',
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
    field: 'bagBatchNo',
    component: 'Input',
    label: '血浆批号',
  },
  {
    field: 'sampleBatchNo',
    component: 'Input',
    label: '参考样本批号',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: '[acceptStartDate, acceptEndDate]',
    component: 'RangePicker',
    label: '接收日期',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
];
