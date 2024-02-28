import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { stationNameList } from '@/api/callback/list-generation';

export const columns: BasicColumn[] = [
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
  },
  {
    title: '血浆批号（ERP）',
    dataIndex: 'batchNoFromErp',
  },

  {
    title: '血浆复核日期',
    dataIndex: 'recheckAt',
  },
  {
    title: '采集开始日期',
    dataIndex: 'collectBeginAt',
  },
  {
    title: '采集结束日期',
    dataIndex: 'collectEndAt',
  },
  {
    title: '血浆类型',
    dataIndex: 'plasmaType',
  },
  {
    title: '效价类型',
    dataIndex: 'titerType',
  },
  {
    title: '物料编码',
    dataIndex: 'materialNo',
  },
  {
    title: '血浆合格总数',
    dataIndex: 'totalQualified',
  },
  {
    title: '血浆验收净重（g）',
    dataIndex: 'netWeight',
  },
  {
    title: '不合格血浆总数',
    dataIndex: 'totalUnqualified',
  },
  {
    title: '不合格验收净重（g）',
    dataIndex: 'unqualifiedNetWeight',
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
    field: 'batchNo',
    component: 'Input',
    label: '血浆批号',
  },
  {
    field: '[recheckBeginAt, recheckEndAt]',
    component: 'RangePicker',
    label: '血浆复核日期',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
];
