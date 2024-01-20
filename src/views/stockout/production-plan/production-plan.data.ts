import { FormSchema } from '@/components/Form';
import { BasicColumn } from '@/components/Table';
import { Cell } from '@/components/CellWapper';
import {
  getSelectPrepareListApi,
  getSelectBoxListApi,
  getForBatchListApi,
  getForStationListApi,
  getForTiterListApi,
  getForPlasmaListApi,
  getNotSelectBoxListApi,
  getNotSelectPrepareListApi,
} from '@/api/stockout/production-plan';

import {
  STATUS_TEXT,
  expirationList,
  statusList,
  PLASMA_STATUS_TEXT,
} from '@/enums/productionPlanEnum';
import { PLASMA_TYPE_LIST, PLASMA_TYPE_TEXT } from '@/enums/inspectEnum';

const formatKg = (text) => (text || text === 0 ? (text / 1000).toFixed(3) : '');

export const columns: BasicColumn[] = [
  {
    title: '制造批号',
    dataIndex: 'mesId',
    align: 'left',
    slots: { customRender: 'mesId' },
  },
  {
    title: '投产类型',
    dataIndex: 'orderType',
    customRender: ({ record }) => {
      return PLASMA_TYPE_TEXT[record.orderType];
    },
  },
  {
    title: '血浆效期',
    dataIndex: 'expiration',
  },
  {
    title: '计划投浆重量(吨)',
    dataIndex: 'orderWeight',
  },
  {
    title: '计划出库日期',
    format: (text) => text?.slice(0, 10),
    dataIndex: 'planOut',
  },
  {
    title: '计划投产日期',
    format: (text) => text?.slice(0, 10),
    dataIndex: 'planTask',
  },
  {
    title: '血浆数量',
    dataIndex: 'totalNum',
  },
  {
    title: '血浆净重(kg)',
    format: formatKg,
    dataIndex: 'totalWeight',
  },
  {
    title: '浆员数量',
    dataIndex: 'totalDonor',
  },
  {
    title: '效价类型',
    dataIndex: 'immuneTypes',
  },
  {
    title: '状态',
    dataIndex: 'state',
    customRender: ({ record }) => {
      return STATUS_TEXT.get(record.state);
    },
  },
  {
    title: '计划人',
    dataIndex: 'planner',
  },
  {
    title: '计划日期',
    format: (text) => text?.slice(0, 10),
    dataIndex: 'planAt',
  },
  {
    title: '复核人',
    dataIndex: 'planReviewer',
  },
  {
    title: '复核日期',
    format: (text) => text?.slice(0, 10),
    dataIndex: 'planRevieAt',
  },
  {
    title: '审核人',
    dataIndex: 'planChecker',
  },
  {
    title: '审核日期',
    format: (text) => text?.slice(0, 10),
    dataIndex: 'planCheckAt',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'mesId',
    label: '制造批号',
    component: 'Input',
  },
  {
    field: 'orderType',
    label: '投产类型',
    component: 'Select',
    componentProps: {
      options: PLASMA_TYPE_LIST,
    },
  },
  {
    field: 'expiration',
    label: '血浆效期',
    component: 'Select',
    componentProps: {
      options: expirationList,
    },
  },
  {
    field: 'planState',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: statusList,
    },
  },
];
export enum TAB {
  PREPARE,
  BOX,
  TITER,
  STATION,
  BATCH,
  PLASMA,
}
function formatResp(api: any) {
  return (params: Recordable) =>
    new Promise((rs, rj) => {
      api(params)
        .then((res) => {
          rs({ result: res });
        })
        .catch(rj);
    });
}
export const tabList = [
  {
    key: TAB.PREPARE,
    label: '投产准备号',
    checkbox: true,
    api: formatResp(getSelectPrepareListApi),
  },
  {
    key: TAB.BOX,
    label: '血浆箱号',
    checkbox: true,
    api: formatResp(getSelectBoxListApi),
  },
  {
    key: TAB.TITER,
    label: '效价类型',
    api: formatResp(getForTiterListApi),
  },
  {
    key: TAB.STATION,
    label: '采浆公司',
    api: formatResp(getForStationListApi),
  },
  {
    key: TAB.BATCH,
    label: '血浆批次',
    api: formatResp(getForBatchListApi),
  },
  {
    key: TAB.PLASMA,
    label: '血浆明细',
    api: getForPlasmaListApi,
    pagination: true,
  },
];

