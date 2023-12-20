// import { FormProps, FormSchema, BasicColumn } from '@/components/Table';
import { BasicColumn, FormSchema } from '@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationNo',
  },
  {
    title: '血浆批号',
    slots: { customRender: 'houseName' },
  },
  {
    title: '采集开始日期',
    dataIndex: 'collectStartDate',
  },
  {
    title: '采集结束日期',
    dataIndex: 'collectEndDate',
  },
  {
    title: '浆站出库日期',
    dataIndex: 'stationOutDate',
  },
  {
    title: '出库数量(袋)',
    dataIndex: 'outNum',
  },
  {
    title: '出库总净重(kg)',
    dataIndex: 'outWeight',
  },
  {
    title: '接收日期',
    dataIndex: 'receptDate',
  },
  {
    title: '验收发布人',
    dataIndex: 'verifyPuber',
  },
  {
    title: '验收发布日期',
    dataIndex: 'verifyPubDate',
  },
  {
    title: '验收数量(袋)',
    dataIndex: 'verifyNum',
  },
  {
    title: '验收总净重(kg)',
    dataIndex: 'verifyWeight',
  },
  {
    title: '差异数量(袋)',
    dataIndex: 'diffNum',
  },
  {
    title: '差异总净重(kg)',
    dataIndex: 'diffWeight',
  },
  {
    title: '验收合格数量(袋)',
    dataIndex: 'verifyPassNum',
  },
  {
    title: '验收不合格数量(袋)',
    dataIndex: 'verifyNoPassNum',
  },
  {
    title: '不足量数量(袋)',
    dataIndex: 'hortFallNum',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '采浆公司',
    component: 'Select',
    field: '',
    colProps: { span: 5 },
  },
  {
    label: '血浆批次',
    component: 'Input',
    field: '',
    colProps: { span: 5 },
  },
  {
    label: '接收日期',
    component: 'RangePicker',
    field: '',
    colProps: { span: 6 },
  },
  {
    label: '验收日期',
    component: 'RangePicker',
    field: '',
    colProps: { span: 6 },
  },
];
