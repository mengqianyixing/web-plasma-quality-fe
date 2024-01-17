/*
 * @Author: HxB
 * @Date: 2024-01-16 17:21:07
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-01-17 17:54:52
 * @Description: 血浆批检疫期报告 data
 * @FilePath: \psms-fe\src\views\quarantine\plasma-batch\plasma-batch.data.ts
 */
import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { formatDate } from 'js-xxx';
import { stationNameSearchApi } from '@/api/plasmaStore/entryPlasma';

export const STATE = {
  W: {
    value: 'W',
    label: '未复核',
    color: '#165DFF',
  },
  R: {
    value: 'R',
    label: '已发布',
    color: '#55D187',
  },
  C: {
    value: 'C',
    label: '已取消',
    color: '#EFBD47',
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
    title: '血浆批号',
    dataIndex: 'fkBpNo',
    className: 'primary-text font-bold',
  },
  {
    title: '血浆总数量',
    dataIndex: 'summary.totalCount',
    className: 'empty-value',
    customRender: ({ record }) => record?.summary?.totalCount,
  },
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
    dataIndex: 'summary.checkOK',
    className: 'empty-value',
    customRender: ({ record }) =>
      (record?.summary?.failedCount ?? 0) +
      (record?.summary?.unProductionCount ?? 0) +
      (record?.summary?.trackedCount ?? 0) +
      (record?.summary.firstUnTrackedCount ?? 0) +
      (record?.summary?.reUnTrackedCount ?? 0),
  },
  {
    title: '不合格血浆',
    dataIndex: 'summary.failedCount',
    className: 'empty-value warning-text',
    customRender: ({ record }) => record?.summary?.failedCount,
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
    className: 'empty-value primary-text',
    customRender: ({ record }) => record?.summary?.reUnTrackedCount,
  },
  {
    title: '非生产出库转移血浆',
    dataIndex: 'summary.unProductionCount',
    className: 'empty-value',
    customRender: ({ record }) => record?.summary?.unProductionCount,
  },
  {
    title: '报告生成人',
    dataIndex: 'creator',
    className: 'empty-value',
  },
  {
    title: '报告生成日期',
    dataIndex: 'createAt',
    customRender: ({ record }) => {
      return h('div', {}, formatDate(new Date(record.createAt)));
    },
  },
  {
    title: '复核人',
    dataIndex: 'reviewer',
    className: 'empty-value',
  },
  {
    title: '复核日期',
    dataIndex: 'reviewAt',
    customRender: ({ record }) => {
      return h('div', {}, formatDate(new Date(record.reviewAt)));
    },
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
      options: Object.values(STATE),
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
