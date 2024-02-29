import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { stationNameSearchApi } from '@/api/plasmaStore/entryPlasma';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

const serverEnumStore = useServerEnumStoreWithOut();
const SampleType = serverEnumStore.getServerEnumText(SERVER_ENUM.SampleType);

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    title: '样本批号',
    dataIndex: 'sampleBatchNo',
  },

  {
    title: '样本类型',
    dataIndex: 'sampleType',
    format: (text) => SampleType(text),
  },
  {
    title: '样本编号',
    dataIndex: 'sampleNo',
  },
  {
    title: '采集日期',
    dataIndex: 'collectAt',
  },
  {
    title: '来浆类型',
    dataIndex: 'plasmaTypeFromStation',
  },
  {
    title: '血浆类型',
    dataIndex: 'plasmaType',
  },
  {
    title: '浆员编号',
    dataIndex: 'donorNo',
  },
  {
    title: '浆员姓名',
    dataIndex: 'donorName',
  },
  {
    title: '接收人',
    dataIndex: 'acceptor',
  },
  {
    title: '接收日期',
    dataIndex: 'acceptAt',
  },
  {
    title: '样本状态',
    dataIndex: 'sampleStatus',
  },
  {
    title: '检测结果',
    dataIndex: 'testResult',
  },
  {
    title: '不合格原因',
    dataIndex: 'unqualifiedReason',
  },
  {
    title: '效价',
    dataIndex: 'titer',
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
    field: 'sampleBatchNo',
    component: 'Input',
    label: '样本批号',
  },
  {
    field: 'sampleType',
    component: 'Select',
    label: '样本类型',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.SampleType),
    },
  },
  {
    field: 'sampleNo',
    component: 'Input',
    label: '样本编号',
  },
  {
    field: '[collectBeginAt,collectEndAt]',
    component: 'RangePicker',
    label: '采集日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: 'donorNo',
    component: 'Input',
    label: '浆员编号',
  },
  {
    field: 'donorName',
    component: 'Input',
    label: '浆员姓名',
  },
  {
    field: '[issueBeginAt,issueEndAt]',
    component: 'RangePicker',
    label: '检测发布日期',
    componentProps: {
      class: 'w-full',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: 'sampleStatus',
    component: 'Select',
    label: '样本状态',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.SampleExperimentType),
    },
  },
  {
    field: 'plasmaTypeFromStation',
    component: 'Select',
    label: '来浆类型',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.ImmType),
    },
  },
  {
    field: 'plasmaType',
    component: 'Select',
    label: '血浆类型',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.ImmType),
    },
  },
];
