import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import dayjs from 'dayjs';

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    title: '本月入库数量',
    dataIndex: 'inOfMonth',
  },
  {
    title: '本年入库数量',
    dataIndex: 'inOfYear',
  },
];

export const footerColumns: BasicColumn[] = [
  {
    title: '上月血浆存量',
    dataIndex: 'allStockOfLastMonth',
  },
  {
    title: '血浆入库量',
    children: [
      {
        title: '本月',
        dataIndex: 'allInOfMonth',
      },
      {
        title: '本年',
        dataIndex: 'allInOfYear',
      },
    ],
  },
  {
    title: '血浆出库量',
    children: [
      {
        title: '本月',
        dataIndex: 'allOutOfMonth',
      },
      {
        title: '本年',
        dataIndex: 'allOutOfYear',
      },
    ],
  },
  {
    title: '本月结存量',
    dataIndex: 'allStockOfCurrMonth',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'timeField',
    label: '起止日期',
    defaultValue: [dayjs(), dayjs()],
    component: 'RangePicker',
  },
  {
    field: 'inDateType',
    label: '入库日期类型',
    defaultValue: 'ACP',
    component: 'RadioGroup',
    componentProps: {
      options: [
        {
          label: '接收日期',
          value: 'ACP',
        },
        {
          label: '验收日期',
          value: 'VRF',
        },
      ],
    },
  },
  {
    field: 'outDateType',
    label: '出库日期类型',
    defaultValue: 'DLV',
    component: 'RadioGroup',
    componentProps: {
      options: [
        {
          label: '血浆出库',
          value: 'DLV',
        },
        {
          label: '血浆投产',
          value: 'PRO',
        },
      ],
    },
  },
  {
    field: 'quantityUnit',
    label: '血浆计量单位',
    defaultValue: 'BAG',
    component: 'RadioGroup',
    componentProps: {
      options: [
        {
          label: '袋',
          value: 'BAG',
        },
        {
          label: '吨',
          value: 'TON',
        },
      ],
    },
  },
];
