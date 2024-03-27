import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { PlasmaOutboundTypeMap, PlasmaOutboundTypeValueEnum } from '@/enums/plasmaEnum';

export const searchFormSchemaByProd: FormSchema[] = [
  {
    field: 'mesId',
    label: '制造批号',
    component: 'Input',
  },
  {
    field: '[outStartDate, outEndDate]',
    label: '出库日期',
    component: 'RangePicker',
  },
  {
    field: '[prodAcceptStartDate, prodAcceptEndDate]',
    label: '投产接收日期',
    component: 'RangePicker',
  },
];

export const searchFormSchemaByNotProd: FormSchema[] = [
  {
    field: 'dlvNo',
    label: '申请单号',
    component: 'Input',
  },
  {
    field: 'dlvType',
    label: '出库类型',
    component: 'Select',
    componentProps: {
      options: [...PlasmaOutboundTypeMap.entries()]
        .map(([value, label]) => ({
          label,
          value,
        }))
        .filter((it) =>
          [
            PlasmaOutboundTypeValueEnum.RMT,
            PlasmaOutboundTypeValueEnum.DST,
            PlasmaOutboundTypeValueEnum.NPD,
          ].includes(it.value),
        ),
    },
  },
  {
    field: '[outStartDate, outEndDate]',
    label: '出库日期',
    component: 'RangePicker',
  },
];

export const prodERPColumns: BasicColumn[] = [
  {
    title: '血浆批号',
    dataIndex: 'erpBatchNo',
  },
  {
    title: '血浆出库类型',
    dataIndex: 'outType',
  },
  {
    title: '物料编码',
    dataIndex: 'materialNo',
  },
  {
    title: '血浆类型',
    dataIndex: 'plasmaType',
  },
  {
    title: '效价类型',
    dataIndex: 'titerType',
  },
  {
    title: '血浆总数',
    dataIndex: 'bagNum',
  },
  {
    title: '验收净重',
    dataIndex: 'verifyWeight',
  },
  {
    title: '出库日期',
    dataIndex: 'outDate',
  },
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
  },
  {
    title: '制造批号',
    dataIndex: 'mesIds',
    ellipsis: false,
  },
  {
    title: '血浆去向',
    dataIndex: 'goWhere',
  },
];

export const notProdERPColumns: BasicColumn[] = [
  {
    title: '申请单号',
    slots: { customRender: 'dlvNo' },
    dataIndex: 'dlvNo',
  },
  {
    title: '出库类型',
    dataIndex: 'outType',
  },
  {
    title: '血浆袋数',
    dataIndex: 'bagNum',
  },
  {
    title: '验收净重',
    dataIndex: 'verifyWeight',
  },
  {
    title: '申请原因',
    dataIndex: 'reason',
  },
];
