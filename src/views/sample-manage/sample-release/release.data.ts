import { BasicColumn, FormSchema } from '@/components/Table';
import dayjs from 'dayjs';
import { sampleVerifyStatusMap, sampleVerifyStatusValueEnum } from '@/enums/sampleEnum';

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    title: '样本批号',
    dataIndex: 'batchSampleNo',
    width: 200,
  },
  {
    title: '样本类型',
    dataIndex: 'sampleType',
    slots: { customRender: 'sampleType' },
  },
  {
    title: '浆站出库日期',
    dataIndex: 'outStationDate',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '样本数量',
    dataIndex: 'sampleCount',
  },
  {
    title: '接收人',
    dataIndex: 'acceptor',
  },
  {
    title: '接收日期',
    dataIndex: 'acceptAt',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '合格样本数量',
    dataIndex: 'qualifiedCount',
  },
  {
    title: '不合格样本数量',
    dataIndex: 'unqualifiedCount',
    slots: { customRender: 'unqualifiedCount' },
  },
  {
    title: '验收人',
    dataIndex: 'verifier',
  },
  {
    title: '验收日期',
    dataIndex: 'verifyAt',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '效价项目有效期至',
    dataIndex: 'titerExpired',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '其他有效期至',
    dataIndex: 'thersExpired',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '验收状态',
    dataIndex: 'verifyState',
    format(text) {
      return sampleVerifyStatusMap.get(<sampleVerifyStatusValueEnum>text) as string;
    },
  },
];

export const searchReleaseSchema: FormSchema[] = [
  {
    field: 'stationNo',
    component: 'Select',
    label: '采浆公司',
  },
  {
    field: 'batchSampleNo',
    component: 'Input',
    label: '样本批号',
  },
  {
    field: 'sampleType',
    component: 'Select',
    label: '样本类型',
  },
  {
    field: 'verifyState',
    component: 'Select',
    label: '验收状态',
    componentProps: {
      options: [...sampleVerifyStatusMap.entries()].map(([key, value]) => ({
        value: key,
        label: value,
      })),
    },
  },
  {
    field: '[verifyBeginAt, verifyEndAt]',
    component: 'RangePicker',
    label: '验收日期',
  },
  {
    field: '[titerExpiredBeginAt, titerExpiredEndAt]',
    component: 'RangePicker',
    label: '效价项目有效期',
  },
  {
    field: '[othersExpiredBeginAt, othersExpiredEndAt]',
    component: 'RangePicker',
    label: '其他有效期',
  },
];

export const unqualifiedColumns: BasicColumn[] = [
  {
    title: '样本编号',
    dataIndex: 'sampleNo',
  },
  {
    title: '浆员姓名',
    dataIndex: 'donorName',
  },
  {
    title: '浆员编号',
    dataIndex: 'donorNo',
  },
  {
    title: '不合格原因',
    dataIndex: 'unqualifiedReason',
  },
  {
    title: '采浆日期',
    dataIndex: 'collectDate',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
];
