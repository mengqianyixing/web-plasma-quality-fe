import { defHttp } from '@/utils/http/axios';
import {
  DeleteApiCoreDonorCallbackRequest,
  GetApiCoreDonorCallbackDetailRequest,
  GetApiCoreDonorCallbackDetailResponse,
  GetApiCoreDonorCallbackNeedRequest,
  GetApiCoreDonorCallbackNeedResponse,
  GetApiCoreDonorCallbackRequest,
  GetApiCoreDonorCallbackResponse,
  PostApiCoreDonorCallbackNeedRequest,
} from '@/api/type/callbackManage';
import { GetApiCoreStationResponse } from '@/api/type/stationManage';

enum Api {
  CALLBACK_LIST = '/api/core/donor/callback',
  CALLBACK_DETAIL = '/api/core/donor/callback/detail',
  STATION_NAME = '/api/core/station',
  GENERATE_CALLBACK = '/api/core/donor/callback/need',
}

export const getCallbackListApi = (params: GetApiCoreDonorCallbackRequest) =>
  defHttp.get<GetApiCoreDonorCallbackResponse>(
    { url: Api.CALLBACK_LIST, params },
    {
      joinParamsToUrl: true,
    },
  );

export const getCallbackDetail = (params: GetApiCoreDonorCallbackDetailRequest['batchNo']) =>
  defHttp.get<GetApiCoreDonorCallbackDetailResponse>(
    {
      url: Api.CALLBACK_DETAIL,
      params,
    },
    {
      joinParamsToUrl: true,
    },
  );

export const deleteCallback = (params: DeleteApiCoreDonorCallbackRequest) =>
  defHttp.delete({ url: Api.CALLBACK_LIST, params });

export const stationNameList = () =>
  defHttp.get<GetApiCoreStationResponse>({ url: Api.STATION_NAME });

export const getNeedCallbackList = (params: GetApiCoreDonorCallbackNeedRequest) =>
  defHttp.get<GetApiCoreDonorCallbackNeedResponse>(
    { url: Api.GENERATE_CALLBACK, params },
    {
      joinParamsToUrl: true,
    },
  );

export const generateCallback = (params: PostApiCoreDonorCallbackNeedRequest) =>
  defHttp.post({ url: Api.GENERATE_CALLBACK, params });
