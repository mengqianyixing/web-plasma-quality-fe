import { defHttp } from '@/utils/http/axios';
import qs from 'qs';

import {
  GetApiCoreBatchPlasmaAcceptBatchNoRequest,
  GetApiCoreBatchPlasmaAcceptBatchNoResponse,
  GetApiCoreBatchSummaryRequest,
  GetApiCoreBatchSummaryResponse,
  PostApiCoreBatchPlasmaAcceptBoxRequest,
  PostApiCoreBatchPlasmaAcceptBoxResponse,
  GetApiCoreBatchAcceptationBatchNoRequest,
  GetApiCoreBatchAcceptationBatchNoResponse,
  PostApiCoreBatchPlasmaAcceptBatchPauseRequest,
  PostApiCoreBatchPlasmaAcceptBatchPauseResponse,
} from '@/api/type/batchManage';

enum Api {
  GetAccepts = '/api/core/batch/plasma/accept',
  GetBatchSummary = '/api/core/batch/summary',
  AcceptPlasma = '/api/core/batch/plasma/accept/box',
  CommitAcceptation = '/api/core/batch/commit/acceptation',
  GetAcceptationList = '/api/core/batch/acceptation',
  ReceivePause = '/api/core/batch/plasma/accept/batch/pause',
}

// 获取血浆接收详情
export const getAccepts = (params: GetApiCoreBatchPlasmaAcceptBatchNoRequest['batchNo']) => {
  return defHttp.get<GetApiCoreBatchPlasmaAcceptBatchNoResponse>({
    url: `${Api.GetAccepts}/${params}`,
  });
};

// 获取批次列表
export const getBatchSummary = (params: GetApiCoreBatchSummaryRequest) => {
  return defHttp.get<GetApiCoreBatchSummaryResponse>({
    url: Api.GetBatchSummary,
    params,
    paramsSerializer: (params) => {
      return qs.stringify(params, { indices: false });
    },
  });
};

// 血浆接收
export const acceptPlasma = (params: PostApiCoreBatchPlasmaAcceptBoxRequest) => {
  return defHttp.post<PostApiCoreBatchPlasmaAcceptBoxResponse>({ url: Api.AcceptPlasma, params });
};

// // 血浆接收-提交申请单
// export const commitAcceptation = (params: any) => {
//   return defHttp.put<any>({ url: `${Api.CommitAcceptation}/${params}` });
// };

// 血浆接收-获取申请单列表
export const getAcceptationList = (params: GetApiCoreBatchAcceptationBatchNoRequest) => {
  return defHttp.get<GetApiCoreBatchAcceptationBatchNoResponse>({
    url: `${Api.GetAcceptationList}/${params}`,
  });
};

// 血浆接收-暂停/继续
export const receivePause = (params: PostApiCoreBatchPlasmaAcceptBatchPauseRequest) => {
  return defHttp.post<PostApiCoreBatchPlasmaAcceptBatchPauseResponse>({
    url: Api.ReceivePause,
    params,
  });
};
