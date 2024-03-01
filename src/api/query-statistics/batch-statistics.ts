import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreBagUnqualifiedStatisticStationRequest,
  GetApiCoreBagUnqualifiedStatisticStationResponse,
  GetApiCoreBatchStatisticRequest,
  GetApiCoreBatchStatisticResponse,
} from '@/api/type/queryStatistics';

enum Api {
  BATCH_STATISTICS = '/api/core/batch/statistic',
  UNQUALIFIED_PLASMA_BATCH = '/api/core/bag/unqualified/statistic-station',
}

export const getBatchList = (params: GetApiCoreBatchStatisticRequest) =>
  defHttp.get<GetApiCoreBatchStatisticResponse>(
    { url: Api.BATCH_STATISTICS, params },
    { joinParamsToUrl: true },
  );

export const getUnqualifiedPlasmaBatch = (
  params: GetApiCoreBagUnqualifiedStatisticStationRequest,
) =>
  defHttp.get<GetApiCoreBagUnqualifiedStatisticStationResponse>(
    { url: Api.UNQUALIFIED_PLASMA_BATCH, params },
    { joinParamsToUrl: true },
  );
