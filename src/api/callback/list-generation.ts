import { defHttp } from '@/utils/http/axios';
import {
  DeleteApiCoreDonorCallbackDetailRequest,
  DeleteApiCoreDonorCallbackRequest,
  GetApiCoreDonorCallbackDetailRequest,
  GetApiCoreDonorCallbackDetailResponse,
  GetApiCoreDonorCallbackDetailStateRequest,
  GetApiCoreDonorCallbackDetailStateResponse,
  GetApiCoreDonorCallbackDonorBagRequest,
  GetApiCoreDonorCallbackDonorBagResponse,
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
  DETAIL_BY_STATE = '/api/core/donor/callback/detail-state',
  DONOR_BAG_DETAIL = '/api/core/donor/callback/donor-bag',
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

export const getDetailByState = (params: GetApiCoreDonorCallbackDetailStateRequest) =>
  defHttp.get<GetApiCoreDonorCallbackDetailStateResponse>(
    {
      url: Api.DETAIL_BY_STATE,
      params,
    },
    {
      joinParamsToUrl: true,
    },
  );

export const getDonorBagDetail = (params: GetApiCoreDonorCallbackDonorBagRequest) =>
  defHttp.get<GetApiCoreDonorCallbackDonorBagResponse>(
    {
      url: Api.DONOR_BAG_DETAIL,
      params,
    },
    {
      joinParamsToUrl: true,
    },
  );
