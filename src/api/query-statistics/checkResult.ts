import { defHttp } from '@/utils/http/axios';

import {
  PostApiCoreLabSamplesRequest,
  PostApiCoreLabSamplesResponse,
  PostApiCoreLabSamplesLabItemRequest,
  PostApiCoreLabSamplesLabItemResponse,
} from '@/api/type/queryStatistics';

enum Api {
  LIST = '/api/core/lab/samples',
  DT = '/api/core/lab/samples/lab/item',
}

export const getListApi = (params: PostApiCoreLabSamplesRequest) =>
  defHttp.post<PostApiCoreLabSamplesResponse>({ url: Api.LIST, params });

export const getDtApi = (params: PostApiCoreLabSamplesLabItemRequest) =>
  defHttp.post<PostApiCoreLabSamplesLabItemResponse>({ url: Api.DT, params });
