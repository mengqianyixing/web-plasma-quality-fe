/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2024-01-02 13:43:33
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-09 17:46:44
 */
import { BasicColumn, FormSchema } from '@/components/Table';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
import { useStation } from '@/hooks/common/useStation';

const { stationOptions } = useStation();
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
    label: '浆站来样数量',
  },
  {
    field: 'totalQualified',
    label: '验收合格样本总数',
  },
  {
    field: 'totalUnqualified',
    label: '验收不合格样本总数',
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
    title: '浆站来样数量',
    dataIndex: 'totalCount',
  },
  {
    title: '验收合格样本总数',
    dataIndex: 'totalQualified',
  },
  {
    title: '验收不合格样本总数',
    dataIndex: 'totalUnqualified',
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
    component: 'Select',
    label: '采浆公司',
    componentProps: {
      options: stationOptions,
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
