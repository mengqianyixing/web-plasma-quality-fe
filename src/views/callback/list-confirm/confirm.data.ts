import { BasicColumn, FormSchema } from '@/components/Table';
import { CallbackStateMap, CallbackStateValueEnum } from '@/enums/callbackEnum';

export const columns: BasicColumn[] = [
  {
    title: '名单编号',
    dataIndex: 'planNo',
    slots: { customRender: 'planNo' },
    width: 200,
  },
  {
    title: '采浆公司',
    dataIndex: 'stationNo',
    slots: { customRender: 'stationNo' },
  },
  {
    title: '浆员数量',
    dataIndex: 'donorNum',
  },
  {
    title: '生成人',
    dataIndex: 'creator',
  },
  {
    title: '生成日期',
    dataIndex: 'createAt',
  },
  {
    title: '确认人',
    dataIndex: 'checker',
  },
  {
    title: '确认日期',
    dataIndex: 'checkAt',
  },
  {
    title: '状态',
    dataIndex: 'state',
    fixed: 'right',
    format(text) {
      return CallbackStateMap.get(text as CallbackStateValueEnum) as string;
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'stationNo',
    label: '采浆公司',
    component: 'Select',
  },
  {
    field: '[createStartDate, createEndDate]',
    label: '生成日期',
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
    },
  },
  {
    field: 'state',
    label: '状态',
    component: 'Select',
    defaultValue: CallbackStateValueEnum.WIT,
    componentProps: {
      disabled: true,
      options: [...CallbackStateMap.entries()].map(([key, value]) => ({
        label: value,
        value: key,
      })),
    },
  },
];
