import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '策略类型',
    dataIndex: 'ptype',
    width: 100,
  },
  {
    title: '归属',
    dataIndex: 'v0',
    className: 'empty-value',
    width: 200,
  },
  {
    title: '资源',
    dataIndex: 'v1',
  },
  {
    title: 'Method',
    dataIndex: 'v2',
    className: 'empty-value',
    width: 100,
  },
  {
    title: '描述',
    dataIndex: 'v4',
    className: 'empty-value',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'v0',
    label: '归属',
    component: 'Input',
  },
  {
    field: 'v1',
    label: '资源',
    component: 'Input',
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'ptype',
    label: '策略类型',
    required: true,
    defaultValue: 'p',
    component: 'Input',
    componentProps: {
      readonly: true,
    },
  },
  {
    label: '归属',
    field: 'v0',
    slot: 'v0',
    component: 'Select',
  },
  {
    field: 'v1',
    label: '资源',
    required: true,
    component: 'Input',
  },
  {
    field: 'v2',
    label: 'Method',
    component: 'Input',
  },
  {
    field: 'v4',
    label: '描述',
    component: 'Input',
  },
];
