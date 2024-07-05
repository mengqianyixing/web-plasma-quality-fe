import { BasicColumn, FormSchema } from '@/components/Table';
import { donorStatusMap, donorStatusValueEnum } from '@/enums/callbackEnum';
import dayjs from 'dayjs';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
import { VxeGridPropTypes } from '@/components/VxeTable';

const serverEnumStore = useServerEnumStoreWithOut();

export const columns: BasicColumn[] = [
  {
    title: '名单编号',
    dataIndex: 'planNo',
    slots: { customRender: 'planNo' },
    width: 110,
    fixed: 'left',
  },
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    width: 75,
    fixed: 'left',
  },
  {
    title: '浆员数量',
    dataIndex: 'donorNum',
    width: 80,
    fixed: 'left',
  },
  {
    title: '生成人',
    dataIndex: 'creator',
    width: 80,
  },
  {
    title: '生成日期',
    dataIndex: 'createAt',
    width: 100,
  },
  {
    title: '确认人',
    dataIndex: 'checker',
    width: 80,
  },
  {
    title: '确认日期',
    dataIndex: 'checkAt',
    width: 100,
  },
  {
    title: '样本批号',
    dataIndex: 'sampleBatchNo',
    width: 130,
  },
  {
    title: '回访成功',
    dataIndex: 'okNum',
    slots: { customRender: 'okNum' },
    width: 75,
  },
  {
    title: '回访终止',
    dataIndex: 'failedNum',
    slots: { customRender: 'failedNum' },
    width: 75,
  },
  {
    title: '恢复采浆',
    dataIndex: 'recoverNum',
    slots: { customRender: 'recoverNum' },
    width: 75,
  },
  {
    title: '未回访',
    dataIndex: 'noVisitNum',
    slots: { customRender: 'noVisitNum' },
    width: 60,
  },
  {
    title: '自主回访',
    dataIndex: 'selfBackNum',
    slots: { customRender: 'selfBackNum' },
    width: 80,
  },
  {
    title: '样本接收人',
    dataIndex: 'sampleAcceptBy',
    width: 88,
  },
  {
    title: '样本接收日期',
    dataIndex: 'sampleAcceptAt',
    width: 105,
  },
  {
    title: '样本发布人',
    dataIndex: 'samplePublishBy',
    width: 100,
  },
  {
    title: '样本发布日期',
    dataIndex: 'samplePublishAt',
    width: 105,
  },
  {
    title: '状态',
    dataIndex: 'state',
    format(text) {
      return serverEnumStore.getServerEnumText(SERVER_ENUM.CallbackPlanState)(text);
    },
    width: 100,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'stationNo',
    label: '采浆公司',
    component: 'Select',
    colProps: {
      span: 6,
    },
  },
  {
    field: '[createStartDate, createEndDate]',
    label: '生成日期',
    defaultValue: [dayjs().subtract(1, 'month'), dayjs()],
    component: 'RangePicker',
    colProps: {
      span: 6,
    },
    componentProps: {
      format: 'YYYY-MM-DD',
    },
  },
  {
    field: 'batchNo',
    label: '名单编号',
    component: 'Input',
    colProps: {
      span: 6,
    },
  },
  {
    field: 'states',
    label: '状态',
    component: 'Select',
    colProps: {
      span: 6,
      pull: 1,
    },
    defaultValue: ['WIT', 'COF'],
    componentProps: {
      mode: 'multiple',
      options: serverEnumStore.getServerEnum(SERVER_ENUM.CallbackPlanState),
    },
  },
  {
    field: '[sampleAcceptStartDate, sampleAcceptEndDate]',
    label: '样本接收日期',
    component: 'RangePicker',
    colProps: {
      span: 6,
    },
    componentProps: {
      format: 'YYYY-MM-DD',
    },
  },
  {
    field: '[samplePublishStartDate, samplePublishEndDate]',
    label: '样本发布日期',
    component: 'RangePicker',
    colProps: {
      span: 6,
    },
    componentProps: {
      format: 'YYYY-MM-DD',
    },
  },
];

