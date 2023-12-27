import { defHttp } from '@/utils/http/axios';
import {
  GetApiCoreDonorCallbackRequest,
  GetApiCoreDonorCallbackResponse,
} from '@/api/type/callbackManage';
import { GetApiCoreStationResponse } from '@/api/type/stationManage';

enum Api {
  CALLBACK_LIST = '/api/core/donor/callback',
  STATION_NAME = '/api/core/station',
}

export const getCallbackListApi = (params: GetApiCoreDonorCallbackRequest) =>
  defHttp.get<GetApiCoreDonorCallbackResponse>(
    { url: Api.CALLBACK_LIST, params },
    {
      joinParamsToUrl: true,
    },
  );

export const stationNameList = () =>
  defHttp.get<GetApiCoreStationResponse>({ url: Api.STATION_NAME });
