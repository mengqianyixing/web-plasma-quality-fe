import { BasicColumn } from '@/components/Table';
import { FormSchema } from '@/components/Form';
import { sampleVerifyStatusMap, sampleVerifyStatusValueEnum } from '@/enums/sampleEnum';
import dayjs from 'dayjs';

export const sampleVerifyColumns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    title: '样本批号',
    dataIndex: 'batchSampleNo',
  },
  {
    title: '样本类型',
    dataIndex: 'sampleType',
    slots: { customRender: 'sampleType' },
  },
  {
    title: '样本总数',
    dataIndex: 'totalCount',
  },
  {
    title: '接收日期',
    dataIndex: 'acceptAt',
    format: (text) => {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '状态',
    dataIndex: 'verifyState',
    format: (text) => {
      return sampleVerifyStatusMap.get(<sampleVerifyStatusValueEnum>text) as string;
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'batchSampleNo',
    label: '样本批号',
    component: 'Input',
    colProps: { span: 8 },
  },
];
