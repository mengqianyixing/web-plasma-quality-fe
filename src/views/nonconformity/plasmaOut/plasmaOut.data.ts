import { BasicColumn, FormSchema } from '@/components/Table';
import dayjs from 'dayjs';
import {
  DictionaryItemKeyEnum,
  DictionaryReasonEnum,
  getSysSecondaryDictionary,
} from '@/api/_dictionary';

export enum USE_TO {
  DET = 'DET',
  TRF = 'TRF',
}
export enum USE_TO_TEXT {
  DET = '销毁',
  TRF = '转移',
}
const useToList = (() => Object.keys(USE_TO).map((_) => ({ label: USE_TO_TEXT[_], value: _ })))();

export enum PROCESS_STATE {
  AUT = 'AUT',
  TBO = 'TBO',
  OTI = 'OTI',
  OBD = 'OBD',
}
export enum PROCESS_STATE_TEXT {
  AUT = '待审核',
  TBO = '待出库',
  OTI = '出库中',
  OBD = '已出库',
}
const processStateList = (() =>
  Object.keys(PROCESS_STATE).map((_) => ({ label: PROCESS_STATE_TEXT[_], value: _ })))();

export const columns: BasicColumn[] = [
  {
    title: '申请单号',
    dataIndex: 'dlvNo',
    slots: { customRender: 'dlvNo' },
  },
  {
    title: '用途',
    dataIndex: 'useTo',
    customRender: ({ record }) => {
      return USE_TO_TEXT[record.useTo];
    },
  },
  {
    title: '血浆总数',
    dataIndex: 'count',
  },
  {
    title: '申请原因',
    dataIndex: 'applicationCause',
  },
  {
    title: '申请单位',
    dataIndex: 'applicationUnit',
  },
  {
    title: '申请人',
    dataIndex: 'applicant',
  },
  {
    title: '申请日期',
    dataIndex: 'applicationAt',
  },
  {
    title: '记录人',
    dataIndex: 'creator',
  },
  {
    title: '记录日期',
    dataIndex: 'createAt',
  },
  {
    title: '审核人',
    dataIndex: 'reviewer',
  },
  {
    title: '审核日期',
    dataIndex: 'reviewAt',
  },
  // {
  //   title: '审核状态',
  //   dataIndex: '',
  // },
  {
    title: '状态',
    dataIndex: 'state',
  },
  {
    title: '出库扫描日期',
    dataIndex: 'finishAt',
  },
];

export const searchFormschema: FormSchema[] = [
  {
    field: '[begnDate, endDate]',
    component: 'RangePicker',
    label: '申请日期',
    componentProps: {
      class: 'w-full',
    },
  },
  {
    field: 'dlvNo',
    component: 'Input',
    label: '申请单号',
  },
  {
    field: 'state',
    component: 'Select',
    label: '状态',
    componentProps: {
      options: processStateList,
    },
  },
  {
    field: 'useTo',
    component: 'Select',
    label: '用途',
    componentProps: {
      options: useToList,
    },
  },
];
export const formSchema: FormSchema[] = [
  {
    label: '申请日期',
    component: 'Input',
    field: 'applicationAt',
    required: true,
    defaultValue: dayjs().format('YYYY-MM-DD'),
    componentProps: { disabled: true, readonly: true },
  },
  {
    label: '申请人',
    component: 'Input',
    field: 'applicant',
    required: true,
  },
  {
    label: '用途',
    component: 'Select',
    field: 'useTo',
    required: true,
    componentProps: {
      options: useToList,
    },
  },
  {
    label: '申请单位',
    component: 'Input',
    field: 'applicationUnit',
    required: true,
  },
  {
    label: '申请原因',
    component: 'Input',
    field: 'applicationCause',
    required: true,
  },
  // {
  //   label: '编辑原因',
  //   component: 'Input',
  //   field: '',
  //   required: true,
  // },
];
export const dtColumns: BasicColumn[] = [
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
  },
  {
    title: '血浆编号',
    dataIndex: 'bagNo',
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
    dataIndex: 'failed',
  },
  {
    title: '入库日期',
    dataIndex: 'indate',
  },
];

export const dtSearchFormSchema: FormSchema[] = [
  {
    field: 'batchNo',
    component: 'Input',
    label: '血浆批号',
  },
  {
    field: 'bagNo',
    component: 'Input',
    label: '血浆编号',
  },
  {
    field: 'fkDonorNo',
    component: 'Input',
    label: '浆员编号',
  },
  {
    field: 'fkFailedCode',
    component: 'ApiSelect',
    label: '不合格原因',
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
];

export const outLeftColumns: BasicColumn[] = [
  {
    title: '未扫描血浆编号',
    dataIndex: 'bagNo',
  },
  {
    title: '浆员编号',
    dataIndex: 'donorNo',
  },
  {
    title: '浆员姓名',
    dataIndex: 'donorName',
  },
];
export const outRightColumns: BasicColumn[] = [
  {
    title: '已扫描血浆编号',
    dataIndex: 'bagNo',
  },
  {
    title: '扫描人',
    dataIndex: 'operator',
  },
  {
    title: '扫描日期',
    dataIndex: 'operateAt',
  },
];
