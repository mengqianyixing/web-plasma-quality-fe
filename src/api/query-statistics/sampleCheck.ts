import { defHttp } from '@/utils/http/axios';

import {
  PostApiCoreLabSampleDetailRequest,
  PostApiCoreLabSampleDetailResponse,
} from '@/api/type/queryStatistics';

enum Api {
  LIST = '/api/core/lab/sample/detail',
}

export const getListApi = (params: PostApiCoreLabSampleDetailRequest) =>
  defHttp.post<PostApiCoreLabSampleDetailResponse>({ url: Api.LIST, params });
