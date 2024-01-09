import { BasicColumn, FormSchema } from '@/components/Table';
import { getBankName } from '@/api/nonconformity/box-manage';
import {
  HoseType,
  nonconformityPlasmaMap,
  NonconformityPlasmaStatusValueEnum,
} from '@/enums/nonconforityEnum';
import { DescItem } from '@/components/Description';
import dayjs from 'dayjs';

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationNo',
    slots: { customRender: 'stationNo' },
  },
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
  },
  {
    title: '血浆编号',
    dataIndex: 'bagNo',
    slots: { customRender: 'bagNo' },
    width: 200,
  },
  {
    title: '浆员编号',
    dataIndex: 'donorNo',
  },
  {
    title: '浆员姓名',
    dataIndex: 'donorName',
  },
  {
    title: '不合格原因',
    dataIndex: 'unqReason',
  },
  {
    title: '状态',
    dataIndex: 'state',
    format(text) {
      return nonconformityPlasmaMap.get(<NonconformityPlasmaStatusValueEnum>text) as string;
    },
  },
  {
    title: '不合格入库日期',
    dataIndex: 'inStoreDate',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '不合格出库日期',
    dataIndex: 'outStoreDate',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
];

export const searchSchema: FormSchema[] = [
  {
    field: 'stationNo',
    label: '采浆公司',
    component: 'Select',
    colProps: { span: 6 },
  },
  {
    field: 'batchNo',
    label: '血浆批号',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'bagNo',
    label: '血浆编号',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'donorNo',
    label: '浆员编号',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'unqReason',
    label: '不合格原因',
    component: 'Select',
    colProps: { span: 6 },
  },
  {
    field: 'state',
    label: '状态',
    component: 'Select',
    colProps: { span: 6 },
    componentProps: {
      options: [...nonconformityPlasmaMap.entries()].map(([value, label]) => ({
        label,
        value,
      })),
    },
  },
  {
    field: '[inStoreStartDate, inStoreEndDate]',
    label: '不合格入库日期',
    component: 'RangePicker',
    colProps: { span: 6 },
  },
  {
    field: '[outStoreEndDate, outStoreEndDate]',
    label: '不合格出库日期',
    component: 'RangePicker',
    colProps: { span: 6 },
  },
];

export const pickSchema: FormSchema[] = [
  {
    field: 'reviewer',
    label: '复核人',
    component: 'Input',
    colProps: { span: 20 },
    slot: 'check',
    componentProps: {
      disabled: true,
    },
    required: true,
  },
  {
    field: 'bagNo',
    label: '不合格血浆编号',
    component: 'Input',
    colProps: { span: 20 },
    required: true,
  },
  {
    field: 'bankNo',
    label: '暂存位置',
    component: 'ApiSelect',
    componentProps: {
      api: getBankName,
      params: {
        houseType: HoseType.Stage,
      },
      labelField: 'bankName',
      valueField: 'bankNo',
    },
    colProps: { span: 20 },
    required: true,
  },
];

export const inStoreSchema: FormSchema[] = [
  {
    field: 'reviewer',
    label: '复核人',
    component: 'Input',
    colProps: { span: 20 },
    slot: 'check',
    componentProps: {
      disabled: true,
    },
    required: true,
  },
  {
    field: 'boxNo',
    label: '不合格箱号',
    component: 'Input',
    colProps: { span: 20 },
    required: true,
  },
  {
    field: 'bagNo',
    label: '不合格血浆编号',
    component: 'Input',
    colProps: { span: 20 },
    required: true,
  },
];

export const detailSchema: DescItem[] = [
  { field: 'bagNo', label: '血浆编号' },
  { field: 'batchNo', label: '血浆批号' },
  { field: 'boxNo', label: '血浆箱号' },
  { field: 'stationName', label: '采浆公司' },
  { field: 'donorNo', label: '浆员编号' },
  { field: 'donorName', label: '浆员姓名' },
  { field: 'donorStatus', label: '浆员状态' },
  { field: 'gender', label: '性别' },
  { field: 'bloodType', label: '血型' },
  { field: 'collDate', label: '采浆日期' },
  { field: 'stationWeight', label: '浆站重量' },
  { field: 'accpetWeight', label: '验收净重' },
  { field: 'unqReason', label: '不合格原因' },
  { field: 'plasmaState', label: '血浆流程状态' },
  { field: 'bankName', label: '存放位置' },
  { field: 'registerDate', label: '不合格登记日期' },
  { field: 'register', label: '登记人' },
  { field: 'reigsterReviewer', label: '登记复核人' },
  { field: 'pickDate', label: '挑浆日期' },
  { field: 'picker', label: '挑浆人' },
  { field: 'pickReviewer', label: '挑浆复核人' },
  { field: 'instoreDate', label: '入库日期' },
  { field: 'instoreOpt', label: '入库人' },
  { field: 'instoreReviewer', label: '入库复核人' },
  { field: 'processDate', label: '入库审核日期' },
  { field: 'processer', label: '审核人' },
  { field: 'outStoreOrderNo', label: '出库申请单号' },
  { field: 'outStoreDate', label: '出库日期' },
  { field: 'outStoreOpt', label: '出库人' },
  { field: 'proposer', label: '申请人' },
  { field: 'applicantCompany', label: '申请单位' },
  { field: 'outReviewDate', label: '出库申请日期' },
  { field: 'outReviewer', label: '出库审核人' },
  { field: 'outPurpose', label: '出库用途' },
  { field: 'unqOutDate', label: '不合格出库日期' },
  { field: 'unqOutOpt', label: '不合格操作人' },
];
