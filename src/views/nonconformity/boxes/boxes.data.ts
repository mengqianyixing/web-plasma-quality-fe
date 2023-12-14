import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '箱号',
    dataIndex: 'boxesNo',
    width: 100,
    align: 'left',
  },
  {
    title: '容量（袋）',
    dataIndex: 'deptOrder',
    width: 100,
  },
  {
    title: '已存放血浆袋数（袋）',
    dataIndex: 'createTime',
    width: 100,
  },
  {
    title: '不合格原因',
    dataIndex: 'remark',
    width: 100,
  },
  {
    title: '库房名称',
    dataIndex: 'remark',
    width: 100,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'boxesNo',
    label: '箱号',
    component: 'Input',
    colProps: { span: 8 },
  },
];
