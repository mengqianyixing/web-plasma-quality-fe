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
    title: '来浆类型',
    dataIndex: 'stationName',
  },

  {
    width: 150,
    title: '血浆数量(袋)',
    dataIndex: 'stationBoxNo',
  },
  {
    width: 150,
    title: '高效价',
    dataIndex: 'currBoxNo',
    children: [
      {
        width: 150,
        title: '数量',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 180,
        title: '检测合格数量(袋)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 180,
        title: '检测合格验收净重(kg)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 180,
        title: '检疫期合格数量(袋)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 180,
        title: '检疫期合格验收净重(kg)',
        dataIndex: 'currBoxNo',
      },
    ],
  },
  {
    width: 150,
    title: '低效价',
    dataIndex: 'currBoxNo',
    children: [
      {
        width: 150,
        title: '数量',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 180,
        title: '检测合格数量(袋)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 180,
        title: '检测合格验收净重(kg)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 180,
        title: '检疫期合格数量(袋)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 180,
        title: '检疫期合格验收净重(kg)',
        dataIndex: 'currBoxNo',
      },
    ],
  },
  {
    width: 150,
    title: '普通',
    dataIndex: 'currBoxNo',
    children: [
      {
        width: 150,
        title: '数量',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 180,
        title: '检测合格数量(袋)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 180,
        title: '检测合格验收净重(kg)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 180,
        title: '检疫期合格数量(袋)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 180,
        title: '检疫期合格验收净重(kg)',
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
    label: '来浆类型',
  },
  {
    field: '',
    component: 'Input',
    label: '采集日期',
  },
  {
    field: '',
    component: 'Input',
    label: '检测发布日期',
  },
];
