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
    className: 'empty-value',
  },
  {
    title: '系统字典',
    dataIndex: '',
    customRender: ({ record }) => {
      return record.systemLevel > 0 ? '是' : '否';
    },
  },
  // {
  //   title: '创建人',
  //   dataIndex: 'creater',
  // },
  // {
  //   title: '创建时间',
  //   dataIndex: 'createAt',
  // },

  // {
  //   title: '修改人',
  //   dataIndex: 'updater',
  // },
  // {
  //   title: '修改时间',
  //   dataIndex: 'updateAt',
  // },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'dictName',
    label: '字典名称',
    component: 'Input',
  },
  {
    field: 'dictNo',
    label: '字典编号',
    component: 'Input',
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
    rules: [
      {
        trigger: 'blur',
        validator: (rule, value) => {
          if (!value) return Promise.resolve();
          if (!/^[a-zA-Z0-9]*$/.test(value)) return Promise.reject('只能输入字母和数字');
          return Promise.resolve();
        },
      },
    ],
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
    defaultValue: false,
    colProps: { span: 24 },
  },
];

export const itemColumns: BasicColumn[] = [
  {
    title: '字典项名称',
    dataIndex: 'itemKey',
    width: 300,
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
    className: 'empty-value',
  },

  // {
  //   title: '创建人',
  //   dataIndex: 'creater',
  // },
  // {
  //   title: '创建时间',
  //   dataIndex: 'createAt',
  //   width: 200,
  // },
];
export const itemSearchFormSchema: FormSchema[] = [
  {
    field: 'itemKey',
    label: '字典项名称',
    component: 'Input',
  },
  {
    field: 'itemValue',
    label: '字典项值',
    component: 'Input',
  },
];
export const itemFormSchema: FormSchema[] = [
  {
    field: 'itemKey',
    label: '字典项名称',
    component: 'Input',
    required: true,
    colProps: { span: 22 },
  },
  {
    field: 'itemValue',
    label: '字典项值',
    component: 'Input',
    required: true,
    colProps: { span: 22 },
  },
  {
    field: 'itemDesc',
    label: '描述',
    component: 'InputTextArea',
    colProps: { span: 22 },
  },
  {
    field: 'sort',
    label: '排序',
    component: 'InputNumber',
    colProps: { span: 22 },
  },
  {
    field: 'enable',
    label: '是否启用',
    component: 'Switch',
    colProps: { span: 22 },
  },
];
