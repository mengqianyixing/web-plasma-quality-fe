import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  { title: '检测项目', dataIndex: 'projectAbbr', slots: { customRender: 'projectAbbr' } },
  { title: '检测方法', dataIndex: 'methodAbbr', slots: { customRender: 'methodAbbr' } },
  { title: '合格样品总数', dataIndex: 'totalQualified' },
  { title: '不合格样品总数', dataIndex: 'totalUnqualified' },
  { title: '未检测样品总数', dataIndex: 'totalNotCheck' },
];
export const checkItemMappding = {
  TP: '1',
  ALT: '1',
  TP抗体: '1',
  'HIV-1/HIV-2抗体': '2',
  HCV抗体: '2',
  HBsAg: '2',
  'HIV-RNA': '3',
  'HCV-RNA': '3',
  'HBV-DNA': '3',
};
export const dtColumnsMap = {
  '1': [
    {
      title: '不合格',
      dataIndex: 'od',
    },
  ],
  '2': [
    {
      title: 'OD值',
      dataIndex: 'od',
    },
    {
      title: 'Cutoff值',
      dataIndex: 'cutoff',
    },
  ],
  3: [
    {
      title: 'CT值',
      dataIndex: 'ct',
    },
  ],
};
type getColumns = (checkResult: string, checkType: string) => BasicColumn[];
export const dtColumns: getColumns = (checkResult, checkType) => [
  {
    title: '样品编号',
    dataIndex: 'sampleNo',
  },
  {
    title: '浆员编号',
    dataIndex: 'donorNo',
  },
  {
    title: '浆员姓名',
    dataIndex: 'name',
  },
  {
    title: '血型',
    dataIndex: 'bloodType',
  },
  ...(checkResult === '不合格' ? dtColumnsMap[checkType] : []),
];
export const formSchemaMap: Record<number, FormSchema[]> = {
  1: [
    {
      field: 'unqualified',
      component: 'Input',
      label: '不合格',
      required: true,
    },
  ],
  2: [
    {
      field: 'od',
      component: 'Input',
      label: 'OD值',
      required: true,
    },
    {
      field: 'cutoff',
      component: 'Input',
      label: 'Cutoff值',
      required: true,
    },
  ],
  3: [
    {
      field: 'ct',
      component: 'Input',
      label: 'CT值',
      required: true,
    },
  ],
};
export const notCheckFormSchema: FormSchema[] = [
  {
    field: 'sampleNo',
    component: 'Input',
    label: '样品编号',
    required: true,
  },
  {
    field: 'account',
    component: 'InputSearch',
    label: '复核人',
    required: true,
  },
];