export const tableColumns: Record<string, BasicColumn[]> = {
  [TAB.PREPARE]: [
    {
      title: '投产准备号',
      dataIndex: 'ppNo',
    },
    {
      title: '投产类型',
      dataIndex: 'prodType',
      customRender: ({ record }) => {
        return PLASMA_TYPE_TEXT[record.prodType];
      },
    },
    {
      title: '血浆数量',
      dataIndex: 'prodBagCount',
    },
    {
      title: '血浆净重(kg)',
      dataIndex: 'netWeight',
      format: formatKg,
    },
    {
      title: '最早采集日期',
      format: (text) => text?.slice(0, 10),
      dataIndex: 'minCollectAt',
    },
    {
      title: '最晚采集日期',
      format: (text) => text?.slice(0, 10),
      dataIndex: 'maxCollectAt',
    },
    {
      title: '效价类型',
      dataIndex: 'immuneTypes',
    },
  ],
  [TAB.BOX]: [
    {
      title: '采浆公司',
      dataIndex: 'stationName',
    },
    {
      title: '血浆批号',
      dataIndex: 'batchNos',
    },
    {
      title: '血浆箱号',
      dataIndex: 'boxNo',
    },
    {
      title: '血浆数量',
      dataIndex: 'prodBagCount',
    },
    {
      title: '血浆净重(kg)',
      dataIndex: 'netWeight',
      format: formatKg,
    },
    {
      title: '效价类型',
      dataIndex: 'immuneTypes',
    },
  ],
  [TAB.TITER]: [
    {
      title: '效价类型',
      dataIndex: 'immuneType',
    },
    {
      title: '血浆数量',
      dataIndex: 'prodBagCount',
    },
    {
      title: '数量比例',
      dataIndex: 'quantityRatio',
    },
    {
      title: '血浆净重(kg)',
      dataIndex: 'netWeight',
      format: formatKg,
    },
    {
      title: '净重比例',
      dataIndex: 'weightRatio',
    },
  ],
  [TAB.STATION]: [
    {
      title: '采浆公司',
      dataIndex: 'stationName',
    },
    {
      title: '血浆数量',
      dataIndex: 'prodBagCount',
    },
    {
      title: '数量比例',
      dataIndex: 'quantityRatio',
    },
    {
      title: '血浆净重(kg)',
      dataIndex: 'netWeight',
      format: formatKg,
    },
    {
      title: '净重比例',
      dataIndex: 'weightRatio',
    },
  ],
  [TAB.BATCH]: [
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
      dataIndex: 'prodBagCount',
    },
    {
      title: '血浆净重(kg)',
      dataIndex: 'netWeight',
      format: formatKg,
    },
    {
      title: '效价类型',
      dataIndex: 'immuneTypes',
    },
  ],
  [TAB.PLASMA]: [
    {
      title: '采浆公司',
      dataIndex: 'stationName',
    },
    {
      title: '血浆批号',
      dataIndex: 'batchNo',
    },
    {
      title: '血浆箱号',
      dataIndex: 'boxNo',
    },
    {
      title: '血浆编号',
      dataIndex: 'bagNo',
    },
    {
      title: '采集日期',
      format: (text) => text?.slice(0, 10),
      dataIndex: 'collectAt',
    },
    {
      title: '浆员编号',
      dataIndex: 'fkDonorNo',
    },
    {
      title: '浆员姓名',
      dataIndex: 'donorName',
    },
    {
      title: '血型',
      dataIndex: 'bloodType',
    },
    {
      title: '效价类型',
      dataIndex: 'immunity',
    },
    {
      title: '效价值',
      dataIndex: 'titer',
    },
    {
      title: '血浆状态',
      dataIndex: 'verified',
      customRender: ({ record }) => {
        return PLASMA_STATUS_TEXT.get(record.verified);
      },
    },
  ],
};

