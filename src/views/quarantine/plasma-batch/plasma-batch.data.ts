/*
 * @Author: HxB
 * @Date: 2024-01-16 17:21:07
 * @LastEditors: Ding 1326587277@qq.com
 * @LastEditTime: 2024-03-05 11:01:35
 * @Description: 血浆批检疫期报告 data
 * @FilePath: \psms-fe\src\views\quarantine\plasma-batch\plasma-batch.data.ts
 */
import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { calculate, BS_COLORS } from 'js-xxx';
import { stationNameSearchApi } from '@/api/plasmaStore/entryPlasma';
import { customRenderDate } from '@/utils/tableHelpRender';

export const STATE = {
  W: {
    value: 'W',
    label: '待复核',
    color: 'default',
  },
  R: {
    value: 'R',
    label: '已复核',
    color: BS_COLORS.green,
  },
  C: {
    value: 'C',
    label: '取消',
    color: BS_COLORS.yellow,
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
    dataIndex: 'stationNo',
    className: 'empty-value',
    slots: { customRender: 'stationNo' },
  },
  {
    title: '报告单号',
    dataIndex: 'brNo',
  },
  {
    title: '血浆批号',
    dataIndex: 'fkBpNo',
    className: 'primary-text font-bold',
  },
  // {
  //   title: '血浆总数量',
  //   dataIndex: 'summary.totalCount',
  //   className: 'empty-value',
  //   customRender: ({ record }) => record?.summary?.totalCount,
  // },
  {
    title: '状态',
    dataIndex: 'state',
    customRender: ({ record }) =>
      h(Tag, { color: STATE[record.state]?.color }, () => {
        return STATE[record.state]?.label ?? '-';
      }),
  },
  {
    title: '检测合格血浆',
    dataIndex: 'summary.checkedCount',
    className: 'empty-value',
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
    dataIndex: 'summary.failedCount',
    slots: { customRender: 'failedCount' },
  },
  {
    title: '检疫期合格血浆',
    dataIndex: 'summary.trackedCount',
    className: 'empty-value',
    customRender: ({ record }) => record?.summary?.trackedCount,
  },
  {
    title: '首次续追踪血浆',
    dataIndex: 'summary.firstUnTrackedCount',
    className: 'empty-value',
    customRender: ({ record }) => record?.summary?.firstUnTrackedCount,
  },
  {
    title: '反复续追踪血浆',
    dataIndex: 'summary.reUnTrackedCount',
    className: 'empty-value',
    customRender: ({ record }) => record?.summary?.reUnTrackedCount,
  },
  {
    title: '非生产出库转移血浆',
    dataIndex: 'summary.unProductionCount',
    slots: { customRender: 'unProductionCount' },
  },
  {
    title: '报告生成人',
    dataIndex: 'creator',
    className: 'empty-value',
  },
  {
    title: '报告生成日期',
    dataIndex: 'createAt',
    customRender: ({ record }) => customRenderDate(record.createAt),
  },
  {
    title: '复核人',
    dataIndex: 'reviewer',
    className: 'empty-value',
  },
  {
    title: '复核日期',
    dataIndex: 'reviewAt',
    customRender: ({ record }) => customRenderDate(record.reviewAt),
  },
];

export const modalColumns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationNo',
    className: 'empty-value',
    slots: { customRender: 'stationNo' },
  },
  {
    title: '血浆批号',
    dataIndex: 'batchNo',
    className: 'primary-text font-bold',
  },
  {
    title: '血浆数量',
    dataIndex: 'plasmaCount',
    className: 'empty-value',
  },
  {
    title: '最早采浆日期',
    dataIndex: 'firstCollectAt',
    customRender: ({ record }) => customRenderDate(record.firstCollectAt),
  },
  {
    title: '最晚采浆日期',
    dataIndex: 'followSeeCount',
    customRender: ({ record }) => customRenderDate(record.latestCollectAt),
  },
  {
    title: '后续可参考血浆数量',
    dataIndex: 'followSeeCount',
    className: 'empty-value',
  },
  {
    title: '后续可参考血浆比例',
    dataIndex: 'followSeeRatio',
    className: 'empty-value',
  },
  {
    title: '可放行血浆数量',
    dataIndex: 'canReleaseCount',
    className: 'empty-value',
  },
  {
    title: '可放行血浆比例',
    dataIndex: 'canReleaseRatio',
    className: 'empty-value',
  },
  {
    title: '待放行血浆数量',
    dataIndex: 'waitReleaseCount',
    className: 'empty-value',
  },
  {
    title: '待放行血浆比例',
    dataIndex: 'waitReleaseRatio',
    className: 'empty-value',
  },
];

export const modalFailDetailColumns: BasicColumn[] = [
  {
    title: '血浆编号',
    dataIndex: 'bagNo',
    className: 'font-bold empty-value',
  },
  {
    title: '不合格原因',
    dataIndex: 'fkFailedCode',
    className: 'empty-value',
    slots: { customRender: 'unqReason' },
  },
];

export const modalUnProductionDetailColumns: BasicColumn[] = [
  {
    title: '血浆编号',
    dataIndex: 'bagNo',
    className: 'font-bold empty-value',
  },
  {
    title: '出库原因',
    dataIndex: 'fkUnProdCode',
    className: 'empty-value',
    slots: { customRender: 'prodReason' },
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
