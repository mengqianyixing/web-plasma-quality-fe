import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import dayjs from 'dayjs';

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    title: '浆员编号',
    dataIndex: 'cardNo',
    slots: { customRender: 'donorNo' },
  },
  {
    title: '姓名',
    dataIndex: 'donorName',
  },
  {
    title: '建档日期',
    dataIndex: 'createAt',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '永拒原因',
    dataIndex: 'blockReason',
  },
  {
    title: '永拒日期',
    dataIndex: 'blockAt',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
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
    field: 'createAt',
    component: 'RangePicker',
    label: '建档日期',
    componentProps: {
      allowEmpty: [true, true],
    },
  },
  {
    field: 'blockReason',
    component: 'Input',
    label: '永拒原因',
  },
  {
    field: 'overage',
    component: 'Select',
    label: '是否超龄用拒',
    componentProps: {
      options: [
        {
          label: '超龄永拒',
          value: true,
        },
        {
          label: '非超龄永拒',
          value: false,
        },
      ],
    },
  },
  {
    field: 'blockAt',
    component: 'RangePicker',
    label: '永拒日期',
    componentProps: {
      allowEmpty: [true, true],
    },
  },
];
