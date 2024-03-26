import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { useStation } from '@/hooks/common/useStation';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { getNonReasonListApi } from '@/api/query-statistics/nonconformityTracking';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

const serverEnumStore = useServerEnumStoreWithOut();
const BlockSource = serverEnumStore.getServerEnumText(SERVER_ENUM.BagBlockSource);

const { stationOptions } = useStation();
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
    title: '样本编号',
    dataIndex: 'sampleNo',
  },
  {
    title: '采集日期',
    dataIndex: 'collectAt',
    format: (t) => t?.slice(0, 10),
  },
  {
    title: '浆员编号',
    dataIndex: 'donorNo',
    slots: { customRender: 'donorNo' },
  },
  {
    title: '姓名',
    dataIndex: 'donorName',
  },
  {
    title: '不合格原因',
    dataIndex: 'failedReason',
  },
  {
    title: '不合格日期',
    dataIndex: 'blockAt',
    format: (t) => t?.slice(0, 10),
  },
  {
    title: '不合格来源',
    dataIndex: 'blockBy',
    format: BlockSource,
  },
  {
    title: '打印人',
    dataIndex: 'printer',
  },
  {
    title: '打印时间',
    dataIndex: 'printAt',
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
    field: 'sampleBatchNo',
    component: 'Input',
    label: '样本批号',
  },
  {
    field: 'sampleNo',
    component: 'Input',
    label: '样本编号',
  },
  {
    field: '[collectStartDate, collectEndDate]',
    component: 'RangePicker',
    label: '采集日期',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: 'donorNo',
    component: 'Input',
    label: '浆员编号',
  },
  {
    field: 'blockBy',
    component: 'Select',
    label: '不合格来源',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.BagBlockSource),
    },
  },
  {
    field: 'failedCode',
    component: 'ApiSelect',
    label: '不合格原因',
    componentProps: {
      api: getNonReasonListApi,
      labelField: 'itemKey',
      valueField: 'dictItemId',
    },
  },
  {
    field: '[blockStartDate, blockEndDate]',
    component: 'RangePicker',
    label: '不合格日期',
    componentProps: {
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    field: 'printState',
    component: 'Select',
    label: '打印状态',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.PrintState),
    },
  },
];
