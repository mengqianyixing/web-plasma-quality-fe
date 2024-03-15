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
import { SERVER_ENUM } from '@/enums/serverEnum';
import { useServerEnumStoreWithOut } from '@/store/modules/serverEnums';
import { formatKg } from '@/utils';

const serverEnumStore = useServerEnumStoreWithOut();
const PlasmaType = serverEnumStore.getServerEnumText(SERVER_ENUM.PlasmaType);

export const columns: BasicColumn[] = [
  {
    title: '制造批号',
    dataIndex: 'mesId',
    align: 'left',
    slots: { customRender: 'mesId' },
    width: 120,
  },
  {
    title: '投产类型',
    dataIndex: 'orderType',
    customRender: ({ record }) => {
      return PlasmaType(record.orderType);
    },
    width: 80,
  },
  {
    title: '血浆效期',
    dataIndex: 'expiration',
    width: 80,
  },
  {
    title: '计划投浆重量(吨)',
    dataIndex: 'orderWeight',
    width: 120,
  },
  {
    title: '计划出库日期',
    format: (text) => text?.slice(0, 10),
    dataIndex: 'planOut',
    width: 100,
  },
  {
    title: '计划投产日期',
    format: (text) => text?.slice(0, 10),
    dataIndex: 'planTask',
    width: 100,
  },
  {
    title: '血浆数量',
    dataIndex: 'totalNum',
    width: 80,
  },
  {
    title: '血浆净重(kg)',
    format: formatKg,
    dataIndex: 'totalWeight',
    width: 100,
  },
  {
    title: '浆员数量',
    dataIndex: 'totalDonor',
    width: 80,
  },
  {
    title: '效价类型',
    dataIndex: 'immuneTypes',
    width: 160,
    ellipsis: false,
  },
  {
    title: '状态',
    dataIndex: 'state',
    customRender: ({ record }) => {
      return STATUS_TEXT.get(record.state);
    },
    width: 80,
  },
  {
    title: '计划人',
    dataIndex: 'planner',
    width: 100,
  },
  {
    title: '计划日期',
    format: (text) => text?.slice(0, 10),
    dataIndex: 'planAt',
    width: 100,
  },
  {
    title: '复核人',
    dataIndex: 'planReviewer',
    width: 100,
  },
  {
    title: '复核日期',
    format: (text) => text?.slice(0, 10),
    dataIndex: 'planRevieAt',
    width: 100,
  },
  {
    title: '审核人',
    dataIndex: 'planChecker',
    width: 100,
  },
  {
    title: '审核日期',
    format: (text) => text?.slice(0, 10),
    dataIndex: 'planCheckAt',
    width: 100,
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
      options: serverEnumStore.getServerEnum(SERVER_ENUM.PlasmaType),
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
      width: 120,
    },
    {
      title: '投产类型',
      dataIndex: 'prodType',
      customRender: ({ record }) => {
        return PlasmaType(record.prodType);
      },
      width: 100,
    },
    {
      title: '血浆数量',
      dataIndex: 'prodBagCount',
      width: 80,
    },
    {
      title: '血浆净重(kg)',
      dataIndex: 'netWeight',
      format: formatKg,
      width: 100,
    },
    {
      title: '最早采集日期',
      format: (text) => text?.slice(0, 10),
      dataIndex: 'minCollectAt',
      width: 100,
    },
    {
      title: '最晚采集日期',
      format: (text) => text?.slice(0, 10),
      dataIndex: 'maxCollectAt',
      width: 100,
    },
    {
      title: '效价类型',
      dataIndex: 'immuneTypes',
      width: 240,
      ellipsis: false,
    },
  ],
  [TAB.BOX]: [
    {
      title: '采浆公司',
      dataIndex: 'stationName',
      width: 80,
    },
    {
      title: '血浆批号',
      dataIndex: 'batchNos',
      width: 120,
    },
    {
      title: '血浆箱号',
      dataIndex: 'boxNo',
      width: 120,
    },
    {
      title: '血浆数量',
      dataIndex: 'prodBagCount',
      width: 80,
    },
    {
      title: '血浆净重(kg)',
      dataIndex: 'netWeight',
      format: formatKg,
      width: 100,
    },
    {
      title: '效价类型',
      dataIndex: 'immuneTypes',
      width: 240,
      ellipsis: false,
    },
  ],
  [TAB.TITER]: [
    {
      title: '效价类型',
      dataIndex: 'immuneType',
      width: 100,
    },
    {
      title: '血浆数量',
      dataIndex: 'prodBagCount',
      width: 80,
    },
    {
      title: '数量比例(%)',
      dataIndex: 'quantityRatio',
      width: 100,
    },
    {
      title: '血浆净重(kg)',
      dataIndex: 'netWeight',
      format: formatKg,
      width: 100,
    },
    {
      title: '净重比例(%)',
      dataIndex: 'weightRatio',
      width: 100,
    },
  ],
  [TAB.STATION]: [
    {
      title: '采浆公司',
      dataIndex: 'stationName',
      width: 80,
    },
    {
      title: '血浆数量',
      dataIndex: 'prodBagCount',
      width: 80,
    },
    {
      title: '数量比例(%)',
      dataIndex: 'quantityRatio',
      width: 100,
    },
    {
      title: '血浆净重(kg)',
      dataIndex: 'netWeight',
      format: formatKg,
      width: 100,
    },
    {
      title: '净重比例(%)',
      dataIndex: 'weightRatio',
      width: 100,
    },
  ],
  [TAB.BATCH]: [
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
      title: '血浆数量',
      dataIndex: 'prodBagCount',
      width: 80,
    },
    {
      title: '血浆净重(kg)',
      dataIndex: 'netWeight',
      format: formatKg,
      width: 100,
    },
    {
      title: '效价类型',
      dataIndex: 'immuneTypes',
      width: 240,
      ellipsis: false,
    },
  ],
  [TAB.PLASMA]: [
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
      title: '血浆箱号',
      dataIndex: 'boxNo',
      width: 120,
    },
    {
      title: '血浆编号',
      dataIndex: 'bagNo',
      width: 140,
    },
    {
      title: '采集日期',
      format: (text) => text?.slice(0, 10),
      dataIndex: 'collectAt',
      width: 100,
    },
    {
      title: '浆员编号',
      dataIndex: 'fkDonorNo',
      width: 120,
    },
    {
      title: '浆员姓名',
      dataIndex: 'donorName',
      width: 100,
    },
    {
      title: '血型',
      dataIndex: 'bloodType',
      width: 60,
    },
    {
      title: '效价类型',
      dataIndex: 'immunity',
      width: 100,
    },
    {
      title: '效价值',
      dataIndex: 'titer',
      width: 80,
    },
    {
      title: '血浆状态',
      dataIndex: 'verified',
      customRender: ({ record }) => {
        return PLASMA_STATUS_TEXT.get(record.verified);
      },
      width: 120,
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
      width: 120,
    },
    {
      title: '投产类型',
      dataIndex: 'prodType',
      customRender: ({ record }) => {
        return PlasmaType(record.prodType);
      },
      width: 100,
    },
    {
      title: '血浆箱数',
      dataIndex: 'boxCount',
      width: 100,
    },
    {
      title: '血浆数量',
      dataIndex: 'prodBagCount',
      width: 100,
    },
    {
      title: '血浆净重(kg)',
      dataIndex: 'netWeight',
      format: formatKg,
      width: 100,
    },
    {
      title: '最早采集日期',
      format: (text) => text?.slice(0, 10),
      dataIndex: 'minCollectAt',
      width: 100,
    },
    {
      title: '最晚采集日期',
      format: (text) => text?.slice(0, 10),
      dataIndex: 'maxCollectAt',
      width: 100,
    },
  ],
  [TAB.BOX]: [
    {
      title: '投产准备号',
      dataIndex: 'ppNo',
      width: 120,
    },
    {
      title: '血浆箱号',
      dataIndex: 'boxNo',
      width: 120,
    },
    {
      title: '血浆数量',
      dataIndex: 'prodBagCount',
      width: 100,
    },
    {
      title: '血浆净重(kg)',
      dataIndex: 'netWeight',
      format: formatKg,
      width: 120,
    },
    {
      title: '最早采集日期',
      format: (text) => text?.slice(0, 10),
      dataIndex: 'minCollectAt',
      width: 100,
    },
    {
      title: '最晚采集日期',
      format: (text) => text?.slice(0, 10),
      dataIndex: 'maxCollectAt',
      width: 100,
    },
    {
      title: '效价类型',
      dataIndex: 'immuneTypes',
      width: 200,
      ellipsis: false,
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
      options: serverEnumStore.getServerEnum(SERVER_ENUM.PlasmaType),
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
    format: (data) => PlasmaType(data.orderType),
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
