import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
import { useStation } from '@/hooks/common/useStation';

const { stationOptions } = useStation();
const serverEnumStore = useServerEnumStoreWithOut();
export const dateKey = [
  'verificationBegin',
  'verificationEnd',
  'collectionBegin',
  'collectionEnd',
  'issueBegin',
  'issueEnd',
];
export const columns = [
  {
    width: 90,
    title: '采浆公司',
    align: 'center',
    field: 'stationName',
    slot: 'stationName',
    fixed: 'left',
  },
  {
    width: 130,
    title: '血浆批号',
    align: 'center',
    field: 'batchNo',
    fixed: 'left',
  },

  {
    width: 100,
    title: '采浆量(g)',
    align: 'center',
    field: 'weight',
    fixed: 'left',
  },
  {
    width: 120,
    title: '血浆数量(袋)',
    align: 'center',
    field: 'bagCount',
    fixed: 'left',
  },
  {
    title: '乙免血浆',
    align: 'center',
    children: [
      {
        width: 100,
        title: '来浆数量',
        align: 'center',
        field: 'B.bagCount',
      },
      {
        width: 120,
        title: '试剂批号',
        align: 'center',
        field: 'B.reagentBatch',
      },
      {
        width: 70,
        title: '合计',
        align: 'center',
        field: 'B.count',
      },
      {
        width: 80,
        title: '高效价',
        align: 'center',
        field: 'B.hTiter',
        slots: { default: 'BH' },
      },
      {
        width: 90,
        title: '比率(%)',
        align: 'center',
        field: 'B.hRatio',
        formatter: ({ row }) => Number(((row.B.hRatio || 0) * 100).toFixed(2)),
      },
      {
        width: 80,
        title: '低效价',
        align: 'center',
        field: 'B.lTiter',
        slots: { default: 'BL' },
      },
      {
        width: 90,
        title: '比率(%)',
        align: 'center',
        field: 'B.lRatio',
        formatter: ({ row }) => Number(((row.B.lRatio || 0) * 100).toFixed(2)),
      },
      {
        width: 80,
        title: '普通',
        align: 'center',
        field: 'B.nTiter',
        slots: { default: 'BN' },
      },
      {
        width: 90,
        title: '比率(%)',
        align: 'center',
        field: 'B.nRatio',
        formatter: ({ row }) => Number(((row.B.nRatio || 0) * 100).toFixed(2)),
      },
    ],
  },
  {
    title: '狂免血浆',
    align: 'center',
    children: [
      {
        width: 80,
        title: '来浆数量',
        align: 'center',
        field: 'R.bagCount',
      },
      {
        width: 120,
        title: '试剂批号',
        align: 'center',
        field: 'R.reagentBatch',
        ellipsis: false,
      },
      {
        width: 70,
        title: '合计',
        align: 'center',
        field: 'R.count',
      },
      {
        width: 80,
        title: '高效价',
        align: 'center',
        field: 'R.hTiter',
        slots: { default: 'RH' },
      },
      {
        width: 80,
        title: '比率(%)',
        align: 'center',
        field: 'R.hRatio',
        formatter: ({ row }) => Number(((row.R.hRatio || 0) * 100).toFixed(2)),
      },
      {
        width: 80,
        title: '低效价',
        align: 'center',
        field: 'R.lTiter',
        slots: { default: 'RL' },
      },
      {
        width: 80,
        title: '比率(%)',
        align: 'center',
        field: 'R.lRatio',
        formatter: ({ row }) => Number(((row.R.lRatio || 0) * 100).toFixed(2)),
      },
      {
        width: 80,
        title: '普通',
        align: 'center',
        field: 'R.nTiter',
        slots: { default: 'RN' },
      },
      {
        width: 80,
        title: '比率(%)',
        align: 'center',
        field: 'R.nRatio',
        formatter: ({ row }) => Number(((row.R.nRatio || 0) * 100).toFixed(2)),
      },
    ],
  },
  {
    width: 150,
    title: '破免血浆',
    align: 'center',
    children: [
      {
        width: 80,
        title: '来浆数量',
        align: 'center',
        field: 'T.bagCount',
      },
      {
        width: 120,
        title: '试剂批号',
        align: 'center',
        field: 'T.reagentBatch',
        ellipsis: false,
      },
      {
        width: 80,
        title: '合计',
        align: 'center',
        field: 'T.count',
      },
      {
        width: 80,
        title: '高效价',
        align: 'center',
        field: 'T.hTiter',
        slots: { default: 'TH' },
      },
      {
        width: 80,
        title: '比率(%)',
        align: 'center',
        field: 'T.hRatio',
        formatter: ({ row }) => Number(((row.T.hRatio || 0) * 100).toFixed(2)),
      },
      {
        width: 80,
        title: '低效价',
        align: 'center',
        field: 'T.lTiter',
        slots: { default: 'TL' },
      },
      {
        width: 80,
        title: '比率(%)',
        align: 'center',
        field: 'T.lRatio',
        formatter: ({ row }) => Number(((row.T.lRatio || 0) * 100).toFixed(2)),
      },
      {
        width: 80,
        title: '普通',
        align: 'center',
        field: 'T.nTiter',
        slots: { default: 'TN' },
      },
      {
        width: 80,
        title: '比率(%)',
        align: 'center',
        field: 'T.nRatio',
        formatter: ({ row }) => Number(((row.T.nRatio || 0) * 100).toFixed(2)),
      },
    ],
  },
  {
    title: '巨细胞血浆',
    align: 'center',
    children: [
      {
        width: 80,
        title: '来浆数量',
        align: 'center',
        field: 'C.bagCount',
      },
      {
        width: 80,
        title: '合计',
        align: 'center',
        field: 'C.count',
      },
      {
        width: 80,
        title: '高效价',
        align: 'center',
        field: 'C.hTiter',
        slots: { default: 'CH' },
      },
      {
        width: 80,
        title: '比率(%)',
        align: 'center',
        field: 'C.hRatio',
        formatter: ({ row }) => Number(((row.C.hRatio || 0) * 100).toFixed(2)),
      },
      {
        width: 80,
        title: '低效价',
        align: 'center',
        field: 'C.lTiter',
        slots: { default: 'CL' },
      },
      {
        width: 80,
        title: '比率(%)',
        align: 'center',
        field: 'C.lRatio',
        formatter: ({ row }) => Number(((row.C.lRatio || 0) * 100).toFixed(2)),
      },
      {
        width: 80,
        title: '普通',
        align: 'center',
        field: 'C.nTiter',
        slots: { default: 'CN' },
      },
      {
        width: 80,
        title: '比率(%)',
        align: 'center',
        field: 'C.nRatio',
        formatter: ({ row }) => Number(((row.C.nRatio || 0) * 100).toFixed(2)),
      },
    ],
  },
  {
    width: 80,
    title: '普通血浆',
    align: 'center',
    children: [
      {
        width: 80,
        title: '来浆数量',
        align: 'center',
        field: 'N.bagCount',
      },
      {
        width: 80,
        title: '合计',
        align: 'center',
        field: 'N.count',
      },
      {
        width: 80,
        title: '高效价',
        align: 'center',
        field: 'N.hTiter',
        slots: { default: 'NH' },
      },
      {
        width: 80,
        title: '比率(%)',
        align: 'center',
        field: 'N.hRatio',
        formatter: ({ row }) => Number(((row.N.hRatio || 0) * 100).toFixed(2)),
      },
      {
        width: 80,
        title: '低效价',
        align: 'center',
        field: 'N.lTiter',
        slots: { default: 'NL' },
      },
      {
        width: 80,
        title: '比率(%)',
        align: 'center',
        field: 'N.lRatio',
        formatter: ({ row }) => Number(((row.N.lRatio || 0) * 100).toFixed(2)),
      },
      {
        width: 80,
        title: '普通',
        align: 'center',
        field: 'N.nTiter',
        slots: { default: 'NN' },
      },
      {
        width: 80,
        title: '比率(%)',
        align: 'center',
        field: 'N.nRatio',
        formatter: ({ row }) => Number(((row.N.nRatio || 0) * 100).toFixed(2)),
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
    field: '[' + dateKey[0] + ',' + dateKey[1] + ']',
    component: 'RangePicker',
    label: '验收发布日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: '[' + dateKey[2] + ',' + dateKey[3] + ']',
    component: 'RangePicker',
    label: '采集日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: 'reagentBatch',
    component: 'Input',
    label: '试剂批号',
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
    field: 'immunity',
    component: 'Select',
    label: '特免检测项目',
    componentProps: {
      options: serverEnumStore
        .getServerEnum(SERVER_ENUM.PlasmaType)
        .filter((it) => it.value !== 'N'),
    },
  },
  {
    field: '[titerBegin,titerEnd]',
    component: 'InputRange',
    label: '效价值',
  },
  {
    field: '[' + dateKey[4] + ',' + dateKey[5] + ']',
    component: 'RangePicker',
    label: '检测发布日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: '[batchBegin,batchEnd]',
    component: 'InputRange',
    label: '血浆批号',
    componentProps: {
      isBetween: false,
      allowClear: false,
    },
    colProps: { flex: '0 0 440px' },
  },
];

export const dtColumns: BasicColumn[] = [
  {
    dataIndex: 'cardNo',
    title: '浆员编号',
  },
  {
    dataIndex: 'name',
    title: '浆员姓名',
  },
  {
    dataIndex: 'bagNo',
    title: '血浆编号',
  },
  {
    dataIndex: 'titerValue',
    title: '效价值',
  },
  {
    dataIndex: 'collectionAt',
    title: '血浆采集日期',
  },
];
