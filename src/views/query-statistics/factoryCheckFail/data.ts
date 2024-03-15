import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { useStation } from '@/hooks/common/useStation';

const { stationOptions } = useStation();
export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    width: 70,
  },
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
    width: 120,
  },

  {
    title: '报告发布日期',
    dataIndex: 'issueAt',
    format: (t) => t?.slice(0, 10),
    width: 100,
  },
  {
    title: '样本编号',
    dataIndex: 'sampleNo',
    width: 120,
  },
  {
    title: '浆员编号',
    dataIndex: 'donorNo',
    width: 120,
  },
  {
    title: '浆员姓名',
    dataIndex: 'name',
    width: 100,
  },
  {
    title: '采集日期',
    dataIndex: 'collectionAt',
    format: (t) => t?.slice(0, 10),
    width: 100,
  },
  {
    title: '不合格原因',
    dataIndex: 'cause',
    width: 160,
    ellipsis: false,
  },
  {
    title: '已销毁血浆批号',
    dataIndex: 'destroyedBatchNo',
    width: 120,
    ellipsis: false,
  },
  {
    title: '已销毁血浆编号',
    dataIndex: 'destroyedBagNo',
    width: 120,
    ellipsis: false,
  },
  {
    title: '永拒日期',
    dataIndex: 'rejectAt',
    format: (t) => t?.slice(0, 10),
    width: 100,
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
    component: 'Input',
    field: 'batchNo',
    label: '血浆批号',
  },
  {
    component: 'RangePicker',
    field: '[collectionBegin,collectionEnd]',
    label: '采集日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    component: 'RangePicker',
    field: '[releaseBegin,releaseEnd]',
    label: '验收发布日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    component: 'RangePicker',
    field: '[issueBegin,issueEnd]',
    label: '检验发布日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
];
