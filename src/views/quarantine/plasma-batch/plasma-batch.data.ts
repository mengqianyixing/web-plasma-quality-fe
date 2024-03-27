/*
 * @Author: HxB
 * @Date: 2024-01-16 17:21:07
 * @LastEditors: Ding 1326587277@qq.com
 * @LastEditTime: 2024-03-05 11:01:35
 * @Description: 血浆批检疫期报告 data
 * @FilePath: \psms-fe\src\views\quarantine\plasma-batch\plasma-batch.data.ts
 */
import { BasicColumn, FormSchema } from '@/components/Table';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
import { useStation } from '@/hooks/common/useStation';

const { stationOptions } = useStation();
const serverEnumStore = useServerEnumStoreWithOut();

const ConclusionType = serverEnumStore.getServerEnumText(SERVER_ENUM.ConclusionType);

export const STATE = {
  W: {
    value: 'W',
    label: '待复核',
    color: 'default',
  },
  R: {
    value: 'R',
    label: '已复核',
  },
  C: {
    value: 'C',
    label: '取消',
  },
  ALL: {
    value: '',
    label: '全部',
    color: 'default',
  },
};

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    width: 80,
  },

  {
    title: '血浆批号',
    dataIndex: 'fkBpNo',
    width: 120,
  },

  {
    title: '状态',
    dataIndex: 'state',
    format: (t) => STATE[t]?.label,
    width: 60,
  },
  {
    title: '检验合格血浆',
    dataIndex: ['summary', 'checkedCount'],
    width: 100,
  },
  {
    title: '不合格血浆',
    dataIndex: ['summary', 'failedCount'],
    slots: { customRender: 'failedBag' },
    width: 100,
  },
  {
    title: '检疫期合格血浆(正常)',
    dataIndex: ['summary', 'trackedNormalCount'],
    slots: { customRender: 'trackedNormalBag' },
    width: 160,
  },
  {
    title: '检疫期合格血浆(特免)',
    dataIndex: ['summary', 'trackedSpecialCount'],
    slots: { customRender: 'trackedSpecialBag' },
    width: 160,
  },
  {
    title: '首次续追踪血浆',
    dataIndex: ['summary', 'firstUnTrackedCount'],
    slots: { customRender: 'firstUnTrackedBag' },
    width: 120,
  },
  {
    title: '反复续追踪血浆',
    dataIndex: ['summary', 'reUnTrackedCount'],
    slots: { customRender: 'reUnTrackedBag' },
    width: 120,
  },
  {
    title: '非生产出库转移血浆',
    dataIndex: ['summary', 'unProductionCount'],
    slots: { customRender: 'unProductionBag' },
    width: 160,
  },
  {
    title: '报告生成人',
    dataIndex: 'creator',
    width: 100,
  },
  {
    title: '报告生成日期',
    dataIndex: 'createAt',
    format: (t) => t?.slice(0, 10),
    width: 100,
  },
  {
    title: '复核人',
    dataIndex: 'reviewer',
    width: 100,
  },
  {
    title: '复核日期',
    dataIndex: 'reviewAt',
    format: (t) => t?.slice(0, 10),
    width: 100,
  },
];

export const modalColumns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
    width: 80,
  },
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
    width: 120,
  },
  {
    title: '检验合格血浆数量',
    dataIndex: 'plasmaCount',
    width: 140,
  },
  {
    title: '最早采浆日期',
    dataIndex: 'firstCollectAt',
    width: 100,
  },
  {
    title: '最晚采浆日期',
    dataIndex: 'latestCollectAt',
    width: 100,
  },
  {
    title: '后续可参考血浆数量',
    dataIndex: 'followSeeCount',
    width: 135,
  },
  {
    title: '后续可参考血浆比例',
    dataIndex: 'followSeeRatio',
    width: 135,
  },
  {
    title: '可放行血浆数量',
    dataIndex: 'canReleaseCount',
    width: 120,
  },
  {
    title: '可放行血浆比例',
    dataIndex: 'canReleaseRatio',
    width: 120,
  },
  {
    title: '待放行血浆数量',
    dataIndex: 'waitReleaseCount',
    width: 120,
  },
  {
    title: '待放行血浆比例',
    dataIndex: 'waitReleaseRatio',
    width: 120,
  },
];

