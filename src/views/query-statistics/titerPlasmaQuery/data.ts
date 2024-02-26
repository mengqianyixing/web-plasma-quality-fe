import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';

export const columns: BasicColumn[] = [
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
    title: '采浆量',
    dataIndex: 'stationBoxNo',
  },
  {
    width: 150,
    title: '血浆数量(袋)',
    dataIndex: 'currBoxNo',
  },
  {
    width: 150,
    title: '乙免血浆',
    children: [
      {
        width: 150,
        title: '来浆数量',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '试剂批号',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '合计',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '高效价',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '低效价',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '普通',
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
    title: '狂免血浆',
    children: [
      {
        width: 150,
        title: '来浆数量',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '试剂批号',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '合计',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '高效价',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '低效价',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '普通',
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
    title: '破免血浆',
    children: [
      {
        width: 150,
        title: '来浆数量',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '试剂批号',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '合计',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '高效价',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '低效价',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '普通',
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
    title: '巨细胞血浆',
    children: [
      {
        width: 150,
        title: '来浆数量',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '合计',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '高效价',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '低效价',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '普通',
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
    title: '普通血浆',
    children: [
      {
        width: 150,
        title: '来浆数量',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '合计',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '高效价',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '低效价',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '普通',
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
    label: '采集日期',
  },
  {
    field: '',
    component: 'Input',
    label: '试剂批号',
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
    label: '效价值',
  },
  {
    field: '',
    component: 'Input',
    label: '检测发布日期',
  },
];
