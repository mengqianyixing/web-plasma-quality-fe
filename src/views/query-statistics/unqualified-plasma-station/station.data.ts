import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { stationNameList } from '@/api/callback/list-generation';

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    title: '入库数量（袋）',
    dataIndex: 'inNum',
  },

  {
    title: '验收数量（袋）',
    dataIndex: 'verifyNum',
  },
  {
    title: '验收合格数量（袋）',
    dataIndex: 'verifyPassNum',
  },
  {
    title: '验收不合格',
    dataIndex: 'verifyUnqNum',
  },
  {
    title: '检测不合格',
    dataIndex: 'testUnqNum',
  },
  {
    title: '检疫期不合格',
    dataIndex: 'quarantineUnqNum',
  },
  {
    title: '续追踪不合格',
    dataIndex: 'trackUnqNum',
  },
  {
    title: '其他不合格',
    dataIndex: 'otherUnqNum',
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
    field: '[inStoreStartDate, inStoreEndDate]',
    component: 'RangePicker',
    label: '入库日期',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: '[verifyPubStartDate, verifyPubEndDate]',
    component: 'RangePicker',
    label: '验收发布日期',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: '[issueStartDate, issueEndDate]',
    component: 'RangePicker',
    label: '验收发布日期',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: '[unqInStoreStartDate, unqInStoreEndDate]',
    component: 'RangePicker',
    label: '入库日期',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
];
