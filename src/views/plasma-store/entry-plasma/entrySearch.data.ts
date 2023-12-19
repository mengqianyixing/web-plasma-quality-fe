// import { FormProps, FormSchema, BasicColumn } from '@/components/Table';
import { VxeFormItemProps, VxeGridPropTypes } from '@/components/VxeTable';

export const vxeTableColumns: VxeGridPropTypes.Columns = [
  {
    title: '采浆公司',
    type: 'seq',
    fixed: 'left',
    align: 'center',
  },
  {
    title: '血浆批号',
    field: '',
    showOverflow: 'tooltip',
    align: 'center',
  },
  {
    title: '采集开始日期',
    field: '',
    align: 'center',
  },
  {
    title: '采集结束日期',
    field: '',
    align: 'center',
  },
  {
    title: '浆站出库日期',
    field: '',
    align: 'center',
  },
  {
    title: '出库数量(袋)',
    field: '',
    align: 'center',
  },
  {
    title: '出库重量(kg)',
    field: '',
    align: 'center',
  },
  {
    title: '接收日期',
    field: '',
    align: 'center',
  },
  {
    title: '验收发布人',
    field: '',
    align: 'center',
  },
  {
    title: '验收数量(袋)',
    field: '',
    align: 'center',
  },
  {
    title: '验收重量(kg)',
    field: '',
    align: 'center',
  },
  {
    title: '差异数量(袋)',
    field: '',
    align: 'center',
  },
  {
    title: '差异重量(kg)',
    field: '',
    align: 'center',
  },
  {
    title: '验收合格数量(袋)',
    field: '',
    align: 'center',
  },
  {
    title: '验收不合格数量(袋)',
    field: '',
    align: 'center',
  },
  {
    title: '不足量数量(袋)',
    field: '',
    align: 'center',
  },
];

export const vxeTableFormSchema: VxeFormItemProps[] = [
  {
    field: 'field0',
    title: '采浆公司',
    itemRender: {
      name: 'ASelect',
    },
    titleClassName: '!mr-4',
    className: '!mr-5.5',
    span: 4,
  },
  {
    field: 'field1',
    title: '血浆批号',
    className: '!mr-5.5',
    itemRender: {
      name: 'AInput',
    },
    span: 5,
  },
  {
    field: 'field2',
    title: '接收日期',
    className: '!mr-5.5',
    itemRender: {
      name: 'ARangePicker',
    },
    span: 6,
  },
  {
    field: 'field3',
    title: '验收日期',
    className: '!mr-5.5',
    itemRender: {
      name: 'ARangePicker',
    },
    span: 6,
  },
  {
    // span: 12,
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
