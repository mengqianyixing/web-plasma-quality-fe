import { defHttp } from '@/utils/http/axios';

import {
  PostApiCoreBagTiterCountRequest,
  PostApiCoreBagTiterCountResponse,
} from '@/api/type/queryStatistics';

enum Api {
  LIST = '/api/search/plasma/privilege/count',
}

export const getListApi = (params: PostApiCoreBagTiterCountRequest) =>
  defHttp.get<PostApiCoreBagTiterCountResponse>({ url: Api.LIST, params });
