import { defHttp } from '@/utils/http/axios';

import {
  PostApiCoreLabSamplesRequest,
  PostApiCoreLabSamplesResponse,
  PostApiCoreLabSamplesLabItemRequest,
  PostApiCoreLabSamplesLabItemResponse,
} from '@/api/type/queryStatistics';

enum Api {
  LIST = '/api/search/sample/result',
  DT = '/api/core/lab/samples/lab/item',
  UN_DT = '/api/core/lab/samples/lab/unqualified/item',
}

export const getListApi = (params: PostApiCoreLabSamplesRequest) =>
  defHttp.get<PostApiCoreLabSamplesResponse>({ url: Api.LIST, params });

export const getDtApi = (params: PostApiCoreLabSamplesLabItemRequest) =>
  defHttp.post<PostApiCoreLabSamplesLabItemResponse>({ url: Api.DT, params });

export const getUnDtApi = (params: PostApiCoreLabSamplesLabItemRequest) =>
  defHttp.get<PostApiCoreLabSamplesLabItemResponse>({ url: Api.UN_DT, params });
