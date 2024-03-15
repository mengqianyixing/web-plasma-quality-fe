import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  { title: '检测项目', dataIndex: 'projectAbbr', slots: { customRender: 'projectAbbr' } },
  { title: '检测方法', dataIndex: 'methodAbbr' },
  { title: '合格样本总数', dataIndex: 'totalQualified' },
  { title: '不合格样本总数', dataIndex: 'totalUnqualified' },
  { title: '未检测样本总数', dataIndex: 'totalNotCheck' },
];
export const methodsMappding = {
  NAT: '3',
  'PCR-荧光法': '3',
  双缩脲法: '1',
  速率法: '1',
  ELISA: '2',
  赖氏法: '2',
  细胞病变抑制法: '2',
  硫酸铜法: '2',
};
export const dtColumnsMap = {
  '1': [
    {
      title: '不合格',
      dataIndex: 'unqualified',
      width: 60,
    },
  ],
  '2': [
    {
      title: 'OD值',
      dataIndex: 'od',
      width: 60,
    },
    {
      title: 'Cutoff值',
      dataIndex: 'cutoff',
      width: 60,
    },
  ],
  3: [
    {
      title: 'CT值',
      dataIndex: 'ct',
      width: 60,
    },
  ],
};
type getColumns = (checkResult: string, checkType: string) => BasicColumn[];
export const dtColumns: getColumns = (checkResult, checkType) => [
  {
    title: '样本编号',
    dataIndex: 'sampleNo',
    width: 120,
  },
  {
    title: '浆员编号',
    dataIndex: 'donorNo',
    width: 120,
  },
  {
    title: '浆员姓名',
    dataIndex: 'name',
    width: 100,
  },
  {
    title: '血型',
    dataIndex: 'bloodType',
    width: 60,
  },
  ...(checkResult === '不合格' ? dtColumnsMap[checkType] : []),
];
export const formSchemaMap: Record<number, FormSchema[]> = {
  1: [
    {
      field: 'unqualified',
      component: 'InputNumber',
      label: '不合格',
      required: true,
      componentProps: {
        min: 0,
      },
    },
  ],
  2: [
    {
      field: 'od',
      component: 'InputNumber',
      label: 'OD值',
      required: true,
      componentProps: {
        min: 0,
      },
    },
    {
      field: 'cutoff',
      component: 'InputNumber',
      label: 'Cutoff值',
      required: true,
      componentProps: {
        min: 0,
      },
    },
  ],
  3: [
    {
      field: 'ct',
      component: 'InputNumber',
      label: 'CT值',
      required: true,
      componentProps: {
        min: 0,
      },
    },
  ],
};
export const notCheckFormSchema: FormSchema[] = [
  {
    field: 'sampleNo',
    component: 'Input',
    label: '样本编号',
    required: true,
  },
  {
    field: 'account',
    component: 'InputSearch',
    label: '复核人',
    required: true,
  },
];
