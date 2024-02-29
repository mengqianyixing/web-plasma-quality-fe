import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreSampleStatisticsRequest,
  GetApiCoreSampleStatisticsResponse,
} from '@/api/type/queryStatistics';

enum Api {
  LIST = '/api/core/sample/statistics',
}

export const getListApi = (params: GetApiCoreSampleStatisticsRequest) =>
  defHttp.get<GetApiCoreSampleStatisticsResponse>({ url: Api.LIST, params });
