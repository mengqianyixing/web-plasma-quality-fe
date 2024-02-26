import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'batchNo',
  },
  {
    title: '样本批号',
    dataIndex: 'stationName',
  },

  {
    title: '样本类型',
    dataIndex: 'stationBoxNo',
  },
  {
    title: '样本编号',
    dataIndex: 'currBoxNo',
  },
  {
    title: '采集日期',
    dataIndex: 'currBoxNo',
  },
  {
    title: '来浆类型',
    dataIndex: 'currBoxNo',
  },
  {
    title: '血浆类型',
    dataIndex: 'currBoxNo',
  },
  {
    title: '浆员编号',
    dataIndex: 'currBoxNo',
  },
  {
    title: '浆员姓名',
    dataIndex: 'currBoxNo',
  },
  {
    title: '接收人',
    dataIndex: 'currBoxNo',
  },
  {
    title: '接收日期',
    dataIndex: 'currBoxNo',
  },
  {
    title: '样本状态',
    dataIndex: 'currBoxNo',
  },
  {
    title: '检测结果',
    dataIndex: 'currBoxNo',
  },
  {
    title: '不合格原因',
    dataIndex: 'currBoxNo',
  },
  {
    title: '效价',
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
    label: '样本编号',
  },
  {
    field: '',
    component: 'Input',
    label: '采集日期',
  },
  {
    field: '',
    component: 'Input',
    label: '浆员编号',
  },
  {
    field: '',
    component: 'Input',
    label: '浆员姓名',
  },
  {
    field: '',
    component: 'Input',
    label: '检测发布日期',
  },
  {
    field: '',
    component: 'Input',
    label: '样本状态',
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
];
