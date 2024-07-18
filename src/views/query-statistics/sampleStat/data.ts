import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
import { useStation } from '@/hooks/common/useStation';

const { stationOptions } = useStation();

const serverEnumStore = useServerEnumStoreWithOut();
const SampleType = serverEnumStore.getServerEnumText(SERVER_ENUM.SampleType);
export const typeMap = {
  UNQ: 'UNQ',
  HT: '1',
  LT: '2',
  NT: '5',
};
export const columns: (BasicColumn & { type?: string })[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    width: 80,
    fixed: 'left',
  },
  {
    title: '样本批号',
    dataIndex: 'sampleBatchNo',
    width: 120,
    fixed: 'left',
  },

  {
    title: '样本类型',
    dataIndex: 'sampleType',
    format: (text) => SampleType(text),
    width: 80,
    fixed: 'left',
  },
  {
    title: '样本总数',
    dataIndex: 'sampleCount',
    width: 80,
    format: (v) => v || 0,
    fixed: 'left',
  },
  {
    title: '接收人',
    dataIndex: 'acceptor',
    width: 100,
  },
  {
    title: '接收日期',
    dataIndex: 'acceptAt',
    width: 100,
  },
  {
    title: '检测结果发布人',
    dataIndex: 'issuer',
    width: 120,
  },
  {
    title: '发布日期',
    dataIndex: 'issueAt',
    width: 100,
  },
  {
    title: '合格总数',
    dataIndex: 'qualifiedCount',
    width: 100,
    format: (v) => v || 0,
  },
  {
    title: '不合格总数',
    dataIndex: 'unqualifiedCount',
    width: 100,
    slots: { customRender: 'unqualifiedCount' },
    type: typeMap.UNQ,
  },
  {
    title: '高效价总数',
    dataIndex: 'totalHighTiter',
    width: 100,
    slots: { customRender: 'totalHighTiter' },
    type: typeMap.HT,
  },
  {
    title: '低效价总数',
    dataIndex: 'totalLowTiter',
    width: 100,
    slots: { customRender: 'totalLowTiter' },
    type: typeMap.LT,
  },
  {
    title: '无效价总数',
    dataIndex: 'totalNoTiter',
    width: 100,
    slots: { customRender: 'totalNoTiter' },
    type: typeMap.NT,
  },
  {
    title: '试剂批号',
    dataIndex: 'reagentBatchNo',
    width: 300,
    ellipsis: false,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'stationNo',
    component: 'Select',
    label: '采浆公司',
    componentProps: {
      options: stationOptions,
    },
  },
  {
    field: 'sampleBatchNo',
    component: 'Input',
    label: '样本批号',
  },
  {
    field: 'sampleType',
    component: 'Select',
    label: '样本类型',
    componentProps: {
      options: serverEnumStore
        .getServerEnum(SERVER_ENUM.SampleType)
        .filter((item) => ['CAB', 'NOR', 'CMV'].includes(item.value)),
    },
  },
  {
    field: '[issueBeginAt,issueEndAt]',
    component: 'RangePicker',
    label: '检测结果发布日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
];

export const dtColumns: BasicColumn[] = [
  {
    dataIndex: 'cardNo',
    title: '浆员编号',
  },
  {
    dataIndex: 'donorName',
    title: '浆员姓名',
  },
  {
    dataIndex: 'sampleNo',
    title: '样本编号',
  },
  {
    dataIndex: 'collectAt',
    title: '采集日期',
    format: (v) => v?.slice(0, 10),
  },
];
export const columnsMap: Record<string, BasicColumn[]> = {
  [typeMap.HT]: [
    {
      dataIndex: 'titerType',
      title: '效价类型',
      width: 120,
      ellipsis: false,
    },
    {
      dataIndex: 'projectName',
      title: '检测项目',
      width: 120,
      ellipsis: false,
    },
    {
      dataIndex: 'titerValue',
      title: '效价值',
      width: 100,
    },
    {
      dataIndex: 'collectAt',
      title: '采集日期',
      width: 100,
    },
  ],
  [typeMap.LT]: [
    {
      dataIndex: 'titerType',
      title: '效价类型',
      width: 120,
      ellipsis: false,
    },
    {
      dataIndex: 'projectName',
      title: '检测项目',
      width: 120,
      ellipsis: false,
    },
    {
      dataIndex: 'titerValue',
      title: '效价值',
      width: 100,
    },
    {
      dataIndex: 'collectAt',
      title: '采集日期',
      width: 100,
    },
  ],
  [typeMap.NT]: [
    {
      dataIndex: 'projectName',
      title: '检测项目',
      width: 120,
      ellipsis: false,
    },
    {
      dataIndex: 'titerType',
      title: '效价类型',
      width: 120,
      ellipsis: false,
    },
    {
      dataIndex: 'titerValue',
      title: '效价值',
      width: 100,
    },
    {
      dataIndex: 'collectAt',
      title: '采集日期',
      width: 100,
    },
  ],
  [typeMap.UNQ]: [
    {
      dataIndex: 'projectName',
      title: '不合格项目',
      ellipsis: false,
      width: 300,
      align: 'left',
    },
    {
      dataIndex: 'collectAt',
      title: '采集日期',
      width: 100,
    },
  ],
};
export const totalUnqualifiedColumns: BasicColumn[] = [
  {
    dataIndex: 'sampleNo',
    title: '样品编号',
    width: 140,
  },
  {
    dataIndex: 'cardNo',
    title: '浆员编号',
    width: 100,
  },
  {
    dataIndex: 'donorName',
    title: '浆员姓名',
    width: 100,
  },
];

export const totalUnqualifiedSearch: FormSchema[] = [
  {
    field: 'sampleNo',
    label: '样品编号',
    component: 'Input',
  },
  {
    field: 'cardNo',
    label: '浆员编号',
    component: 'Input',
  },
];
