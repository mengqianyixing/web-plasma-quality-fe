import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import dayjs from 'dayjs';
import { DescItem } from '@/components/Description';
import { PlasmaCheckStateMap, PlasmaCheckStateValueEnum } from '@/enums/plasmaEnum';

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
  },
  {
    title: '验收数量',
    dataIndex: 'verifyCount',
  },
  {
    title: '验收日期',
    dataIndex: 'verifyAt',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '合格血浆数量',
    dataIndex: 'qualifiedCount',
  },
  {
    title: '特免合格数量',
    dataIndex: 'titerQualifiedCount',
  },
  {
    title: '检测结果发布人',
    dataIndex: 'testIssuer',
  },
  {
    title: '检测结果发布日期',
    dataIndex: 'testIssueAt',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '审核单号',
    dataIndex: 'auditId',
  },
  {
    title: '审核人',
    dataIndex: 'auditer',
  },
  {
    title: '审核日期',
    dataIndex: 'auditAt',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '复核人',
    dataIndex: 'rechecker',
  },
  {
    title: '复核日期',
    dataIndex: 'recheckAt',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '批准人',
    dataIndex: 'approver',
  },
  {
    title: '批准日期',
    dataIndex: 'approvalAt',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '状态',
    dataIndex: 'auditState',
    format(text) {
      return PlasmaCheckStateMap.get(text as PlasmaCheckStateValueEnum) as string;
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
    field: 'batchNo',
    label: '血浆批号',
    component: 'Input',
  },
  {
    field: 'auditState',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [...PlasmaCheckStateMap].map(([value, label]) => ({ value, label })),
    },
  },
  {
    field: 'auditId',
    label: '审核单号',
    component: 'Input',
  },
  {
    field: '[releaseBeginAt, releaseEndAt]',
    label: '发布日期',
    component: 'RangePicker',
  },
  {
    field: '[auditBeginAt, auditEndAt]',
    label: '审核日期',
    component: 'RangePicker',
  },
  {
    field: '[recheckBeginAt, recheckEndAt]',
    label: '复核日期',
    component: 'RangePicker',
  },
];

export const PlasmaBatchSchema: DescItem[] = [
  {
    field: 'stationName',
    label: '采浆公司',
  },
  {
    field: 'batchNo',
    label: '血浆批号',
  },
  {
    field: 'verifyCount',
    label: '验收数量',
  },
  {
    field: 'verifyAt',
    label: '验收日期',
  },
  {
    field: 'qualifiedCount',
    label: '合格血浆数量',
  },
  {
    field: 'titerQualifiedCount',
    label: '特免合格数量',
  },
  {
    field: 'testIssuer',
    label: '检测结果发布人',
  },
  {
    field: 'testIssueAt',
    label: '检测结果发布日期',
  },
];
