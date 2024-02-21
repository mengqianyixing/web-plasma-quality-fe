import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreBagStatisticsRequest,
  GetApiCoreBagStatisticsResponse,
} from '@/api/type/queryStatistics';

enum Api {
  Plasma_Statistics = '/api/core/bag/statistics',
}

export const getPlasmaQueryList = (params: GetApiCoreBagStatisticsRequest) =>
  defHttp.get<GetApiCoreBagStatisticsResponse>(
    { url: Api.Plasma_Statistics, params },
    { joinParamsToUrl: true },
  );
