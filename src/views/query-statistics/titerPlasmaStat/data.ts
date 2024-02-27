import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { stationNameSearchApi } from '@/api/plasmaStore/entryPlasma';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

const serverEnumStore = useServerEnumStoreWithOut();
export const columns: BasicColumn[] = [
  {
    width: 150,
    title: '采浆公司',
    dataIndex: 'batchNo',
  },
  {
    width: 150,
    title: '来浆类型',
    dataIndex: 'stationName',
  },

  {
    width: 150,
    title: '血浆数量(袋)',
    dataIndex: 'stationBoxNo',
  },
  {
    width: 150,
    title: '高效价',
    dataIndex: 'currBoxNo',
    children: [
      {
        width: 150,
        title: '数量',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 180,
        title: '检测合格数量(袋)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 180,
        title: '检测合格验收净重(kg)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 180,
        title: '检疫期合格数量(袋)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 180,
        title: '检疫期合格验收净重(kg)',
        dataIndex: 'currBoxNo',
      },
    ],
  },
  {
    width: 150,
    title: '低效价',
    dataIndex: 'currBoxNo',
    children: [
      {
        width: 150,
        title: '数量',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 180,
        title: '检测合格数量(袋)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 180,
        title: '检测合格验收净重(kg)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 180,
        title: '检疫期合格数量(袋)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 180,
        title: '检疫期合格验收净重(kg)',
        dataIndex: 'currBoxNo',
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
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 180,
        title: '检测合格数量(袋)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 180,
        title: '检测合格验收净重(kg)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 180,
        title: '检疫期合格数量(袋)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 180,
        title: '检疫期合格验收净重(kg)',
        dataIndex: 'currBoxNo',
      },
    ],
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: '',
    component: 'ApiSelect',
    label: '采浆公司',
    componentProps: {
      api: stationNameSearchApi,
      labelField: 'stationName',
      valueField: 'stationName',
    },
  },
  {
    field: '',
    component: 'Select',
    label: '来浆类型',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.ImmType),
    },
  },
  {
    field: '',
    component: 'RangePicker',
    label: '采集日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: '',
    component: 'RangePicker',
    label: '检测发布日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
];
