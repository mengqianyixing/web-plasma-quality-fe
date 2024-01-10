import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '全称',
    dataIndex: 'itemKey',
    slots: { customRender: 'itemKey' },
  },
  {
    title: '简称',
    dataIndex: 'methodAbbr',
  },
  {
    title: '检疫期间隔天数',
    dataIndex: 'intervalDays',
  },
  {
    title: '排序号',
    dataIndex: 'sort',
  },
  {
    title: '检测模式',
    dataIndex: 'detectionMode',
  },
  {
    title: '是否启用',
    dataIndex: 'enable',
    customRender: ({ record }) => {
      return record.enable ? '是' : '否';
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
    field: 'methodAbbr',
    component: 'Input',
    label: '简称',
  },
  {
    field: 'itemKey',
    component: 'Input',
    label: '全称',
  },
];
export const formListSchema: FormSchema[] = [
  {
    field: 'itemKey',
    component: 'Input',
    label: '全称',
    required: true,
  },
  {
    field: 'methodAbbr',
    component: 'Input',
    label: '简称',
    required: true,
  },
  {
    field: 'intervalDays',
    component: 'InputNumber',
    label: '检疫期间隔天数',
    required: true,
    componentProps: {
      min: 0,
      formatter: (n: number) => n && parseInt(n),
    },
  },
  {
    field: 'detectionMode',
    component: 'Select',
    label: '检测模式',
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
        { label: '是', value: true },
        { label: '否', value: false },
      ],
    },
  },
];
