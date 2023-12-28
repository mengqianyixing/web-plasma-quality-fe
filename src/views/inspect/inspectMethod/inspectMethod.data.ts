import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '简称',
    dataIndex: 'methodAbbr',
  },
  {
    title: '全称',
    dataIndex: 'methodName',
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
    dataIndex: 'state',
    customRender: ({ record }) => {
      return record.state ? '否' : '是';
    },
  },
  {
    title: '记录人',
    dataIndex: 'creator',
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
    field: 'methodName',
    component: 'Input',
    label: '全称',
  },
];
export const formListSchema: FormSchema[] = [
  {
    field: 'methodAbbr',
    component: 'Input',
    label: '简称',
    required: true,
  },
  {
    field: 'methodName',
    component: 'Input',
    label: '全称',
    required: true,
  },
  {
    field: 'name',
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
    field: 'state',
    component: 'Select',
    label: '是否启用',
    required: true,
    componentProps: {
      options: [
        { label: '是', value: 0 },
        { label: '否', value: 1 },
      ],
    },
  },
];
