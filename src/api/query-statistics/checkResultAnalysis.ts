import { defHttp } from '@/utils/http/axios';

import {
  GetApiSearchSampleLabItemParallelRequest,
  GetApiSearchSampleLabItemParallelResponse,
  GetApiSearchSampleLabItemParallelTotalRequest,
  GetApiSearchSampleLabItemParallelTotalResponse,
  GetApiSearchSampleLabItemParallelDetailRequest,
  GetApiSearchSampleLabItemParallelDetailResponse,
} from '@/api/type/queryStatistics';

enum Api {
  LIST = '/api/search/sample/lab-item/parallel',
  DT = '/api/search/sample/lab-item/parallel/detail',
  COUNT = '/api/search/sample/lab-item/parallel/total',
}

export const getListApi = (params: GetApiSearchSampleLabItemParallelRequest) =>
  defHttp.get<GetApiSearchSampleLabItemParallelResponse>({ url: Api.LIST, params });

export const getListCountApi = (params: GetApiSearchSampleLabItemParallelTotalRequest) =>
  defHttp.get<GetApiSearchSampleLabItemParallelTotalResponse>({ url: Api.COUNT, params });

export const getDtApi = (params: GetApiSearchSampleLabItemParallelDetailRequest) =>
  defHttp.get<GetApiSearchSampleLabItemParallelDetailResponse>({ url: Api.DT, params });
