import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { useStation } from '@/hooks/common/useStation';

const { stationOptions } = useStation();
export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    title: '应回访人次',
    dataIndex: 'totalNum',
  },

  {
    title: '恢复采浆人次',
    dataIndex: 'recoverNum',
  },
  {
    title: '回访样本数',
    dataIndex: 'sampleNum',
  },
  {
    title: '回访失败人次',
    dataIndex: 'failedNum',
  },
  {
    title: '终止回访人次',
    dataIndex: 'endNum',
  },
  {
    title: '回访率',
    dataIndex: 'callbackRate',
  },
  {
    title: '放行血浆数量',
    dataIndex: 'passPlasmaNum',
  },
  {
    title: '可放行血浆数量',
    dataIndex: 'canPassPlasmaNum',
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
    field: '[pubStartDate, pubEndDate]',
    component: 'RangePicker',
    label: '回访发布日期',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: '[callbackStartDate, callbackEndDate]',
    component: 'RangePicker',
    label: '回访日期',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: '[samplePubStartDate, samplePubEndDate]',
    component: 'RangePicker',
    label: '回访样本检测日期',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
];