const trackedColumns: BasicColumn[] = [
  {
    title: '浆员编号',
    dataIndex: 'donorNo',
    width: 100,
  },
  {
    title: '浆员姓名',
    dataIndex: 'donorName',
    width: 100,
  },
  {
    title: '采集日期',
    dataIndex: 'collectAt',
    width: 100,
  },
  {
    title: '验收净重(g)',
    dataIndex: 'netWeight',
    width: 100,
  },
  {
    title: '效价类型',
    dataIndex: 'titerJudge',
    width: 100,
    format: ConclusionType,
  },
];
const otherColumns: BasicColumn[] = [
  {
    title: '浆员编号',
    dataIndex: 'donorNo',
    width: 100,
  },
  {
    title: '浆员姓名',
    dataIndex: 'donorName',
    width: 100,
  },
  {
    title: '采集日期',
    dataIndex: 'collectAt',
    width: 90,
  },
  {
    title: '验收净重(g)',
    dataIndex: 'netWeight',
    width: 100,
  },
];
export const colMap: Record<string, BasicColumn[]> = {
  failedBag: [
    {
      title: '不合格日期',
      dataIndex: 'failedAt',
      width: 90,
    },
    {
      title: '不合格原因',
      dataIndex: 'fkFailedCode',
      slots: { customRender: 'unqReason' },
      width: 200,
      ellipsis: false,
    },
    {
      title: '浆员编号',
      dataIndex: 'donorNo',
      width: 100,
    },
    {
      title: '浆员姓名',
      dataIndex: 'donorName',
      width: 100,
    },
    {
      title: '采集日期',
      dataIndex: 'collectAt',
      width: 90,
    },
    {
      title: '验收净重(g)',
      dataIndex: 'netWeight',
      width: 100,
    },
    {
      title: '效价类型',
      dataIndex: 'titerJudge',
      width: 100,
      format: ConclusionType,
    },
  ],
  firstUnTrackedBag: otherColumns,
  reUnTrackedBag: otherColumns,
  trackedNormalBag: trackedColumns,
  trackedSpecialBag: trackedColumns,
  unProductionBag: otherColumns,
};
export const modalCommonColumns: BasicColumn[] = [
  {
    title: '血浆编号',
    dataIndex: 'bagNo',
    width: 110,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '采浆公司',
    component: 'Select',
    field: 'stationNo',
    componentProps: {
      options: stationOptions,
    },
  },
  {
    field: 'batchNo',
    label: '血浆批号',
    component: 'Input',
  },
  {
    field: 'state',
    label: '状态',
    component: 'Select',
    defaultValue: 'W',
    componentProps: {
      allowClear: false,
      options: Object.values(STATE).filter((item) => item.value != 'C'),
    },
  },
  {
    field: '[beginAt, endAt]',
    label: '报告日期',
    component: 'RangePicker',
    componentProps: {
      format: 'YYYY-MM-DD',
      placeholder: ['开始日期', '结束日期'],
    },
  },
];

export const modalSearchFormSchema: FormSchema[] = [
  {
    label: '采浆公司',
    component: 'Select',
    field: 'stationNo',
    componentProps: {
      options: stationOptions,
    },
  },
  {
    field: 'batchNo',
    label: '血浆批号',
    component: 'Input',
  },
  {
    field: 'tubeNo',
    label: '参考样本批号',
    component: 'Input',
  },
];

export const formSchema: FormSchema[] = [
  {
    label: '名称',
    required: true,
    field: 'name',
    component: 'Input',
  },
  {
    field: 'state',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: '停用', value: true },
        { label: '启用', value: false },
      ],
    },
  },
];
