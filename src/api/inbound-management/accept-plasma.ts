import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreBatchPlasmaVerifyBagRequest,
  GetApiCoreBatchPlasmaVerifyBagResponse,
  GetApiCoreBatchPlasmaVerifyBoxRequest,
  GetApiCoreBatchPlasmaVerifyBoxResponse,
  PostApiCoreBatchPlasmaVerifyBagRequest,
  PostApiCoreBatchPlasmaVerifyBagResponse,
  PostApiCoreBatchPlasmaVerifyBoxPauseRequest,
  PostApiCoreBatchPlasmaVerifyBoxPauseResponse,
  PostApiCoreBatchPlasmaVerifyBatchPauseRequest,
  PostApiCoreBatchPlasmaVerifyBatchPauseResponse,
  GetApiCoreBatchPlasmaVerifyPauseBatchNoPatternPauseTypeRequest,
  GetApiCoreBatchPlasmaVerifyPauseBatchNoPatternPauseTypeResponse,
  PostApiCoreBatchPlasmaVerifyRevokeBagRequest,
  PostApiCoreBatchPlasmaVerifyRevokeBagResponse,
  GetApiCoreBatchPlasmaVerifyBatchNoRequest,
  GetApiCoreBatchPlasmaVerifyBatchNoResponse,
} from '@/api/type/batchManage';

enum Api {
  GetPlasmaVerify = '/api/core/batch/plasma/verify',
  GetPlasmaBag = '/api/core/batch/plasma/verify/bag',
  GetPlasmaBox = '/api/core/batch/plasma/verify/box',
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  PlasmaVerifyBag = '/api/core/batch/plasma/verify/bag',
  PlasmaPauseBox = '/api/core/batch/plasma/verify/box/pause',
  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  PlasmaPauseBoxList = '/api/core/batch/plasma/verify/pause',
  PlasmaPauseBatch = '/api/core/batch/plasma/verify/batch/pause',
  PlasmaRevokeBag = '/api/core/batch/plasma/verify/revoke/bag',
  PlasmaComplete = '/api/core/batch/plasma/verify/batch/commit',
}

// 获取血浆验收记录信息
export const getPlasmaVerify = (params: GetApiCoreBatchPlasmaVerifyBatchNoRequest['batchNo']) => {
  return defHttp.get<GetApiCoreBatchPlasmaVerifyBatchNoResponse>({
    url: `${Api.GetPlasmaVerify}/${params}`,
  });
};

// 查询血浆验收袋记录信息
export const getPlasmaBag = (params: GetApiCoreBatchPlasmaVerifyBagRequest) => {
  return defHttp.get<GetApiCoreBatchPlasmaVerifyBagResponse>({ url: Api.GetPlasmaBag, params });
};

// 查询血浆验收箱记录信息
export const getPlasmaBox = (params: GetApiCoreBatchPlasmaVerifyBoxRequest) => {
  return defHttp.get<GetApiCoreBatchPlasmaVerifyBoxResponse>({ url: Api.GetPlasmaBox, params });
};

// 血浆验收
export const plasmaVerifyBag = (params: PostApiCoreBatchPlasmaVerifyBagRequest) => {
  return defHttp.post<PostApiCoreBatchPlasmaVerifyBagResponse>({
    url: Api.PlasmaVerifyBag,
    params,
  });
};

// 血浆验收-暂停/继续箱
export const plasmaPauseBox = (params: PostApiCoreBatchPlasmaVerifyBoxPauseRequest) => {
  return defHttp.post<PostApiCoreBatchPlasmaVerifyBoxPauseResponse>({
    url: Api.PlasmaPauseBox,
    params,
  });
};

// 血浆验收-暂停/继续批
export const plasmaPauseBatch = (params: PostApiCoreBatchPlasmaVerifyBatchPauseRequest) => {
  return defHttp.post<PostApiCoreBatchPlasmaVerifyBatchPauseResponse>({
    url: Api.PlasmaPauseBatch,
    params,
  });
};

// 血浆验收-暂停箱/批列表
export const plasmaPauseBoxList = (
  params: GetApiCoreBatchPlasmaVerifyPauseBatchNoPatternPauseTypeRequest,
) => {
  return defHttp.get<GetApiCoreBatchPlasmaVerifyPauseBatchNoPatternPauseTypeResponse>({
    url: `${Api.PlasmaPauseBoxList}/${params.batchNo}/${params.pattern}/${
      params.pauseType || 'ACC'
    }`,
  });
};

// 血浆验收-撤销验收
export const plasmaRevokeBag = (params: PostApiCoreBatchPlasmaVerifyRevokeBagRequest) => {
  return defHttp.post<PostApiCoreBatchPlasmaVerifyRevokeBagResponse>({
    url: Api.PlasmaRevokeBag,
    params,
  });
};

// 血浆验收-完成验收
export const plasmaComplete = (params: any) => {
  return defHttp.post<any>({
    url: `${Api.PlasmaComplete}/${params}`,
  });
};
