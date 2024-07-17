import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { useStation } from '@/hooks/common/useStation';

const { stationOptions } = useStation();
export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    sorter: true,
    width: 100,
  },
  {
    title: '样本批号',
    dataIndex: 'sampleBatchNo',
    sorter: true,
    width: 120,
    ellipsis: false,
  },

  {
    title: '回访样本数量',
    dataIndex: 'sampleNum',
    width: 110,
  },
  {
    title: '检测结果审核人',
    dataIndex: 'reviewer',
    width: 110,
  },
  {
    title: '接收日期',
    dataIndex: 'receiveDate',
    width: 100,
  },
  {
    title: '采集日期起止',
    dataIndex: 'collectDateString',
    width: 220,
  },
  {
    title: '检测结果发布人',
    dataIndex: 'issueBy',
    width: 130,
  },
  {
    title: '检测结果发布日期',
    dataIndex: 'issueDate',
    width: 130,
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
    field: 'sampleBatchNo',
    component: 'Input',
    label: '样本批号',
  },
  {
    field: '[sampleReceiveStartDate, sampleReceiveEndDate]',
    component: 'RangePicker',
    label: '样本接收日期',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
];
