import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { customRenderDate } from '@/utils/tableHelpRender';

export const columns: BasicColumn[] = [
  {
    title: '角色编码',
    dataIndex: 'name',
    width: 100,
  },
  {
    title: '角色名称',
    dataIndex: 'displayName',
    className: 'empty-value',
    width: 200,
  },
  {
    title: '归属',
    dataIndex: 'owner',
    width: 100,
  },
  {
    title: '用户',
    dataIndex: 'users',
    width: 280,
    customRender: ({ record }) => {
      return h(
        'div',
        {
          class: 'truncate',
          style: 'padding: 5px;',
          title: record.users.join(','),
        },
        record?.users?.length ? record?.users?.join(',') : '-',
      );
    },
  },
  {
    title: '状态',
    dataIndex: 'enabled',
    width: 120,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    customRender: ({ record }) => {
      return h(Tag, { color: record.enabled ? 'green' : 'red' }, () => {
        return record.enabled ? '启用' : '停用';
      });
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    width: 220,
    customRender: ({ record }) => customRenderDate(record.createdTime),
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '角色编码',
    component: 'Input',
  },
  {
    field: 'displayName',
    label: '角色名称',
    component: 'Input',
  },
  // {
  //   field: 'owner',
  //   label: '归属',
  //   component: 'Input',
  //   colProps: { span: 4 },
  // },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '角色编码',
    required: true,
    component: 'Input',
    colProps: {
      span: 8,
    },
  },
  {
    label: '角色名称',
    required: true,
    field: 'displayName',
    component: 'Input',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'enabled',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: true,
    componentProps: {
      options: [
        { label: '启用', value: true },
        { label: '停用', value: false },
      ],
    },
    colProps: {
      span: 8,
    },
  },
  {
    label: '用户',
    field: 'users',
    slot: 'users',
    component: 'Select',
  },

  {
    label: ' ',
    field: 'domains',
    slot: 'menu',
    component: 'ApiTree',
  },
];
