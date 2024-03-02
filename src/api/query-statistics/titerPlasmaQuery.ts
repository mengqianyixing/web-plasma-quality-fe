import { defHttp } from '@/utils/http/axios';

import {
  PostApiCoreBagTiterRequest,
  PostApiCoreBagTiterResponse,
} from '@/api/type/queryStatistics';

enum Api {
  LIST = '/api/core/bag/titer',
}

export const getListApi = (params: PostApiCoreBagTiterRequest) =>
  defHttp.post<PostApiCoreBagTiterResponse>({ url: Api.LIST, params });
