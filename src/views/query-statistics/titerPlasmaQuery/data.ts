import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
import { useStation } from '@/hooks/common/useStation';

const { stationOptions } = useStation();
const serverEnumStore = useServerEnumStoreWithOut();
export const columns: BasicColumn[] = [
  {
    width: 150,
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    width: 150,
    title: '血浆批号',
    dataIndex: 'batchNo',
  },

  {
    width: 150,
    title: '采浆量',
    dataIndex: 'weight',
  },
  {
    width: 150,
    title: '血浆数量(袋)',
    dataIndex: 'bagCount',
  },
  {
    width: 150,
    title: '乙免血浆',
    children: [
      {
        width: 150,
        title: '来浆数量',
        dataIndex: ['B', 'bagCount'],
      },
      {
        width: 150,
        title: '试剂批号',
        dataIndex: ['B', 'reagentBatch'],
      },
      {
        width: 150,
        title: '合计',
        dataIndex: ['B', 'count'],
      },
      {
        width: 150,
        title: '高效价',
        dataIndex: ['B', 'hTiter'],
        slots: { customRender: 'BH' },
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: ['B', 'hRatio'],
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
      },
      {
        width: 150,
        title: '低效价',
        dataIndex: ['B', 'lTiter'],
        slots: { customRender: 'BL' },
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: ['B', 'lRatio'],
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
      },
      {
        width: 150,
        title: '普通',
        dataIndex: ['B', 'nTiter'],
        slots: { customRender: 'BN' },
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: ['B', 'nRatio'],
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
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
        dataIndex: ['R', 'bagCount'],
      },
      {
        width: 150,
        title: '试剂批号',
        dataIndex: ['R', 'reagentBatch'],
      },
      {
        width: 150,
        title: '合计',
        dataIndex: ['R', 'count'],
      },
      {
        width: 150,
        title: '高效价',
        dataIndex: ['R', 'hTiter'],
        slots: { customRender: 'RH' },
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: ['R', 'hRatio'],
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
      },
      {
        width: 150,
        title: '低效价',
        dataIndex: ['R', 'lTiter'],
        slots: { customRender: 'RL' },
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: ['R', 'lRatio'],
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
      },
      {
        width: 150,
        title: '普通',
        dataIndex: ['R', 'nTiter'],
        slots: { customRender: 'RN' },
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: ['R', 'nRatio'],
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
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
        dataIndex: ['T', 'bagCount'],
      },
      {
        width: 150,
        title: '试剂批号',
        dataIndex: ['T', 'reagentBatch'],
      },
      {
        width: 150,
        title: '合计',
        dataIndex: ['T', 'count'],
      },
      {
        width: 150,
        title: '高效价',
        dataIndex: ['T', 'hTiter'],
        slots: { customRender: 'TH' },
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: ['T', 'hRatio'],
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
      },
      {
        width: 150,
        title: '低效价',
        dataIndex: ['T', 'lTiter'],
        slots: { customRender: 'TL' },
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: ['T', 'lRatio'],
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
      },
      {
        width: 150,
        title: '普通',
        dataIndex: ['T', 'nTiter'],
        slots: { customRender: 'TN' },
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: ['T', 'nRatio'],
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
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
        dataIndex: ['G', 'bagCount'],
      },
      {
        width: 150,
        title: '合计',
        dataIndex: ['G', 'count'],
      },
      {
        width: 150,
        title: '高效价',
        dataIndex: ['G', 'hTiter'],
        slots: { customRender: 'GH' },
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: ['G', 'hRatio'],
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
      },
      {
        width: 150,
        title: '低效价',
        dataIndex: ['G', 'lTiter'],
        slots: { customRender: 'GL' },
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: ['G', 'lRatio'],
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
      },
      {
        width: 150,
        title: '普通',
        dataIndex: ['G', 'nTiter'],
        slots: { customRender: 'GN' },
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: ['G', 'nRatio'],
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
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
        dataIndex: ['N', 'bagCount'],
      },
      {
        width: 150,
        title: '合计',
        dataIndex: ['N', 'count'],
      },
      {
        width: 150,
        title: '高效价',
        dataIndex: ['N', 'hTiter'],
        slots: { customRender: 'NH' },
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: ['N', 'hRatio'],
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
      },
      {
        width: 150,
        title: '低效价',
        dataIndex: ['N', 'lTiter'],
        slots: { customRender: 'NL' },
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: ['N', 'lRatio'],
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
      },
      {
        width: 150,
        title: '普通',
        dataIndex: ['N', 'nTiter'],
        slots: { customRender: 'NN' },
      },
      {
        width: 150,
        title: '比率(%)',
        dataIndex: ['N', 'nRatio'],
        format: (t: any) => Number(((t || 0) * 100).toFixed(2)),
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
    field: '[batchBegin,batchEnd]',
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
    field: '[collectionBegin,collectionEnd]',
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
      options: serverEnumStore.getServerEnum(SERVER_ENUM.ImmType),
    },
  },
  {
    field: 'immunity',
    component: 'Select',
    label: '血浆类型',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.ImmType),
    },
  },
  {
    field: '[titerBegin,titerEnd]',
    component: 'InputRange',
    label: '效价值',
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

export const dtColumns: BasicColumn[] = [
  {
    dataIndex: 'donorNo',
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
