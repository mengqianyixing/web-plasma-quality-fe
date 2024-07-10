import { defHttp } from '@/utils/http/axios';

import {
  GetApiSearchPlasmaCheckRequest,
  GetApiSearchPlasmaCheckResponse,
  GetApiSearchPlasmaTiterRequest,
  GetApiSearchPlasmaTiterResponse,
  GetApiSearchPlasmaTrackRequest,
  GetApiSearchPlasmaTrackResponse,
  GetApiSearchPlasmaCheckDetailsRequest,
  GetApiSearchPlasmaCheckDetailsResponse,
} from '@/api/type/queryStatistics';

enum Api {
  CHECK_LIST = '/api/search/plasma/check',
  TITER_LIST = '/api/search/plasma/titer',
  FOLLOW_UP_LIST = '/api/search/plasma/track',
  DT = '/api/search/plasma/check/details',
}

export const getCheckListApi = (params: GetApiSearchPlasmaCheckRequest) =>
  defHttp.get<GetApiSearchPlasmaCheckResponse>({ url: Api.CHECK_LIST, params });

export const getTiterListApi = (params: GetApiSearchPlasmaTiterRequest) =>
  defHttp.get<GetApiSearchPlasmaTiterResponse>({ url: Api.TITER_LIST, params });

export const getFollowUpListApi = (params: GetApiSearchPlasmaTrackRequest) =>
  defHttp.get<GetApiSearchPlasmaTrackResponse>({ url: Api.FOLLOW_UP_LIST, params });

export const getDtApi = (params: GetApiSearchPlasmaCheckDetailsRequest) =>
  defHttp.get<GetApiSearchPlasmaCheckDetailsResponse>({ url: Api.DT, params });
