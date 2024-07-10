/*
 * @Descripttion:
 * @version:
 * @Author: zcc
 * @Date: 2024-01-02 13:43:33
 * @LastEditors: zcc
 * @LastEditTime: 2024-01-09 17:46:44
 */
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
    field: 'sampleType',
    label: '样本类型',
    format: (data: Recordable) => SampleType(data.sampleType),
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
