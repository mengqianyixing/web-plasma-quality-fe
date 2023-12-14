import { BasicColumn, FormSchema } from '@/components/Table';
import { Cell } from '@/components/CellWapper';

export enum TYPE_FLAG {
  N = '普通库',
  F = '不合格库',
}
export enum STORE_FLAG {
  S = '高架库',
  F = '平库',
}
export const AUTO_FLAG = {
  M: '否',
  A: '是',
};

export const columns: BasicColumn[] = [
  {
    title: '库房编号',
    dataIndex: 'houseNo',
  },
  {
    title: '库房名称',
    slots: { customRender: 'houseName' },
  },
  {
    title: '库房类别',
    dataIndex: 'typeFlag',
    customRender: ({ record }) => {
      return TYPE_FLAG[record.houseType[0]];
    },
  },
  {
    title: '存放模式',
    dataIndex: 'storeFlag',
    customRender: ({ record }) => {
      return STORE_FLAG[record.houseType[1]];
    },
  },
  {
    title: '是否立体库',
    dataIndex: 'autoFlag',
    customRender: ({ record }) => {
      return AUTO_FLAG[record.houseType[2]];
    },
  },
  {
    title: '货位数',
    dataIndex: 'standard.maxLocationSize',
    customRender: ({ record }) => {
      return record.standard.maxLocationSize;
    },
  },

  {
    title: '已使用货位数',
    dataIndex: 'locationUsedCount',
  },
  {
    title: '是否启用',
    dataIndex: 'closed',
    customRender: ({ record }) => {
      return record.closed === 'NORMAL' ? '是' : '否';
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'houseNo',
    label: '库房编号',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'houseName',
    label: '库房名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];
export const capacitySchema: FormSchema = {
  field: 'capacity',
  label: '货位数量',
  component: 'InputNumber',
  colProps: { span: 24 },
  required: true,
  componentProps: {
    min: 1,
    formatter: (n: number) => n && parseInt(n),
  },
};

export const initFormSchema: (opt: {
  name: String;
  houseType: String;
  updateSchema: Function;
}) => FormSchema[] = ({ name, houseType, updateSchema }) => [
  {
    field: 'houseName',
    label: name + '名称',
    component: 'Input',
    colProps: { span: 12 },
    required: true,
  },
  {
    field: 'typeFlag',
    label: name + '类别',
    component: 'Select',
    colProps: { span: 12 },
    required: true,
    defaultValue: houseType[0] || 'N',
    componentProps: {
      disabled: !!houseType,
      options: [
        { label: TYPE_FLAG.N, value: 'N' },
        { label: TYPE_FLAG.F, value: 'F' },
      ],
    },
  },
  {
    field: 'storeFlag',
    label: '存放模式',
    component: 'Select',
    colProps: { span: 12 },
    required: true,
    defaultValue: houseType[1] || 'S',
    componentProps: {
      disabled: !!houseType,
      onChange: function (value) {
        updateSchema([{ field: 'capacity', required: value !== 'F' }]);
      },
      options: [
        { label: STORE_FLAG.S, value: 'S' },
        { label: STORE_FLAG.F, value: 'F' },
      ],
    },
  },
  {
    field: 'autoFlag',
    label: '是否自动库',
    component: 'Select',
    colProps: { span: 12 },
    required: true,
    defaultValue: houseType[2] || 'M',
    componentProps: {
      disabled: !!houseType,
      options: [
        { label: AUTO_FLAG.A, value: 'A' },
        { label: AUTO_FLAG.M, value: 'M' },
      ],
    },
  },
  {
    ...capacitySchema,
    required: true,
    colProps: { span: 12 },
  },
  {
    field: 'closed',
    component: 'Select',
    label: '是否启用',
    colProps: { span: 12 },
    required: true,
    defaultValue: 'CLOSED',
    componentProps: {
      options: [
        { label: '是', value: 'NORMAL' },
        { label: '否', value: 'CLOSED' },
      ],
    },
  },
  {
    field: 'remark',
    component: 'InputTextArea',
    label: '备注',
    colProps: { span: 24 },
  },
];
export const locationColumns: BasicColumn[] = [
  {
    title: '货位编号',
    dataIndex: 'locationNo',
  },
  {
    title: '托盘号',
    dataIndex: 'trayNo',
  },
  {
    title: '是否启用',
    dataIndex: 'closed',
    customRender: ({ record }) => {
      return record.closed === 'NORMAL' ? '是' : '否';
    },
  },
];
export const locationSearchForSchema: FormSchema[] = [
  {
    field: 'locationNo',
    label: '货位编号',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'trayNo',
    label: '托盘号',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const areaColumns: BasicColumn[] = [
  {
    title: '区域编号',
    dataIndex: 'houseNo',
  },
  {
    title: '区域名称',
    dataIndex: 'houseName',
  },
  {
    title: '货位数',
    dataIndex: '',
    customRender: ({ record }) => {
      return record.standard.maxLocationSize;
    },
  },
  {
    title: '已使用货位数',
    dataIndex: '',
  },
  {
    title: '是否启用',
    dataIndex: '',
    customRender: ({ record }) => {
      return record.closed === 'NORMAL' ? '是' : '否';
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];
export const areaSearchForSchema: FormSchema[] = [
  {
    field: 'houseNo',
    label: '区域编号',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'houseName',
    label: '区域名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const locationCell: Cell[] = [
  {
    field: 'standard.maxLocationSize',
    label: '货位数',
  },
  {
    field: '',
    label: '已使用货位数',
  },
];
export const cellSchema: (locationCell: Cell[]) => Cell[] = (locationCell) => [
  {
    field: 'houseNo',
    label: '库房编号',
  },
  {
    field: 'houseName',
    label: '库房名称',
  },
  {
    field: 'houseType',
    label: '库房类别',
    format: (data) => TYPE_FLAG[data.houseType[0]],
  },
  {
    field: 'houseType',
    label: '存放模式',
    format: (data) => STORE_FLAG[data.houseType[1]],
  },
  {
    field: 'houseType',
    label: '是否自动库',
    format: (data) => AUTO_FLAG[data.houseType[2]],
  },
  ...locationCell,
  {
    field: 'closed',
    label: '是否启用',
    format: (data) => (data.closed === 'NORMAL' ? '是' : '否'),
  },
];
