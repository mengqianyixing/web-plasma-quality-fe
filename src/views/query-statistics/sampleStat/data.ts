import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { stationNameSearchApi } from '@/api/plasmaStore/entryPlasma';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

const serverEnumStore = useServerEnumStoreWithOut();
const SampleType = serverEnumStore.getServerEnumText(SERVER_ENUM.SampleType);
export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    title: '样本批号',
    dataIndex: 'sampleBatchNo',
  },

  {
    title: '样本类型',
    dataIndex: 'sampleType',
    format: (text) => SampleType(text),
  },
  {
    title: '样本总数',
    dataIndex: 'sampleCount',
  },
  {
    title: '接收人',
    dataIndex: 'acceptor',
  },
  {
    title: '接收日期',
    dataIndex: 'acceptAt',
  },
  {
    title: '检测结果发布人',
    dataIndex: 'issuer',
  },
  {
    title: '发布日期',
    dataIndex: 'issueAt',
  },
  {
    title: '合格总数',
    dataIndex: 'qualifiedCount',
  },
  {
    title: '不合格总数',
    dataIndex: 'unqualifiedCount',
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
    dataIndex: 'totalNoTiter',
  },
  {
    title: '试剂批号',
    dataIndex: 'reagentBatchNo',
  },
];

export const searchFormSchema: FormSchema[] = [
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
    field: 'sampleBatchNo',
    component: 'Input',
    label: '样本批号',
  },
  {
    field: 'sampleType',
    component: 'Select',
    label: '样本类型',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.SampleType),
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
