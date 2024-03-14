import { defHttp } from '@/utils/http/axios';
import {
  DeleteApiCoreDonorCallbackDetailRequest,
  DeleteApiCoreDonorCallbackRequest,
  GetApiCoreDonorCallbackDetailRequest,
  GetApiCoreDonorCallbackDetailResponse,
  GetApiCoreDonorCallbackNeedRequest,
  GetApiCoreDonorCallbackNeedResponse,
  GetApiCoreDonorCallbackRequest,
  GetApiCoreDonorCallbackResponse,
  PostApiCoreDonorCallbackBatchRequest,
  PostApiCoreDonorCallbackBatchResponse,
  PostApiCoreDonorCallbackNeedRequest,
} from '@/api/type/callbackManage';
import { GetApiSysStationFormResponse } from '@/api/type/stationManage';

enum Api {
  CALLBACK_LIST = '/api/core/donor/callback',
  CALLBACK_RESTFUL = '/api/core/donor/callback/detail',
  STATION_NAME = '/api/sys/station/form',
  GENERATE_CALLBACK = '/api/core/donor/callback/need',
  CREATE_CALLBACK_BATCH = '/api/core/donor/callback/batch',
}

export const getCallbackListApi = (params: GetApiCoreDonorCallbackRequest) =>
  defHttp.get<GetApiCoreDonorCallbackResponse>(
    { url: Api.CALLBACK_LIST, params },
    {
      joinParamsToUrl: true,
    },
  );

export const getCallbackDetail = (params: GetApiCoreDonorCallbackDetailRequest) =>
  defHttp.get<GetApiCoreDonorCallbackDetailResponse>(
    {
      url: Api.CALLBACK_RESTFUL,
      params,
    },
    {
      joinParamsToUrl: true,
    },
  );

export const deleteCallback = (params: DeleteApiCoreDonorCallbackRequest) =>
  defHttp.delete({ url: Api.CALLBACK_LIST, params });

export const stationNameList = () =>
  defHttp.get<GetApiSysStationFormResponse>({ url: Api.STATION_NAME });

export const getNeedCallbackList = (params: GetApiCoreDonorCallbackNeedRequest) =>
  defHttp.get<GetApiCoreDonorCallbackNeedResponse>(
    { url: Api.GENERATE_CALLBACK, params },
    {
      joinParamsToUrl: true,
    },
  );

export const generateCallback = (params: PostApiCoreDonorCallbackNeedRequest) =>
  defHttp.post({ url: Api.GENERATE_CALLBACK, params });

export const createCallbackBatch = (params: PostApiCoreDonorCallbackBatchRequest) =>
  defHttp.post<PostApiCoreDonorCallbackBatchResponse>({ url: Api.CREATE_CALLBACK_BATCH, params });

export const revokeCallback = (params: DeleteApiCoreDonorCallbackDetailRequest) =>
  defHttp.delete({ url: Api.CALLBACK_RESTFUL, params });
