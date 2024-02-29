import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreBatchStatisticRequest,
  GetApiCoreBatchStatisticResponse,
} from '@/api/type/queryStatistics';

enum Api {
  BATCH_STATISTICS = '/api/core/batch/statistic',
}

export const getBatchList = (params: GetApiCoreBatchStatisticRequest) =>
  defHttp.get<GetApiCoreBatchStatisticResponse>(
    { url: Api.BATCH_STATISTICS, params },
    { joinParamsToUrl: true },
  );
