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
    title: '来浆日期',
    dataIndex: 'acceptAt',
  },
  {
    title: '验收发布日期',
    dataIndex: 'publishAt',
  },
  {
    title: '来浆总数',
    dataIndex: 'bagCount',
  },
  {
    title: '来浆总重量（g）',
    dataIndex: 'totalWeight',
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
    field: '[publishBeginAt, publishEndAt]',
    component: 'RangePicker',
    label: '验收发布日期',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: '[acceptBeginAt, acceptEndAt]',
    component: 'RangePicker',
    label: '来浆日期',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
];
