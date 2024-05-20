import Dayjs from 'dayjs';
import { BasicColumn, FormSchema } from '@/components/Table';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
import { useStation } from '@/hooks/common/useStation';

const { stationOptions } = useStation();
const serverEnumStore = useServerEnumStoreWithOut();
const SampleMixTypeEnum = serverEnumStore.getServerEnumText(SERVER_ENUM.SampleMixTypeEnum);
export const columns: BasicColumn[] = [
  {
    title: '计划日期',
    dataIndex: 'planDate',
  },
  {
    title: '样本批号',
    dataIndex: 'batchNoes',
    slots: { customRender: 'batchNoes' },
  },

  {
    title: '样本数量',
    dataIndex: 'sampleCount',
    slots: { customRender: 'sampleCount' },
  },
  {
    title: '试管架数',
    dataIndex: 'rackCount',
  },
  {
    title: '混样方式',
    dataIndex: 'mixType',
    format: SampleMixTypeEnum,
  },
  {
    title: '计划人',
    dataIndex: 'creator',
  },
];

export const searchFormschema: FormSchema[] = [
  {
    field: '[planBeginDate,planEndDate]',
    component: 'RangePicker',
    label: '计划日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: 'mixType',
    component: 'Select',
    label: '混样方式',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.SampleMixTypeEnum),
    },
  },
  {
    field: 'batchNo',
    component: 'Input',
    label: '样本批号',
  },
];
export const formListSchema: FormSchema[] = [
  {
    field: 'planDate',
    component: 'Input',
    label: '日期',
    defaultValue: Dayjs().format('YYYY-MM-DD'),
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'mixType',
    component: 'Select',
    label: '混样方式',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.SampleMixTypeEnum),
    },
    required: true,
  },

  {
    field: 'number',
    component: 'Input',
    label: '样本数量',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'batchList',
    component: 'Select',
    label: '样本批号',
    required: true,
    slot: 'batchList',
    componentProps: {
      options: [],
      mode: 'multiple',
    },
  },
];

export const batchColumns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    width: 80,
  },
  {
    title: '样本批号',
    dataIndex: 'batchNo',
    width: 100,
  },
  {
    title: '样本类型',
    dataIndex: 'sampleType',
    width: 80,
  },
  {
    title: '浆站出库日期',
    dataIndex: 'outStationDate',
    width: 110,
    format: (v) => v?.slice(0, 10),
  },
  {
    title: '样本数量',
    dataIndex: 'sampleCount',
    width: 80,
  },
  {
    title: '接收人',
    dataIndex: 'acceptor',
    width: 80,
  },
  {
    title: '接收日期',
    dataIndex: 'acceptAt',
    width: 100,
    format: (v) => v?.slice(0, 10),
  },
];
export const batchSearchForm: FormSchema[] = [
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
    label: '样本批号',
  },
  {
    field: 'sampleType',
    component: 'Select',
    label: '样本类型',
    componentProps: {
      options: [
        { value: 'NOR', label: '血浆样本' },
        { value: 'CAB', label: '回访样本' },
      ],
    },
  },
];

export const mixColumns: BasicColumn[] = [
  {
    title: '样本批号',
    dataIndex: 'batchNo',
    width: 100,
  },

  {
    title: '样本类型',
    dataIndex: 'sampleType',
    width: 80,
  },
  {
    title: '汇集管编号',
    dataIndex: 'mixTubeNo',
    width: 140,
    slots: { customRender: 'mixTubeNo' },
  },
  {
    title: '样本编号范围',
    dataIndex: 'sampleNoRange',
    ellipsis: false,
    width: 160,
  },
  {
    title: '样本数量',
    dataIndex: 'sampleCount',
    width: 80,
  },
  {
    title: '缺号样本',
    dataIndex: 'lackSampleNoes',
    ellipsis: false,
    width: 220,
  },
];
export const mixSearchForm: FormSchema[] = [
  //     {
  //     field: 'planDate',
  //     component: 'DatePicker',
  //     label: '检测日期',
  //     componentProps: {
  //         class: 'w-full',
  //         valueFormat: 'YYYY-MM-DD',
  //     },
  // },
  // {
  //     field: 'mixType',
  //     component: 'Select',
  //     label: '混样方式',
  //     componentProps: {
  //         options: serverEnumStore.getServerEnum(SERVER_ENUM.SampleMixTypeEnum)
  //     },
  // },
  {
    field: 'batchNo',
    component: 'Input',
    label: '样本批号',
  },
];
export const mixDtColumns: BasicColumn[] = [
  {
    title: '样本批号',
    dataIndex: 'batchNo',
    width: 80,
  },

  {
    title: '样本类型',
    dataIndex: 'sampleType',
    width: 80,
  },
  {
    title: '汇集管编号',
    dataIndex: 'mixTubeNo',
    width: 140,
  },
  {
    title: '样本编号',
    dataIndex: 'sampleNo',
    width: 100,
  },
];
