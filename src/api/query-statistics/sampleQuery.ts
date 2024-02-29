import { defHttp } from '@/utils/http/axios';

import {
  GetApiCoreSampleQueryRequest,
  GetApiCoreSampleQueryResponse,
} from '@/api/type/queryStatistics';

enum Api {
  LIST = '/api/core/sample/query',
}

export const getListApi = (params: GetApiCoreSampleQueryRequest) =>
  defHttp.get<GetApiCoreSampleQueryResponse>({ url: Api.LIST, params });
