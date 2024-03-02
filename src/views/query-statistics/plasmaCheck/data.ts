import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { stationNameSearchApi } from '@/api/plasmaStore/entryPlasma';
import { getDilutionTypeApi } from '@/api/plasmaStore/inventory';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

const serverEnumStore = useServerEnumStoreWithOut();
const PlasmaType = serverEnumStore.getServerEnumText(SERVER_ENUM.PlasmaType);
const ConclusionType = serverEnumStore.getServerEnumText(SERVER_ENUM.ConclusionType);

export const exteriorKey = 'exterior';
export const checkUnKey = 'checkUn';
export const checkKey = 'check';
export const bagCountKey = 'bagCount';
export const numKey = 'num';
export const ratioKey = 'ratio';

export const checkColumns: BasicColumn[] = [
  {
    width: 150,
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    width: 250,
    title: '血浆批号',
    dataIndex: 'batch',
  },

  {
    width: 150,
    title: '批次数量(批)',
    dataIndex: 'batchCount',
  },
  {
    width: 150,
    title: '血浆数量(袋)',
    dataIndex: bagCountKey,
  },
  {
    width: 150,
    title: '检测合格',
    children: [
      {
        width: 150,
        title: '合格数量',
        dataIndex: [checkKey, numKey],
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: [checkKey, ratioKey],
        format: (t: any) => (t ? (t * 100).toFixed(2) : '0'),
      },
    ],
  },
  {
    width: 150,
    title: '外观验收不合格',
    children: [
      {
        width: 150,
        title: '合计',
        dataIndex: [exteriorKey, numKey],
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: [exteriorKey, ratioKey],
        format: (t: any) => (t ? (t * 100).toFixed(2) : '0'),
      },
    ],
  },
  {
    width: 150,
    title: '检测不合格',
    children: [
      {
        width: 150,
        title: '合计',
        dataIndex: [checkUnKey, numKey],
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: [checkUnKey, ratioKey],
        format: (t: any) => (t ? (t * 100).toFixed(2) : '0'),
      },
    ],
  },
  {
    width: 150,
    title: '其他血浆不合格',
    dataIndex: '',
  },
];

export const titerColumns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    title: '来浆类型',
    dataIndex: 'rawImm',
    format: (text) => PlasmaType(text),
  },
  {
    title: '来浆总数量',
    dataIndex: 'bagCount',
  },
  {
    title: '效价类型',
    dataIndex: 'titerTypes',
    ellipsis: false,
    format: (text) =>
      (text || '')
        .split(',')
        .map((it) => ConclusionType(it))
        .join(',') || text,
  },
  {
    title: '效价数量',
    dataIndex: 'titerCount',
  },
  {
    title: '比率(%)',
    dataIndex: 'ratio',
    format: (t: any) => (t ? (t * 100).toFixed(2) : '0'),
  },
];
export const followUpColumns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    width: 150,
  },
  {
    title: '血浆批号',
    dataIndex: 'batch',
    width: 250,
  },
  {
    title: '血浆数量(袋)',
    dataIndex: 'bagCount',
    width: 150,
  },
  {
    title: '首次续追踪',
    children: [
      {
        title: '数量',
        dataIndex: 'sTrack',
        width: 150,
      },
      {
        title: '比率(%)',
        dataIndex: 'sRatio',
        width: 150,
        format: (t: any) => (t ? (t * 100).toFixed(2) : '0'),
      },
    ],
  },
  {
    title: '反复续追踪',
    children: [
      {
        title: '数量',
        width: 150,
        dataIndex: 'fTrack',
      },
      {
        title: '比率(%)',
        dataIndex: 'fRatio',
        width: 150,
        format: (t: any) => (t ? (t * 100).toFixed(2) : '0'),
      },
    ],
  },
  {
    title: '合计',
    width: 150,
    dataIndex: 'count',
  },
  {
    title: '比率(%)',
    dataIndex: 'ratio',
    width: 150,
    format: (t: any) => (t ? (t * 100).toFixed(2) : '0'),
  },
];
export const searchFormSchema: FormSchema[] = [
  {
    field: 'stationNo',
    component: 'ApiSelect',
    label: '采浆公司',
    componentProps: {
      api: stationNameSearchApi,
      labelField: 'stationName',
      valueField: 'stationNo',
    },
  },
  {
    field: '[batchNoBegin, batchNoEnd]',
    component: 'InputRange',
    label: '血浆批号',
    componentProps: {
      isBetween: false,
    },
  },
  {
    field: '[verificationBegin,verificationEnd]',
    component: 'RangePicker',
    label: '验收发布日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: '[acceptBegin,acceptEnd]',
    component: 'RangePicker',
    label: '接收日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: 'rawImm',
    component: 'Select',
    label: '来浆类型',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.PlasmaType),
    },
  },
  {
    field: 'plasmaType',
    component: 'Select',
    label: '血浆类型',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.PlasmaType),
    },
  },
  {
    field: 'titerType',
    component: 'ApiSelect',
    label: '效价类型',
    componentProps: {
      api: getDilutionTypeApi,
      labelField: 'key',
      valueField: 'value',
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
