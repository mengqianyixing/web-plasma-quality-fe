import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { stationNameSearchApi } from '@/api/plasmaStore/entryPlasma';
import { getDilutionTypeApi } from '@/api/plasmaStore/inventory';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

const serverEnumStore = useServerEnumStoreWithOut();
export const checkColumns: BasicColumn[] = [
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
    title: '批次数量(批)',
    dataIndex: 'stationBoxNo',
  },
  {
    width: 150,
    title: '血浆数量(袋)',
    dataIndex: 'currBoxNo',
  },
  {
    width: 150,
    title: '检测合格',
    children: [
      {
        width: 150,
        title: '合格数量',
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
    title: '外观验收不合格',
    children: [
      {
        width: 150,
        title: '合格数量',
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
    title: '检测不合格',
    children: [
      {
        width: 150,
        title: '合格数量',
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
    title: '其他血浆不合格',
    children: [
      {
        width: 150,
        title: '合格数量',
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

export const titerColumns: BasicColumn[] = [
  {
    dataIndex: '采浆公司',
    title: '',
  },
  {
    dataIndex: '来浆类型',
    title: '',
  },
  {
    dataIndex: '来浆总数量',
    title: '',
  },
  {
    dataIndex: '效价类型',
    title: '',
  },
  {
    dataIndex: '效价数量',
    title: '',
  },
  {
    dataIndex: '比率(%)',
    title: '',
  },
];
export const followUpColumns: BasicColumn[] = [
  {
    dataIndex: '采浆公司',
    title: '',
  },
  {
    dataIndex: '血浆批号',
    title: '',
  },
  {
    dataIndex: '血浆数量(袋)',
    title: '',
  },
  {
    dataIndex: '首次续追踪',
    children: [
      {
        dataIndex: '数量',
        title: '',
      },
      {
        dataIndex: '比率(%)',
        title: '',
      },
    ],
  },
  {
    dataIndex: '反复续追踪',
    children: [
      {
        dataIndex: '数量',
        title: '',
      },
      {
        dataIndex: '比率(%)',
        title: '',
      },
    ],
  },
  {
    dataIndex: '合计',
    title: '',
  },
  {
    dataIndex: '比率(%)',
    title: '',
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
    label: '接收日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
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
    component: 'Select',
    label: '血浆类型',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.ImmType),
    },
  },
  {
    field: '',
    component: 'ApiSelect',
    label: '效价类型',
    componentProps: {
      api: getDilutionTypeApi,
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
