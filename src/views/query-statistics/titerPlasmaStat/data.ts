import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
import { formatKg } from '@/utils';
import { useStation } from '@/hooks/common/useStation';

const { stationOptions } = useStation();
const serverEnumStore = useServerEnumStoreWithOut();
const ImmType = serverEnumStore.getServerEnumText(SERVER_ENUM.ImmType);
export const columns: BasicColumn[] = [
  {
    width: 150,
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    width: 150,
    title: '来浆类型',
    dataIndex: 'rawImm',
    format: (t) => ImmType(t),
  },

  {
    width: 150,
    title: '血浆数量(袋)',
    dataIndex: 'bagCount',
  },
  {
    width: 150,
    title: '高效价',
    children: [
      {
        width: 150,
        title: '数量',
        dataIndex: ['H', 'bagCount'],
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: ['H', 'ratio'],
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
      },
      {
        width: 180,
        title: '检测合格数量(袋)',
        dataIndex: ['H', 'checkPassCount'],
      },
      {
        width: 180,
        title: '检测合格验收净重(kg)',
        dataIndex: ['H', 'checkPassWeight'],
        format: formatKg,
      },
      {
        width: 180,
        title: '检疫期合格数量(袋)',
        dataIndex: ['H', 'passCount'],
      },
      {
        width: 180,
        title: '检疫期合格验收净重(kg)',
        dataIndex: ['H', 'passWeight'],
        format: formatKg,
      },
    ],
  },
  {
    width: 150,
    title: '低效价',
    children: [
      {
        width: 150,
        title: '数量',
        dataIndex: ['L', 'bagCount'],
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: ['L', 'ratio'],
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
      },
      {
        width: 180,
        title: '检测合格数量(袋)',
        dataIndex: ['L', 'checkPassCount'],
      },
      {
        width: 180,
        title: '检测合格验收净重(kg)',
        dataIndex: ['L', 'checkPassWeight'],
        format: formatKg,
      },
      {
        width: 180,
        title: '检疫期合格数量(袋)',
        dataIndex: ['L', 'passCount'],
      },
      {
        width: 180,
        title: '检疫期合格验收净重(kg)',
        dataIndex: ['L', 'passWeight'],
        format: formatKg,
      },
    ],
  },
  {
    width: 150,
    title: '普通',
    dataIndex: 'currBoxNo',
    children: [
      {
        width: 150,
        title: '数量',
        dataIndex: ['N', 'bagCount'],
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: ['N', 'ratio'],
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
      },
      {
        width: 180,
        title: '检测合格数量(袋)',
        dataIndex: ['N', 'checkPassCount'],
      },
      {
        width: 180,
        title: '检测合格验收净重(kg)',
        dataIndex: ['N', 'checkPassWeight'],
        format: formatKg,
      },
      {
        width: 180,
        title: '检疫期合格数量(袋)',
        dataIndex: ['N', 'passCount'],
      },
      {
        width: 180,
        title: '检疫期合格验收净重(kg)',
        dataIndex: ['N', 'passWeight'],
        format: formatKg,
      },
    ],
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
    field: 'rawImm',
    component: 'Select',
    label: '来浆类型',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.ImmType),
    },
  },
  {
    field: '[collectionBegin,collectionEnd]',
    component: 'RangePicker',
    label: '采集日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: '[issueBegin,issueEnd]',
    component: 'RangePicker',
    label: '检测发布日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
];
