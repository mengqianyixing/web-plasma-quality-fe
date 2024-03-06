import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreBatchStockStatisticsRequest,
  GetApiCoreBatchStockStatisticsResponse,
} from '@/api/type/queryStatistics';

enum Api {
  INVENTORY_STATISTICS = '/api/core/batch/stock/statistics',
}

export const getInventoryList = (params: GetApiCoreBatchStockStatisticsRequest) =>
  defHttp.get<GetApiCoreBatchStockStatisticsResponse>(
    { url: Api.INVENTORY_STATISTICS, params },
    { joinParamsToUrl: true },
  );