export const callbackModalColumns: VxeGridPropTypes.Columns = [
  {
    type: 'checkbox',
    width: 50,
  },
  {
    type: 'seq',
    title: '序号',
  },
  {
    title: '浆员编号',
    field: 'cardNo',
    width: 150,
  },
  {
    title: '浆员姓名',
    field: 'donorName',
    width: 80,
  },
  {
    title: '浆员状态',
    field: 'donatorStatus',
    formatter: ({ cellValue }) => {
      return donorStatusMap.get(cellValue as donorStatusValueEnum) as string;
    },
  },
  {
    title: '血浆状态',
    field: 'trackType',
  },
  {
    title: '拒绝日期',
    field: 'refuseDate',
    formatter: ({ cellValue }) => {
      return cellValue ? dayjs(cellValue).format('YYYY-MM-DD') : '-';
    },
  },
  {
    title: '拒绝原因',
    field: 'refuseReason',
  },
  {
    title: '性别',
    field: 'gender',
    width: 50,
  },
  {
    title: '最早待回访采浆日期',
    field: 'minCollTime',
    formatter: ({ cellValue }) => {
      return cellValue ? dayjs(cellValue).format('YYYY-MM-DD') : '';
    },
  },
  {
    title: '最早采浆血浆编号',
    field: 'minPlasmaNo',
    width: 150,
  },
  {
    title: '最后采浆日期',
    field: 'maxCollectTime',
    formatter: ({ cellValue }) => {
      return cellValue ? dayjs(cellValue).format('YYYY-MM-DD') : '';
    },
  },
  {
    title: '待追踪袋数',
    field: 'plasmaCount',
    slots: { default: 'plasmaCount' },
  },
];

export const callbackDetailModalColumns: BasicColumn[] = [
  {
    title: '浆员编号',
    dataIndex: 'cardNo',
    width: 110,
  },
  {
    title: '浆员姓名',
    dataIndex: 'donorName',
    width: 80,
    ellipsis: false,
  },
  {
    title: '血浆状态',
    dataIndex: 'trackType',
    width: 70,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: 40,
  },
  {
    title: '血型',
    dataIndex: 'bloodType',
    width: 40,
  },
  {
    title: '浆员状态',
    dataIndex: 'donatorStatus',
    format: (text) => {
      return donorStatusMap.get(text as donorStatusValueEnum) as string;
    },
    width: 80,
  },
  {
    title: '拒绝日期',
    dataIndex: 'refuseDate',
    format: (text) => {
      return text ? dayjs(text).format('YYYY-MM-DD') : '';
    },
    width: 100,
  },
  {
    title: '拒绝原因',
    dataIndex: 'refuseReason',
    width: 140,
    ellipsis: false,
  },
  {
    title: '最早采浆血浆编号',
    dataIndex: 'minPlasmaNo',
    width: 140,
  },
  {
    title: '最早待回访采浆日期',
    dataIndex: 'minCollTime',
    format: (text) => {
      return text ? dayjs(text).format('YYYY-MM-DD') : '';
    },
    width: 140,
  },
  {
    title: '待追踪袋数',
    dataIndex: 'plasmaCount',
    slots: { customRender: 'plasmaCount' },
    width: 100,
  },
  {
    title: '最后采浆日期',
    dataIndex: 'maxCollectTime',
    format: (text) => {
      return text ? dayjs(text).format('YYYY-MM-DD') : '';
    },
    width: 100,
  },
  {
    title: '回访日期',
    dataIndex: 'callbackDate',
    format: (text) => {
      return text ? dayjs(text).format('YYYY-MM-DD') : '';
    },
    width: 100,
  },
  {
    title: '回访结果',
    dataIndex: 'callbackResult',
    width: 120,
  },
  {
    title: '样本编号',
    dataIndex: 'sampleNo',
    width: 120,
  },
  {
    title: '采集日期',
    dataIndex: 'sampleCollectTime',
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '';
    },
    width: 100,
  },
  {
    title: '剩余天数',
    dataIndex: 'deadline',
    width: 80,
  },
];

export const addCallbackModalSearchFromSchema: FormSchema[] = [
  {
    field: 'immType',
    label: '血浆类型',
    component: 'Select',
    labelWidth: 90,
    colProps: { span: 3 },
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.PlasmaType),
    },
  },
  {
    field: 'trackType',
    label: '血浆状态',
    component: 'Select',
    labelWidth: 90,
    componentProps: {
      options: [
        {
          label: '首次',
          value: 1,
        },
        {
          label: '反复',
          value: 2,
        },
      ],
    },
  },
  {
    field: 'gapDays',
    label: '距今未采浆天数',
    component: 'InputNumber',
    colProps: { span: 3 },
  },
  {
    field: 'cardNo',
    label: '浆员编号',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: '[minCollectTime, maxCollectTime]',
    label: '最早待回访日期',
    component: 'RangePicker',
    colProps: { span: 7, push: 1 },
    helpMessage() {
      return '采集日期在区间：大于（当前日期 - 1年），小于等于（当前日期 - “回访间隔天数”)，默认间隔天数180天';
    },
  },
];

