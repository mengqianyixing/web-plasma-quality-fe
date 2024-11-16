import { BasicColumn, FormSchema } from '@/components/Table';
import { getListApi } from '@/api/inspect/itemSetting';
import dayjs, { Dayjs } from 'dayjs';

const testTypeOptions = [
  {
    label: '初检',
    value: 'INI',
  },
  {
    label: '复检',
    value: 'REI',
  },
];
export const columns: BasicColumn[] = [
  {
    title: '检测项目',
    dataIndex: 'projectName',
    width: 100,
    ellipsis: false,
  },
  {
    title: '状态',
    dataIndex: 'state',
    width: 60,
  },
  {
    title: '检测类型',
    dataIndex: 'testType',
    width: 80,
  },
  {
    title: '物料名称',
    dataIndex: 'materialName',
    width: 160,
    ellipsis: false,
  },
  {
    title: '试剂厂家',
    dataIndex: 'factory',
    width: 160,
    ellipsis: false,
  },
  {
    title: '试剂批号',
    dataIndex: 'reagentBatch',
    width: 120,
    ellipsis: false,
  },
  {
    title: '试剂放行单号',
    dataIndex: 'releaseNo',
    width: 120,
    ellipsis: false,
  },
  {
    title: '试剂有效期',
    dataIndex: 'expireDate',
    width: 100,
  },
  {
    title: '创建人',
    dataIndex: 'creator',
    width: 100,
  },
  {
    title: '创建日期',
    dataIndex: 'createAt',
    sorter: true,
    width: 100,
    format: (text) => text?.slice(0, 10),
  },
  {
    title: '复核人',
    dataIndex: 'reviewer',
    width: 100,
  },
  {
    title: '复核日期',
    dataIndex: 'reviewAt',
    width: 100,
    format: (text) => text?.slice(0, 10),
  },
  {
    title: '截止日期登记人',
    dataIndex: 'deadlineCreator',
    width: 120,
  },
  {
    title: '截止日期复核人',
    dataIndex: 'deadlineReviewer',
    width: 120,
  },
  {
    title: '使用截止日期',
    dataIndex: 'deadline',
    width: 100,
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
          getListApi({ currPage: 1, pageSize: 100, state: 'NORMAL' }).then((res) => {
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
      options: testTypeOptions,
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
  },
  {
    field: 'expireDate',
    component: 'DatePicker',
    label: '试剂有效期',
    required: true,
    componentProps: {
      class: 'w-full',
      disabledDate: (date: Dayjs) => date && date < dayjs(dayjs().format('YYYY-MM-DD')),
    },
  },
];

export const searchSchema: FormSchema[] = [
  {
    field: 'fkProjectId',
    component: 'ApiSelect',
    label: '检测项目',
    componentProps: {
      api: () =>
        new Promise((rs) => {
          getListApi({ currPage: 1, pageSize: 100, state: 'NORMAL' }).then((res) => {
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
    componentProps: {
      options: testTypeOptions,
    },
  },
  {
    field: 'materialName',
    component: 'Input',
    label: '物料名称',
  },
  {
    field: 'reagentBatch',
    component: 'Input',
    label: '试剂批号',
  },
  {
    field: 'materialState',
    component: 'Select',
    label: '状态',
    defaultValue: '启用',
    componentProps: {
      options: [
        { label: '停用', value: '停用' },
        { label: '在用', value: '启用' },
      ],
    },
  },
];
