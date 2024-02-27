import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '投产准备号',
    dataIndex: 'batchNo',
  },
  {
    title: '投产类型',
    dataIndex: 'stationName',
  },
  {
    title: '准备总量',
    children: [
      {
        title: '数量(袋)',
        dataIndex: 'currBoxNo',
        width: 150,
      },
      {
        title: '投产净重(kg)',
        dataIndex: 'currBoxNo',
        width: 150,
      },
    ],
  },
  {
    title: '已出库',
    children: [
      {
        title: '数量(袋)',
        dataIndex: 'currBoxNo',
        width: 150,
      },
      {
        title: '投产净重(kg)',
        dataIndex: 'currBoxNo',
        width: 150,
      },
      {
        title: '出库日期',
        dataIndex: 'currBoxNo',
        width: 150,
      },
    ],
  },
  {
    title: '剩余',
    children: [
      {
        title: '数量(袋)',
        dataIndex: 'currBoxNo',
        width: 150,
      },
      {
        title: '投产净重(kg)',
        dataIndex: 'currBoxNo',
        width: 150,
      },
    ],
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: '',
    component: 'Input',
    label: '血浆批号',
  },
  {
    field: '',
    component: 'Input',
    label: '血浆编号',
  },
  {
    field: '',
    component: 'Input',
    label: '效价类型',
  },
];
