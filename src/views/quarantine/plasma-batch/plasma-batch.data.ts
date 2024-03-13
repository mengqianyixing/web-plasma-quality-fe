/*
 * @Author: HxB
 * @Date: 2024-01-16 17:21:07
 * @LastEditors: Ding 1326587277@qq.com
 * @LastEditTime: 2024-03-05 11:01:35
 * @Description: 血浆批检疫期报告 data
 * @FilePath: \psms-fe\src\views\quarantine\plasma-batch\plasma-batch.data.ts
 */
import { BasicColumn, FormSchema } from '@/components/Table';
import { calculate } from 'js-xxx';
import { stationNameSearchApi } from '@/api/plasmaStore/entryPlasma';
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';

const serverEnumStore = useServerEnumStoreWithOut();

const PlasmaType = serverEnumStore.getServerEnumText(SERVER_ENUM.PlasmaType);

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
  },

  {
    title: '血浆批号',
    dataIndex: 'fkBpNo',
  },

  {
    title: '状态',
    dataIndex: 'state',
    format: (t) => STATE[t]?.label,
  },
  {
    title: '检测合格血浆',
    dataIndex: 'summary.checkOK',
    customRender: ({ record }) =>
      calculate(
        '+',
        record?.summary?.failedCount,
        record?.summary?.unProductionCount,
        record?.summary?.trackedCount,
        record?.summary.firstUnTrackedCount,
        record?.summary?.reUnTrackedCount,
      ),
  },
  {
    title: '不合格血浆',
    dataIndex: ['summary', 'failedCount'],
    slots: { customRender: 'failedBag' },
  },
  {
    title: '检疫期合格血浆(正常)',
    dataIndex: ['summary', 'trackedNormalCount'],
    slots: { customRender: 'trackedNormalBag' },
    width: 180,
  },
  {
    title: '检疫期合格血浆(特免)',
    dataIndex: ['summary', 'trackedSpecialCount'],
    slots: { customRender: 'trackedSpecialBag' },
    width: 180,
  },
  {
    title: '首次续追踪血浆',
    dataIndex: ['summary', 'firstUnTrackedCount'],
    slots: { customRender: 'firstUnTrackedBag' },
  },
  {
    title: '反复续追踪血浆',
    dataIndex: ['summary', 'reUnTrackedCount'],
    slots: { customRender: 'reUnTrackedBag' },
  },
  {
    title: '非生产出库转移血浆',
    dataIndex: ['summary', 'unProductionCount'],
    slots: { customRender: 'unProductionBag' },
  },
  {
    title: '报告生成人',
    dataIndex: 'creator',
  },
  {
    title: '报告生成日期',
    dataIndex: 'createAt',
    format: (t) => t?.slice(0, 10),
  },
  {
    title: '复核人',
    dataIndex: 'reviewer',
  },
  {
    title: '复核日期',
    dataIndex: 'reviewAt',
    format: (t) => t?.slice(0, 10),
  },
];

export const modalColumns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
  },
  {
    title: '血浆数量',
    dataIndex: 'plasmaCount',
  },
  {
    title: '最早采浆日期',
    dataIndex: 'firstCollectAt',
    format: (t) => t?.slice(0, 10),
  },
  {
    title: '最晚采浆日期',
    dataIndex: 'followSeeCount',
    format: (t) => t?.slice(0, 10),
  },
  {
    title: '后续可参考血浆数量',
    dataIndex: 'followSeeCount',
  },
  {
    title: '后续可参考血浆比例',
    dataIndex: 'followSeeRatio',
  },
  {
    title: '可放行血浆数量',
    dataIndex: 'canReleaseCount',
  },
  {
    title: '可放行血浆比例',
    dataIndex: 'canReleaseRatio',
  },
  {
    title: '待放行血浆数量',
    dataIndex: 'waitReleaseCount',
  },
  {
    title: '待放行血浆比例',
    dataIndex: 'waitReleaseRatio',
  },
];

export const colMap: Record<string, BasicColumn[]> = {
  failedBag: [
    {
      title: '不合格原因',
      dataIndex: 'fkFailedCode',
      slots: { customRender: 'unqReason' },
    },
  ],
  firstUnTrackedBag: [
    {
      title: '采集日期',
      dataIndex: 'collectAt',
    },
  ],
  reUnTrackedBag: [
    {
      title: '采集日期',
      dataIndex: 'collectAt',
    },
  ],
  trackedNormalBag: [
    {
      title: '采集日期',
      dataIndex: 'collectAt',
    },
  ],
  trackedSpecialBag: [
    {
      title: '免疫类型',
      dataIndex: 'immunity',
      format: PlasmaType,
    },
    {
      title: '采集日期',
      dataIndex: 'collectAt',
    },
  ],
  unProductionBag: [
    {
      title: '出库原因',
      dataIndex: 'fkUnProdCode',

      slots: { customRender: 'prodReason' },
    },
  ],
};
export const modalCommonColumns: BasicColumn[] = [
  {
    title: '血浆编号',
    dataIndex: 'bagNo',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    label: '采浆公司',
    component: 'ApiSelect',
    field: 'stationNo',
    componentProps: {
      api: stationNameSearchApi,
      resultField: 'result',
      labelField: 'stationName',
      valueField: 'stationNo',
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
    component: 'ApiSelect',
    field: 'stationNo',
    componentProps: {
      api: stationNameSearchApi,
      resultField: 'result',
      labelField: 'stationName',
      valueField: 'stationNo',
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
