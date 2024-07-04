import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { useStation } from '@/hooks/common/useStation';

const { stationOptions } = useStation();
export const columns: BasicColumn[] = [
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
  },
  {
    title: '血浆批号（ERP）',
    dataIndex: 'batchNoFromErp',
    width: 200,
  },
  {
    title: '血浆审核日期',
    dataIndex: 'recheckAt',
  },
  {
    title: '采集开始日期',
    dataIndex: 'collectBeginAt',
  },
  {
    title: '采集结束日期',
    dataIndex: 'collectEndAt',
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
    title: '血浆合格总数',
    dataIndex: 'totalQualified',
  },
  {
    title: '血浆验收净重（g）',
    dataIndex: 'qualifiedNetWeight',
  },
  {
    title: '不合格血浆总数',
    dataIndex: 'totalUnqualified',
    slots: { customRender: 'totalUnqualified' },
  },
  {
    title: '不合格验收净重（g）',
    dataIndex: 'unqualifiedNetWeight',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'stationNo',
    component: 'Select',
    label: '采浆公司',
    componentProps: {
      options: stationOptions,
    },
  },
  {
    field: 'batchNo',
    component: 'Input',
    label: '血浆批号',
  },
  {
    field: '[recheckBeginAt, recheckEndAt]',
    component: 'RangePicker',
    label: '血浆审核日期',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
];

export const detailColumns: BasicColumn[] = [
  {
    title: '浆员姓名',
    dataIndex: 'donorName',
  },
  {
    title: '浆员编号',
    dataIndex: 'cardNo',
  },
  {
    title: '血浆编号',
    dataIndex: 'bagNo',
  },
  {
    title: '样本编号',
    dataIndex: 'sampleNo',
  },
  {
    title: '验收净重（g）',
    dataIndex: 'netWeight',
  },
  {
    title: '效价类型',
    dataIndex: 'titerType',
  },
  {
    title: '不合格原因',
    dataIndex: 'unqualifiedReason',
  },
  {
    title: '入不合格库日期',
    dataIndex: 'inStoreTime',
  },
];
