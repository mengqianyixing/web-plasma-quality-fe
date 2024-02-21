import { BasicColumn } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '简称',
    dataIndex: 'shortName',
  },
  {
    title: '全程',
    dataIndex: 'fullName',
  },
  {
    title: '血浆皮重',
    dataIndex: 'tareWeight',
  },
  {
    title: '浆站编码',
    dataIndex: 'stationNo',
  },
  {
    title: 'ERP浆站编码',
    dataIndex: 'preERP',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
  {
    title: '浆站系统类型',
    dataIndex: 'systemType',
  },
  {
    title: '所在省份',
    dataIndex: 'province',
  },
  {
    title: '记录人',
    dataIndex: 'creator',
  },
  {
    title: '记录日期',
    dataIndex: 'createDate',
  },
];
