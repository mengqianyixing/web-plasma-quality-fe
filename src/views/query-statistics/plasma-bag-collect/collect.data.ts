import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { useStation } from '@/hooks/common/useStation';

const { stationOptions } = useStation();

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    width: 150,
  },
  {
    title: '采集数量（袋）',
    dataIndex: 'bagCollectCount',
    width: 150,
  },
  {
    title: '已接收血浆数量（袋）',
    dataIndex: 'bagAcceptCount',
    width: 150,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'stationNo',
    label: '采浆公司',
    component: 'Select',
    componentProps: {
      options: stationOptions,
    },
  },
  {
    field: '[collectBeginAt, collectEndAt]',
    label: '采集时间',
    component: 'RangePicker',
  },
];
