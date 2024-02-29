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
    title: '血浆批号',
    dataIndex: 'stationName',
  },

  {
    width: 150,
    title: '采浆量',
    dataIndex: 'stationBoxNo',
  },
  {
    width: 150,
    title: '血浆数量(袋)',
    dataIndex: 'currBoxNo',
  },
  {
    width: 150,
    title: '乙免血浆',
    children: [
      {
        width: 150,
        title: '来浆数量',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '试剂批号',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '合计',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '高效价',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '低效价',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '普通',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
    ],
  },
  {
    width: 150,
    title: '狂免血浆',
    children: [
      {
        width: 150,
        title: '来浆数量',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '试剂批号',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '合计',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '高效价',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '低效价',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '普通',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
    ],
  },
  {
    width: 150,
    title: '破免血浆',
    children: [
      {
        width: 150,
        title: '来浆数量',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '试剂批号',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '合计',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '高效价',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '低效价',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '普通',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
    ],
  },
  {
    width: 150,
    title: '巨细胞血浆',
    children: [
      {
        width: 150,
        title: '来浆数量',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '合计',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '高效价',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '低效价',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '普通',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
    ],
  },
  {
    width: 150,
    title: '普通血浆',
    children: [
      {
        width: 150,
        title: '来浆数量',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '合计',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '高效价',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '低效价',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '普通',
        dataIndex: 'currBoxNo',
      },
      {
        width: 150,
        title: '比率(%)',
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
      valueField: 'stationNo',
    },
  },
  {
    field: '',
    component: 'InputRange',
    label: '血浆批号',
    componentProps: {
      isBetween: false,
    },
  },
  {
    field: '',
    component: 'RangePicker',
    label: '验收发布日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
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
    component: 'Input',
    label: '试剂批号',
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
    component: 'Select',
    label: '血浆类型',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.ImmType),
    },
  },
  {
    field: '',
    component: 'InputRange',
    label: '效价值',
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
