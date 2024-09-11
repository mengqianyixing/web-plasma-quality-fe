import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { useStation } from '@/hooks/common/useStation';

const { stationOptions } = useStation();
export const getClass = (value) => {
  if (value < 30) return 'red';
  else if (value < 60) return 'orange';
  else if (value < 90) return 'yellow';
  else if (value < 180) return 'blue';
};
export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
  },
  {
    title: '血浆编号',
    dataIndex: 'bagNo',
  },
  {
    title: '采集日期',
    dataIndex: 'collectDate',
  },
  {
    title: '有效期至',
    dataIndex: 'expirateDate',
  },
  {
    title: '预警时限',
    dataIndex: 'warnLimitDay',
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
    field: 'bagNo',
    component: 'Input',
    label: '血浆编号',
  },
  {
    field: 'warnLimitDay',
    component: 'Select',
    label: '预警时限',
    defaultValue: '180',
    required: true,
    componentProps: {
      allowClear: false,
      options: [
        { label: '30天', value: '30' },
        { label: '60天', value: '60' },
        { label: '90天', value: '90' },
        { label: '180天', value: '180' },
      ],
    },
  },
  {
    field: '[expirateBeiginDate,expirateEndDate]',
    component: 'RangePicker',
    label: '有效期至',
  },
];