export const pick = {
  [TAB.PREPARE]: {
    api: getNotSelectPrepareListApi,
    title: '准备号挑选',
  },
  [TAB.BOX]: {
    api: getNotSelectBoxListApi,
    title: '血浆箱挑选',
  },
};
export const pickingColumns: Record<string, BasicColumn[]> = {
  [TAB.PREPARE]: [
    {
      title: '投产准备号',
      dataIndex: 'ppNo',
    },
    {
      title: '投产类型',
      dataIndex: 'prodType',
      customRender: ({ record }) => {
        return PLASMA_TYPE_TEXT[record.prodType];
      },
    },
    {
      title: '血浆箱数',
      dataIndex: 'boxCount',
    },
    {
      title: '血浆数量',
      dataIndex: 'prodBagCount',
    },
    {
      title: '血浆净重(kg)',
      dataIndex: 'netWeight',
      format: formatKg,
    },
    {
      title: '最早采集日期',
      format: (text) => text?.slice(0, 10),
      dataIndex: 'minCollectAt',
    },
    {
      title: '最晚采集日期',
      format: (text) => text?.slice(0, 10),
      dataIndex: 'maxCollectAt',
    },
  ],
  [TAB.BOX]: [
    {
      title: '投产准备号',
      dataIndex: 'ppNo',
    },
    {
      title: '血浆箱号',
      dataIndex: 'boxNo',
    },
    {
      title: '血浆数量',
      dataIndex: 'prodBagCount',
    },
    {
      title: '血浆净重(kg)',
      dataIndex: 'netWeight',
      format: formatKg,
    },
    {
      title: '最早采集日期',
      format: (text) => text?.slice(0, 10),
      dataIndex: 'minCollectAt',
    },
    {
      title: '最晚采集日期',
      format: (text) => text?.slice(0, 10),
      dataIndex: 'maxCollectAt',
    },
    {
      title: '效价类型',
      dataIndex: 'immuneTypes',
    },
  ],
};

export const boxScheam: FormSchema = {
  label: '血浆箱号',
  field: 'boxNo',
  component: 'Input',
};
export const pickingSearchForm: FormSchema[] = [
  {
    label: '投产准备号',
    field: 'prepareNo',
    component: 'Input',
  },
  {
    label: '投产类型',
    field: 'prodType',
    component: 'Select',
    componentProps: {
      options: PLASMA_TYPE_LIST,
    },
  },
];

export const cellList: Cell[] = [
  {
    field: 'mesId',
    label: '制造批号',
  },
  {
    field: 'orderType',
    label: '投产类型',
    format: (data) => PLASMA_TYPE_TEXT[data.orderType],
  },
  {
    field: 'expiration',
    label: '血浆效期',
  },
  {
    field: 'orderWeight',
    label: '计划投浆量(吨)',
  },
  {
    field: 'planOut',
    label: '计划出库日期',
    format: ({ planOut }) => planOut?.slice(0, 10),
  },
  {
    field: 'planTask',
    label: '计划投产日期',
    format: ({ planTask }) => planTask?.slice(0, 10),
  },
  {
    field: 'prodBagCount',
    label: '血浆数量',
  },
  {
    field: 'netWeight',
    label: '血浆净重(kg)',
    format: ({ netWeight }) => formatKg(netWeight),
  },
  {
    field: 'minCollectAt',
    label: '最早采集日期',
    format: ({ minCollectAt }) => minCollectAt?.slice(0, 10),
  },
  {
    field: 'maxCollectAt',
    label: '最晚采集日期',
    format: ({ maxCollectAt }) => maxCollectAt?.slice(0, 10),
  },
  {
    field: 'donorCount',
    label: '浆员数量',
  },
  {
    field: 'avgTiter',
    label: '平均效价值',
  },
  {
    field: 'tallTiterCount',
    label: '高效价数量',
  },
  {
    field: 'lowTiterCount',
    label: '低效价数量',
  },
  {
    field: 'ordinaryCount',
    label: '普通数量',
  },
  {
    field: 'state',
    label: '计划状态',
  },
];
