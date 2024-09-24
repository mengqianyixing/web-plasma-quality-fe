import { BasicColumn, FormSchema } from '@/components/Table';
import { Cell } from '@/components/CellWapper';
import {
  TYPE_FLAG_TEXT,
  STORE_FLAG_TEXT,
  AUTO_FLAG_TEXT,
  TYPE_FLAG,
  STORE_FLAG,
  AUTO_FLAG,
  CLOSED,
  CLOSED_TEXT,
} from '@/enums/plasmaStoreEnum';
import { useGlobalApiStoreWithOut } from '@/store/modules/globalApi';
import { SysParamsEnum } from '@/enums/sysParamsEnum';
import { COMPANY } from '@/enums/company';

const globalApiStore = useGlobalApiStoreWithOut();
const iskm = globalApiStore.getSysParams(SysParamsEnum.BloodProductionCompany) === COMPANY.KM;
export const columns: BasicColumn[] = [
  {
    title: '库房名称',
    slots: iskm ? void 0 : { customRender: 'houseName' },
    width: 150,
    ellipsis: false,
    dataIndex: 'houseName',
  },
  {
    title: '库房类别',
    dataIndex: 'typeFlag',
    customRender: ({ record }) => {
      return TYPE_FLAG_TEXT[record.houseType[0]];
    },
    width: 100,
  },
  {
    title: '存放模式',
    dataIndex: 'storeFlag',
    customRender: ({ record }) => {
      return STORE_FLAG_TEXT[record.houseType[1]];
    },
    width: 100,
  },
  {
    title: '是否立体库',
    dataIndex: 'autoFlag',
    customRender: ({ record }) => {
      return AUTO_FLAG_TEXT[record.houseType[2]];
    },
    width: 100,
  },
  {
    title: '货位数',
    dataIndex: 'standard.maxLocationSize',
    customRender: ({ record }) => {
      return record.standard.maxLocationSize;
    },
    width: 100,
  },

  {
    title: '已使用货位数',
    dataIndex: 'locationUsedCount',
    width: 120,
    format: (v) => (iskm ? '-' : v),
  },
  {
    title: '是否启用',
    dataIndex: 'closed',
    customRender: ({ record }) => {
      return CLOSED_TEXT[record.closed];
    },
    width: 80,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 150,
    ellipsis: false,
  },
];

export const capacitySchema: FormSchema = {
  field: 'capacity',
  label: '货位数量',
  component: 'InputNumber',
  colProps: { span: 24 },
  componentProps: {
    min: 1,
    formatter: (n: number) => n && parseInt(n),
  },
};

export const initFormSchema: (opt: {
  name: String;
  houseType: String;
  updateSchema: Function;
  setFieldsValue: Function;
  isUpdate: boolean;
}) => FormSchema[] = ({ name, houseType, updateSchema, setFieldsValue, isUpdate }) => [
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
    defaultValue: houseType[0] || TYPE_FLAG.N,
    componentProps: {
      disabled: !!houseType || isUpdate,
      options: [
        { label: TYPE_FLAG_TEXT.N, value: TYPE_FLAG.N },
        { label: TYPE_FLAG_TEXT.F, value: TYPE_FLAG.F },
        // { label: TYPE_FLAG_TEXT.V, value: TYPE_FLAG.V },
      ],
    },
  },
  {
    field: 'storeFlag',
    label: '存放模式',
    component: 'Select',
    colProps: { span: 12 },
    required: true,
    defaultValue: houseType[1] || STORE_FLAG.S,
    componentProps: {
      disabled: !!houseType || isUpdate,
      options: [
        { label: STORE_FLAG_TEXT.S, value: STORE_FLAG.S },
        { label: STORE_FLAG_TEXT.F, value: STORE_FLAG.F },
      ],
      onChange: (value) => {
        updateSchema({
          field: 'autoFlag',
          componentProps: { disabled: value === STORE_FLAG.F || isUpdate },
        });
        if (value === STORE_FLAG.F) {
          setFieldsValue({ autoFlag: AUTO_FLAG.M });
        }
      },
    },
  },
  {
    field: 'autoFlag',
    label: '是否立体库',
    component: 'Select',
    colProps: { span: 12 },
    required: true,
    defaultValue: houseType[2] || AUTO_FLAG.A,
    componentProps: {
      disabled: true,
      options: [
        { label: AUTO_FLAG_TEXT.A, value: AUTO_FLAG.A },
        { label: AUTO_FLAG_TEXT.M, value: AUTO_FLAG.M },
      ],
    },
  },
  {
    ...capacitySchema,
    colProps: { span: 12 },
    componentProps: {
      ...capacitySchema.componentProps,
      disabled: isUpdate,
    },
  },
  {
    field: 'closed',
    component: 'Select',
    label: '是否启用',
    colProps: { span: 12 },
    required: true,
    defaultValue: CLOSED.NORMAL,
    componentProps: {
      disabled: isUpdate,
      options: [
        { label: CLOSED_TEXT.NORMAL, value: CLOSED.NORMAL },
        { label: CLOSED_TEXT.CLOSED, value: CLOSED.CLOSED },
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
      return CLOSED_TEXT[record.closed];
    },
  },
];
export const locationSearchForSchema: FormSchema[] = [
  {
    field: 'locationNo',
    label: '货位编号',
    component: 'Input',
  },
  {
    field: 'trayNo',
    label: '托盘号',
    component: 'Input',
  },
];

export const areaColumns: BasicColumn[] = [
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
    width: 80,
  },
  {
    title: '已使用货位数',
    dataIndex: '',
    width: 110,
  },
  {
    title: '是否启用',
    dataIndex: '',
    width: 100,
    customRender: ({ record }) => {
      return CLOSED_TEXT[record.closed];
    },
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];
export const areaSearchForSchema: FormSchema[] = [
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
    field: 'locationUsedCount',
    label: '已使用货位数',
  },
];
export const cellSchema: (locationCell: Cell[]) => Cell[] = (locationCell) => [
  {
    field: 'houseName',
    label: '库房名称',
  },
  {
    field: 'houseType',
    label: '库房类别',
    format: (data) => TYPE_FLAG_TEXT[data.houseType[0]],
  },
  {
    field: 'houseType',
    label: '存放模式',
    format: (data) => STORE_FLAG_TEXT[data.houseType[1]],
  },
  {
    field: 'houseType',
    label: '是否立体库',
    format: (data) => AUTO_FLAG_TEXT[data.houseType[2]],
  },
  ...locationCell,
  {
    field: 'closed',
    label: '是否启用',
    format: (data) => CLOSED_TEXT[data.closed],
  },
];
