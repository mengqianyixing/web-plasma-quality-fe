import { BasicColumn, FormSchema } from '@/components/Table';

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
  {
    title: '使用截至日期',
    dataIndex: 'deadline',
    width: 100,
  },
];

export const formListSchema: FormSchema[] = [
  {
    field: 'fkProjectId',
    component: 'Select',
    label: '检测项目',
    required: true,
    componentProps: {},
  },
  {
    field: 'reagentBatch',
    component: 'Select',
    label: '试剂批号',
    required: true,
  },
];
