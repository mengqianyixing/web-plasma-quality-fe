import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { stationNameList } from '@/api/callback/list-generation';
import {
  getSysSecondaryDictionary,
  DictionaryReasonEnum,
  DictionaryItemKeyEnum,
} from '@/api/_dictionary';
import { getBlockSource } from '@/api/query-statistics/nonconformityTracking';

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
    title: '样本编号',
    dataIndex: 'sampleNo',
  },
  {
    title: '采集日期',
    dataIndex: 'collectAt',
  },
  {
    title: '浆员编号',
    dataIndex: 'donorNo',
  },
  {
    title: '姓名',
    dataIndex: 'donorName',
  },
  {
    title: '不合格原因',
    dataIndex: 'failedReason',
  },
  {
    title: '不合格日期',
    dataIndex: 'blockAt',
  },
  {
    title: '不合格来源',
    dataIndex: 'blockBy',
  },
  // {
  //   title: '追踪记录/报告',
  //   dataIndex: '',
  // },
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
    field: 'sampleNo',
    component: 'Input',
    label: '样本编号',
  },
  {
    field: '[collectStartDate, collectEndDate]',
    component: 'RangePicker',
    label: '采集日期起止',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: 'donorNo',
    component: 'Input',
    label: '浆员编号',
  },
  {
    field: 'blockBy',
    component: 'ApiSelect',
    label: '不合格来源',
    componentProps: {
      api: getBlockSource,
      resultField: '[0].enumObjList',
      labelField: 'show',
      valueField: 'key',
    },
  },
  {
    field: 'failedCode',
    component: 'ApiSelect',
    label: '不合格原因',
    componentProps: {
      api: getSysSecondaryDictionary,
      params: {
        dataKey: DictionaryReasonEnum.PlasmaFailedReason,
        dictItemTypes: [DictionaryItemKeyEnum.Quarantine],
      },
      labelField: 'label',
      valueField: 'dictItemId',
    },
  },
  {
    field: '[blockStartDate, blockEndDate]',
    component: 'RangePicker',
    label: '不合格日期',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
];
