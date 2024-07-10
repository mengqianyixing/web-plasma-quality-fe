import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreBatchStatisticRequest,
  GetApiCoreBatchStatisticResponse,
  GetApiSearchBatchCountTotalRequest,
  GetApiSearchBatchCountTotalResponse,
  GetApiSearchBatchUnqualifiedStatisticBatchRequest,
  GetApiSearchBatchUnqualifiedStatisticBatchResponse,
  GetApiSearchBatchUnqualifiedStatisticStationRequest,
  GetApiSearchBatchUnqualifiedStatisticStationResponse,
  GetApiSearchPlasmaUnqualifiedRequest,
  GetApiSearchPlasmaUnqualifiedResponse,
} from '@/api/type/queryStatistics';

enum Api {
  BATCH_STATISTICS = '/api/core/batch/statistic',
  UNQUALIFIED_PLASMA_STATION = '/api/search/batch/unqualified/statistic-station',
  UNQUALIFIED_PLASMA_BATCH = '/api/search/batch/unqualified/statistic-batch',
  UNQUALIFIED_PLASMA_COUNT_TOTAL = '/api/search/batch/count-total',
  DETAIL = '/api/search/plasma/unqualified',
}

export const getBatchList = (params: GetApiCoreBatchStatisticRequest) =>
  defHttp.get<GetApiCoreBatchStatisticResponse>(
    { url: Api.BATCH_STATISTICS, params },
    { joinParamsToUrl: true },
  );

export const getUnqualifiedPlasmaStation = (
  params: GetApiSearchBatchUnqualifiedStatisticStationRequest,
) =>
  defHttp.get<GetApiSearchBatchUnqualifiedStatisticStationResponse>(
    { url: Api.UNQUALIFIED_PLASMA_STATION, params },
    { joinParamsToUrl: true },
  );

export const getUnqualifiedPlasmaBatch = (
  params: GetApiSearchBatchUnqualifiedStatisticBatchRequest,
) =>
  defHttp.get<GetApiSearchBatchUnqualifiedStatisticBatchResponse>(
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

export const getUnqualifiedDetail = (params: GetApiSearchPlasmaUnqualifiedRequest) =>
  defHttp.get<GetApiSearchPlasmaUnqualifiedResponse>(
    {
      url: Api.DETAIL,
      params,
    },
    {
      joinParamsToUrl: true,
    },
  );
