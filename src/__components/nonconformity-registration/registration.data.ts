import { FormSchema } from '@/components/Form';

export const schemas: FormSchema[] = [
  {
    field: 'checker',
    component: 'InputGroup',
    slot: 'check',
    label: '复核人',
    colProps: { span: 14 },
    required: true,
  },
  {
    field: 'fkFailedCode',
    component: 'Select',
    label: '不合格原因',
    colProps: { span: 14 },
    componentProps: {
      options: [{ label: '验收不合格', value: 'DSN' }],
    },
    required: true,
  },
  {
    field: 'fkBagNo',
    component: 'Input',
    label: '血浆编号',
    colProps: { span: 14 },
    required: true,
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
    field: 'password',
    component: 'InputPassword',
    label: '密码',
    colProps: {
      span: 20,
    },
    required: true,
  },
];
