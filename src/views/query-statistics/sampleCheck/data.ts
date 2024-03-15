import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
import { useStation } from '@/hooks/common/useStation';

const { stationOptions } = useStation();
const serverEnumStore = useServerEnumStoreWithOut();
const SampleType = serverEnumStore.getServerEnumText(SERVER_ENUM.SampleType);
export const columns: BasicColumn[] = [
  {
    width: 80,
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    width: 80,
    title: '样本类型',
    dataIndex: 'sampleType',
    format: (text) => SampleType(text),
  },

  {
    width: 80,
    title: '样本总数',
    dataIndex: 'sampleCount',
  },
  {
    width: 100,
    title: '已接收未检测',
    dataIndex: 'acceptCount',
  },
  {
    width: 80,
    title: '检测样本',
    dataIndex: 'checkCount',
  },
  {
    width: 80,
    title: '检测中',
    dataIndex: 'checkingCount',
  },
  {
    title: '检测合格',
    children: [
      {
        width: 80,
        title: '合格',
        dataIndex: ['check', 'count'],
      },
      {
        width: 80,
        title: '比率(%)',
        dataIndex: ['check', 'ratio'],
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
      },
    ],
  },
  {
    width: 100,
    title: '检测不合格',
    dataIndex: 'failed',
    format: (t: any) => t?.join('、'),
    ellipsis: false,
  },
  {
    title: '验收不合格',
    children: [
      {
        width: 120,
        title: '血浆验收不合格',
        dataIndex: ['verification', 'bag'],
      },
      {
        width: 120,
        title: '样本验收不合格',
        dataIndex: ['verification', 'sample'],
      },

      {
        width: 80,
        title: '合计',
        dataIndex: ['verification', 'count'],
      },
      {
        width: 80,
        title: '比率(%)',
        dataIndex: ['verification', 'ratio'],
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
      },
    ],
  },
  {
    width: 100,
    title: '其他不合格',
    dataIndex: 'other',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'stationNo',
    component: 'Select',
    label: '采浆公司',
    componentProps: {
      options: stationOptions,
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
