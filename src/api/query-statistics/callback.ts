import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreBatchSampleCallbackStatisticRequest,
  GetApiCoreBatchSampleCallbackStatisticResponse,
  GetApiCoreDonorCallbackStatisticStationRequest,
  GetApiCoreDonorCallbackStatisticStationResponse,
} from '@/api/type/queryStatistics';

enum Api {
  CALLBACK_STATISTIC = '/api/core/donor/callback/statistic-station',
  CALLBACK_BATCH_STATISTICS = '/api/core/batch/sample/callback/statistic',
}

export const getCallbackStatisticList = (params: GetApiCoreDonorCallbackStatisticStationRequest) =>
  defHttp.get<GetApiCoreDonorCallbackStatisticStationResponse>(
    { url: Api.CALLBACK_STATISTIC, params },
    { joinParamsToUrl: true },
  );

export const getCallbackBatchStatistics = (params: GetApiCoreBatchSampleCallbackStatisticRequest) =>
  defHttp.get<GetApiCoreBatchSampleCallbackStatisticResponse>(
    { url: Api.CALLBACK_BATCH_STATISTICS, params },
    { joinParamsToUrl: true },
  );
