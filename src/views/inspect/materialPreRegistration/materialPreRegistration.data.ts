import { BasicColumn, FormSchema } from '@/components/Table';
import { getListApi } from '@/api/inspect/itemSetting';

export const columns: BasicColumn[] = [
  {
    title: '检测项目',
    dataIndex: 'projectName',
  },
  {
    title: '状态',
    dataIndex: 'state',
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
  {
    title: '复核人',
    dataIndex: 'reviewer',
  },
  {
    title: '复核日期',
    dataIndex: 'reviewAt',
    format: (text) => text?.slice(0, 10),
  },
];

export const formListSchema: FormSchema[] = [
  {
    field: 'fkProjectId',
    component: 'ApiSelect',
    label: '检测项目',
    required: true,
    componentProps: {
      api: () =>
        new Promise((rs) => {
          getListApi({ currPage: 1, pageSize: 100 }).then((res) => {
            rs(res.result);
          });
        }),
      labelField: 'projectAbbr',
      valueField: 'projectId',
    },
  },
  {
    field: 'testType',
    component: 'Select',
    label: '检测类型',
    required: true,
    componentProps: {
      options: [
        {
          label: '初检',
          value: 'INI',
        },
        {
          label: '复检',
          value: 'REI',
        },
      ],
    },
  },
  {
    field: 'materialName',
    component: 'Input',
    label: '物料名称',
    required: true,
  },
  {
    field: 'factory',
    component: 'Input',
    label: '试剂厂家',
    required: true,
  },
  {
    field: 'reagentBatch',
    component: 'Input',
    label: '试剂批号',
    required: true,
  },
  {
    field: 'releaseNo',
    component: 'Input',
    label: '放行单号',
    required: true,
  },
  {
    field: 'expireDate',
    component: 'DatePicker',
    label: '有效期至',
    required: true,
    componentProps: {
      class: 'w-full',
    },
  },
  {
    field: 'deadline',
    component: 'DatePicker',
    label: '使用截至日期',
    required: true,
    componentProps: {
      class: 'w-full',
    },
  },
];
