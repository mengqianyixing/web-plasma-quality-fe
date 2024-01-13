import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '资源Id',
    dataIndex: 'resourceId',
    width: 170,
  },
  {
    title: '资源URI',
    dataIndex: 'resourceUri',
    width: 170,
  },
  {
    title: '请求方法',
    dataIndex: 'methodType',
    width: 120,
  },
  {
    title: '资源名称',
    dataIndex: 'resourceName',
    width: 180,
  },
  {
    title: '备注信息',
    dataIndex: 'remark',
  },
  {
    title: '创建人',
    dataIndex: 'createUser',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: '角色名称',
    component: 'Input',
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '1' },
        { label: '停用', value: '0' },
      ],
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'resourceName',
    label: '资源名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'resourceUri',
    label: '资源Uri',
    required: true,
    component: 'Input',
  },
  {
    field: 'methodType',
    label: '请求方法',
    required: true,
    component: 'Select',
    componentProps: {
      options: [
        {
          label: 'GET',
          value: 'GET',
        },
        {
          label: 'POST',
          value: 'POST',
        },
        {
          label: 'PUT',
          value: 'PUT',
        },
        {
          label: 'DELETE',
          value: 'DELETE',
        },
      ],
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
  {
    label: ' ',
    field: 'menuIds',
    slot: 'resource',
    component: 'ApiTree',
  },
];
