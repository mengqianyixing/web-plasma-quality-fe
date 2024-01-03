import { BasicColumn, FormSchema } from '@/components/Table';
import { PLASMA_TYPE_LIST, PLASMA_TYPE_TEXT } from '@/enums/inspectEnum';
import { stationNameSearchApi } from '@/api/plasmaStore/entryPlasma';

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    title: '样品批号',
    dataIndex: 'sampleBatchNo',
    slots: { customRender: 'sampleBatchNo' },
  },
  {
    title: '检测类型',
    dataIndex: 'type',
    customRender: ({ record }) => {
      return PLASMA_TYPE_TEXT[record.type];
    },
  },
  {
    title: '样品总数',
    dataIndex: 'sampleTotal',
  },

  {
    title: '高效价总数',
    dataIndex: 'highTiterNum',
  },
  {
    title: '低效价总数',
    dataIndex: 'lowTiterNum',
  },
  {
    title: '无效价总数',
    dataIndex: 'noTiterNum',
  },
  {
    title: '记录人',
    dataIndex: 'recorder',
  },
  {
    title: '记录时间',
    dataIndex: 'recordTime',
  },
];

export const searchFormschema: FormSchema[] = [
  {
    label: '采浆公司',
    component: 'ApiSelect',
    field: 'stationNo',
    componentProps: {
      api: stationNameSearchApi,
      labelField: 'stationName',
      valueField: 'stationNo',
    },
  },
  {
    field: 'type',
    component: 'Select',
    label: '检测类型',
    componentProps: {
      options: PLASMA_TYPE_LIST,
    },
  },
  {
    field: 'sampleBatchNo',
    component: 'Input',
    label: '样品批号',
  },
  {
    field: "['recordStartDate','recordEndDate']",
    component: 'RangePicker',
    label: '记录日期',
    componentProps: { class: 'w-full' },
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
export const dtCheckboxDrwaerColumns: BasicColumn[] = [
  {
    title: '效价类型名称',
    dataIndex: 't',
    width: 100,
  },
  {
    title: '数量',
    dataIndex: '',
    width: 60,
  },
];

export const cellList = [
  {
    field: 'filename',
    label: '文件名称',
  },
  {
    field: 'username',
    label: '上传用户',
  },
  {
    field: 'uploadAt',
    label: '上传日期',
  },
  {
    field: 'count',
    label: '数据总数',
  },
  {
    field: 'successCount',
    label: '保存成功总数',
  },
  {
    field: 'faildCount',
    label: '保存失败总数',
  },
];
