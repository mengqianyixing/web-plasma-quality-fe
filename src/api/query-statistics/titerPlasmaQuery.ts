import { defHttp } from '@/utils/http/axios';

import {
  PostApiCoreBagTiterRequest,
  PostApiCoreBagTiterResponse,
  PostApiCoreBagTiterDetailsRequest,
  PostApiCoreBagTiterDetailsResponse,
} from '@/api/type/queryStatistics';

enum Api {
  LIST = '/api/core/bag/titer',
  DT = '/api/core/bag/titer/details',
}

export const getListApi = (params: PostApiCoreBagTiterRequest) =>
  defHttp.post<PostApiCoreBagTiterResponse>({ url: Api.LIST, params });

export const getDtApi = (params: PostApiCoreBagTiterDetailsRequest) =>
  defHttp.post<PostApiCoreBagTiterDetailsResponse>({ url: Api.DT, params });
