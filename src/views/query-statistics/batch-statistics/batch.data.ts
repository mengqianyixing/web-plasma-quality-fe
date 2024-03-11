import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { stationNameList } from '@/api/callback/list-generation';

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    width: 100,
  },
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
    width: 120,
  },
  {
    title: '采集开始日期',
    dataIndex: 'collStartDate',
    width: 120,
  },
  {
    title: '采集结束日期',
    dataIndex: 'collEndDate',
    width: 120,
  },
  {
    title: '入库情况',
    children: [
      {
        title: '接收日期',
        dataIndex: 'acceptDate',
        width: 150,
      },
      {
        title: '验收发布人',
        dataIndex: 'verifyPubBy',
        width: 150,
      },
      {
        title: '验收发布日期',
        dataIndex: 'verifyPubDate',
        width: 150,
      },
      {
        title: '验收数量袋',
        dataIndex: 'verifyNum',
        width: 150,
      },
      {
        title: '验收验收净重（kg）',
        dataIndex: 'verifyWeight',
        width: 150,
      },
    ],
  },
  {
    title: '检测情况',
    children: [
      {
        title: '结果发布人',
        dataIndex: 'issueBy',
        width: 150,
      },
      {
        title: '结果发布日期',
        dataIndex: 'issueDate',
        width: 150,
      },
      {
        title: '合格数量袋',
        dataIndex: 'passNum',
        width: 150,
      },
      {
        title: '不合格数量袋',
        dataIndex: 'noPassNum',
        width: 150,
      },
    ],
  },
  {
    title: '检疫期情况',
    children: [
      {
        title: '参考样本批号',
        dataIndex: 'referBatchNo',
        width: 150,
      },
      {
        title: '样本检测发布人',
        dataIndex: 'samplePubBy',
        width: 150,
      },
      {
        title: '样本检测发布日期',
        dataIndex: 'samplePubDate',
        width: 150,
      },
    ],
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
