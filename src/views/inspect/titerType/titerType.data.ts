import { BasicColumn, FormSchema } from '@/components/Table';
import { PLASMA_TYPE_LIST, PLASMA_TYPE_TEXT } from '@/enums/inspectEnum';

export const columns: BasicColumn[] = [
  {
    title: '血浆类型',
    dataIndex: 'plasmaType',
    customRender: ({ record }) => {
      return PLASMA_TYPE_TEXT[record.plasmaType];
    },
  },
  {
    title: '代码',
    dataIndex: 'itemKey',
  },
  {
    title: '名称',
    dataIndex: 'itemValue',
  },
  {
    title: '效价结果',
    dataIndex: 'result',
  },

  {
    title: '排序号',
    dataIndex: 'sort',
  },

  {
    title: '是否启用',
    dataIndex: 'state',
    customRender: ({ record }) => {
      return record.state ? '否' : '是';
    },
  },
  {
    title: '记录人',
    dataIndex: 'creater',
  },
  {
    title: '记录时间',
    dataIndex: 'createAt',
  },
];

export const searchFormschema: FormSchema[] = [
  {
    field: 'plasmaType',
    component: 'Select',
    label: '血浆类型',
    componentProps: {
      options: PLASMA_TYPE_LIST,
    },
  },
  {
    field: 'itemKey',
    component: 'Input',
    label: '代码',
  },
  {
    field: 'itemValue',
    component: 'Input',
    label: '名称',
  },
];
export const formListSchema: FormSchema[] = [
  {
    field: 'itemKey',
    component: 'Input',
    label: '代码',
    required: true,
    rules: [
      {
        trigger: 'blur',
        validator: (rule, value) => {
          if (!value) return Promise.resolve();
          if (!/^[a-zA-Z0-9]*$/.test(value)) return Promise.reject('只能输入字母、数字');
          return Promise.resolve();
        },
      },
    ],
  },
  {
    field: 'plasmaType',
    component: 'Select',
    label: '血浆类型',
    required: true,
    componentProps: {
      options: PLASMA_TYPE_LIST,
    },
  },
  {
    field: 'itemValue',
    component: 'Input',
    label: '名称',
    required: true,
  },
  {
    field: 'result',
    component: 'Select',
    label: '效价结果',
    required: true,
    componentProps: {
      options: [],
    },
  },
  {
    field: 'sort',
    component: 'InputNumber',
    label: '排序号',
    required: true,
  },
  {
    field: 'enable',
    component: 'Select',
    label: '是否启用',
    required: true,
    componentProps: {
      options: [
        {
          label: '是',
          value: true,
        },
        { label: '否', value: false },
      ],
    },
  },
];
