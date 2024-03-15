import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
import { useStation } from '@/hooks/common/useStation';

const { stationOptions } = useStation();

const serverEnumStore = useServerEnumStoreWithOut();
const SampleType = serverEnumStore.getServerEnumText(SERVER_ENUM.SampleType);
export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    width: 80,
  },
  {
    title: '样本批号',
    dataIndex: 'sampleBatchNo',
    width: 120,
  },

  {
    title: '样本类型',
    dataIndex: 'sampleType',
    format: (text) => SampleType(text),
    width: 80,
  },
  {
    title: '样本总数',
    dataIndex: 'sampleCount',
    width: 80,
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
  },
  {
    title: '不合格总数',
    dataIndex: 'unqualifiedCount',
    width: 100,
  },
  {
    title: '高效价总数',
    dataIndex: 'totalHighTiter',
    width: 100,
  },
  {
    title: '低效价总数',
    dataIndex: 'totalLowTiter',
    width: 100,
  },
  {
    title: '无效价总数',
    dataIndex: 'totalNoTiter',
    width: 100,
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
