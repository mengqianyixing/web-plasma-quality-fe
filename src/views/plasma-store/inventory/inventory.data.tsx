// import { FormProps, FormSchema, BasicColumn } from '@/components/Table';
import { VxeFormItemProps, VxeGridPropTypes } from '@/components/VxeTable';

export const vxeTableColumns: VxeGridPropTypes.Columns = [
  {
    type: 'seq',
    title: '序号',
    width: 80,
  },
  {
    title: '采浆公司',
    field: 'stationNo',
    width: 100,
    align: 'center',
  },
  {
    title: '入库数量(袋)',
    field: 'inNum',
    width: 150,
    showOverflow: 'tooltip',
  },
  {
    title: '入库重量(kg)',
    field: 'inWeight',
  },
  {
    title: '出库数量(袋)',
    field: 'outNum',
  },
  {
    title: '出库重量(kg)',
    field: 'outWeight',
  },
  {
    title: '结存数量(袋)',
    field: 'surplusNum',
  },
  {
    title: '结存重量(kg)',
    field: 'surplusWeight',
  },
  {
    title: '库存',
    field: 'bankNo',
  },
];

export const vxeTableFormSchema: VxeFormItemProps[] = [
  {
    field: 'stationNo',
    title: '采浆公司',
    span: 5,
    itemRender: { name: '$input', props: { placeholder: '请输入' } },
  },
  {
    field: 'field',
    title: '血浆出库类型',
    span: 5,
    itemRender: {
      name: '$select',
      options: [
        { value: '1', label: '男' },
        { value: '0', label: '女' },
      ],
      props: {
        clearable: true,
        placeholder: '请选择',
      },
    },
  },
  {
    field: 'receiptDate',
    title: '接收日期',
    span: 8,
    slots: {
      default: 'receiptDate',
    },
  },
  {
    field: 'batchNo',
    title: '血浆批号',
    span: 5,
    folding: true,
    itemRender: { name: '$input', props: { placeholder: '请输入' } },
  },
  {
    field: 'filed',
    title: '血浆过程状态',
    span: 5,
    folding: true,
    itemRender: {
      name: '$select',
      options: [],
      props: {
        clearable: true,
        placeholder: '请选择',
      },
    },
  },
  {
    field: 'immuneType',
    title: '效价类型',
    span: 5,
    itemRender: {
      name: '$select',
      options: [],
      props: {
        clearable: true,
        placeholder: '请选择',
      },
    },
  },
  {
    span: 12,
    align: 'right',
    collapseNode: true,
    itemRender: {
      name: '$buttons',
      children: [
        { props: { type: 'submit', content: '确定', status: 'primary' } },
        {
          props: { type: 'reset', content: '重置' },
          events: {
            click: (params: any) => {
              delete params.data.receiptDate;
            },
          },
        },
      ],
    },
  },
];
