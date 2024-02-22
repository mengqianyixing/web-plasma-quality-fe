import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '检测项目',
    dataIndex: 'projectName',
  },

  {
    title: '检测类型',
    dataIndex: 'testType',
  },
  {
    title: '物料名称',
    dataIndex: 'materialName',
  },
  {
    title: '试剂厂家',
    dataIndex: 'factory',
  },
  {
    title: '试剂批号',
    dataIndex: 'reagentBatch',
  },
  {
    title: '试剂放行单号',
    dataIndex: 'releaseNo',
  },
  {
    title: '有效期至',
    dataIndex: 'expireDate',
  },
  {
    title: '使用截至日期',
    dataIndex: 'deadline',
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
