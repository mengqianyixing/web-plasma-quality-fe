import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import dayjs from 'dayjs';
import { getPrinter } from '@/api/tag/printRecord';

export const columns: BasicColumn[] = [
  {
    title: '标签类型',
    dataIndex: 'labelType',
    slots: { customRender: 'labelType' },
  },
  {
    title: '标签编号',
    dataIndex: 'prtNo',
  },
  {
    title: '打印份数',
    dataIndex: 'times',
  },
  {
    title: '是否补打印',
    dataIndex: 'supplementary',
    format: (text) => {
      return text ? '是' : '否';
    },
  },
  {
    title: '打印原因',
    dataIndex: 'reason',
  },
  {
    title: '打印人',
    dataIndex: 'creator',
  },
  {
    title: '打印时间',
    dataIndex: 'createAt',
    format: (text) => {
      return text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-';
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: '[begnDate, endDate]',
    label: '打印日期',
    component: 'RangePicker',
    colProps: { span: 8 },
    defaultValue: [dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
    componentProps: {
      format: 'YYYY-MM-DD',
    },
  },
  {
    field: 'creator',
    label: '打印人',
    component: 'ApiSelect',
    colProps: { span: 8 },
    componentProps: {
      api: getPrinter,
    },
  },
  {
    field: 'labelType',
    label: '标签类型',
    component: 'Select',
    colProps: { span: 8 },
  },
];

export const ReprintRecordFormSchema: FormSchema[] = [
  {
    field: 'prtNo',
    label: '标签编号',
    component: 'Input',
    colProps: {
      span: 18,
    },
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'reason',
    label: '打印原因',
    component: 'Select',
    colProps: {
      span: 18,
    },
    required: true,
  },
];
