import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreSampleStatisticsRequest,
  GetApiCoreSampleStatisticsResponse,
  GetApiCoreSampleStatisticsDetailRequest,
  GetApiCoreSampleStatisticsDetailResponse,
} from '@/api/type/queryStatistics';

enum Api {
  LIST = '/api/core/sample/statistics',
  DT = '/api/search/sample/statistics-detail',
}

export const getListApi = (params: GetApiCoreSampleStatisticsRequest) =>
  defHttp.get<GetApiCoreSampleStatisticsResponse>({ url: Api.LIST, params });
export const getDtApi = (params: GetApiCoreSampleStatisticsDetailRequest) =>
  defHttp.get<GetApiCoreSampleStatisticsDetailResponse>({ url: Api.DT, params });
