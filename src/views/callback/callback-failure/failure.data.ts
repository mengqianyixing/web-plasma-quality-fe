import { BasicColumn, FormSchema } from '@/components/Table';
import dayjs from 'dayjs';
import { donorStatusMap, donorStatusValueEnum } from '@/enums/callbackEnum';
import { useStation } from '@/hooks/common/useStation';

const { stationOptions } = useStation();

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    width: 80,
  },
  {
    title: '浆员编号',
    dataIndex: 'cardNo',
    width: 110,
  },
  {
    title: '浆员姓名',
    dataIndex: 'name',
    width: 100,
    ellipsis: false,
  },
  {
    title: '浆员性别',
    dataIndex: 'gender',
    width: 80,
  },
  {
    title: '浆员状态',
    dataIndex: 'status',
    format: (text) => {
      return donorStatusMap.get(text as donorStatusValueEnum) as string;
    },
    width: 100,
  },
  {
    title: '拒绝日期',
    dataIndex: 'refuseDate',
    format: (text) => {
      return text ? dayjs(text).format('YYYY-MM-DD') : '';
    },
    width: 100,
  },
  {
    title: '拒绝原因',
    dataIndex: 'refuseReason',
    width: 140,
    ellipsis: false,
  },
  {
    title: '最后采浆日期',
    dataIndex: 'lastCollectionDate',
    format: (text) => {
      return text ? dayjs(text).format('YYYY-MM-DD') : '';
    },
    width: 100,
  },
  {
    title: '回访日期',
    dataIndex: 'callBackDate',
    width: 100,
  },

  {
    title: '失败原因',
    dataIndex: 'failureReason',
    width: 140,
    ellipsis: false,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'stationNo',
    label: '采浆公司',
    component: 'Select',
    componentProps: {
      options: stationOptions,
    },
  },
  {
    field: '[callBackStartDate, callBackEndDate]',
    label: '回访日期',
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
    },
  },
  {
    field: 'failureReason',
    label: '失败原因',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '其他',
          value: '其他',
        },
        {
          label: '未联系上',
          value: '未联系上',
        },
        {
          label: '死亡',
          value: '死亡',
        },
        {
          label: '无需联络',
          value: '无需联络',
        },
        {
          label: '已联络拒绝',
          value: '已联络拒绝',
        },
      ],
    },
  },
];
