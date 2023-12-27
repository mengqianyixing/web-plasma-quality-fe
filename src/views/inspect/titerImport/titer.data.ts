import { BasicColumn, FormSchema } from '@/components/Table';
import { PLASMA_TYPE_LIST, PLASMA_TYPE_TEXT } from '@/enums/inspectEnum';
import { stationNameSearchApi } from '@/api/plasmaStore/entryPlasma';

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    slots: { customRender: 'projectCode' },
  },
  {
    title: '样品批号',
    dataIndex: 'projectAbbr',
  },
  {
    title: '检测类型',
    dataIndex: 'plasmaType',
    customRender: ({ record }) => {
      return PLASMA_TYPE_TEXT[record.plasmaType];
    },
  },
  {
    title: '样品总数',
    dataIndex: 'method',
  },

  {
    title: '高效价总数',
    dataIndex: 'standard',
  },
  {
    title: '低效价总数',
    dataIndex: 'sort',
  },
  {
    title: '无效价总数',
    dataIndex: 'state',
  },
  {
    title: '记录人',
    dataIndex: 'creator',
  },
  {
    title: '记录时间',
    dataIndex: 'createAt',
  },
];

export const searchFormschema: FormSchema[] = [
  {
    label: '采浆公司',
    component: 'ApiSelect',
    field: 'stationNo',
    componentProps: {
      api: stationNameSearchApi,
      resultField: 'result',
      labelField: 'stationName',
      valueField: 'stationNo',
    },
  },
  {
    field: 'projectName',
    component: 'Select',
    label: '检测类型',
    componentProps: {
      options: PLASMA_TYPE_LIST,
    },
  },
  {
    field: 'projectAbbr',
    component: 'Input',
    label: '样品编号',
  },
  {
    field: '记录日期',
    component: 'Input',
    label: '样品编号',
  },
];
export const importDrwaerColumns: BasicColumn[] = [
  {
    title: '样品批号',
    dataIndex: '',
  },
  {
    title: '样品编号',
    dataIndex: '',
  },
  {
    title: '效价类型',
    dataIndex: '',
  },
  {
    title: '效价结果值',
    dataIndex: '',
  },
  {
    title: 'OD值',
    dataIndex: '',
  },
  {
    title: '检测日期',
    dataIndex: '',
  },
];
export const dtDrwaerColumns: BasicColumn[] = [
  {
    title: '样品编号',
    dataIndex: '',
  },
  {
    title: '效价结果值',
    dataIndex: '',
  },
  {
    title: 'OD值',
    dataIndex: '',
  },
  {
    title: '检测日期',
    dataIndex: '',
  },
];
