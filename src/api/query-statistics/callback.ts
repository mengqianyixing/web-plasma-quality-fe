import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreBatchSampleCallbackStatisticRequest,
  GetApiCoreBatchSampleCallbackStatisticResponse,
  GetApiSearchDonorCallbackCountRequest,
  GetApiSearchDonorCallbackCountResponse,
  GetApiSearchDonorCallbackCountTotalRequest,
  GetApiSearchDonorCallbackCountTotalResponse,
} from '@/api/type/queryStatistics';

enum Api {
  CALLBACK_STATISTIC = '/api/search/donor/callback-count',
  CALLBACK_BATCH_STATISTICS = '/api/core/batch/sample/callback/statistic',
  TOTAL_CALLBACK_STATISTIC = '/api/search/donor/callback-count/total',
}

export const getCallbackStatisticList = (params: GetApiSearchDonorCallbackCountRequest) =>
  defHttp.get<GetApiSearchDonorCallbackCountResponse>(
    { url: Api.CALLBACK_STATISTIC, params },
    { joinParamsToUrl: true },
  );

export const getCallbackBatchStatistics = (params: GetApiCoreBatchSampleCallbackStatisticRequest) =>
  defHttp.get<GetApiCoreBatchSampleCallbackStatisticResponse>(
    { url: Api.CALLBACK_BATCH_STATISTICS, params },
    { joinParamsToUrl: true },
  );

export const getTotalCallbackStatistic = (params: GetApiSearchDonorCallbackCountTotalRequest) =>
  defHttp.get<GetApiSearchDonorCallbackCountTotalResponse>(
    {
      url: Api.TOTAL_CALLBACK_STATISTIC,
      params,
    },
    {
      joinParamsToUrl: true,
    },
  );
