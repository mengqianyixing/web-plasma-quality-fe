import { defHttp } from '@/utils/http/axios';

import {
  GetApiSearchDonorStatusRequest,
  GetApiSearchDonorStatusResponse,
} from '@/api/type/queryStatistics';

enum Api {
  LIST = '/api/search/donor/status',
}

export const getListApi = (params: GetApiSearchDonorStatusRequest) =>
  defHttp.get<GetApiSearchDonorStatusResponse>({ url: Api.LIST, params });
