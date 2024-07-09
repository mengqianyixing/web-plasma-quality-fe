import { BasicColumn, FormSchema } from '@/components/Table';
import dayjs from 'dayjs';

export const columns: BasicColumn[] = [
  {
    title: '部门名称',
    dataIndex: 'title',
    width: 160,
    align: 'left',
  },
  {
    title: '创建时间',
    dataIndex: 'createdTime',
    format: (text) => {
      return text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-';
    },
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'deptName',
    label: '部门名称',
    component: 'Input',
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'title',
    label: '部门名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'parentId',
    label: '上级部门',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'title',
        key: 'key',
        value: 'key',
      },
      getPopupContainer: () => document.body,
    },
  },
];
