import { defHttp } from '@/utils/http/axios';

import {
  GetApiProductPrepareListRequest,
  GetApiProductPrepareListResponse,
  PostApiProductPrepareSaveRequest,
  PostApiProductPrepareSaveResponse,
  PostApiProductPrepareUpdateRequest,
  PostApiProductPrepareUpdateResponse,
  PostApiProductPrepareRevokeUnpickRequest,
  PostApiProductPrepareRevokeUnpickResponse,
  PostApiProductPrepareRevokePickRequest,
  PostApiProductPrepareRevokePickResponse,
  PostApiProductPrepareCommitRequest,
  PostApiProductPrepareCommitResponse,
  PostApiProductPrepareCheckRequest,
  PostApiProductPrepareCheckResponse,
  PostApiProductPrepareRevokeCheckRequest,
  PostApiProductPrepareRevokeCheckResponse,
  GetApiProductPrepareSummaryImmunityPrepareNoRequest,
  GetApiProductPrepareSummaryImmunityPrepareNoResponse,
  GetApiProductPrepareSummaryStationPrepareNoRequest,
  GetApiProductPrepareSummaryStationPrepareNoResponse,
  GetApiProductPrepareSummaryBatchPrepareNoRequest,
  GetApiProductPrepareSummaryBatchPrepareNoResponse,
  GetApiProductPrepareSummaryBoxPrepareNoRequest,
  GetApiProductPrepareSummaryBoxPrepareNoResponse,
  GetApiProductPrepareSummaryBagPrepareNoRequest,
  GetApiProductPrepareSummaryBagPrepareNoResponse,
  GetApiProductPreparePickBatchRequest,
  GetApiProductPreparePickBatchResponse,
  GetApiProductPreparePickBoxRequest,
  GetApiProductPreparePickBoxResponse,
  PostApiProductPreparePickBagRequest,
  PostApiProductPreparePickBagResponse,
  PostApiProductPrepareRevokePickBagRequest,
  PostApiProductPrepareRevokePickBagResponse,
  GetApiProductPreparePickBagBatchPrepareNoRequest,
  GetApiProductPreparePickBagBatchPrepareNoResponse,
  GetApiProductPreparePickBagBoxPrepareNoRequest,
  GetApiProductPreparePickBagBoxPrepareNoResponse,
  GetApiProductPrepareSummaryPreviewRequest,
  GetApiProductPrepareSummaryPreviewResponse,
} from '@/api/type/productionPreparation';

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
}

export const getPrepareList = (params: GetApiProductPrepareListRequest) => {
  return defHttp.get<GetApiProductPrepareListResponse>({ url: Api.GetPrepareList, params });
};

export const addPrepare = (params: PostApiProductPrepareSaveRequest) => {
  return defHttp.post<PostApiProductPrepareSaveResponse>({
    url: Api.AddPrepare,
    params,
  });
};

export const updatePrepare = (params: PostApiProductPrepareUpdateRequest) => {
  return defHttp.post<PostApiProductPrepareUpdateResponse>({
    url: Api.UpdatePrepare,
    params,
  });
};

export const revokeUnpick = (params: PostApiProductPrepareRevokeUnpickRequest) => {
  return defHttp.post<PostApiProductPrepareRevokeUnpickResponse>({
    url: Api.RevokeUnpick,
    params,
  });
};

export const revokePick = (params: PostApiProductPrepareRevokePickRequest) => {
  return defHttp.post<PostApiProductPrepareRevokePickResponse>({
    url: Api.RevokePick,
    params,
  });
};
// 完成准备
export const completePrepare = (params: PostApiProductPrepareCommitRequest) => {
  return defHttp.post<PostApiProductPrepareCommitResponse>({
    url: `${Api.CompletePrepare}/${params.prepareNo}`,
  });
};
// 复核
export const checkPrepare = (params: PostApiProductPrepareCheckRequest) => {
  return defHttp.post<PostApiProductPrepareCheckResponse>({
    url: Api.CheckPrepare,
    params,
  });
};

// 取消复核
export const revokeCheckPrepare = (params: PostApiProductPrepareRevokeCheckRequest) => {
  return defHttp.post<PostApiProductPrepareRevokeCheckResponse>({
    url: Api.RevokeCheckPrepare,
    params,
  });
};

export const getImmunityList = (params: GetApiProductPrepareSummaryImmunityPrepareNoRequest) => {
  return defHttp.get<GetApiProductPrepareSummaryImmunityPrepareNoResponse>({
    url: `${Api.GetImmunityList}/${params.prepareNo}`,
  });
};

export const getStationList = (params: GetApiProductPrepareSummaryStationPrepareNoRequest) => {
  return defHttp.get<GetApiProductPrepareSummaryStationPrepareNoResponse>({
    url: `${Api.GetStationList}/${params.prepareNo}`,
  });
};

export const getBatchList = (params: GetApiProductPrepareSummaryBatchPrepareNoRequest) => {
  return defHttp.get<GetApiProductPrepareSummaryBatchPrepareNoResponse>({
    url: `${Api.GetBatchList}/${params.prepareNo}`,
  });
};

export const getBoxList = (params: GetApiProductPrepareSummaryBoxPrepareNoRequest) => {
  return defHttp.get<GetApiProductPrepareSummaryBoxPrepareNoResponse>({
    url: `${Api.GetBoxList}/${params.prepareNo}`,
  });
};

export const getBagList = (params: GetApiProductPrepareSummaryBagPrepareNoRequest) => {
  return defHttp.get<GetApiProductPrepareSummaryBagPrepareNoResponse>({
    url: `${Api.GetBagList}/${params.prepareNo}`,
  });
};

// 挑选 按批查询
export const getPickBatch = (params: GetApiProductPreparePickBatchRequest) => {
  return defHttp.get<GetApiProductPreparePickBatchResponse>({ url: Api.GetPickBatch, params });
};

// 挑选 按箱查询
export const getPickBox = (params: GetApiProductPreparePickBoxRequest) => {
  return defHttp.get<GetApiProductPreparePickBoxResponse>({ url: Api.GetPickBox, params });
};

// 挑浆
export const pickBag = (params: PostApiProductPreparePickBagRequest) => {
  return defHttp.post<PostApiProductPreparePickBagResponse>({
    url: Api.PickBag,
    params,
  });
};

// 撤销挑浆
export const revokePickBag = (params: PostApiProductPrepareRevokePickBagRequest) => {
  return defHttp.post<PostApiProductPrepareRevokePickBagResponse>({
    url: Api.RevokePickBag,
    params,
  });
};

// 获取已挑 批
export const getPickedBatch = (params: GetApiProductPreparePickBagBatchPrepareNoRequest) => {
  return defHttp.get<GetApiProductPreparePickBagBatchPrepareNoResponse>({
    url: `${Api.GetPickedBatch}/${params.prepareNo}`,
  });
};

// 获取已挑 箱
export const getPickedBox = (params: GetApiProductPreparePickBagBoxPrepareNoRequest) => {
  return defHttp.get<GetApiProductPreparePickBagBoxPrepareNoResponse>({
    url: `${Api.GetPickedBox}/${params.prepareNo}`,
  });
};

// 挑浆汇总预览
export const getSummaryPreview = (params: GetApiProductPrepareSummaryPreviewRequest) => {
  return defHttp.get<GetApiProductPrepareSummaryPreviewResponse>({
    url: Api.GetSummaryPreview,
    params,
  });
};
