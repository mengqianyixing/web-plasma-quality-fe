import { defHttp } from '@/utils/http/axios';

import {
  PostApiCoreBagTiterCountRequest,
  PostApiCoreBagTiterCountResponse,
} from '@/api/type/queryStatistics';

enum Api {
  LIST = '/api/core/bag/titer/count',
}

export const getListApi = (params: PostApiCoreBagTiterCountRequest) =>
  defHttp.post<PostApiCoreBagTiterCountResponse>({ url: Api.LIST, params });
