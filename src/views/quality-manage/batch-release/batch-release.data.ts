import { BasicColumn, FormSchema } from '@/components/Table';
import { statusList, STATUS_TEXT } from '@/enums/batchReleaseEnum';
import { PLASMA_TYPE_TEXT } from '@/enums/inspectEnum';
import {
  nonconformityPlasmaMap,
  NonconformityPlasmaStatusValueEnum,
} from '@/enums/nonconforityEnum';

export const columns: BasicColumn[] = [
  {
    title: '制造批号',
    dataIndex: 'mesId',
    slots: { customRender: 'mesId' },
  },
  {
    title: '投产类型',
    dataIndex: 'orderType',
    format: (text) => PLASMA_TYPE_TEXT[text],
  },
  {
    title: '计划投产日期',
    format: (text) => text?.slice(0, 10),
    dataIndex: 'planTask',
  },
  {
    title: '投产净重',
    dataIndex: 'netWeight',
  },
  {
    title: '投产数量',
    dataIndex: 'prodBagCount',
  },
  {
    title: '最早采集日期',
    format: (text) => text?.slice(0, 10),
    dataIndex: 'minCollectAt',
  },
  {
    title: '最晚采集日期',
    format: (text) => text?.slice(0, 10),
    dataIndex: 'maxCollectAt',
  },
  {
    title: '最早采集血浆有效期至',
    dataIndex: 'earliestValid',
  },
  {
    title: '最晚满检疫期日期',
    format: (text) => text?.slice(0, 10),
    dataIndex: 'latestExpiration',
  },
  {
    title: '献血浆者人数',
    dataIndex: 'donorCount',
  },
  {
    title: '放行状态',
    dataIndex: 'state',
    format: (text) => STATUS_TEXT.get(text) as string,
  },
  {
    title: '放行单号',
    dataIndex: 'prNo',
  },
  {
    title: '审核人',
    dataIndex: 'checker',
  },
  {
    title: '审核日期',
    format: (text) => text?.slice(0, 10),
    dataIndex: 'checkAt',
  },
  {
    title: '复核人',
    dataIndex: 'reviewer',
  },
  {
    title: '复核日期',
    format: (text) => text?.slice(0, 10),
    dataIndex: 'reviewAt',
  },
  {
    title: '放行人',
    dataIndex: 'releaseBy',
  },
  {
    title: '放行日期',
    format: (text) => text?.slice(0, 10),
    dataIndex: 'releaseAt',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'mesId',
    component: 'Input',
    label: '制造批号',
  },
  {
    field: 'prNo',
    component: 'Input',
    label: '放行单号',
  },
  {
    field: 'state',
    component: 'Select',
    label: '放行状态',
    componentProps: {
      options: statusList,
    },
  },
];

export const plasmaRestrictionColumns: BasicColumn[] = [
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
    width: '150px',
  },
  {
    title: '血浆箱号',
    dataIndex: 'boxNo',
    width: '150px',
  },
  {
    title: '血浆总数',
    dataIndex: 'bagCount',
    width: '150px',
  },
  {
    title: '血浆编号',
    dataIndex: 'bagNos',
    width: '300px',
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: '350px',
  },
];
export const nonconformityColumns: BasicColumn[] = [
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
  },
  {
    title: '血浆编号',
    dataIndex: 'bagNo',
  },
  {
    title: '不合格日期',
    format: (text) => text?.slice(0, 10),
    dataIndex: 'createAt',
  },
  {
    title: '不合格类型',
    dataIndex: 'fkFailedCode',
    slots: { customRender: 'fkFailedCode' },
  },
  {
    title: '不合格原因',
    dataIndex: 'failedReason',
  },
  {
    title: '状态',
    dataIndex: 'state',
    format: (text) =>
      nonconformityPlasmaMap.get(<NonconformityPlasmaStatusValueEnum>text) as string,
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'mesId',
    component: 'Input',
    label: '制造批号',
    required: true,
    colProps: { span: 12 },
    componentProps: { disabled: true },
  },
  {
    field: 'prNo',
    component: 'Input',
    label: '放行单号',
    required: true,
    colProps: { span: 12 },
  },
  {
    field: 'releaseDetail',
    slot: 'table',
    component: 'Input',
    label: '审核项',
    required: true,
  },
  {
    field: 'conclusion',
    component: 'InputTextArea',
    label: '审核结论',
    defaultValue: '准许放行',
    required: true,
  },
  {
    field: 'remark',
    component: 'InputTextArea',
    label: '备注',
    required: true,
  },
];

export const formColumns: BasicColumn[] = [
  {
    title: '排序号',
    dataIndex: 'appIndex',
    width: 60,
  },
  {
    title: '审核项目',
    dataIndex: 'appName',
  },
  {
    title: '审核内容',
    dataIndex: 'appContent',
  },
  {
    title: '审核结果',
    dataIndex: 'appResult',
  },
];

export const itemFormSchema: FormSchema[] = [
  {
    field: 'appIndex',
    component: 'InputNumber',
    label: '排序号',
    required: true,
    componentProps: {
      max: 99,
      min: 0,
    },
  },
  {
    field: 'appName',
    component: 'Input',
    label: '审核项目',
    required: true,
  },
  {
    field: 'appContent',
    component: 'InputTextArea',
    label: '审核内容',
    required: true,
  },
  {
    field: 'appResult',
    component: 'InputTextArea',
    label: '审核结果',
    required: true,
  },
];