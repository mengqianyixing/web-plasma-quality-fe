import { defHttp } from '@/utils/http/axios';
import qs from 'qs';

import {
  GetApiCoreBatchPlasmaAcceptBatchNoRequest,
  GetApiCoreBatchPlasmaAcceptBatchNoResponse,
  GetApiCoreBatchSummaryRequest,
  GetApiCoreBatchSummaryResponse,
  PostApiCoreBatchPlasmaAcceptBoxRequest,
  GetApiCoreBatchAcceptationBatchNoRequest,
  GetApiCoreBatchAcceptationBatchNoResponse,
  PostApiCoreBatchPlasmaAcceptBatchPauseRequest,
  PostApiCoreBatchPlasmaAcceptBatchPauseResponse,
  GetApiCoreBatchTrayCheckTrayNoRequest,
  PostApiCoreBatchPlasmaAcceptBatchRequest,
  PostApiCoreBatchPlasmaAcceptBatchResponse,
} from '@/api/type/batchManage';

enum Api {
  GetAccepts = '/api/core/batch/plasma/accept',
  GetBatchSummary = '/api/core/batch/summary',
  AcceptPlasma = '/api/core/batch/plasma/accept/box',
  CommitAcceptation = '/api/core/batch/commit/acceptation',
  GetAcceptationList = '/api/core/batch/acceptation',
  ReceivePause = '/api/core/batch/plasma/accept/batch/pause',
  CheckTrayNo = '/api/core/batch/tray/check',
  AcceptPlasmaBatch = '/api/core/batch/plasma/accept/batch',
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
export const acceptPlasma = (
  params: PostApiCoreBatchPlasmaAcceptBoxRequest,
  errOkCb: () => void,
) => {
  return defHttp.post(
    { url: Api.AcceptPlasma, params },
    {
      errorMessageModeOkCb: errOkCb,
    },
  );
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

// 血浆接收-接收托盘校验
export const checkTrayNo = (params: GetApiCoreBatchTrayCheckTrayNoRequest['trayNo']) => {
  return defHttp.get(
    {
      url: `${Api.CheckTrayNo}/${params}`,
    },
    {
      isReturnNativeResponse: true,
    },
  );
};

// 血浆接收(批)
export const acceptPlasmaBatch = (params: PostApiCoreBatchPlasmaAcceptBatchRequest) => {
  return defHttp.post<PostApiCoreBatchPlasmaAcceptBatchResponse>({
    url: Api.AcceptPlasmaBatch,
    params,
  });
};
