import { BasicColumn, FormSchema } from '@/components/Table';
import { CLOSED_TEXT } from '@/enums/plasmaStoreEnum';

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
    dataIndex: 'houseName',
  },
  {
    title: '是否启用',
    dataIndex: '',
    customRender: ({ record }) => {
      return record.closed ? '否' : '是';
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
  {
    ...siteCodeSchema,
    colProps: { span: 24 },
    required: true,
    rules: [
      {
        trigger: 'blur',
        validator: (rule, value) => {
          if (!value) return Promise.reject('请输入站点代码');
          if (!/^[a-zA-Z0-9]*$/.test(value)) return Promise.reject('只能输入字母和数字');
          return Promise.resolve();
        },
      },
    ],
  },
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
    defaultValue: 0,
    componentProps: {
      options: [
        { label: CLOSED_TEXT.NORMAL, value: 0 },
        { label: CLOSED_TEXT.CLOSED, value: 1 },
      ],
    },
  },
];
