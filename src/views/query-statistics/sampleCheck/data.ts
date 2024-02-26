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
    title: '样本类型',
    dataIndex: 'stationName',
  },

  {
    width: 150,
    title: '样本总数',
    dataIndex: 'stationBoxNo',
  },
  {
    width: 150,
    title: '已接收未检测',
    dataIndex: 'currBoxNo',
  },
  {
    width: 150,
    title: '检测样本',
    dataIndex: 'currBoxNo',
  },
  {
    width: 150,
    title: '检测中',
    dataIndex: 'currBoxNo',
  },
  {
    width: 150,
    title: '检测合格',
    children: [
      {
        width: 150,
        title: '合格',
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
    children: [],
  },
  {
    width: 150,
    title: '验收不合格',
    children: [
      {
        width: 150,
        title: '血浆验收不合格',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '样本验收不合格',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '献血浆者符合性',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '合计',
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
    title: '其他不合格',
    dataIndex: 'currBoxNo',
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
    label: '样本类型',
  },
  {
    field: '',
    component: 'Input',
    label: '采集日期',
  },
  {
    field: '',
    component: 'Input',
    label: '发布日期',
  },
];