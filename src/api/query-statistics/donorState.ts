import { defHttp } from '@/utils/http/axios';

import {
  PostApiCoreDonorStateRequest,
  PostApiCoreDonorStateResponse,
} from '@/api/type/queryStatistics';

enum Api {
  LIST = '/api/core/donor/state',
}

export const getListApi = (params: PostApiCoreDonorStateRequest) =>
  defHttp.post<PostApiCoreDonorStateResponse>({ url: Api.LIST, params });
