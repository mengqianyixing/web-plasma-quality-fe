import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreBagQualifiedInventoryStatisticQueryDateRequest,
  GetApiCoreBagQualifiedInventoryStatisticQueryDateResponse,
  GetApiCoreBagStatisticsRequest,
  GetApiCoreBagStatisticsResponse,
} from '@/api/type/queryStatistics';

enum Api {
  Plasma_Statistics = '/api/core/bag/statistics',
  Plasma_Qualified_Inventory = '/api/core/bag/qualified-inventory/statistic',
}

export const getPlasmaQueryList = (params: GetApiCoreBagStatisticsRequest) =>
  defHttp.get<GetApiCoreBagStatisticsResponse>(
    { url: Api.Plasma_Statistics, params },
    { joinParamsToUrl: true },
  );

export const getPlasmaQualifiedInventory = (
  params: GetApiCoreBagQualifiedInventoryStatisticQueryDateRequest,
) =>
  defHttp.get<GetApiCoreBagQualifiedInventoryStatisticQueryDateResponse>({
    url: Api.Plasma_Qualified_Inventory + '/' + params.queryDate,
  });
