import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '箱号',
    dataIndex: 'boxNo',
    align: 'left',
  },
  {
    title: '容量（袋）',
    dataIndex: 'capacity',
  },
  {
    title: '已存放血浆袋数（袋）',
    dataIndex: 'bagNum',
  },
  {
    title: '不合格原因',
    dataIndex: 'unqReason',
  },
  {
    title: '库房编号',
    dataIndex: 'houseNo',
  },
  {
    title: '库房名称',
    dataIndex: 'houseName',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'boxNo',
    label: '箱号',
    component: 'Input',
    colProps: { span: 8 },
  },
];
