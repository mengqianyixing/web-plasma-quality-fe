import { BasicColumn, FormSchema } from '@/components/Table';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

const serverEnumStore = useServerEnumStoreWithOut();
const SampleType = serverEnumStore.getServerEnumText(SERVER_ENUM.SampleType);
export const columns: BasicColumn[] = [
  {
    title: '样本批号',
    dataIndex: 'batchNo',
    width: 110,
  },
  {
    title: '样本类型',
    dataIndex: 'sampleType',
    width: 80,
    format: SampleType,
  },
  {
    title: '架号',
    dataIndex: 'rackId',
    slots: { customRender: 'rackId' },
    width: 80,
  },
  {
    title: '样本编号范围',
    dataIndex: 'sampleNoRange',
    width: 180,
  },
  {
    title: '样本数量',
    dataIndex: 'sampleCount',
    width: 80,
  },
  {
    title: '缺号样本',
    dataIndex: 'lackSampleNo',
    width: 100,
    ellipsis: false,
  },
];
export const searchForm: FormSchema[] = [
  {
    label: '架号',
    component: 'Input',
    field: 'rackId',
  },
  {
    label: '样本编号',
    component: 'Input',
    field: 'sampleNo',
  },
];
export const dtColumns: BasicColumn[] = [
  {
    title: '样本批号',
    dataIndex: 'batchNo',
    width: 110,
  },
  {
    title: '样本类型',
    dataIndex: 'sampleType',
    width: 80,
    format: SampleType,
  },
  {
    title: '架号',
    dataIndex: 'rackId',
    width: 80,
  },
  {
    title: '序号',
    dataIndex: 'rackPos',
    width: 80,
  },
  {
    title: '样本编号',
    dataIndex: 'sampleNo',
    ellipsis: false,
    width: 140,
  },
];
