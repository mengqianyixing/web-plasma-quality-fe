import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';

export const checkColumns: BasicColumn[] = [
  {
    width: 150,
    title: '采浆公司',
    dataIndex: 'batchNo',
  },
  {
    width: 150,
    title: '血浆批号',
    dataIndex: 'stationName',
  },

  {
    width: 150,
    title: '批次数量(批)',
    dataIndex: 'stationBoxNo',
  },
  {
    width: 150,
    title: '血浆数量(袋)',
    dataIndex: 'currBoxNo',
  },
  {
    width: 150,
    title: '检测合格',
    children: [
      {
        width: 150,
        title: '合格数量',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
    ],
  },
  {
    width: 150,
    title: '外观验收不合格',
    children: [
      {
        width: 150,
        title: '合格数量',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
    ],
  },
  {
    width: 150,
    title: '检测不合格',
    children: [
      {
        width: 150,
        title: '合格数量',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
    ],
  },
  {
    width: 150,
    title: '其他血浆不合格',
    children: [
      {
        width: 150,
        title: '合格数量',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
    ],
  },
];

export const titerColumns: BasicColumn[] = [
  {
    dataIndex: '采浆公司',
    title: '',
  },
  {
    dataIndex: '来浆类型',
    title: '',
  },
  {
    dataIndex: '来浆总数量',
    title: '',
  },
  {
    dataIndex: '效价类型',
    title: '',
  },
  {
    dataIndex: '效价数量',
    title: '',
  },
  {
    dataIndex: '比率(%)',
    title: '',
  },
];
export const followUpColumns: BasicColumn[] = [
  {
    dataIndex: '采浆公司',
    title: '',
  },
  {
    dataIndex: '血浆批号',
    title: '',
  },
  {
    dataIndex: '血浆数量(袋)',
    title: '',
  },
  {
    dataIndex: '首次续追踪',
    children: [
      {
        dataIndex: '数量',
        title: '',
      },
      {
        dataIndex: '比率(%)',
        title: '',
      },
    ],
  },
  {
    dataIndex: '反复续追踪',
    children: [
      {
        dataIndex: '数量',
        title: '',
      },
      {
        dataIndex: '比率(%)',
        title: '',
      },
    ],
  },
  {
    dataIndex: '合计',
    title: '',
  },
  {
    dataIndex: '比率(%)',
    title: '',
  },
];
export const searchFormSchema: FormSchema[] = [
  {
    field: '',
    component: 'Input',
    label: '采浆公司',
  },
  {
    field: '',
    component: 'Input',
    label: '血浆批号',
  },
  {
    field: '',
    component: 'Input',
    label: '验收发布日期',
  },
  {
    field: '',
    component: 'Input',
    label: '接收日期',
  },
  {
    field: '',
    component: 'Input',
    label: '来浆类型',
  },
  {
    field: '',
    component: 'Input',
    label: '血浆类型',
  },
  {
    field: '',
    component: 'Input',
    label: '效价类型',
  },
  {
    field: '',
    component: 'Input',
    label: '检测发布日期',
  },
];
