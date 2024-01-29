import { defHttp } from '@/utils/http/axios';

enum Api {
  GetPrepareList = '/api/product/prepare/list',
  AddPrepare = '/api/product/prepare/save',
  UpdatePrepare = '/api/product/prepare/update',
  RevokeUnpick = '/api/product/prepare/revoke-unpick',
  RevokePick = '/api/product/prepare/revoke-pick',
  CompletePrepare = '/api/product/prepare/commit',
  CheckPrepare = '/api/product/prepare/check',
  RevokeCheckPrepare = '/api/product/prepare/revoke-check',
  GetImmunityList = '/api/product/prepare/summary/immunity',
  GetStationList = '/api/product/prepare/summary/station',
  GetBatchList = '/api/product/prepare/summary/batch',
  GetBoxList = '/api/product/prepare/summary/box',
  GetBagList = '/api/product/prepare/summary/bag',
  GetPickBatch = '/api/product/prepare/pick/batch',
  GetPickBox = '/api/product/prepare/pick/box',
  PickBag = '/api/product/prepare/pick/bag',
  RevokePickBag = '/api/product/prepare/revoke/pick/bag',
  GetPickedBatch = '/api/product/prepare/pick/bag/batch',
  GetPickedBox = '/api/product/prepare/pick/bag/box',
  GetSummaryPreview = '/api/product/prepare/summary/preview',
  GetBatchInfo = '/api/product/prepare/sorting/batch',
  GetSortBoxs = '/api/product/prepare/sorting/boxs',
  GetSortBoxsList = '/api/product/prepare/sorting/box',
  CheckBox = '/api/product/prepare/sorting/box/check',
  GetPrepareSorting = '/api/product/prepare/sorting',
  GetSortBags = '/api/product/prepare/sorting/bags',
  PickSortingBag = '/api/product/prepare/sorting/bag',
  SortingMouldAssembling = '/api/product/prepare/sorting/mould-assembling',
  SortingBoxSealing = '/api/product/prepare/sorting/box-sealing',
}

export const getPrepareList = (params: any) => {
  return defHttp.get<any>({ url: Api.GetPrepareList, params });
};

export const addPrepare = (params: any) => {
  return defHttp.post<any>({
    url: Api.AddPrepare,
    params,
  });
};

export const updatePrepare = (params: any) => {
  return defHttp.post<any>({
    url: Api.UpdatePrepare,
    params,
  });
};

export const revokeUnpick = (params: any) => {
  return defHttp.post<any>({
    url: Api.RevokeUnpick,
    params,
  });
};

export const revokePick = (params: any) => {
  return defHttp.post<any>({
    url: Api.RevokePick,
    params,
  });
};
// 完成准备
export const completePrepare = (params: any) => {
  return defHttp.post<any>({ url: `${Api.CompletePrepare}/${params.prepareNo}` });
};
// 复核
export const checkPrepare = (params: any) => {
  return defHttp.post<any>({
    url: Api.CheckPrepare,
    params,
  });
};

// 取消复核
export const revokeCheckPrepare = (params: any) => {
  return defHttp.post<any>({
    url: Api.RevokeCheckPrepare,
    params,
  });
};

export const getImmunityList = (params: any) => {
  return defHttp.get<any>({ url: `${Api.GetImmunityList}/${params.prepareNo}` });
};

export const getStationList = (params: any) => {
  return defHttp.get<any>({ url: `${Api.GetStationList}/${params.prepareNo}` });
};

export const getBatchList = (params: any) => {
  return defHttp.get<any>({ url: `${Api.GetBatchList}/${params.prepareNo}` });
};

export const getBoxList = (params: any) => {
  return defHttp.get<any>({ url: `${Api.GetBoxList}/${params.prepareNo}` });
};

export const getBagList = (params: any) => {
  return defHttp.get<any>({ url: `${Api.GetBagList}/${params.prepareNo}` });
};

// 挑选 按批查询
export const getPickBatch = (params: any) => {
  return defHttp.get<any>({ url: Api.GetPickBatch, params });
};

// 挑选 按箱查询
export const getPickBox = (params: any) => {
  return defHttp.get<any>({ url: Api.GetPickBox, params });
};

// 挑浆
export const pickBag = (params: any) => {
  return defHttp.post<any>({
    url: Api.PickBag,
    params,
  });
};

// 撤销挑浆
export const revokePickBag = (params: any) => {
  return defHttp.post<any>({
    url: Api.RevokePickBag,
    params,
  });
};

// 获取已挑 批
export const getPickedBatch = (params: any) => {
  return defHttp.get<any>({ url: `${Api.GetPickedBatch}/${params.prepareNo}` });
};

// 获取已挑 箱
export const getPickedBox = (params: any) => {
  return defHttp.get<any>({ url: `${Api.GetPickedBox}/${params.prepareNo}` });
};

// 挑浆汇总预览
export const getSummaryPreview = (params: any) => {
  return defHttp.get<any>({ url: Api.GetSummaryPreview, params });
};

// 分拣批次信息
export const getBatchInfo = (params: any) => {
  return defHttp.get<any>({ url: Api.GetBatchInfo, params });
};

// 获取分拣装箱信息列表
export const getSortBoxs = (params: any) => {
  return defHttp.get<any>({ url: Api.GetSortBoxs, params });
};

// 获取分拣装箱核对袋信息列表
export const getSortBoxsList = (params: any) => {
  return defHttp.get<any>({ url: `${Api.GetSortBoxsList}/${params.boxNo}` });
};

// 装箱核对
export const checkBox = (params: any) => {
  return defHttp.put<any>({
    url: Api.CheckBox,
    params,
  });
};

// 获取血浆明细列表
export const getSortBags = (params: any) => {
  return defHttp.get<any>({ url: Api.GetSortBags, params });
};

// 查询准备号内的批次号
export const getSortingBatch = (params: any) => {
  return defHttp.get<any>({ url: `${Api.GetBatchInfo}/${params.prepareNo}` });
};

// 获取血浆分拣信息总览
export const getPrepareSorting = (params: any) => {
  return defHttp.get<any>({ url: `${Api.GetPrepareSorting}/${params.prepareNo}` });
};

// 血浆分拣
export const pickSortingBag = (params: any) => {
  return defHttp.post<any>({
    url: Api.PickSortingBag,
    params,
  });
};

// 血浆分拣-合箱
export const sortingMouldAssembling = (params: any) => {
  return defHttp.post<any>({
    url: Api.SortingMouldAssembling,
    params,
  });
};

// 血浆分拣-封箱
export const sortingBoxSealing = (params: any) => {
  return defHttp.post<any>({
    url: Api.SortingBoxSealing,
    params,
  });
};
