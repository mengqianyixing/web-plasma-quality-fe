// import { FormProps, FormSchema, BasicColumn } from '@/components/Table';
import { VxeFormItemProps, VxeGridPropTypes } from '@/components/VxeTable';

export const vxeTableColumns: VxeGridPropTypes.Columns = [
  {
    title: '采浆公司',
    type: 'seq',
    fixed: 'left',
    width: 100,
    align: 'center',
  },
  {
    title: '入库数量(袋)',
    field: 'name',
    width: 150,
    showOverflow: 'tooltip',
    fixed: 'left',
  },
  {
    title: '入库重量(kg)',
    field: 'address',
  },
  // {
  //   title: '出库数量(袋)',
  //   field: 'no',
  // },
  // {
  //   title: '出库重量(kg)',
  //   field: 'no',
  // },
  // {
  //   title: '结存数量(袋)',
  //   field: 'no',
  // },
  // {
  //   title: '结存重量(kg)',
  //   field: 'no',
  // },
  // {
  //   title: '库存',
  //   field: 'no',
  // },
];

export const vxeTableFormSchema: VxeFormItemProps[] = [
  {
    field: 'field0',
    title: '采浆公司',
    itemRender: {
      name: 'ASelect',
    },
    titleClassName: '!mr-6',
    className: '!mr-6',
    span: 5,
  },
  {
    field: 'field1',
    title: '血浆出库类型',
    className: '!mr-6',
    itemRender: {
      name: 'ASelect',
    },
    span: 5,
  },
  {
    field: 'field2',
    title: '接收日期',
    className: '!mr-6',
    itemRender: {
      name: 'ARangePicker',
    },
  },
  {
    field: 'field3',
    title: '血浆批号',
    className: '!mr-6',
    itemRender: {
      name: 'AInput',
    },
    span: 5,
  },
  {
    field: 'field4',
    title: '血浆过程状态',
    className: '!mr-6',
    itemRender: {
      name: 'ASelect',
    },
    span: 5,
  },
  {
    field: 'field5',
    title: '效价类型',
    className: '!mr-6',
    itemRender: {
      name: 'ASelect',
    },
    span: 5,
  },
  {
    span: 12,
    align: 'right',
    className: '!pr-0',
    itemRender: {
      name: 'AButtonGroup',
      children: [
        {
          props: { type: 'primary', content: '查询', htmlType: 'submit' },
          attrs: { class: 'mr-2' },
        },
        { props: { type: 'default', htmlType: 'reset', content: '重置' } },
      ],
    },
  },
];
