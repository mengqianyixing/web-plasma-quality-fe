import { BasicColumn } from '@/components/Table';
import { FormSchema } from '@/components/Form';

export const sampleAcceptColumns: BasicColumn[] = [
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
  },
  {
    title: '样本总数',
    dataIndex: 'totalCount',
  },
  {
    title: '状态',
    dataIndex: 'acceptState',
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
