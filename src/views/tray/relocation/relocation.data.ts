import { BasicColumn, FormSchema } from '@/components/Table';

import { useStation } from '@/hooks/common/useStation';

const { stationOptions } = useStation();

export const plasmaTrayModelColumns: BasicColumn[] = [
  { title: '血浆批号', dataIndex: '' },
  { title: '血浆箱号', dataIndex: '' },
  { title: '血浆袋数', dataIndex: '' },
];
export const taryRelocationColumns: BasicColumn[] = [
  {
    title: '托盘编号',
    dataIndex: 'trayNo',
    width: 100,
  },
  {
    title: '原货位',
    dataIndex: 'sourceLocatonNo',
    width: 100,
  },
  {
    title: '原库房',
    dataIndex: 'sourceHouseName',
    width: 160,
    ellipsis: false,
  },
  {
    title: '目标货位',
    dataIndex: 'targetLocatonNo',
    width: 100,
  },
  {
    title: '目标库房',
    dataIndex: 'targetHouseName',
    width: 160,
    ellipsis: false,
  },
  {
    title: '操作人',
    dataIndex: 'operator',
    width: 100,
    ellipsis: false,
  },
  {
    title: '操作时间',
    dataIndex: 'operateTime',
    width: 160,
  },
  // {
  //   title: '状态',
  //   dataIndex: '',
  // },
  // {
  //   title: '处理时间',
  //   dataIndex: '',
  // },
];

export const siteSchema: FormSchema = {
  label: '出库站点',
  component: 'Select',
  field: 'siteId',
  required: true,
};
export const locationSchema: FormSchema = {
  label: '目标货位',
  component: 'InputSearch',
  field: 'locationNo',
  required: true,
};
export const areaSchema: FormSchema = {
  label: '目标区域',
  component: 'Select',
  field: 'subWareHouseNo',
  required: true,
  componentProps: {
    options: [],
  },
};
export const trayRelocationFormSchema: (fn1: Function, fn2: Function) => FormSchema[] = (
  f1,
  f2,
) => [
  {
    label: '托盘编号',
    component: 'InputSearch',
    field: 'trayNo',
    required: true,
    componentProps: {
      'enter-button': '选择',
      onSearch: f1,
    },
  },

  {
    label: '入库库房',
    component: 'Select',
    field: 'houseNo',
    required: true,
    componentProps: {
      onChange: f2,
    },
  },
];

export const plasmaBoxScanSearchFormSchema: FormSchema[] = [
  {
    component: 'Input',
    label: '托盘编号',
    field: 'trayNo',
  },
  {
    component: 'Input',
    label: '箱号',
    field: 'boxNo',
  },
];
export const plasmaBoxScanColumns: (isBinding: boolean) => BasicColumn[] = (isBinding) => [
  {
    title: '箱号',
    dataIndex: 'boxNo',
    ellipsis: false,
  },
  {
    title: isBinding ? '目标托盘' : '托盘编号',
    dataIndex: 'trayNo',
    width: 140,
  },
  {
    title: isBinding ? '绑定人' : '解绑人',
    dataIndex: 'operator',
    width: 100,
    ellipsis: false,
  },
  {
    title: isBinding ? '绑定时间' : '解绑时间',
    dataIndex: 'operateTime',
    width: 160,
  },
];

export const plasmaBoxHandSearchFormSchema: FormSchema[] = [
  {
    field: 'stationNo',
    component: 'Select',
    label: '采浆公司',
    componentProps: {
      options: stationOptions,
    },
  },
  {
    component: 'Input',
    label: '批号',
    field: 'batchNo',
  },
  {
    component: 'Input',
    label: '投产准备号',
    field: 'prepareNo',
  },
];

export const plasmaBoxHandColumns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    title: '箱号',
    dataIndex: 'boxNo',
  },
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
  },
  {
    title: '投产准备号',
    dataIndex: 'prepareNo',
  },
  {
    title: '袋数',
    dataIndex: 'bagCount',
  },
  {
    title: '类型',
    dataIndex: 'boxType',
  },
];
export const sampleBoxScanFormSchema: FormSchema[] = [
  {
    component: 'Input',
    label: '托盘编号',
    field: 'trayNo',
    colProps: { span: 8 },
  },
  {
    component: 'Input',
    label: '箱号',
    field: 'boxId',
    colProps: { span: 8 },
  },
  {
    component: 'Input',
    label: '样本袋号',
    field: 'boxId',
    colProps: { span: 8 },
  },
];
export const sampleBoxScanSearchFormSchema: FormSchema[] = [
  {
    component: 'Input',
    label: '托盘编号',
    field: 'trayNo',
  },
  {
    component: 'Input',
    label: '箱号',
    field: 'boxNo',
  },
  {
    component: 'Input',
    label: '样本袋号',
    field: 'packNo',
  },
];
export const sampleBoxScanColumns: (isBinding: boolean) => BasicColumn[] = (isBinding) => [
  {
    title: '托盘编号',
    dataIndex: 'trayNo',
  },
  {
    title: '箱号',
    dataIndex: 'boxNo',
  },
  {
    title: '样本袋号',
    dataIndex: 'packNo',
  },
  {
    title: isBinding ? '绑定人' : '解绑人',
    dataIndex: 'binder',
  },
  {
    title: isBinding ? '绑定时间' : '解绑时间',
    dataIndex: 'bindTime',
  },
];
export const sampleBoxHandBindSearchFormSchema: FormSchema[] = [
  {
    component: 'Select',
    label: '采浆公司',
    field: 'stationNo',
    colProps: { span: 6 },
    componentProps: {
      options: stationOptions,
    },
  },
  {
    component: 'Input',
    label: '样本批号',
    field: 'batchNo',
    colProps: { span: 6 },
  },
  {
    component: 'Input',
    label: '样本袋号',
    field: 'packNo',
    colProps: { span: 6 },
  },
];
export const sampleBoxHandUnbindSearchFormSchema: FormSchema[] = [
  {
    component: 'Select',
    label: '采浆公司',
    field: 'stationNo',
    colProps: { span: 6 },
    componentProps: {
      options: stationOptions,
    },
  },
  {
    component: 'Input',
    label: '样本批号',
    field: 'batchNo',
    colProps: { span: 6 },
  },
  {
    component: 'Input',
    label: '托盘编号',
    field: 'trayNo',
    colProps: { span: 6 },
  },
];
export const sampleBoxHandBindColumns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    title: '样本批号',
    dataIndex: 'batchNo',
  },
  {
    title: '样本袋号',
    dataIndex: 'packNo',
  },
  {
    title: '样本数量',
    dataIndex: 'sampleCount',
  },
  {
    title: '样本类型',
    dataIndex: 'sampleType',
  },
];
export const sampleBoxHandUnbindColumns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    title: '样本批号',
    dataIndex: 'batchNo',
  },
  {
    title: '样本袋号',
    dataIndex: 'packNo',
  },
  {
    title: '箱号',
    dataIndex: 'boxNo',
  },
  {
    title: '托盘编号',
    dataIndex: 'trayNo',
  },
  // {
  //   title: '绑定人',
  //   dataIndex: 'binder',
  // },
  // {
  //   title: '绑定时间',
  //   dataIndex: 'bindTime',
  // },
];
