import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreDonorBlockRequest,
  GetApiCoreDonorBlockResponse,
} from '@/api/type/callbackManage';

enum Api {
  Station_Refuse_Statistics = '/api/core/donor/block',
}

export const getStationRefuseList = (params: GetApiCoreDonorBlockRequest) =>
  defHttp.get<GetApiCoreDonorBlockResponse>(
    { url: Api.Station_Refuse_Statistics, params },
    { joinParamsToUrl: true },
  );
