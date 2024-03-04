import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { stationNameList } from '@/api/callback/list-generation';

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: '',
  },
  {
    title: '血浆数量（袋）',
    dataIndex: '',
  },

  {
    title: '检测不合格合计',
    dataIndex: '',
  },
  {
    title: '比率',
    dataIndex: '',
  },
  {
    title: '检疫期不合格合计',
    dataIndex: '',
  },
  {
    title: '比率',
    dataIndex: '',
  },
  {
    title: '续追踪不合格合计',
    dataIndex: '',
  },
  {
    title: '比率',
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
  {
    field: 'stationType',
    component: 'ApiSelect',
    label: '追踪类型',
  },
  {
    field: '[startDate, endDate]',
    component: 'RangePicker',
    label: '检疫期追踪不合格日期起止',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
];
