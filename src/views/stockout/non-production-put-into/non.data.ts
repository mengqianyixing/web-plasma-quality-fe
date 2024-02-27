import { BasicColumn, FormSchema } from '@/components/Table';
import dayjs from 'dayjs';

export const columns: BasicColumn[] = [
  {
    title: '申请单号',
    dataIndex: 'dlvNo',
    slots: { customRender: 'dlvNo' },
  },
  {
    title: '申请原因',
    dataIndex: 'reason',
    width: 200,
  },
  {
    title: '转移部门',
    dataIndex: 'transferDepartment',
  },
  {
    title: '转移申请人',
    dataIndex: 'applicant',
  },
  {
    title: '申请日期',
    dataIndex: 'applicationDate',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '记录人',
    dataIndex: 'creator',
  },
  {
    title: '记录日期',
    dataIndex: 'createDate',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '准备人',
    dataIndex: 'preparedBy',
  },
  {
    title: '准备日期',
    dataIndex: 'prepareAt',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '复核人',
    dataIndex: 'reviewer',
  },
  {
    title: '复核日期',
    dataIndex: 'reviewDate',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '审核人',
    dataIndex: 'checker',
  },
  {
    title: '审核日期',
    dataIndex: 'checkDate',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '出库扫描日期',
    dataIndex: 'outDate',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
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

export const plasmaDetailColumns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
  },
  {
    title: '血浆箱号',
    dataIndex: 'boxNo',
  },
  {
    title: '血浆编号',
    dataIndex: 'bagNo',
  },
  {
    title: '浆员编号',
    dataIndex: 'donorNo',
  },
  {
    title: '血型',
    dataIndex: 'bloodType',
  },
  {
    title: '效价类型',
    dataIndex: 'titerType',
  },
  {
    title: '效价值',
    dataIndex: 'titerNum',
  },
  {
    title: '血浆状态',
    dataIndex: 'plasmaStatus',
  },
];

export const plasmaBoxColumns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
  },
  {
    title: '血浆箱号',
    dataIndex: 'boxNo',
  },
  {
    title: '血浆数量',
    dataIndex: 'plasmaTotal',
  },
  {
    title: '血浆净重(kg)',
    dataIndex: 'totalWeight',
  },
];

export const plasmaBatchColumns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
  },
  {
    title: '效价类型',
    dataIndex: 'titerType',
  },
  {
    title: '血浆总数',
    dataIndex: 'plasmaTotal',
  },
  {
    title: '血浆净重(kg)',
    dataIndex: 'totalWeight',
  },
];
