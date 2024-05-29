import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreBagUnqualifiedStatisticBatchRequest,
  GetApiCoreBagUnqualifiedStatisticBatchResponse,
  GetApiCoreBagUnqualifiedStatisticStationRequest,
  GetApiCoreBagUnqualifiedStatisticStationResponse,
  GetApiCoreBatchStatisticRequest,
  GetApiCoreBatchStatisticResponse,
  GetApiSearchBatchCountTotalRequest,
  GetApiSearchBatchCountTotalResponse,
} from '@/api/type/queryStatistics';

enum Api {
  BATCH_STATISTICS = '/api/core/batch/statistic',
  UNQUALIFIED_PLASMA_STATION = '/api/core/bag/unqualified/statistic-station',
  UNQUALIFIED_PLASMA_BATCH = '/api/core/bag/unqualified/statistic-batch',
  UNQUALIFIED_PLASMA_COUNT_TOTAL = '/api/search/batch/count-total',
}

export const getBatchList = (params: GetApiCoreBatchStatisticRequest) =>
  defHttp.get<GetApiCoreBatchStatisticResponse>(
    { url: Api.BATCH_STATISTICS, params },
    { joinParamsToUrl: true },
  );

export const getUnqualifiedPlasmaStation = (
  params: GetApiCoreBagUnqualifiedStatisticStationRequest,
) =>
  defHttp.get<GetApiCoreBagUnqualifiedStatisticStationResponse>(
    { url: Api.UNQUALIFIED_PLASMA_STATION, params },
    { joinParamsToUrl: true },
  );

export const getUnqualifiedPlasmaBatch = (params: GetApiCoreBagUnqualifiedStatisticBatchRequest) =>
  defHttp.get<GetApiCoreBagUnqualifiedStatisticBatchResponse>(
    {
      url: Api.UNQUALIFIED_PLASMA_BATCH,
      params,
    },
    { joinParamsToUrl: true },
  );

export const getUnqualifiedPlasmaCountTotal = (params: GetApiSearchBatchCountTotalRequest) =>
  defHttp.get<GetApiSearchBatchCountTotalResponse>(
    {
      url: Api.UNQUALIFIED_PLASMA_COUNT_TOTAL,
      params,
    },
    { joinParamsToUrl: true },
  );
