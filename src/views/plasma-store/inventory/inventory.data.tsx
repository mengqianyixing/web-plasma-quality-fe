import { VxeGridPropTypes } from '@/components/VxeTable';
import { FormSchema } from '@/components/Form';

export const vxeTableColumns: VxeGridPropTypes.Columns = [
  {
    type: 'seq',
    title: '序号',
    width: 80,
  },
  {
    title: '采浆公司',
    field: 'stationNo',
    width: 150,
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
    title: '库房',
    field: 'bankNo',
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '采浆公司',
    field: 'stationNo',
    component: 'Select',
    colProps: {
      span: 5,
    },
  },
  {
    label: '血浆出库类型',
    field: 'field',
    component: 'Select',
    colProps: {
      span: 5,
    },
  },
  {
    label: '接收日期',
    field: '[receiptStartDate, receiptEndDate]',
    component: 'RangePicker',
    colProps: {
      span: 8,
    },
  },
  {
    label: '血浆批号',
    field: 'batchNo',
    component: 'Input',
    colProps: {
      span: 5,
    },
  },
  {
    label: '血浆过程状态',
    field: 'filed',
    component: 'Select',
    colProps: {
      span: 5,
    },
  },
  {
    label: '效价类型',
    field: 'immuneType',
    component: 'Select',
    colProps: {
      span: 5,
    },
  },
];
