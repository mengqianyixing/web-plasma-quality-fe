import { BasicColumn } from '@/components/Table';
import { FormSchema } from '@/components/Form';
import { sampleReceiveStatusMap, sampleReceiveStatusValueEnum } from '@/enums/sampleEnum';

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
    slots: { customRender: 'sampleType' },
  },
  {
    title: '样本数量',
    dataIndex: 'totalCount',
  },
  {
    title: '状态',
    dataIndex: 'acceptState',
    format: (text) => {
      return sampleReceiveStatusMap.get(<sampleReceiveStatusValueEnum>text) as string;
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