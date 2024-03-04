import { defHttp } from '@/utils/http/axios';

import {
  PostApiCoreLabSamplesRequest,
  PostApiCoreLabSamplesResponse,
} from '@/api/type/queryStatistics';

enum Api {
  LIST = '/api/core/lab/samples',
}

export const getListApi = (params: PostApiCoreLabSamplesRequest) =>
  defHttp.post<PostApiCoreLabSamplesResponse>({ url: Api.LIST, params });
