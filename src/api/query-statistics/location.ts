import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreBankLocationStatisticsRequest,
  GetApiCoreBankLocationStatisticsResponse,
} from '@/api/type/queryStatistics';

enum Api {
  LIST = '/api/core/bank/location/statistics',
}

export const getListApi = (params: GetApiCoreBankLocationStatisticsRequest) =>
  defHttp.get<GetApiCoreBankLocationStatisticsResponse>({ url: Api.LIST, params });
