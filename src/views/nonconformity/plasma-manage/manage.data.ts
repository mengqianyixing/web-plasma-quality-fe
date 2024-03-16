import { BasicColumn, FormSchema } from '@/components/Table';
import { getBankName } from '@/api/nonconformity/box-manage';
import {
  HoseType,
  nonconformityPlasmaMap,
  NonconformityPlasmaStatusValueEnum,
} from '@/enums/nonconforityEnum';
import { DescItem } from '@/components/Description';
import dayjs from 'dayjs';
import {
  DictionaryEnum,
  DictionaryItemKeyEnum,
  DictionaryReasonEnum,
  getSysDictionary,
  getSysSecondaryDictionary,
} from '@/api/_dictionary';

import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
import { SERVER_ENUM } from '@/enums/serverEnum';

const serverEnumStore = useServerEnumStoreWithOut();

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    width: 65,
  },
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
    ellipsis: false,
  },
  {
    title: '血浆编号',
    dataIndex: 'bagNo',
    slots: { customRender: 'bagNo' },
    width: 120,
  },
  {
    title: '浆员编号',
    dataIndex: 'donorNo',
    width: 100,
  },
  {
    title: '浆员姓名',
    dataIndex: 'donorName',
    width: 65,
  },
  {
    title: '采集日期',
    dataIndex: 'collDate',
  },
  {
    title: '存放位置',
    dataIndex: 'stockLocation',
  },
  {
    title: '箱号',
    dataIndex: 'boxNo',
    ellipsis: false,
  },
  {
    title: '不合格原因',
    dataIndex: 'unqReason',
    slots: { customRender: 'unqReason' },
    ellipsis: false,
    width: 200,
  },
  {
    title: '不合格日期',
    dataIndex: 'unqDate',
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
  {
    title: '状态',
    dataIndex: 'state',
    format(text) {
      return nonconformityPlasmaMap.get(<NonconformityPlasmaStatusValueEnum>text) as string;
    },
    width: 120,
  },
  {
    title: '审核状态',
    dataIndex: 'checked',
    width: 80,
  },
];

export const searchSchema: FormSchema[] = [
  {
    field: 'stationNo',
    label: '采浆公司',
    component: 'Select',
  },
  {
    field: 'batchNo',
    label: '血浆批号',
    component: 'Input',
  },
  {
    field: '[unqStartDate, unqEndDate]',
    label: '不合格日期',
    component: 'RangePicker',
  },
  {
    field: 'state',
    label: '状态',
    component: 'Select',
    defaultValue: 'REG',
    componentProps: {
      options: serverEnumStore
        .getServerEnum(SERVER_ENUM.UnquaState)
        .filter((it) => it.value !== 'EXA'),
    },
  },
  {
    field: 'bagNo',
    label: '血浆编号',
    component: 'Input',
  },
  {
    field: 'fkDonorNo',
    label: '浆员编号',
    component: 'Input',
  },
  {
    field: '[inStoreStartDate, inStoreEndDate]',
    label: '不合格入库日期',
    component: 'RangePicker',
  },
  {
    field: 'checked',
    label: '审核状态',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '未审核',
          value: 0,
        },
        {
          label: '已审核',
          value: 1,
        },
      ],
    },
  },
  {
    field: 'flow',
    label: '不合格类型',
    component: 'ApiSelect',
    componentProps: {
      api: getSysDictionary,
      params: [DictionaryEnum.PlasmaFailedItem],
      resultField: '[0].dictImtes',
      valueField: 'id',
    },
  },
  {
    field: 'unqReason',
    label: '不合格原因',
    component: 'ApiSelect',
    componentProps: {
      api: getSysSecondaryDictionary,
      params: {
        dataKey: DictionaryReasonEnum.PlasmaFailedReason,
        dictItemTypes: [
          DictionaryItemKeyEnum.PlasmaAccept,
          DictionaryItemKeyEnum.SampleAccept,
          DictionaryItemKeyEnum.PlasmaFailed,
          DictionaryItemKeyEnum.SampleFailed,
          DictionaryItemKeyEnum.Sample,
          DictionaryItemKeyEnum.Track,
          DictionaryItemKeyEnum.Test,
          DictionaryItemKeyEnum.Quarantine,
          DictionaryItemKeyEnum.Other,
        ],
      },
      valueField: 'dictItemId',
    },
  },
  {
    field: '[outStoreStartDate, outStoreEndDate]',
    label: '不合格出库日期',
    component: 'RangePicker',
  },
];

export const pickSchema: FormSchema[] = [
  {
    field: 'reviewer',
    label: '复核人',
    component: 'InputSearch',
    colProps: { span: 20 },
    componentProps: {
      'enter-button': '登录',
      placeholder: '请点击登录按钮',
      readonly: true,
    },
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
  {
    field: 'bagNo',
    label: '不合格血浆编号',
    component: 'Input',
    colProps: { span: 20 },
    required: true,
  },
];

export const inStoreSchema: FormSchema[] = [
  {
    field: 'reviewer',
    label: '复核人',
    colProps: { span: 20 },
    component: 'InputSearch',
    componentProps: {
      'enter-button': '登录',
      placeholder: '请点击登录按钮',
      readonly: true,
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
  { field: 'stationWeight', label: '浆站重量(g)' },
  { field: 'acceptWeight', label: '验收净重(g)' },
  { field: 'unqReason', label: '不合格原因' },
  { field: 'plasmaState', label: '血浆流程状态' },
  { field: 'bankName', label: '存放位置' },
  { field: 'registerDate', label: '不合格登记日期' },
  { field: 'register', label: '登记人' },
  { field: 'registerReviewer', label: '登记复核人' },
  { field: 'pickDate', label: '不合格挑浆日期' },
  { field: 'picker', label: '挑浆人' },
  { field: 'pickReviewer', label: '挑浆复核人' },
  { field: 'inStoreDate', label: '不合格入库日期' },
  { field: 'inStoreOpt', label: '入库人' },
  { field: 'inStoreReviewer', label: '入库复核人' },
  { field: 'processDate', label: '入库审核日期' },
  { field: 'processor', label: '审核人' },
  { field: 'outStoreOrderNo', label: '出库申请单号' },
  { field: 'outStoreDate', label: '出库申请日期' },
  { field: 'proposer', label: '申请人' },
  { field: 'applicantCompany', label: '申请单位' },
  { field: 'outReviewDate', label: '出库审核日期' },
  { field: 'outReviewer', label: '出库审核人' },
  { field: 'outPurpose', label: '出库用途' },
  { field: 'unqOutDate', label: '不合格出库日期' },
  { field: 'unqOutOpt', label: '操作人' },
];
