import { FormSchema } from '@/components/Form';

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
