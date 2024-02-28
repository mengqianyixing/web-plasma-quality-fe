import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreDonorCallbackStatisticStationRequest,
  GetApiCoreDonorCallbackStatisticStationResponse,
} from '@/api/type/queryStatistics';

enum Api {
  CALLBACK_STATISTIC = '/api/core/donor/callback/statistic-station',
}

export const getCallbackStatisticList = (params: GetApiCoreDonorCallbackStatisticStationRequest) =>
  defHttp.get<GetApiCoreDonorCallbackStatisticStationResponse>(
    { url: Api.CALLBACK_STATISTIC, params },
    { joinParamsToUrl: true },
  );
