import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { stationNameSearchApi } from '@/api/plasmaStore/entryPlasma';

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
    field: '',
    component: 'ApiSelect',
    label: '采浆公司',
    componentProps: {
      api: stationNameSearchApi,
      labelField: 'stationName',
      valueField: 'stationName',
    },
  },
  {
    component: 'Input',
    field: '',
    label: '血浆批号',
  },
  {
    component: 'DatePicker',
    field: '',
    label: '采集日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    component: 'DatePicker',
    field: '',
    label: '验收发布日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    component: 'DatePicker',
    field: '',
    label: '检验发布日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
];
