import { BasicColumn, FormSchema } from '@/components/Table';
import { stationNameSearchApi } from '@/api/plasmaStore/entryPlasma';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

const serverEnumStore = useServerEnumStoreWithOut();
const SampleType = serverEnumStore.getServerEnumText(SERVER_ENUM.SampleType);
const ReportStateType = serverEnumStore.getServerEnumText(SERVER_ENUM.ReportStateType);

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    title: '样本批号',
    dataIndex: 'bsNo',
  },
  {
    title: '样本类型',
    dataIndex: 'sampleCode',
    format: (text) => SampleType(text),
  },
  {
    title: '检测合格样本总数',
    dataIndex: 'totalQualified',
  },
  {
    title: '检测不合格样本总数',
    dataIndex: 'totalUnqualified',
    slots: { customRender: 'totalUnqualified' },
  },
  {
    title: '高效价总数',
    dataIndex: 'totalHighTiter',
  },
  {
    title: '低效价总数',
    dataIndex: 'totalLowTiter',
  },
  {
    title: '无效价总数',
    dataIndex: 'totalNormal',
  },
  {
    title: '当前状态',
    dataIndex: 'state',
    format: (text) => ReportStateType(text),
  },
  {
    title: '报告人',
    dataIndex: 'producer',
  },
  {
    title: '报告日期',
    dataIndex: 'productionAt',
  },
  {
    title: '复核人',
    dataIndex: 'reviewer',
  },
  {
    title: '复核日期',
    dataIndex: 'reviewAt',
  },
  {
    title: '发布人',
    dataIndex: 'issuer',
  },
  {
    title: '发布日期',
    dataIndex: 'issueAt',
  },
];

export const searchFormschema: FormSchema[] = [
  {
    field: 'stationNo',
    component: 'ApiSelect',
    label: '采浆公司',
    componentProps: {
      api: stationNameSearchApi,
      labelField: 'stationName',
      valueField: 'stationNo',
    },
  },
  {
    field: 'bsNo',
    component: 'Input',
    label: '样本批号',
  },
  {
    field: 'sampleCode',
    component: 'Select',
    label: '样本类型',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.SampleType),
    },
  },

  {
    field: 'state',
    component: 'Select',
    label: '样本状态',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.ReportStateType),
    },
  },
  {
    field: '[begnIssueAt, endIssueAt]',
    component: 'RangePicker',
    label: '发布时间',
    componentProps: {
      class: 'w-full',
    },
  },
];

export const totalUnqualifiedColumns: BasicColumn[] = [
  {
    dataIndex: 'sampleNo',
    title: '样品编号',
  },
  {
    dataIndex: 'donorNo',
    title: '浆员编号',
  },
  {
    dataIndex: 'donorName',
    title: '浆员姓名',
  },
  {
    dataIndex: 'projectName',
    title: '不合格项目',
  },
  {
    dataIndex: 'od',
    title: 'OD值',
  },
  {
    dataIndex: 'cutoff',
    title: 'Cutoff值',
  },
  {
    dataIndex: 'checkAt',
    title: '检测时间',
  },
  {
    dataIndex: 'methodName',
    title: '检测方法',
  },
];
