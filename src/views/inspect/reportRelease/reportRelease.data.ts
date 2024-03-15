import { BasicColumn, FormSchema } from '@/components/Table';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

import { useStation } from '@/hooks/common/useStation';

const { stationOptions } = useStation();

const serverEnumStore = useServerEnumStoreWithOut();
const SampleType = serverEnumStore.getServerEnumText(SERVER_ENUM.SampleType);
const ReportStateType = serverEnumStore.getServerEnumText(SERVER_ENUM.ReportStateType);

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    width: 80,
  },
  {
    title: '样本批号',
    dataIndex: 'bsNo',
    width: 120,
  },
  {
    title: '样本类型',
    dataIndex: 'sampleCode',
    format: (text) => SampleType(text),
    width: 80,
  },
  {
    title: '检测合格样本总数',
    dataIndex: 'totalQualified',
    slots: { customRender: 'totalQualified' },
    width: 140,
  },
  {
    title: '检测不合格样本总数',
    dataIndex: 'totalUnqualified',
    slots: { customRender: 'totalUnqualified' },
    width: 160,
  },
  {
    title: '高效价总数',
    dataIndex: 'totalHighTiter',
    slots: { customRender: 'totalHighTiter' },
    width: 100,
  },
  {
    title: '低效价总数',
    dataIndex: 'totalLowTiter',
    slots: { customRender: 'totalLowTiter' },
    width: 100,
  },
  {
    title: '无效价总数',
    dataIndex: 'totalNormal',
    slots: { customRender: 'totalNormal' },
    width: 100,
  },
  {
    title: '当前状态',
    width: 80,
    dataIndex: 'state',
    format: (text) => ReportStateType(text),
  },
  {
    title: '报告人',
    dataIndex: 'producer',
    width: 120,
  },
  {
    title: '报告日期',
    dataIndex: 'productionAt',
    width: 100,
    format: (t) => t?.slice(0, 10),
  },
  {
    title: '复核人',
    dataIndex: 'reviewer',
    width: 120,
  },
  {
    title: '复核日期',
    dataIndex: 'reviewAt',
    width: 100,
    format: (t) => t?.slice(0, 10),
  },
  {
    title: '发布人',
    dataIndex: 'issuer',
    width: 120,
  },
  {
    title: '发布日期',
    dataIndex: 'issueAt',
    width: 100,
    format: (t) => t?.slice(0, 10),
  },
];

export const searchFormschema: FormSchema[] = [
  {
    field: 'stationNo',
    component: 'Select',
    label: '采浆公司',
    componentProps: {
      options: stationOptions,
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
export const columnsMap: Record<number, BasicColumn[]> = {
  1: [
    {
      dataIndex: 'titerValue',
      title: '效价值',
    },
  ],
  2: [
    {
      dataIndex: 'titerValue',
      title: '效价值',
    },
  ],
  5: [
    {
      dataIndex: 'titerValue',
      title: '效价值',
    },
  ],
  3: [
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
      dataIndex: 'ct',
      title: 'CT值',
    },
    {
      dataIndex: 'unqualified',
      title: '不合格',
    },
  ],
};
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
    title: '检测项目',
  },
  {
    dataIndex: 'methodName',
    title: '检测方法',
  },
];
