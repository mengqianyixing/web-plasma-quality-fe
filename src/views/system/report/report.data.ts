/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2024-01-25 09:42:11
 * @LastEditors: Ding 1326587277@qq.com
 * @LastEditTime: 2024-02-29 14:13:20
 */
import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '报表编号',
    dataIndex: 'ctrlNo',
  },
  {
    title: '报表名称',
    dataIndex: 'ctrlTitle',
  },
  {
    title: '版本号',
    dataIndex: 'ctrlVersion',
  },
  {
    title: '模版版本号',
    dataIndex: 'templateVersion',
  },
  {
    title: '生效日期',
    dataIndex: 'effectiveDate',
  },
  {
    title: '有效期至',
    dataIndex: 'expireDate',
  },
  {
    title: '状态',
    dataIndex: 'state',
    customRender: ({ record }) => {
      return record.state > 0 ? '生效' : '失效';
    },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'ctrlNo',
    component: 'Input',
    label: '报表编号',
    required: true,
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'ctrlTitle',
    component: 'Input',
    label: '报表名称',
    required: true,
  },
  {
    field: 'ctrlVersion',
    component: 'Input',
    label: '版本号',
    required: true,
  },
  {
    field: 'effectiveDate',
    component: 'DatePicker',
    label: '生效日期',
    required: true,
    componentProps: {
      disabled: true,
      class: 'w-full',
    },
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
];
