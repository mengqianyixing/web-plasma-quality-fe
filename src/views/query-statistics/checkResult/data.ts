import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'batchNo',
    width: 150,
  },
  {
    title: '样本批号',
    dataIndex: 'stationName',
    width: 150,
  },

  {
    title: '样本类型',
    dataIndex: 'stationBoxNo',
    width: 150,
  },
  {
    title: '样本数量',
    dataIndex: 'currBoxNo',
    width: 150,
  },
  {
    title: '样本验收',
    children: [
      {
        title: '合格数',
        dataIndex: 'currBoxNo',
        width: 150,
      },
      {
        title: '不合格数',
        dataIndex: 'currBoxNo',
        width: 150,
      },
      {
        title: '不合格比率(%)',
        dataIndex: 'currBoxNo',
        width: 150,
      },
    ],
  },
  {
    title: '检测数量',
    dataIndex: 'collectAt',
    width: 150,
  },
  {
    title: '检测合格',
    children: [
      {
        title: '合格数',
        dataIndex: 'currBoxNo',
        width: 150,
      },
      {
        title: '合格比率(%)',
        dataIndex: 'currBoxNo',
        width: 150,
      },
    ],
  },
  {
    title: '检测不合格',
    children: [
      {
        title: 'HBV-DNA',
        dataIndex: 'currBoxNo',
        width: 150,
      },
      {
        title: 'HCV-RNA',
        dataIndex: 'currBoxNo',
        width: 150,
      },
      {
        title: 'HIV-RNA',
        dataIndex: 'currBoxNo',
        width: 150,
      },
      {
        title: 'HBsAg',
        dataIndex: 'currBoxNo',
        width: 150,
      },
      {
        title: 'HCV抗体',
        dataIndex: 'currBoxNo',
        width: 150,
      },
      {
        title: 'HIV-1/HIV-2抗体',
        dataIndex: 'currBoxNo',
        width: 150,
      },
      {
        title: 'TP抗体',
        dataIndex: 'currBoxNo',
        width: 150,
      },
      {
        title: 'ALT',
        dataIndex: 'currBoxNo',
        width: 150,
      },
      {
        title: 'TP',
        dataIndex: 'currBoxNo',
        width: 150,
      },
      {
        title: '合计',
        dataIndex: 'currBoxNo',
        width: 150,
      },
      {
        title: '不合格比率(%)',
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
    label: '样本批号',
  },
  {
    field: '',
    component: 'Input',
    label: '样本类型',
  },
  {
    field: '',
    component: 'Input',
    label: '采浆公司',
  },
  {
    field: '',
    component: 'Input',
    label: '结果发布日期',
  },
  {
    field: '',
    component: 'Input',
    label: '样本采集日期',
  },
];
