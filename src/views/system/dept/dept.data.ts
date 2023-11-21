import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '部门名称',
    dataIndex: 'deptName',
    width: 160,
    align: 'left',
  },
  {
    title: '排序',
    dataIndex: 'deptOrder',
    width: 50,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'deptName',
    label: '部门名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'deptName',
    label: '部门名称',
    component: 'Input',
    required: true,
  },
  {
    field: 'parentId',
    label: '上级部门',
    component: 'TreeSelect',
    ifShow({ values }) {
      const { deptName, parentDept } = values;
      // Hide without a parentDept when editing
      return parentDept || (!deptName && !parentDept);
    },
    componentProps: {
      fieldNames: {
        label: 'deptName',
        key: 'deptId',
        value: 'deptId',
      },
      getPopupContainer: () => document.body,
    },
  },
  {
    field: 'deptOrder',
    label: '排序',
    component: 'InputNumber',
    required: true,
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
