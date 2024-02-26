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
    title: '样本总数',
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
    title: '检测结果发布人',
    dataIndex: 'currBoxNo',
  },
  {
    title: '发布日期',
    dataIndex: 'currBoxNo',
  },
  {
    title: '合格总数',
    dataIndex: 'currBoxNo',
  },
  {
    title: '不合格总数',
    dataIndex: 'currBoxNo',
  },
  {
    title: '高效价总数',
    dataIndex: 'currBoxNo',
  },
  {
    title: '低效价总数',
    dataIndex: 'currBoxNo',
  },
  {
    title: '无效价总数',
    dataIndex: 'currBoxNo',
  },
  {
    title: '试剂批号',
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
    label: '检测结果发布日期',
  },
];
