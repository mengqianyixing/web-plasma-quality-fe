import { BasicColumn } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '排序',
    dataIndex: 'sort',
    width: 60,
  },
  {
    title: '简称',
    dataIndex: 'shortName',
    width: 80,
  },
  {
    title: '全称',
    dataIndex: 'fullName',
    width: 240,
    ellipsis: false,
  },
  {
    title: '血浆皮重（g）',
    dataIndex: 'tareWeight',
    width: 120,
  },
  {
    title: '浆站编码',
    dataIndex: 'stationNo',
    width: 80,
  },
  {
    title: 'ERP浆站编码',
    dataIndex: 'preERP',
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
  },
  {
    title: '浆站系统类型',
    dataIndex: 'systemType',
    width: 120,
  },
  {
    title: '所在省份',
    dataIndex: 'province',
    width: 60,
  },
];
