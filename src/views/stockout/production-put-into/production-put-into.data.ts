import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import {
  expirationMap,
  expirationValueEnum,
  operationMap,
  operationValueEnum,
  statusMap,
  statusValueEnum,
} from '@/enums/stockoutEnum';
import dayjs from 'dayjs';

export const columns: BasicColumn[] = [
  {
    title: '制造批号',
    dataIndex: 'mesId',
    align: 'left',
    slots: { customRender: 'mesId' },
  },
  {
    title: '投浆重量(t)',
    dataIndex: 'orderWeight',
    width: 100,
  },
  {
    title: '投产类型',
    dataIndex: 'orderType',
    width: 100,
    format(text) {
      return `${text}，${operationMap.get(<operationValueEnum>text)}`;
    },
  },
  {
    title: '计划出库日期',
    dataIndex: 'planOut',
    width: 120,
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '计划投产日期',
    dataIndex: 'planTask',
    width: 120,
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '血浆数量',
    dataIndex: 'totalNum',
  },
  {
    title: '血浆净重(kg)',
    dataIndex: 'totalWeight',
  },
  {
    title: '血浆效期',
    dataIndex: 'expiration',
    width: 100,
    format(text) {
      return expirationMap.get(<expirationValueEnum>text) as string;
    },
  },
  {
    title: '出库人',
    dataIndex: 'outPerson',
  },
  {
    title: '出库日期',
    dataIndex: 'outDate',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '接收人',
    dataIndex: 'receiver',
  },
  {
    title: '接收日期',
    dataIndex: 'acceptDate',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '状态',
    dataIndex: 'state',
    width: 80,
    format(text) {
      return statusMap.get(<statusValueEnum>text) as string;
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'mesId',
    label: '制造批号',
    component: 'Input',
  },
  {
    field: 'orderType',
    label: '投产类型',
    component: 'Select',
    componentProps: {
      options: [...operationMap.entries()].map(([key, value]) => ({
        value: key,
        label: `${key}，${value}`,
      })),
    },
  },
  {
    field: 'state',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [...statusMap.entries()].map(([key, value]) => ({
        value: key,
        label: value,
      })),
    },
  },
  {
    field: '[outStartDate, outEndDate]',
    label: '出库日期',
    component: 'RangePicker',
  },
];

export const detailColumns: BasicColumn[] = [
  {
    title: '血浆公司',
  },
  {
    title: '血浆批号',
  },
  {
    title: '血浆箱号',
  },
  {
    title: '血浆净重(g)',
  },
  {
    title: '血浆编号',
  },
  {
    title: '浆员编号',
  },
  {
    title: '浆员姓名',
  },
  {
    title: '效价类型',
  },
  {
    title: '效价结果值',
  },
];
