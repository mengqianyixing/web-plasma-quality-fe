/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2024-01-02 13:43:33
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-09 17:46:44
 */
import { BasicColumn, FormSchema } from '@/components/Table';
import { stationNameSearchApi } from '@/api/plasmaStore/entryPlasma';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

const serverEnumStore = useServerEnumStoreWithOut();
const SampleType = serverEnumStore.getServerEnumText(SERVER_ENUM.SampleType);
export const cellList = [
  {
    field: 'stationName',
    label: '采浆公司',
  },
  {
    field: 'bsNo',
    label: '样本批号',
  },
  {
    field: 'sampleCode',
    label: '样本类型',
    format: (data: Recordable) => SampleType(data.sampleCode),
  },
  {
    field: 'totalCount',
    label: '样本总数',
  },
  {
    field: 'totalQualified',
    label: '合格样本总数',
  },
  {
    field: 'status',
    label: '状态',
  },
];

export const batchColumns: BasicColumn[] = [
  {
    title: '样本批号',
    dataIndex: 'bsNo',
  },
  {
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    title: '样本类型',
    dataIndex: 'sampleCode',
    format: (text) => SampleType(text),
  },
  {
    title: '样本总数',
    dataIndex: 'totalCount',
  },
  {
    title: '合格样本数',
    dataIndex: 'totalQualified',
  },
  {
    title: '浆站出库日期',
    dataIndex: 'outDate',
  },
  {
    title: '接收日期',
    dataIndex: 'accepted',
  },
  {
    title: '登记情况',
    dataIndex: 'status',
  },
];
export const batchSearchScheam: FormSchema[] = [
  {
    field: 'stationName',
    component: 'ApiSelect',
    label: '采浆公司',
    componentProps: {
      api: stationNameSearchApi,
      labelField: 'stationName',
      valueField: 'stationName',
    },
  },
  {
    field: 'sampleCode',
    component: 'Select',
    label: '样本类型',
    componentProps: {
      options: serverEnumStore.getServerEnum(SERVER_ENUM.SampleType),
    },
  },
  {
    field: 'bsNo',
    component: 'Input',
    label: '样本批号',
  },
];
