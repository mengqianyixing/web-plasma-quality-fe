import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { stationNameSearchApi } from '@/api/plasmaStore/entryPlasma';

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
    title: '报告发布日期',
    dataIndex: 'issueAt',
    format: (t) => t?.slice(0, 10),
  },
  {
    title: '样本编号',
    dataIndex: 'sampleNo',
  },
  {
    title: '浆员编号',
    dataIndex: 'donorNo',
  },
  {
    title: '浆员姓名',
    dataIndex: 'name',
  },
  {
    title: '采集日期',
    dataIndex: 'collectionAt',
    format: (t) => t?.slice(0, 10),
  },
  {
    title: '不合格原因',
    dataIndex: 'cause',
  },
  {
    title: '已销毁血浆批号',
    dataIndex: 'destroyedBatchNo',
    ellipsis: false,
  },
  {
    title: '已销毁血浆编号',
    dataIndex: 'destroyedBagNo',
    ellipsis: false,
  },
  {
    title: '永拒日期',
    dataIndex: 'rejectAt',
    format: (t) => t?.slice(0, 10),
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'stationNo',
    component: 'ApiSelect',
    label: '采浆公司',
    componentProps: {
      api: stationNameSearchApi,
      labelField: 'stationName',
      valueField: 'stationNo',
    },
  },
  {
    component: 'Input',
    field: 'batchNo',
    label: '血浆批号',
  },
  {
    component: 'RangePicker',
    field: '[collectionBegin,collectionEnd]',
    label: '采集日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    component: 'RangePicker',
    field: '[releaseBegin,releaseEnd]',
    label: '验收发布日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    component: 'RangePicker',
    field: '[issueBegin,issueEnd]',
    label: '检验发布日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
];
