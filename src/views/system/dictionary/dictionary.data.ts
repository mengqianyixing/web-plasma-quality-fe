import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '字典名称',
    dataIndex: 'typeFlag',
  },
  {
    title: '字典编号',
    dataIndex: 'typeFlag',
  },
  {
    title: '描述',
    dataIndex: 'storeFlag',
  },
  {
    title: '创建人',
    dataIndex: 'autoFlag',
  },
  {
    title: '创建时间',
    dataIndex: 'standard.maxLocationSize',
  },

  {
    title: '修改人',
    dataIndex: 'locationUsedCount',
  },
  {
    title: '修改时间',
    dataIndex: 'closed',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'locationNo',
    label: '字典名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'trayNo',
    label: '字典编号',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'locationNo',
    label: '字典名称',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'trayNo',
    label: '字典编号',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'trayNo',
    label: '描述',
    component: 'InputTextArea',
    colProps: { span: 24 },
  },
  {
    field: 'trayNo',
    label: '系统字典',
    component: 'Switch',
    colProps: { span: 24 },
  },
];

export const itemColumns: BasicColumn[] = [
  {
    title: '字典项名称',
    dataIndex: 'typeFlag',
  },
  {
    title: '字典项值',
    dataIndex: 'typeFlag',
  },
  {
    title: '排序',
    dataIndex: 'storeFlag',
  },
  {
    title: '是否启用',
    dataIndex: 'autoFlag',
  },
  {
    title: '描述',
    dataIndex: 'standard.maxLocationSize',
  },

  {
    title: '创建人',
    dataIndex: 'locationUsedCount',
  },
  {
    title: '创建时间',
    dataIndex: 'closed',
  },
];
export const itemSearchFormSchema: FormSchema[] = [
  {
    field: 'locationNo',
    label: '字典项名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'trayNo',
    label: '字典项编号',
    component: 'Input',
    colProps: { span: 8 },
  },
];
export const itemFormSchema: FormSchema[] = [
  {
    field: 'locationNo',
    label: '字典项名称',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'trayNo',
    label: '字典项值',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'trayNo',
    label: '描述',
    component: 'InputTextArea',
    colProps: { span: 24 },
  },
  {
    field: 'trayNo',
    label: '排序',
    component: 'InputNumber',
    colProps: { span: 24 },
  },
  {
    field: 'trayNo',
    label: '是否启用',
    component: 'Switch',
    colProps: { span: 24 },
  },
];
