import { FormSchema } from '@/components/Form';

export const schemas: FormSchema[] = [
  {
    field: 'check',
    component: 'InputGroup',
    slot: 'check',
    label: '审核人',
    colProps: { span: 14 },
    required: true,
  },
  {
    field: 'field2',
    component: 'ApiSelect',
    label: '不合格原因',
    slot: 'nonconformity',
    colProps: { span: 14 },
    required: true,
  },
  {
    field: 'field2',
    component: 'Input',
    label: '血浆编号',
    colProps: { span: 14 },
    required: true,
  },
  {
    field: 'field3',
    component: 'InputTextArea',
    label: '备注',
    colProps: { span: 14 },
    componentProps: {
      placeholder: '请输入',
      rows: 4,
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'account',
    component: 'Input',
    label: '账号',
    colProps: {
      span: 20,
    },
    required: true,
  },
  {
    field: 'passwd',
    component: 'Input',
    label: '密码',
    colProps: {
      span: 20,
    },
    required: true,
  },
];
