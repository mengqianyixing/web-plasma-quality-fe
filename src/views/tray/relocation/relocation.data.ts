import { BasicColumn, FormSchema } from '@/components/Table';

export const plasmaTrayModelColumns: BasicColumn[] = [
  { title: '血浆批号', dataIndex: '' },
  { title: '血浆箱号', dataIndex: '' },
  { title: '血浆袋数', dataIndex: '' },
];
export const taryRelocationColumns: BasicColumn[] = [
  {
    title: '托盘编号',
    dataIndex: '',
  },
  {
    title: '原货位',
    dataIndex: '',
  },
  {
    title: '原库房',
    dataIndex: '',
  },
  {
    title: '目标货位',
    dataIndex: '',
  },
  {
    title: '目标库房',
    dataIndex: '',
  },
  {
    title: '操作人',
    dataIndex: '',
  },
  {
    title: '操作时间',
    dataIndex: '',
  },
  {
    title: '状态',
    dataIndex: '',
  },
  {
    title: '处理时间',
    dataIndex: '',
  },
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

export const plasmaBoxScanFormSchema: FormSchema[] = [
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
    field: 'boxId',
  },
];
export const plasmaBoxScanColumns: (isBinding: boolean) => BasicColumn[] = (isBinding) => [
  {
    title: '箱号',
    dataIndex: '',
  },
  {
    title: '目标托盘',
    dataIndex: '',
  },
  {
    title: isBinding ? '绑定人' : '解绑人',
    dataIndex: '',
  },
  {
    title: isBinding ? '绑定时间' : '解绑时间',
    dataIndex: '',
  },
];

export const plasmaBoxHandSearchFormSchema: FormSchema[] = [
  {
    component: 'Select',
    label: '采浆公司',
    field: '',
    componentProps: {
      options: [],
    },
  },
  {
    component: 'Input',
    label: '批号',
    field: '',
  },
  {
    component: 'Input',
    label: '投产准备号',
    field: '',
  },
];
export const plasmaBoxHandColumns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: '',
  },
  {
    title: '箱号',
    dataIndex: '采浆公司',
  },
  {
    title: '血浆批号',
    dataIndex: '采浆公司',
  },
  {
    title: '投产准备号',
    dataIndex: '采浆公司',
  },
  {
    title: '袋数',
    dataIndex: '采浆公司',
  },
  {
    title: '类型',
    dataIndex: '采浆公司',
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
    label: '样本箱号',
    field: 'boxId',
    colProps: { span: 8 },
  },
];
export const sampleBoxScanSearchFormSchema: FormSchema[] = [
  {
    component: 'Input',
    label: '托盘编号',
    field: '',
  },
  {
    component: 'Input',
    label: '样本箱号',
    field: '',
  },
];
export const sampleBoxScanColumns: (isBinding: boolean) => BasicColumn[] = (isBinding) => [
  {
    title: '样本箱号',
    dataIndex: '',
  },
  {
    title: '目标托盘',
    dataIndex: '',
  },
  {
    title: isBinding ? '绑定人' : '解绑人',
    dataIndex: '',
  },
  {
    title: isBinding ? '绑定时间' : '解绑时间',
    dataIndex: '',
  },
];
export const sampleBoxHandSearchFormSchema: FormSchema[] = [
  {
    component: 'Select',
    label: '采浆公司',
    field: '',
    colProps: { span: 6 },
    componentProps: {
      options: [],
    },
  },
  {
    component: 'Input',
    label: '样本批号',
    field: '',
    colProps: { span: 6 },
  },
];
export const sampleBoxHandColumns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: '',
  },
  {
    title: '样本箱号',
    dataIndex: '采浆公司',
  },
  {
    title: '样本批号',
    dataIndex: '采浆公司',
  },
  {
    title: '袋数',
    dataIndex: '采浆公司',
  },
  {
    title: '类型',
    dataIndex: '采浆公司',
  },
];
