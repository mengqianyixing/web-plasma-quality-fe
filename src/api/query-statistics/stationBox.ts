import { defHttp } from '@/utils/http/axios';

import {
  GetApiSearchPlasmaStationBoxRequest,
  GetApiSearchPlasmaStationBoxResponse,
} from '@/api/type/queryStatistics';

enum Api {
  Station_Box = '/api/search/plasma/station/box',
}

export const getStationBoxList = (params: GetApiSearchPlasmaStationBoxRequest) =>
  defHttp.get<GetApiSearchPlasmaStationBoxResponse>(
    { url: Api.Station_Box, params },
    { joinParamsToUrl: true },
  );
