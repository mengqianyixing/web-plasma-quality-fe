import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreBagUnqualifiedStatisticQuarantineRequest,
  GetApiCoreBagUnqualifiedStatisticQuarantineResponse,
} from '@/api/type/queryStatistics';

enum Api {
  LIST = '/api/core/bag/unqualified/statistic-quarantine',
}

export const getListApi = (params: GetApiCoreBagUnqualifiedStatisticQuarantineRequest) =>
  defHttp.get<GetApiCoreBagUnqualifiedStatisticQuarantineResponse>({ url: Api.LIST, params });
