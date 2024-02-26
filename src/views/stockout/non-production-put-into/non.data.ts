import { BasicColumn, FormSchema } from '@/components/Table';
import dayjs from 'dayjs';
import { sampleVerifyStatusMap, sampleVerifyStatusValueEnum } from '@/enums/sampleEnum';

export const columns: BasicColumn[] = [
  {
    title: '申请单号',
    dataIndex: 'stationName',
  },
  {
    title: '申请原因',
    dataIndex: 'batchSampleNo',
  },
  {
    title: '转移部门',
    dataIndex: 'sampleType',
  },
  {
    title: '转移申请人',
    dataIndex: 'outStationDate',
  },
  {
    title: '申请日期',
    dataIndex: 'sampleCount',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '记录人',
    dataIndex: 'acceptor',
  },
  {
    title: '记录日期',
    dataIndex: 'acceptAt',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '准备人',
    dataIndex: 'qualifiedCount',
  },
  {
    title: '准备日期',
    dataIndex: 'acceptAt',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '复核人',
    dataIndex: 'verifier',
  },
  {
    title: '复核日期',
    dataIndex: 'verifyAt',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '审核人',
    dataIndex: 'verifyAt',
  },
  {
    title: '审核日期',
    dataIndex: 'titerExpired',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '出库扫描日期',
    dataIndex: 'thersExpired',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '状态',
    dataIndex: 'verifyState',
    format(text) {
      return sampleVerifyStatusMap.get(<sampleVerifyStatusValueEnum>text) as string;
    },
  },
];

export const searchSchema: FormSchema[] = [
  {
    field: 'stationNo',
    component: 'Input',
    label: '申请单号',
  },
  {
    field: '[batchSampleNoStart, batchSampleNoEnd]',
    component: 'RangePicker',
    label: '申请日期',
  },
  {
    field: 'status',
    component: 'Select',
    label: '状态',
  },
];