export const callbackModalSearchFromSchema: FormSchema[] = [
  {
    field: 'immType',
    label: '血浆类型',
    component: 'Select',
    labelWidth: 90,
    colProps: { span: 3 },
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.PlasmaType),
    },
  },
  {
    field: 'trackType',
    label: '血浆状态',
    component: 'Select',
    labelWidth: 90,
    componentProps: {
      options: [
        {
          label: '首次',
          value: 1,
        },
        {
          label: '反复',
          value: 2,
        },
      ],
    },
  },
  {
    field: 'gapDays',
    label: '距今未采浆天数',
    component: 'InputNumber',
    colProps: { span: 3 },
  },
  {
    field: 'cardNo',
    label: '浆员编号',
    component: 'Input',
    colProps: { span: 4 },
  },
  {
    field: '[minCollectTime, maxCollectTime]',
    label: '最早待回访日期',
    component: 'RangePicker',
    colProps: { span: 7, push: 1 },
  },
];

export const callbackDetailFormSchema: FormSchema[] = [
  {
    field: 'immType',
    label: '血浆类型',
    component: 'Select',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.PlasmaType),
    },
  },
  {
    field: 'gapDays',
    label: '距今未采浆天数',
    component: 'InputNumber',
  },
  {
    field: 'cardNo',
    label: '浆员编号',
    component: 'Input',
  },
  {
    field: '[minCollectTime, maxCollectTime]',
    label: '最早待回访日期',
    component: 'RangePicker',
  },
];

export const callbackCustomFormSchema: FormSchema[] = [
  {
    field: '[startBatchNo, endBatchNo]',
    component: 'InputRange',
    label: '血浆批号',
    componentProps: {
      isBetween: false,
    },
  },
  {
    field: 'trackType',
    label: '血浆状态',
    component: 'Select',
    componentProps: {
      options: [
        {
          label: '首次',
          value: 1,
        },
        {
          label: '反复',
          value: 2,
        },
      ],
    },
  },
  {
    field: 'donorNo',
    label: '浆员编号',
    component: 'Input',
  },
];

export const callbackDetailCustomColumns: BasicColumn[] = [
  {
    dataIndex: 'cardNo',
    title: '浆员编号',
    width: 100,
  },
  {
    dataIndex: 'donorName',
    title: '姓名',
    width: 80,
  },
  {
    dataIndex: 'callbackDate',
    title: '回访日期',
    width: 100,
  },
  {
    dataIndex: 'sampleNo',
    title: '样品编号',
    width: 130,
  },
  {
    dataIndex: 'bloodType',
    title: '血型',
    width: 60,
  },
  {
    dataIndex: 'liveAddress',
    title: '现居地址',
    width: 150,
  },
  {
    dataIndex: 'sampleCollectTime',
    title: '采集日期',
    width: 100,
  },
  {
    dataIndex: 'trackType',
    title: '血浆状态',
    width: 80,
  },
  {
    dataIndex: 'maxCollectTime',
    title: '最后采浆日期',
    width: 100,
  },
  {
    dataIndex: 'plasmaCount',
    title: '血浆数量（袋）',
    slots: { customRender: 'plasmaCount' },
    width: 100,
  },
];

export const selfBackColumns: BasicColumn[] = [
  {
    title: '浆员编号',
    dataIndex: 'cardNo',
    width: 100,
  },
  {
    title: '浆员姓名',
    dataIndex: 'name',
    width: 80,
  },
  {
    title: '回访日期',
    dataIndex: 'callbackDate',
    width: 100,
    format(text) {
      return text ? dayjs(text).format('YYYY-MM-DD') : '';
    },
  },
  {
    title: '样本编号',
    dataIndex: 'sampleNo',
    width: 100,
  },
  {
    title: '血型',
    dataIndex: 'bloodType',
    width: 80,
  },
  {
    title: '现居地址',
    dataIndex: 'liveAddress',
    width: 200,
    ellipsis: false,
  },
];
