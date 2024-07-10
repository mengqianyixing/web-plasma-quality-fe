import { BasicColumn } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '检测项目',
    dataIndex: 'projectName',
    width: 100,
  },

  {
    title: '检测类型',
    dataIndex: 'testType',
    width: 80,
  },
  {
    title: '物料名称',
    dataIndex: 'materialName',
    width: 200,
  },
  {
    title: '试剂厂家',
    dataIndex: 'factory',
    width: 200,
  },
  {
    title: '试剂批号',
    dataIndex: 'reagentBatch',
    width: 120,
  },
  {
    title: '试剂放行单号',
    dataIndex: 'releaseNo',
    width: 120,
  },
  {
    title: '有效期至',
    dataIndex: 'expireDate',
    width: 100,
  },
];
