import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreBatchStationBoxRequest,
  GetApiCoreBatchStationBoxResponse,
} from '@/api/type/queryStatistics';

enum Api {
  Station_Box = '/api/core/batch/station/box',
}

export const getStationBoxList = (params: GetApiCoreBatchStationBoxRequest) =>
  defHttp.get<GetApiCoreBatchStationBoxResponse>(
    { url: Api.Station_Box, params },
    { joinParamsToUrl: true },
  );
