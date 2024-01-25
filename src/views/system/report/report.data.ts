/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2024-01-25 09:42:11
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-25 10:09:11
 */
import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '报表编号',
    dataIndex: '',
  },
  {
    title: '报表名称',
    dataIndex: '',
  },
  {
    title: '版本号',
    dataIndex: '',
  },
  {
    title: '生效日期',
    dataIndex: '',
  },
  {
    title: '有效期至',
    dataIndex: '',
  },
  {
    title: '状态',
    dataIndex: '',
  },
];

export const formSchema: FormSchema[] = [
  {
    field: '',
    component: 'Input',
    label: '报表编号',
    required: true,
  },
  {
    field: '',
    component: 'Input',
    label: '报表名称',
    required: true,
  },
  {
    field: '',
    component: 'Input',
    label: '版本号',
    required: true,
  },
  {
    field: '',
    component: 'DatePicker',
    label: '生效日期',
    required: true,
    componentProps: {
      class: 'w-full',
    },
  },
  {
    field: '',
    component: 'DatePicker',
    label: '有效期至',
    required: true,
    componentProps: {
      class: 'w-full',
    },
  },
];
