import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { stationNameSearchApi } from '@/api/plasmaStore/entryPlasma';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

const serverEnumStore = useServerEnumStoreWithOut();
const SampleType = serverEnumStore.getServerEnumText(SERVER_ENUM.SampleType);
export const columns: BasicColumn[] = [
  {
    width: 150,
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    width: 150,
    title: '样本类型',
    dataIndex: 'sampleType',
    format: (text) => SampleType(text),
  },

  {
    width: 150,
    title: '样本总数',
    dataIndex: 'sampleCount',
  },
  {
    width: 150,
    title: '已接收未检测',
    dataIndex: 'acceptCount',
  },
  {
    width: 150,
    title: '检测样本',
    dataIndex: 'checkCount',
  },
  {
    width: 150,
    title: '检测中',
    dataIndex: 'checkingCount',
  },
  {
    width: 150,
    title: '检测合格',
    children: [
      {
        width: 150,
        title: '合格',
        dataIndex: ['check', 'count'],
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: ['check', 'ratio'],
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
      },
    ],
  },
  {
    width: 150,
    title: '检测不合格',
    dataIndex: 'failed',
    format: (t: any) => t?.join('、'),
    ellipsis: false,
  },
  {
    width: 150,
    title: '验收不合格',
    children: [
      {
        width: 150,
        title: '血浆验收不合格',
        dataIndex: ['verification', 'bag'],
      },
      {
        width: 150,
        title: '样本验收不合格',
        dataIndex: ['verification', 'sample'],
      },

      {
        width: 150,
        title: '合计',
        dataIndex: ['verification', 'count'],
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: ['verification', 'ratio'],
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
      },
    ],
  },
  {
    width: 150,
    title: '其他不合格',
    dataIndex: 'other',
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
    field: 'sampleType',
    component: 'Select',
    label: '样本类型',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.SampleType),
    },
  },
  {
    field: '[collectionBegin,collectionEnd]',
    component: 'RangePicker',
    label: '采集日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: '[issueBegin,issueEnd]',
    component: 'RangePicker',
    label: '发布日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
];
