import { BasicColumn, FormSchema } from '@/components/Table';
import dayjs from 'dayjs';
import { donorStatusMap, donorStatusValueEnum } from '@/enums/callbackEnum';

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationNo',
    slots: { customRender: 'stationNo' },
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
    title: '浆员性别',
    dataIndex: 'gender',
    customRender: ({ text }) => {
      if (text === 'M') {
        return '男';
      } else if (text === 'F') {
        return '女';
      }
      return '';
    },
  },
  {
    title: '浆员状态',
    dataIndex: 'status',
    format: (text) => {
      return donorStatusMap.get(text as donorStatusValueEnum) as string;
    },
  },
  {
    title: '拒绝日期',
    dataIndex: 'refuseDate',
    format: (text) => {
      return text ? dayjs(text).format('YYYY-MM-DD') : '';
    },
  },
  {
    title: '拒绝原因',
    dataIndex: 'refuseReason',
  },
  {
    title: '最后采浆日期',
    dataIndex: 'lastCollectionDate',
    format: (text) => {
      return text ? dayjs(text).format('YYYY-MM-DD') : '';
    },
  },
  {
    title: '回访日期',
    dataIndex: 'callBackDate',
  },
  {
    title: '失败原因',
    dataIndex: 'failureReason',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'stationNo',
    label: '采浆公司',
    component: 'Select',
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
  },
];
