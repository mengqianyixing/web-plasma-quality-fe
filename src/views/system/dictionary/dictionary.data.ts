import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '字典名称',
    dataIndex: 'dictName',
  },
  {
    title: '字典编号',
    dataIndex: 'dictNo',
  },
  {
    title: '描述',
    dataIndex: 'dictDesc',
  },
  {
    title: '创建人',
    dataIndex: 'creater',
  },
  {
    title: '创建时间',
    dataIndex: 'createAt',
  },

  {
    title: '修改人',
    dataIndex: 'updater',
  },
  {
    title: '修改时间',
    dataIndex: 'updateAt',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'dictName',
    label: '字典名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'dictNo',
    label: '字典编号',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'dictName',
    label: '字典名称',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'dictNo',
    label: '字典编号',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'dictDesc',
    label: '描述',
    component: 'InputTextArea',
    colProps: { span: 24 },
  },
  {
    field: 'systemLevel',
    label: '系统字典',
    component: 'Switch',
    colProps: { span: 24 },
  },
];

export const itemColumns: BasicColumn[] = [
  {
    title: '字典项名称',
    dataIndex: 'itemKey',
  },
  {
    title: '字典项值',
    dataIndex: 'itemValue',
  },
  {
    title: '排序',
    dataIndex: 'sort',
  },
  {
    title: '是否启用',
    dataIndex: 'enable',
    customRender: ({ record }) => {
      return record.enable ? '是' : '否';
    },
  },
  {
    title: '描述',
    dataIndex: 'itemDesc',
  },

  {
    title: '创建人',
    dataIndex: 'creater',
  },
  {
    title: '创建时间',
    dataIndex: 'createAt',
  },
];
export const itemSearchFormSchema: FormSchema[] = [
  {
    field: 'itemKey',
    label: '字典项名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'itemValue',
    label: '字典项值',
    component: 'Input',
    colProps: { span: 8 },
  },
];
export const itemFormSchema: FormSchema[] = [
  {
    field: 'itemKey',
    label: '字典项名称',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'itemValue',
    label: '字典项值',
    component: 'Input',
    required: true,
    colProps: { span: 24 },
  },
  {
    field: 'itemDesc',
    label: '描述',
    component: 'InputTextArea',
    colProps: { span: 24 },
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
    colProps: { span: 24 },
  },
  {
    field: 'enable',
    label: '是否启用',
    component: 'Switch',
    colProps: { span: 24 },
  },
];
