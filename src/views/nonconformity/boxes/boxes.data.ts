import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '箱号',
    dataIndex: 'boxNo',
    resizable: true,
    width: 200,
  },
  {
    title: '容量（袋）',
    dataIndex: 'capacity',
    resizable: true,
    width: 120,
  },
  {
    title: '已存放数量（袋）',
    dataIndex: 'bagNum',
    resizable: true,
    width: 120,
  },
  {
    title: '存放不合格血浆原因',
    dataIndex: 'unqReason',
    resizable: true,
    ellipsis: false,
  },
  {
    title: '库房名称',
    resizable: true,
    dataIndex: 'houseName',
    width: 200,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'boxNo',
    label: '箱号',
    component: 'Input',
  },
];
