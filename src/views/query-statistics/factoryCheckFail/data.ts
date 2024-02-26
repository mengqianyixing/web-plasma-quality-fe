import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'batchNo',
  },
  {
    title: '血浆批号',
    dataIndex: 'stationName',
  },

  {
    title: '报告发布时间',
    dataIndex: 'stationBoxNo',
  },
  {
    title: '样本编号',
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
    title: '采集日期',
    dataIndex: 'currBoxNo',
  },
  {
    title: '不合格原因',
    dataIndex: 'currBoxNo',
  },
  {
    title: '已销毁血浆批号',
    dataIndex: 'currBoxNo',
  },
  {
    title: '已销毁血浆编号',
    dataIndex: 'currBoxNo',
  },
  {
    title: '永拒时间',
    dataIndex: 'currBoxNo',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    component: 'Input',
    field: '',
    label: '采浆公司',
  },
  {
    component: 'Input',
    field: '',
    label: '血浆批号',
  },
  {
    component: 'Input',
    field: '',
    label: '采集日期',
  },
  {
    component: 'Input',
    field: '',
    label: '验收发布日期',
  },
  {
    component: 'Input',
    field: '',
    label: '检验发布日期',
  },
];
