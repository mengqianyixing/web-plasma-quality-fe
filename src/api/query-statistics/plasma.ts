import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreBagCollectStatisticRequest,
  GetApiCoreBagCollectStatisticResponse,
  GetApiCoreBagOutInStorageStatisticRequest,
  GetApiCoreBagOutInStorageStatisticResponse,
  GetApiCoreBagQualifiedInventoryStatisticQueryDateRequest,
  GetApiCoreBagQualifiedInventoryStatisticQueryDateResponse,
  GetApiCoreBagStatisticsRequest,
  GetApiCoreBagStatisticsResponse,
} from '@/api/type/queryStatistics';

enum Api {
  Plasma_Statistics = '/api/core/bag/statistics',
  Plasma_Qualified_Inventory = '/api/core/bag/qualified-inventory/statistic',
  Plasma_BagCollect = '/api/core/bag/collect/statistic',
  Plasma_Raw_InStorage_Query = '/api/core/bag/out-in-storage/statistic',
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

export const getPlasmaBagCollect = (params: GetApiCoreBagCollectStatisticRequest) =>
  defHttp.get<GetApiCoreBagCollectStatisticResponse>(
    { url: Api.Plasma_BagCollect, params },
    { joinParamsToUrl: true },
  );

export const getPlasmaRawInStorage = (params: GetApiCoreBagOutInStorageStatisticRequest) =>
  defHttp.get<GetApiCoreBagOutInStorageStatisticResponse>(
    {
      url: Api.Plasma_Raw_InStorage_Query,
      params,
    },
    {
      joinParamsToUrl: true,
    },
  );
