import { defHttp } from '@/utils/http/axios';

import {
  GetApiSearchSampleLabRequest,
  GetApiSearchSampleLabResponse,
} from '@/api/type/queryStatistics';

enum Api {
  LIST = '/api/search/sample/lab',
}

export const getListApi = (params: GetApiSearchSampleLabRequest) =>
  defHttp.get<GetApiSearchSampleLabResponse>({ url: Api.LIST, params });
