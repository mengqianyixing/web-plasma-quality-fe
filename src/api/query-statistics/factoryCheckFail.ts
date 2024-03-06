import { defHttp } from '@/utils/http/axios';

import {
  PostApiCoreLabItemQueryRequest,
  PostApiCoreLabItemQueryResponse,
} from '@/api/type/queryStatistics';

enum Api {
  LIST = '/api/core/lab/item/query',
}

export const getListApi = (params: PostApiCoreLabItemQueryRequest) =>
  defHttp.post<PostApiCoreLabItemQueryResponse>({ url: Api.LIST, params });
