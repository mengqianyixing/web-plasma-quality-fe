import { BasicColumn, FormSchema } from '@/components/Table';
import { getDictItemListByNoApi } from '@/api/dictionary';
import { stationNameSearchApi } from '@/api/plasmaStore/entryPlasma';

enum STATE {
  TBG = '报告待生成',
  TBR = '待复核',
  UND = '待发布',
  PUD = '已发布',
}
const stateList = (() => Object.keys(STATE).map((_) => ({ label: STATE[_], value: _ })))();

export const columns: BasicColumn[] = [
  {
    title: '采浆公司',
    dataIndex: 'stationName',
  },
  {
    title: '样品批号',
    dataIndex: 'bsNo',
  },
  {
    title: '样品类型',
    dataIndex: 'sampleCode',
    slots: { customRender: 'sampleCode' },
  },
  {
    title: '合格样品总数',
    dataIndex: 'totalQualified',
  },
  {
    title: '不合格样品总数',
    dataIndex: 'totalUnqualified',
  },
  {
    title: '高效价总数',
    dataIndex: 'totalHighTiter',
  },
  {
    title: '低效价总数',
    dataIndex: 'totalLowTiter',
  },
  {
    title: '无效价总数',
    dataIndex: 'totalNormal',
  },
  {
    title: '当前状态',
    dataIndex: '',
    customRender: ({ record }) => {
      return STATE[record.state];
    },
  },
  {
    title: '报告人',
    dataIndex: 'producer',
  },
  {
    title: '报告日期',
    dataIndex: 'productionAt',
  },
  {
    title: '复核人',
    dataIndex: 'reviewer',
  },
  {
    title: '复核日期',
    dataIndex: 'reviewAt',
  },
  {
    title: '发布人',
    dataIndex: 'issuer',
  },
  {
    title: '发布日期',
    dataIndex: 'issueAt',
  },
];

export const searchFormschema: FormSchema[] = [
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
    field: 'sampleCode',
    component: 'ApiSelect',
    label: '样品类型',
    componentProps: {
      api: () =>
        new Promise((rs, rj) => {
          getDictItemListByNoApi(['sampleType'])
            .then((res) => {
              rs(res[0]['dictImtes']);
            })
            .catch(rj);
        }),
    },
  },

  {
    field: 'state',
    component: 'Select',
    label: '样品状态',
    componentProps: {
      options: stateList,
    },
  },
  {
    field: '[begnIssueAt, endIssueAt]',
    component: 'RangePicker',
    label: '发布时间',
    componentProps: {
      class: 'w-full',
    },
  },
];
