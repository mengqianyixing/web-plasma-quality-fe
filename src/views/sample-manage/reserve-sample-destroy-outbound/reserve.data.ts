import { BasicColumn, FormSchema } from '@/components/Table';
import { VxeGridPropTypes } from '@/components/VxeTable';

export const columns: BasicColumn[] = [
  {
    title: '申请单号',
    dataIndex: 'dlvNo',
    slots: { customRender: 'dlvNo' },
    ellipsis: false,
    width: 180,
  },
  {
    title: '批次数量',
    dataIndex: 'batchNum',
    width: 80,
  },
  {
    title: '样本袋数',
    dataIndex: 'sampleNum',
    width: 80,
  },
  {
    title: '血浆最晚投产日期',
    dataIndex: 'bagLatestProdDate',
    width: 100,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 180,
    ellipsis: false,
  },
  {
    title: '申请人',
    dataIndex: 'applyBy',
    width: 80,
  },
  {
    title: '申请日期',
    dataIndex: 'applyDate',
    width: 100,
  },
  {
    title: '审核人',
    dataIndex: 'reviewer',
    width: 80,
  },
  {
    title: '审核日期',
    dataIndex: 'reviewDate',
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'state',
    width: 80,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'dlvNO',
    component: 'Input',
    label: '申请单号',
  },
  {
    field: '[applyStartDate, applyEndDate]',
    component: 'RangePicker',
    label: '申请日期',
  },
  {
    field: 'state',
    component: 'ApiSelect',
    label: '状态',
  },
];

export const requisitionColumns: VxeGridPropTypes.Columns = [
  {
    type: 'checkbox',
    width: 50,
  },
  {
    type: 'seq',
    title: '序号',
    width: 80,
  },
  {
    title: '采浆公司',
    field: 'stationName',
  },
  {
    title: '样本批号',
    field: 'batchNo',
  },
  {
    title: '样本袋数',
    field: 'sampleBagNum',
  },
  {
    title: '样本数量',
    field: 'sampleNum',
  },
  {
    title: '血浆最晚投产日期',
    field: 'bagLatestProdDate',
  },
];
