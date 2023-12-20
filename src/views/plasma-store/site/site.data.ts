import { BasicColumn, FormSchema } from '@/components/Table';
import { CLOSED, CLOSED_TEXT } from '@/enums/plasmaStoreEnum';

export const columns: BasicColumn[] = [
  {
    title: '站点代码',
    dataIndex: 'siteNo',
  },
  {
    title: '站点名称',
    dataIndex: 'siteName',
  },
  {
    title: '库房',
    dataIndex: 'fkHouseNo',
  },
  {
    title: '是否启用',
    dataIndex: '',
    customRender: ({ record }) => {
      return CLOSED_TEXT[record.closed];
    },
  },
];
export const siteCodeSchema: FormSchema = {
  field: 'siteNo',
  component: 'Input',
  label: '站点代码',
  colProps: { span: 6 },
};
export const formListSchema: FormSchema[] = [
  {
    field: 'siteName',
    component: 'Input',
    label: '站点名称',
    colProps: { span: 24 },
    required: true,
  },
  { ...siteCodeSchema, colProps: { span: 24 }, required: true },
  {
    field: 'fkHouseNo',
    component: 'Select',
    label: '库房',
    colProps: { span: 24 },
    required: true,
    componentProps: {
      options: [],
    },
  },
  {
    field: 'closed',
    component: 'Select',
    label: '是否启用',
    colProps: { span: 24 },
    required: true,
    defaultValue: CLOSED.NORMAL,
    componentProps: {
      options: [
        { label: CLOSED_TEXT.NORMAL, value: CLOSED.NORMAL },
        { label: CLOSED_TEXT.CLOSED, value: CLOSED.CLOSED },
      ],
    },
  },
];
