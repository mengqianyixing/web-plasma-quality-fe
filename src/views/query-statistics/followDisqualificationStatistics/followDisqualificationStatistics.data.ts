import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { stationNameList } from '@/api/callback/list-generation';

export const columns: BasicColumn[] = [
  {
    title: '年份',
    dataIndex: '',
  },
  {
    title: '续追踪血浆数量（袋）',
    dataIndex: '',
  },

  {
    title: '回访不合格追踪',
    dataIndex: '',
  },
  {
    title: '后续供浆检测不合格追踪',
    dataIndex: '',
  },
  {
    title: '其他无后续信息',
    dataIndex: '',
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
    field: '[pubStartDate, pubEndDate]',
    component: 'RangePicker',
    label: '采集日期起止',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: '[callbackStartDate, callbackEndDate]',
    component: 'RangePicker',
    label: '检测发布日期起止',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
];
