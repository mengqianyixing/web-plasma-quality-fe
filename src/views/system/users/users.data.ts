/*
 * @Author: HxB
 * @Date: 2024-01-16 17:21:07
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-01-18 15:35:42
 * @Description: 用户管理数据源
 * @FilePath: \psms-fe\src\views\system\users\users.data.ts
 */
import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { formatDate } from 'js-xxx';

export const columns: BasicColumn[] = [
  {
    title: '用户 id',
    dataIndex: 'name',
    width: 100,
  },
  {
    title: '用户名称',
    dataIndex: 'displayName',
    className: 'empty-value',
    width: 100,
  },
  {
    title: '归属',
    dataIndex: 'owner',
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'isForbidden',
    width: 120,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    customRender: ({ record }) => {
      return h(Tag, { color: record.isForbidden ? 'red' : 'green' }, () => {
        return record.isForbidden ? '停用' : '启用';
      });
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    width: 220,
    customRender: ({ record }) => {
      return h(
        'div',
        {
          class: 'empty-value',
        },
        formatDate(record.createdTime),
      );
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '用户 id',
    component: 'Input',
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '用户名称',
    required: true,
    field: 'displayName',
    component: 'Input',
  },
  {
    field: 'forbidden',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: '停用', value: true },
        { label: '启用', value: false },
      ],
    },
  },
];

export const addFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '用户 id',
    component: 'Input',
    required: true,
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    required: true,
  },
  ...formSchema,
];

export const passwordFormSchema: FormSchema[] = [
  {
    field: 'userName',
    label: '用户 id',
    component: 'Input',
    required: true,
    componentProps: {
      readonly: true,
    },
  },
  {
    field: 'newPassword',
    label: '密码',
    component: 'InputPassword',
    required: true,
  },
];

export const updateFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '用户 id',
    component: 'Input',
    required: true,
    componentProps: {
      readonly: true,
    },
  },
  ...formSchema,
];
