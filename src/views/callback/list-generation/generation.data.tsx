import { BasicColumn, FormSchema } from '@/components/Table';
import { CallbackStateMap, CallbackStateValueEnum } from '@/enums/callbackEnum';
import { Button } from '@/components/Button';

export const columns: BasicColumn[] = [
  {
    title: '名单编号',
    dataIndex: 'planNo',
    customRender: ({ text }) => {
      return <Button type="link">{() => text}</Button>;
    },
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
    format(text) {
      return CallbackStateMap.get(text as CallbackStateValueEnum) as string;
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'stationNo',
    label: '采浆公司',
    colProps: { span: 8 },
    component: 'Select',
  },
  {
    field: '[createStartDate, createEndDate]',
    label: '生成日期',
    colProps: { span: 8 },
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
    },
  },
  {
    field: 'state',
    label: '状态',
    colProps: { span: 8 },
    component: 'Select',
    componentProps: {
      options: [...CallbackStateMap.entries()].map(([key, value]) => ({
        label: value,
        value: key,
      })),
    },
  },
];
