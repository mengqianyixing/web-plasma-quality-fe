import { BasicColumn, FormSchema } from '@/components/Table';
import {
  CallbackStateMap,
  CallbackStateValueEnum,
  donorStatusMap,
  donorStatusValueEnum,
} from '@/enums/callbackEnum';
import { PLASMA_TYPE_LIST } from '@/enums/inspectEnum';
import dayjs, { Dayjs } from 'dayjs';

export const columns: BasicColumn[] = [
  {
    title: '名单编号',
    dataIndex: 'planNo',
    slots: { customRender: 'planNo' },
    width: 200,
  },
  {
    title: '采浆公司',
    dataIndex: 'stationNo',
    slots: { customRender: 'stationNo' },
  },
  {
    title: '浆员数量',
    dataIndex: 'donorNum',
  },
  {
    title: '生成人',
    dataIndex: 'creator',
  },
  {
    title: '生成日期',
    dataIndex: 'createAt',
  },
  {
    title: '确认人',
    dataIndex: 'checker',
  },
  {
    title: '确认日期',
    dataIndex: 'checkAt',
  },
  {
    title: '状态',
    dataIndex: 'state',
    fixed: 'right',
    format(text) {
      return CallbackStateMap.get(text as CallbackStateValueEnum) as string;
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'stationNo',
    label: '采浆公司',
    colProps: { span: 5 },
    component: 'Select',
  },
  {
    field: '[createStartDate, createEndDate]',
    label: '生成日期',
    colProps: { span: 7 },
    defaultValue: [dayjs().subtract(1, 'month'), dayjs()],
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
    },
  },
  {
    field: 'batchNo',
    label: '名单编号',
    colProps: { span: 5 },
    component: 'Input',
  },
  {
    field: 'state',
    label: '状态',
    colProps: { span: 5 },
    component: 'Select',
    componentProps: {
      options: [...CallbackStateMap.entries()].map(([key, value]) => ({
        label: value,
        value: key,
      })),
    },
  },
];

export const callbackModalColumns: BasicColumn[] = [
  {
    title: '浆员编号',
    dataIndex: 'donorNo',
    width: 200,
  },
  {
    title: '浆员姓名',
    dataIndex: 'donorName',
  },
  {
    title: '浆员状态',
    dataIndex: 'donatorStatus',
    format: (text) => {
      return donorStatusMap.get(text as donorStatusValueEnum) as string;
    },
  },
  {
    title: '拒绝日期',
    dataIndex: 'refuseDate',
    format: (text) => {
      return text ? dayjs(text).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '拒绝原因',
    dataIndex: 'refuseReason',
  },
  {
    title: '血浆类型',
    dataIndex: 'immType',
  },
  {
    title: '性别',
    dataIndex: 'gender',
  },

  {
    title: '最早待回访采浆日期',
    dataIndex: 'minCollTime',
    format: (text) => {
      return text ? dayjs(text).format('YYYY-MM-DD') : '';
    },
  },
  {
    title: '最早采浆血浆编号',
    dataIndex: 'minPlasmaNo',
  },
  {
    title: '最后采浆日期',
    dataIndex: 'maxCollectTime',
    format: (text) => {
      return text ? dayjs(text).format('YYYY-MM-DD') : '';
    },
  },
  {
    title: '待追踪袋数',
    dataIndex: 'plasmaCount',
  },
];

export const callbackDetailModalColumns: BasicColumn[] = [
  {
    title: '浆员编号',
    dataIndex: 'donorNo',
    width: 200,
  },
  {
    title: '浆员姓名',
    dataIndex: 'donorName',
  },
  {
    title: '性别',
    dataIndex: 'gender',
  },
  {
    title: '身份证号',
    dataIndex: 'idcardId',
    width: 200,
  },
  {
    title: '浆员状态',
    dataIndex: 'donatorStatus',
    format: (text) => {
      return donorStatusMap.get(text as donorStatusValueEnum) as string;
    },
  },
  {
    title: '拒绝日期',
    dataIndex: 'refuseDate',
    format: (text) => {
      return text ? dayjs(text).format('YYYY-MM-DD') : '';
    },
  },
  {
    title: '拒绝原因',
    dataIndex: 'refuseReason',
  },
  {
    title: '最早采浆血浆编号',
    dataIndex: 'minPlasmaNo',
  },
  {
    title: '最早待回访采浆日期',
    dataIndex: 'minCollTime',
    format: (text) => {
      return text ? dayjs(text).format('YYYY-MM-DD') : '';
    },
  },
  {
    title: '待追踪袋数',
    dataIndex: 'plasmaCount',
  },
  {
    title: '最后采浆日期',
    dataIndex: 'maxCollectTime',
    format: (text) => {
      return text ? dayjs(text).format('YYYY-MM-DD') : '';
    },
  },
  {
    title: '回访日期',
    dataIndex: 'callbackDate',
    format: (text) => {
      return text ? dayjs(text).format('YYYY-MM-DD') : '';
    },
  },
  {
    title: '回访结果',
    dataIndex: 'callbackResult',
  },
  {
    title: '样本编号',
    dataIndex: 'sampleNo',
  },
  {
    title: '采集日期',
    dataIndex: 'sampleCollectTime',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '';
    },
  },
];

export const addCallbackModalSearchFromSchema: FormSchema[] = [
  {
    field: 'immType',
    label: '血浆类型',
    component: 'Select',
    colProps: { span: 4 },
    componentProps: {
      options: PLASMA_TYPE_LIST.map((it) => ({
        label: `${it.value}，${it.label}`,
        value: it.value,
      })),
    },
  },
  {
    field: 'gapDays',
    label: '距今未采浆天数',
    component: 'InputNumber',
    colProps: { span: 4 },
  },
  {
    field: 'donorNo',
    label: '浆员编号',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: '[minCollectTime, maxCollectTime]',
    label: '最早待回访日期',
    component: 'RangePicker',
    defaultValue: [
      dayjs().subtract(1, 'year').add(1, 'day').format('YYYY-MM-DD'),
      dayjs().subtract(180, 'day').format('YYYY-MM-DD'),
    ],
    colProps: { span: 7 },
    helpMessage() {
      return '采集日期在区间：大于（当前日期 - 1年），小于等于（当前日期 - “回访间隔天数”)，默认间隔天数180天';
    },
    componentProps: {
      disabledDate: (current: Dayjs) => {
        return (
          !current.isAfter(dayjs().subtract(1, 'year').add(1, 'day')) ||
          current.isAfter(dayjs().subtract(180, 'day'))
        );
      },
    },
  },
];

export const callbackModalSearchFromSchema: FormSchema[] = [
  {
    field: 'immType',
    label: '血浆类型',
    component: 'Select',
    colProps: { span: 4 },
    componentProps: {
      options: PLASMA_TYPE_LIST.map((it) => ({
        label: `${it.value}，${it.label}`,
        value: it.value,
      })),
    },
  },
  {
    field: 'gapDays',
    label: '距今未采浆天数',
    component: 'InputNumber',
    colProps: { span: 4 },
  },
  {
    field: 'donorNo',
    label: '浆员编号',
    component: 'Input',
    colProps: { span: 5 },
  },
  {
    field: '[minCollectTime, maxCollectTime]',
    label: '最早待回访日期',
    component: 'RangePicker',
    colProps: { span: 7 },
  },
];
