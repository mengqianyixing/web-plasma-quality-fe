import { BasicColumn, FormSchema } from '@/components/Table';
import { donorStatusMap, donorStatusValueEnum } from '@/enums/callbackEnum';
import dayjs, { Dayjs } from 'dayjs';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

const serverEnumStore = useServerEnumStoreWithOut();
const PlasmaType = serverEnumStore.getServerEnumText(SERVER_ENUM.PlasmaType);

export const columns: BasicColumn[] = [
  {
    title: '名单编号',
    dataIndex: 'planNo',
    slots: { customRender: 'planNo' },
    width: 200,
  },
  {
    title: '采浆公司',
    dataIndex: 'stationName',
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
    title: '自主回访',
    dataIndex: 'selfBackNum',
    width: 80,
  },
  {
    title: '回访成功',
    dataIndex: 'okNum',
    width: 80,
  },
  {
    title: '回访失败',
    dataIndex: 'failedNum',
    width: 80,
  },
  {
    title: '恢复采浆',
    dataIndex: 'recoverNum',
    width: 80,
  },
  {
    title: '未回访',
    dataIndex: 'noVisitNum',
    width: 80,
  },
  {
    title: '样本接收人',
    dataIndex: 'sampleAcceptBy',
  },
  {
    title: '样本接收日期',
    dataIndex: 'sampleAcceptAt',
  },
  {
    title: '样本发布人',
    dataIndex: 'samplePublishBy',
  },
  {
    title: '样本发布日期',
    dataIndex: 'samplePublishAt',
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
    format(text) {
      return serverEnumStore.getServerEnumText(SERVER_ENUM.CallbackPlanState)(text);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'stationNo',
    label: '采浆公司',
    component: 'Select',
  },
  {
    field: '[createStartDate, createEndDate]',
    label: '生成日期',
    defaultValue: [dayjs().subtract(1, 'month'), dayjs()],
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
    },
  },
  {
    field: 'batchNo',
    label: '名单编号',
    component: 'Input',
  },
  {
    field: 'state',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.CallbackPlanState),
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
    format: (text) => {
      return PlasmaType(text);
    },
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
      options: serverEnumStore.getServerEnum(SERVER_ENUM.PlasmaType),
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
      options: serverEnumStore.getServerEnum(SERVER_ENUM.PlasmaType),
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

export const callbackDetailFormSchema: FormSchema[] = [
  {
    field: 'immType',
    label: '血浆类型',
    component: 'Select',
    colProps: { span: 4 },
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.PlasmaType),
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
